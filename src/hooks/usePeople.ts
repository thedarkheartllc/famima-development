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
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Person } from "@/types/person";

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      setError(null);

      const q = query(collection(db, "people"), orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);

      const peopleData: Person[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Person[];

      setPeople(peopleData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch people");
      console.error("Error fetching people:", err);
    } finally {
      setLoading(false);
    }
  };

  const addPerson = async (personData: Omit<Person, "id" | "createdAt">) => {
    try {
      setError(null);

      const docRef = await addDoc(collection(db, "people"), {
        ...personData,
        createdAt: new Date(),
      });

      // Refresh the people list
      await fetchPeople();

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

      const personRef = doc(db, "people", personId);
      await updateDoc(personRef, personData);

      // Refresh the people list
      await fetchPeople();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update person");
      console.error("Error updating person:", err);
      throw err;
    }
  };

  return {
    people,
    loading,
    error,
    addPerson,
    updatePerson,
    refetch: fetchPeople,
  };
}
