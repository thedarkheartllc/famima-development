"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../app/contexts/AuthContext";
import { ShareLink } from "../types";
import { COLLECTIONS } from "../lib/firestoreConstants";

export function useShareLinks() {
  const { user } = useAuth();
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a unique share ID
  const generateShareId = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Fetch all share links for the current family
  const fetchShareLinks = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const shareLinksQuery = query(
        collection(db, COLLECTIONS.SHARE_LINKS),
        where("familyId", "==", user.uid)
      );

      const querySnapshot = await getDocs(shareLinksQuery);
      const links: ShareLink[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        links.push({
          id: doc.id,
          shareId: data.shareId,
          familyId: data.familyId,
          personId: data.personId,
          personName: data.personName,
          createdBy: data.createdBy,
          createdAt: data.createdAt?.toDate() || new Date(),
          isActive: data.isActive,
          viewCount: data.viewCount || 0,
          lastViewedAt: data.lastViewedAt?.toDate(),
        });
      });

      setShareLinks(links);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch share links"
      );
    } finally {
      setLoading(false);
    }
  };

  // Create a new share link
  const createShareLink = async (
    personId: string,
    personName: string
  ): Promise<ShareLink | null> => {
    console.log("createShareLink called with:", {
      personId,
      personName,
      user: !!user,
    });

    if (!user) {
      console.log("No user found, returning null");
      return null;
    }

    try {
      const shareId = generateShareId();
      console.log("Generated shareId:", shareId);

      const shareLinkData = {
        shareId,
        familyId: user.uid,
        personId,
        personName,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        isActive: true,
        viewCount: 0,
      };

      console.log("Share link data:", shareLinkData);

      const docRef = await addDoc(
        collection(db, COLLECTIONS.SHARE_LINKS),
        shareLinkData
      );

      console.log("Document created with ID:", docRef.id);

      const newShareLink: ShareLink = {
        id: docRef.id,
        shareId,
        familyId: user.uid,
        personId,
        personName,
        createdBy: user.uid,
        createdAt: new Date(),
        isActive: true,
        viewCount: 0,
      };

      console.log("New share link object:", newShareLink);

      setShareLinks((prev) => [newShareLink, ...prev]);
      return newShareLink;
    } catch (err) {
      console.error("Error in createShareLink:", err);
      console.error("Error details:", {
        message: err instanceof Error ? err.message : "Unknown error",
        code: (err as any)?.code,
        stack: err instanceof Error ? err.stack : undefined,
      });
      setError(
        err instanceof Error ? err.message : "Failed to create share link"
      );
      return null;
    }
  };

  // Get share link by shareId (for public access)
  const getShareLink = async (shareId: string): Promise<ShareLink | null> => {
    try {
      const shareLinksQuery = query(
        collection(db, COLLECTIONS.SHARE_LINKS),
        where("shareId", "==", shareId)
      );

      const querySnapshot = await getDocs(shareLinksQuery);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        shareId: data.shareId,
        familyId: data.familyId,
        personId: data.personId,
        personName: data.personName,
        createdBy: data.createdBy,
        createdAt: data.createdAt?.toDate() || new Date(),
        isActive: data.isActive,
        viewCount: data.viewCount || 0,
        lastViewedAt: data.lastViewedAt?.toDate(),
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch share link"
      );
      return null;
    }
  };

  // Track a view (increment view count)
  const trackView = async (shareId: string) => {
    try {
      const shareLinksQuery = query(
        collection(db, COLLECTIONS.SHARE_LINKS),
        where("shareId", "==", shareId)
      );

      const querySnapshot = await getDocs(shareLinksQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          viewCount: increment(1),
          lastViewedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Failed to track view:", err);
    }
  };

  // Toggle share link active status
  const toggleShareLink = async (shareLinkId: string, isActive: boolean) => {
    try {
      const docRef = doc(db, COLLECTIONS.SHARE_LINKS, shareLinkId);
      await updateDoc(docRef, { isActive });

      setShareLinks((prev) =>
        prev.map((link) =>
          link.id === shareLinkId ? { ...link, isActive } : link
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update share link"
      );
    }
  };

  // Delete a share link
  const deleteShareLink = async (shareLinkId: string) => {
    try {
      const docRef = doc(db, COLLECTIONS.SHARE_LINKS, shareLinkId);
      await deleteDoc(docRef);

      setShareLinks((prev) => prev.filter((link) => link.id !== shareLinkId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete share link"
      );
    }
  };

  // Fetch share links on mount
  useEffect(() => {
    if (user) {
      fetchShareLinks();
    }
  }, [user]);

  return {
    shareLinks,
    loading,
    error,
    createShareLink,
    getShareLink,
    trackView,
    toggleShareLink,
    deleteShareLink,
    fetchShareLinks,
  };
}
