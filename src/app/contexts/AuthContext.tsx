"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { COLLECTIONS, FAMILY_FIELDS } from "@/lib/firestoreConstants";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    familyName: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<void>;
  isAdmin: boolean;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (
    email: string,
    password: string,
    familyName: string
  ) => {
    console.log("Starting signUp process...", { email, familyName });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created successfully:", user.uid);

      // Send email verification
      await sendEmailVerification(user);
      console.log("Verification email sent");

      // Create family document in Firestore
      const familyId = user.uid; // Use user ID as family ID
      console.log("Creating family document with ID:", familyId);

      const familyData = {
        [FAMILY_FIELDS.EMAIL]: email,
        [FAMILY_FIELDS.ID]: familyId,
        [FAMILY_FIELDS.FAMILY_NAME]: familyName,
        [FAMILY_FIELDS.CREATED_AT]: serverTimestamp(),
      };

      console.log("Family data to save:", familyData);

      await setDoc(doc(db, COLLECTIONS.FAMILIES, familyId), familyData);
      console.log("Family document created successfully!");
    } catch (error) {
      console.error("Error in signUp process:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if this is a new user (first time signing in with Google)
      const familyId = user.uid;
      const familyDocRef = doc(db, COLLECTIONS.FAMILIES, familyId);

      // Try to get the family document
      const familyDoc = await getDoc(familyDocRef);

      if (!familyDoc.exists()) {
        // This is a new user, create family document
        const familyName =
          user.displayName?.split(" ")[0] + "'s Family" || "Family";

        const familyData = {
          [FAMILY_FIELDS.EMAIL]: user.email,
          [FAMILY_FIELDS.ID]: familyId,
          [FAMILY_FIELDS.FAMILY_NAME]: familyName,
          [FAMILY_FIELDS.CREATED_AT]: serverTimestamp(),
        };

        await setDoc(familyDocRef, familyData);
        console.log("Family document created for Google user!");
      }
    } catch (error) {
      console.error("Error in Google sign-in:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resendVerification = async () => {
    if (user) {
      await sendEmailVerification(user);
    }
  };

  const isAdmin = !!user;
  // Google users are automatically email verified, email/password users need verification
  const isEmailVerified =
    user?.emailVerified || user?.providerData?.[0]?.providerId === "google.com";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        resendVerification,
        isAdmin,
        isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
