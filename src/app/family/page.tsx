"use client";

import { FamilyTree } from "../components/FamilyTree";
import { Albums } from "../components/Albums";
import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { FamilyImage } from "../components/FamilyImage";
import { useAuth } from "../contexts/AuthContext";
import { usePeople } from "@/hooks/usePeople";
import { useAlbums } from "@/hooks/useAlbums";
import { useFamily } from "@/hooks/useFamily";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FamilyPage() {
  const { isAdmin } = useAuth();
  const { people, loading, addPerson, refetch } = usePeople(); // Get data AND functions from hook
  const {
    albums,
    loading: albumsLoading,
    addAlbum,
    refetch: refetchAlbums,
  } = useAlbums(); // Get album data and functions
  const {
    family,
    loading: familyLoading,
    updateFamily,
    updateFamilyImage,
  } = useFamily();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
      <AppHeader
        showSignOut
        addPerson={addPerson}
        addAlbum={addAlbum}
        refetch={refetch}
        refetchAlbums={refetchAlbums}
        family={family}
        updateFamily={updateFamily}
        updateFamilyImage={updateFamilyImage}
      />

      {/* Family Tree Content */}
      <div className='max-w-7xl mx-auto px-6 py-12 min-h-screen'>
        <div className='text-center mb-12 space-y-6'>
          {/* Family Photo */}
          {family?.familyImage && (
            <FamilyImage
              familyImage={family.familyImage}
              familyName={family.familyName}
            />
          )}

          <div className='space-y-3'>
            <h1 className='text-4xl md:text-5xl font-light text-gray-900 '>
              {familyLoading
                ? "Loading..."
                : family?.familyName || "Family Tree"}
            </h1>
            <p className='text-gray-600  font-light'>
              Select a family member to view their gallery
            </p>
          </div>
        </div>

        {loading ? (
          <div className='flex flex-col items-center space-y-8'>
            <Loading message='Loading family tree...' />
          </div>
        ) : (
          <FamilyTree people={people} />
        )}

        {/* Albums Section */}
        <div className='mt-16'>
          {albumsLoading ? (
            <div className='flex flex-col items-center space-y-8'>
              <Loading message='Loading albums...' />
            </div>
          ) : (
            <Albums albums={albums} />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
