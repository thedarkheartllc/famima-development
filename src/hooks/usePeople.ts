"use client";

import { useState, useEffect } from "react";
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
import { Person } from "@/types";
import { useAuth } from "@/app/contexts/AuthContext";
import { COLLECTIONS, PERSON_FIELDS } from "@/lib/firestoreConstants";

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPeople();
    }
  }, [user]);

  const fetchPeople = async () => {
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
  };

  const addPerson = async (
    personData: Omit<Person, "id" | "personId" | "createdAt">
  ) => {
    try {
      setError(null);

      const docRef = await addDoc(collection(db, COLLECTIONS.PEOPLE), {
        ...personData,
        familyId: user?.uid,
        createdAt: new Date(),
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

      // 1. Find all photos for this person
      const photosQuery = query(
        collection(db, COLLECTIONS.PHOTOS),
        where(PERSON_FIELDS.PERSON_ID, "==", personId)
      );
      const photosSnapshot = await getDocs(photosQuery);

      // 2. Delete all photo files from Storage and Firestore documents
      await Promise.all(
        photosSnapshot.docs.map(async (photoDoc) => {
          const photoData = photoDoc.data();

          // Delete from Storage
          if (photoData.storagePath) {
            const storageRef = ref(storage, photoData.storagePath);
            await deleteObject(storageRef);
          }

          // Delete from Firestore
          await deleteDoc(photoDoc.ref);
        })
      );

      // 3. Delete the person document
      await deleteDoc(doc(db, COLLECTIONS.PEOPLE, personId));

      // Refresh the people list
      await fetchPeople();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete person");
      console.error("Error deleting person:", err);
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
