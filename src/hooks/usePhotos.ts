import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../lib/firebase";
import { Photo } from "../types/photo";

export function usePhotos(personId?: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch photos for a specific person
  const fetchPhotos = async (personId: string) => {
    try {
      setLoading(true);
      setError(null);

      const photosRef = collection(db, "photos");
      const q = query(photosRef, where("personId", "==", personId));

      const querySnapshot = await getDocs(q);
      const photosData: Photo[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        photosData.push({
          id: doc.id,
          personId: data.personId,
          filename: data.filename,
          storagePath: data.storagePath,
          uploadedAt: data.uploadedAt.toDate(),
          takenAt: data.takenAt?.toDate(),
          size: data.size,
          url: data.url,
        });
      });

      // Sort by uploadedAt descending (most recent first)
      photosData.sort(
        (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
      );

      setPhotos(photosData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch photos");
    } finally {
      setLoading(false);
    }
  };

  // Upload a photo
  const uploadPhoto = async (
    file: File,
    personId: string,
    onProgress?: (progress: number) => void
  ) => {
    try {
      setError(null);

      // Create storage reference
      const photoId = Date.now().toString();
      const storageRef = ref(storage, `photos/${personId}/${photoId}.jpg`);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytes(storageRef, file);
      await uploadTask;

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save photo metadata to Firestore
      const photoData = {
        personId,
        filename: file.name,
        storagePath: `photos/${personId}/${photoId}.jpg`,
        uploadedAt: Timestamp.now(),
        size: file.size,
        url: downloadURL,
      };

      const docRef = await addDoc(collection(db, "photos"), photoData);

      // Add to local state
      const newPhoto: Photo = {
        id: docRef.id,
        personId,
        filename: file.name,
        storagePath: `photos/${personId}/${photoId}.jpg`,
        uploadedAt: new Date(),
        size: file.size,
        url: downloadURL,
      };

      setPhotos((prev) => [newPhoto, ...prev]);

      return newPhoto;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload photo");
      throw err;
    }
  };

  // Delete a photo
  const deletePhoto = async (photoId: string, storagePath: string) => {
    try {
      setError(null);

      // Delete from Firebase Storage
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);

      // Delete from Firestore
      await deleteDoc(doc(db, "photos", photoId));

      // Remove from local state
      setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete photo");
      throw err;
    }
  };

  // Auto-fetch photos when personId changes
  useEffect(() => {
    if (personId) {
      fetchPhotos(personId);
    } else {
      setPhotos([]);
      setLoading(false);
    }
  }, [personId]);

  return {
    photos,
    loading,
    error,
    uploadPhoto,
    deletePhoto,
    fetchPhotos,
  };
}
