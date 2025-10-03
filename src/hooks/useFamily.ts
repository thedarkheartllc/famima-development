import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, FAMILY_FIELDS } from "@/lib/firestoreConstants";
import { Family } from "@/types";
import { useAuth } from "@/app/contexts/AuthContext";

export function useFamily() {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setFamily(null);
      setLoading(false);
      return;
    }

    const fetchFamily = async () => {
      try {
        setLoading(true);
        setError(null);

        const familyDoc = await getDoc(doc(db, COLLECTIONS.FAMILIES, user.uid));

        if (familyDoc.exists()) {
          const data = familyDoc.data();
          setFamily({
            id: data[FAMILY_FIELDS.ID],
            email: data[FAMILY_FIELDS.EMAIL],
            familyName: data[FAMILY_FIELDS.FAMILY_NAME],
            createdAt: data[FAMILY_FIELDS.CREATED_AT]?.toDate() || new Date(),
          });
        } else {
          setError("Family not found");
        }
      } catch (err) {
        console.error("Error fetching family:", err);
        setError("Failed to load family data");
      } finally {
        setLoading(false);
      }
    };

    fetchFamily();
  }, [user]);

  const updateFamily = async (newFamilyName: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      await updateDoc(doc(db, COLLECTIONS.FAMILIES, user.uid), {
        [FAMILY_FIELDS.FAMILY_NAME]: newFamilyName,
      });

      // Update local state
      setFamily((prev) =>
        prev ? { ...prev, familyName: newFamilyName } : null
      );
    } catch (err) {
      console.error("Error updating family:", err);
      throw new Error("Failed to update family name");
    }
  };

  return { family, loading, error, updateFamily };
}
