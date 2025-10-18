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
  getDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Person } from "@/types";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  COLLECTIONS,
  PERSON_FIELDS,
  PHOTO_FIELDS,
} from "@/lib/firestoreConstants";

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPeople = useCallback(async () => {
    if (!user) {
      console.log("❌ fetchPeople: No user found");
      return;
    }

    console.log("🔄 fetchPeople: Starting fetch for user:", user.uid);

    try {
      setLoading(true);
      setError(null);

      const q = query(
        collection(db, COLLECTIONS.PEOPLE),
        where(PERSON_FIELDS.FAMILY_ID, "==", user.uid),
        orderBy(PERSON_FIELDS.CREATED_AT, "asc")
      );

      console.log("📡 fetchPeople: Executing query...");
      const querySnapshot = await getDocs(q);
      console.log(
        "📊 fetchPeople: Query returned",
        querySnapshot.docs.length,
        "documents"
      );

      const peopleData: Person[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        storageId: doc.data().storageId || doc.id, // Fallback to doc.id for existing records
      })) as Person[];

      console.log("👥 fetchPeople: Setting people data:", peopleData);
      setPeople(peopleData);
      console.log(
        "✅ fetchPeople: People state updated, count:",
        peopleData.length
      );
    } catch (err) {
      console.error("❌ fetchPeople: Error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch people");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPeople();
    }
  }, [user, fetchPeople]);

  const addPerson = async (
    personData: Omit<Person, "id" | "personId" | "createdAt" | "familyId">
  ) => {
    try {
      setError(null);

      const createdAt = new Date();
      const docRef = await addDoc(collection(db, COLLECTIONS.PEOPLE), {
        ...personData,
        familyId: user?.uid,
        createdAt,
      });

      // Update the document with its own ID as personId
      await updateDoc(docRef, {
        personId: docRef.id,
      });

      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add person");
      console.error("Error adding person:", err);
      throw err;
    }
  };

  const updatePerson = async (
    personId: string,
    personData: Partial<Person>
  ) => {
    try {
      setError(null);

      const personRef = doc(db, COLLECTIONS.PEOPLE, personId);
      await updateDoc(personRef, personData);

      // Refresh the people list
      await fetchPeople();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update person");
      console.error("Error updating person:", err);
      throw err;
    }
  };

  const deletePerson = async (personId: string) => {
    try {
      setError(null);
      console.log("🗑️ Starting deletePerson for:", personId);
      console.log("👤 Current user:", user?.uid);

      // First, let's check if the person exists and get their data
      const personRef = doc(db, COLLECTIONS.PEOPLE, personId);
      const personSnapshot = await getDoc(personRef);
      if (!personSnapshot.exists()) {
        throw new Error("Person not found");
      }
      const personData = personSnapshot.data();
      console.log("👤 Person data:", {
        id: personId,
        familyId: personData.familyId,
        name: personData.name,
        userUid: user?.uid,
      });

      // Verify the user owns this person
      if (personData.familyId !== user?.uid) {
        throw new Error("You don't have permission to delete this person");
      }

      // 1. Find all photos for this person
      console.log("📸 Step 1: Finding photos for person...");
      const photosQuery = query(
        collection(db, COLLECTIONS.PHOTOS),
        where(PHOTO_FIELDS.PERSON_ID, "==", personId),
        where(PHOTO_FIELDS.FAMILY_ID, "==", user?.uid)
      );
      const photosSnapshot = await getDocs(photosQuery);
      console.log("📸 Found", photosSnapshot.docs.length, "photos to delete");

      // 2. Delete all photo files from Storage and Firestore documents
      console.log("🗑️ Step 2: Deleting photos...");
      await Promise.all(
        photosSnapshot.docs.map(async (photoDoc, index) => {
          const photoData = photoDoc.data();
          console.log(`📸 Deleting photo ${index + 1}:`, {
            photoId: photoDoc.id,
            storagePath: photoData.storagePath,
            familyId: photoData.familyId,
          });

          // Delete from Storage
          if (photoData.storagePath) {
            console.log("🗄️ Deleting from Storage:", photoData.storagePath);
            const storageRef = ref(storage, photoData.storagePath);
            await deleteObject(storageRef);
            console.log("✅ Storage deletion successful");
          }

          // Delete from Firestore
          console.log("🔥 Deleting from Firestore:", photoDoc.id);
          await deleteDoc(photoDoc.ref);
          console.log("✅ Firestore deletion successful");
        })
      );

      // 3. Delete the person document
      console.log("👤 Step 3: Deleting person document...");
      await deleteDoc(doc(db, COLLECTIONS.PEOPLE, personId));
      console.log("✅ Person deletion successful");

      // Refresh the people list
      console.log("🔄 Refreshing people list...");
      await fetchPeople();
      console.log("✅ Delete person completed successfully");
    } catch (err) {
      console.error("❌ Error deleting person:", err);
      console.error("❌ Error details:", {
        code: (err as Error & { code?: string })?.code,
        message: (err as Error & { message?: string })?.message,
        stack: (err as Error & { stack?: string })?.stack,
      });
      setError(err instanceof Error ? err.message : "Failed to delete person");
      throw err;
    }
  };

  return {
    people,
    loading,
    error,
    addPerson,
    updatePerson,
    deletePerson,
    refetch: fetchPeople,
  };
}
