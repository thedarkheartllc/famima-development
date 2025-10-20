import { useState, useEffect, useCallback } from "react";
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
import { parse } from "exifr";
import { db, storage } from "../lib/firebase";
import { Photo } from "../types";
import { useAuth } from "../app/contexts/AuthContext";
import { COLLECTIONS, PHOTO_FIELDS } from "../lib/firestoreConstants";

export function usePhotos(
  personId?: string,
  albumId?: string,
  allowPublicAccess?: boolean
) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch photos for a specific person or album
  const fetchPhotos = useCallback(
    async (targetPersonId?: string, targetAlbumId?: string) => {
      if (!user && !allowPublicAccess) return;

      try {
        setLoading(true);
        setError(null);

        const photosRef = collection(db, COLLECTIONS.PHOTOS);
        let q;

        if (targetPersonId) {
          // Fetch photos for a specific person
          if (allowPublicAccess) {
            q = query(
              photosRef,
              where(PHOTO_FIELDS.PERSON_ID, "==", targetPersonId)
            );
          } else if (user) {
            q = query(
              photosRef,
              where(PHOTO_FIELDS.PERSON_ID, "==", targetPersonId),
              where(PHOTO_FIELDS.FAMILY_ID, "==", user.uid)
            );
          }
        } else if (targetAlbumId) {
          // Fetch photos for a specific album
          if (allowPublicAccess) {
            q = query(
              photosRef,
              where(PHOTO_FIELDS.ALBUM_ID, "==", targetAlbumId)
            );
          } else if (user) {
            q = query(
              photosRef,
              where(PHOTO_FIELDS.ALBUM_ID, "==", targetAlbumId),
              where(PHOTO_FIELDS.FAMILY_ID, "==", user.uid)
            );
          }
        } else {
          // Fetch all photos for the family (only for authenticated users)
          if (!allowPublicAccess && user) {
            q = query(photosRef, where(PHOTO_FIELDS.FAMILY_ID, "==", user.uid));
          } else {
            setPhotos([]);
            setLoading(false);
            return;
          }
        }

        if (!q) {
          setPhotos([]);
          setLoading(false);
          return;
        }

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
    },
    [user, allowPublicAccess]
  );

  // Upload a photo
  const uploadPhoto = async (
    file: File,
    personIdOrAlbumId: string,
    storageId: string,
    onProgress?: (progress: number) => void,
    isAlbumUpload: boolean = false
  ): Promise<{ success: boolean; photo?: Photo; error?: string }> => {
    try {
      setError(null);

      // Extract EXIF data to get the original photo date
      let takenAt: Date | undefined;
      try {
        const exifData = await parse(file);
        if (exifData?.DateTimeOriginal) {
          takenAt = new Date(exifData.DateTimeOriginal);
        } else if (exifData?.DateTime) {
          takenAt = new Date(exifData.DateTime);
        } else if (exifData?.CreateDate) {
          takenAt = new Date(exifData.CreateDate);
        }
      } catch (exifError) {
        console.warn("Could not extract EXIF data:", exifError);
        // Continue without EXIF data
      }

      // Compress the image before uploading
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5, // 500KB target (increased from 250KB)
        maxWidthOrHeight: 1920, // Max width or height
        useWebWorker: true,
        fileType: "image/jpeg",
        initialQuality: 0.9, // Start with 90% quality (increased from 80%)
      });

      console.log(
        `Original size: ${(file.size / 1024 / 1024).toFixed(
          2
        )}MB, Compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`
      );

      // Create storage reference
      const photoId = Date.now().toString();
      const storagePath = `families/${user?.uid}/${storageId}/${photoId}.jpg`;
      const storageRef = ref(storage, storagePath);

      // Upload compressed file to Firebase Storage with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      // Set up progress tracking
      return new Promise<{ success: boolean; photo?: Photo; error?: string }>(
        (resolve) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress?.(progress);
            },
            (error) => {
              console.error("Upload failed:", error);
              resolve({
                success: false,
                error: error.message || "Upload failed",
              });
            },
            async () => {
              try {
                // Get download URL
                const downloadURL = await getDownloadURL(storageRef);

                // Save photo metadata to Firestore
                const photoData = {
                  ...(isAlbumUpload
                    ? { albumId: personIdOrAlbumId }
                    : { personId: personIdOrAlbumId }),
                  familyId: user?.uid,
                  filename: file.name,
                  storagePath: `families/${user?.uid}/${storageId}/${photoId}.jpg`,
                  uploadedAt: Timestamp.now(),
                  takenAt: takenAt ? Timestamp.fromDate(takenAt) : null,
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
                  storagePath: `families/${user?.uid}/${storageId}/${photoId}.jpg`,
                  uploadedAt: new Date(),
                  takenAt: takenAt,
                  size: compressedFile.size,
                  url: downloadURL,
                };

                setPhotos((prev) => [newPhoto, ...prev]);
                resolve({ success: true, photo: newPhoto });
              } catch (err) {
                console.error("Failed to save photo metadata:", err);
                resolve({
                  success: false,
                  error:
                    err instanceof Error
                      ? err.message
                      : "Failed to save photo metadata",
                });
              }
            }
          );
        }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload photo";
      console.error("Upload error:", err);
      return {
        success: false,
        error: errorMessage,
      };
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

  // Auto-fetch photos when personId or albumId changes
  useEffect(() => {
    if (personId) {
      fetchPhotos(personId);
    } else if (albumId) {
      fetchPhotos(undefined, albumId);
    } else {
      setPhotos([]);
      setLoading(false);
    }
  }, [personId, albumId, fetchPhotos]);

  return {
    photos,
    loading,
    error,
    uploadPhoto,
    deletePhoto,
    fetchPhotos,
  };
}
