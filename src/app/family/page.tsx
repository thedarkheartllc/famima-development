"use client";

import { FamilyTree } from "../components/FamilyTree";
import { AppHeader } from "../components/AppHeader";
import { EditFamilyForm } from "../components/EditFamilyForm";
import { Footer } from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { usePeople } from "@/hooks/usePeople";
import { useFamily } from "@/hooks/useFamily";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FamilyPage() {
  const { isAdmin } = useAuth();
  const { people, loading, addPerson, refetch } = usePeople(); // Get data AND functions from hook
  const { family, loading: familyLoading, updateFamily } = useFamily();
  const router = useRouter();
  const [showEditFamily, setShowEditFamily] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
      <AppHeader
        showSignOut
        showAddFamily
        addPerson={addPerson}
        refetch={refetch}
      />

      {/* Family Tree Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='text-center mb-12 space-y-3'>
          <div className='flex items-center justify-center gap-3'>
            <h1 className='text-4xl md:text-5xl font-light text-gray-900 '>
              {familyLoading
                ? "Loading..."
                : family?.familyName || "Family Tree"}
            </h1>
            {family && (
              <button
                onClick={() => setShowEditFamily(true)}
                className='text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full'
                title='Edit family name'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
              </button>
            )}
          </div>
          <p className='text-gray-600  font-light'>
            Select a family member to view their gallery
          </p>
        </div>

        {loading ? (
          <div className='flex flex-col items-center space-y-8'>
            <div className='text-gray-600 font-light'>
              Loading family tree...
            </div>
          </div>
        ) : (
          <FamilyTree people={people} />
        )}
      </div>

      {/* Edit Family Form */}
      {family && (
        <EditFamilyForm
          isOpen={showEditFamily}
          onClose={() => setShowEditFamily(false)}
          currentFamilyName={family.familyName}
          onUpdate={updateFamily}
        />
      )}
      <Footer />
    </main>
  );
}
