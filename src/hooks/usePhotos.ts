import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import imageCompression from "browser-image-compression";
import { db, storage } from "../lib/firebase";
import { Photo } from "../types";
import { useAuth } from "../app/contexts/AuthContext";
import { COLLECTIONS, PHOTO_FIELDS } from "../lib/firestoreConstants";

export function usePhotos(personId?: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch photos for a specific person
  const fetchPhotos = async (personId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const photosRef = collection(db, COLLECTIONS.PHOTOS);
      const q = query(
        photosRef,
        where(PHOTO_FIELDS.PERSON_ID, "==", personId),
        where(PHOTO_FIELDS.FAMILY_ID, "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      const photosData: Photo[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        photosData.push({
          id: doc.id,
          personId: data.personId,
          familyId: data.familyId,
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

      // Compress the image before uploading
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.25, // 250KB target
        maxWidthOrHeight: 1920, // Max width or height
        useWebWorker: true,
        fileType: "image/jpeg",
        initialQuality: 0.8, // Start with 80% quality
      });

      console.log(
        `Original size: ${(file.size / 1024 / 1024).toFixed(
          2
        )}MB, Compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`
      );

      // Create storage reference
      const photoId = Date.now().toString();
      const storagePath = `families/${user?.uid}/photos/${personId}/${photoId}.jpg`;
      const storageRef = ref(storage, storagePath);

      // Upload compressed file to Firebase Storage with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      // Set up progress tracking
      return new Promise<Photo>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(progress);
          },
          (error) => {
            reject(error);
          },
          async () => {
            try {
              // Get download URL
              const downloadURL = await getDownloadURL(storageRef);

              // Save photo metadata to Firestore
              const photoData = {
                personId,
                familyId: user?.uid,
                filename: file.name,
                storagePath: `families/${user?.uid}/photos/${personId}/${photoId}.jpg`,
                uploadedAt: Timestamp.now(),
                size: compressedFile.size,
                url: downloadURL,
              };

              const docRef = await addDoc(
                collection(db, COLLECTIONS.PHOTOS),
                photoData
              );

              // Add to local state
              const newPhoto: Photo = {
                id: docRef.id,
                personId,
                familyId: user?.uid || "",
                filename: file.name,
                storagePath: `families/${user?.uid}/photos/${personId}/${photoId}.jpg`,
                uploadedAt: new Date(),
                size: compressedFile.size,
                url: downloadURL,
              };

              setPhotos((prev) => [newPhoto, ...prev]);
              resolve(newPhoto);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
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
      await deleteDoc(doc(db, COLLECTIONS.PHOTOS, photoId));

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
