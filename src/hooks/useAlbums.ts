"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Album } from "@/types";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  COLLECTIONS,
  ALBUM_FIELDS,
  PHOTO_FIELDS,
} from "@/lib/firestoreConstants";

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAlbums = useCallback(async () => {
    if (!user) {
      console.log("❌ fetchAlbums: No user found");
      return;
    }

    console.log("🔄 fetchAlbums: Starting fetch for user:", user.uid);

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.ALBUMS),
        where(ALBUM_FIELDS.FAMILY_ID, "==", user.uid),
        orderBy(ALBUM_FIELDS.CREATED_AT, "desc")
      );

      console.log("📡 fetchAlbums: Executing query...");
      const querySnapshot = await getDocs(q);
      console.log(
        "📊 fetchAlbums: Query returned",
        querySnapshot.docs.length,
        "documents"
      );

      const albumsData: Album[] = querySnapshot.docs.map((doc) => ({
        albumId: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Album[];

      console.log("📚 fetchAlbums: Setting albums data:", albumsData);
      setAlbums(albumsData);
      console.log(
        "✅ fetchAlbums: Albums state updated, count:",
        albumsData.length
      );
    } catch (err) {
      console.error("❌ fetchAlbums: Error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAlbums();
    }
  }, [user, fetchAlbums]);

  const addAlbum = async (
    albumData: Omit<Album, "albumId" | "createdAt" | "familyId">
  ) => {
    try {
      setError(null);

      const createdAt = new Date();

      // Generate albumId from name and date
      const generateAlbumId = (name: string, createdAt: Date): string => {
        const cleanName = name
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        const dateStr = createdAt.toISOString().split("T")[0];
        return `${cleanName}-${dateStr}`;
      };

      const albumId = generateAlbumId(albumData.name, createdAt);

      const docRef = await addDoc(collection(db, COLLECTIONS.ALBUMS), {
        ...albumData,
        albumId,
        familyId: user?.uid,
        createdAt,
      });

      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add album");
      console.error("Error adding album:", err);
      throw err;
    }
  };

  const updateAlbum = async (albumId: string, albumData: Partial<Album>) => {
    try {
      setError(null);

      const albumRef = doc(db, COLLECTIONS.ALBUMS, albumId);
      await updateDoc(albumRef, albumData);

      // Refresh the albums list
      await fetchAlbums();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update album");
      console.error("Error updating album:", err);
      throw err;
    }
  };

  const deleteAlbum = async (albumId: string) => {
    try {
      setError(null);
      console.log("🗑️ Starting deleteAlbum for:", albumId);
      console.log("👤 Current user:", user?.uid);

      // First, let's find the album by its albumId field (not document ID)
      const albumsQuery = query(
        collection(db, COLLECTIONS.ALBUMS),
        where(ALBUM_FIELDS.ALBUM_ID, "==", albumId),
        where(ALBUM_FIELDS.FAMILY_ID, "==", user.uid)
      );

      const albumsSnapshot = await getDocs(albumsQuery);
      if (albumsSnapshot.empty) {
        throw new Error("Album not found");
      }

      const albumDoc = albumsSnapshot.docs[0];
      const albumData = albumDoc.data();
      console.log("📚 Album data:", {
        id: albumId,
        familyId: albumData.familyId,
        name: albumData.name,
        userUid: user?.uid,
        albumId: albumData.albumId,
        fullData: albumData,
      });

      // Verify the user owns this album
      if (albumData.familyId !== user?.uid) {
        throw new Error("You don't have permission to delete this album");
      }

      // Find and delete all photos associated with this album
      console.log("📸 Finding photos for album:", albumId);
      const photosQuery = query(
        collection(db, COLLECTIONS.PHOTOS),
        where(PHOTO_FIELDS.ALBUM_ID, "==", albumId),
        where(PHOTO_FIELDS.FAMILY_ID, "==", user.uid)
      );

      const photosSnapshot = await getDocs(photosQuery);
      console.log("📸 Found", photosSnapshot.docs.length, "photos to delete");

      // Delete each photo from both Firestore and Storage
      for (const photoDoc of photosSnapshot.docs) {
        const photoData = photoDoc.data();
        console.log("🗑️ Deleting photo:", photoData.filename);

        // Delete from Firestore
        await deleteDoc(photoDoc.ref);

        // Delete from Storage if storagePath exists
        if (photoData.storagePath) {
          try {
            const storageRef = ref(storage, photoData.storagePath);
            await deleteObject(storageRef);
            console.log("✅ Deleted from storage:", photoData.storagePath);
          } catch (storageError) {
            console.warn(
              "⚠️ Failed to delete from storage:",
              photoData.storagePath,
              storageError
            );
            // Continue with other photos even if one fails
          }
        }
      }

      // Delete the album document
      console.log("📚 Deleting album document...");
      console.log("📚 Album document path:", albumDoc.ref.path);
      console.log("📚 User UID:", user?.uid);
      console.log("📚 Album familyId:", albumData.familyId);

      try {
        await deleteDoc(albumDoc.ref);
        console.log("✅ Album deletion successful");
      } catch (deleteError) {
        console.error("❌ Album deletion failed:", deleteError);
        throw deleteError;
      }

      // Refresh the albums list
      console.log("🔄 Refreshing albums list...");
      await fetchAlbums();
      console.log("✅ Delete album completed successfully");
    } catch (err) {
      console.error("❌ Error deleting album:", err);
      console.error("❌ Error details:", {
        code: (err as Error & { code?: string })?.code,
        message: (err as Error & { message?: string })?.message,
        stack: (err as Error & { stack?: string })?.stack,
      });
      setError(err instanceof Error ? err.message : "Failed to delete album");
      throw err;
    }
  };

  return {
    albums,
    loading,
    error,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    refetch: fetchAlbums,
  };
}
