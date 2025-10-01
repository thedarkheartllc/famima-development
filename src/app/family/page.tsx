"use client";

import { FamilyTree } from "../components/FamilyTree";
import { AppHeader } from "../components/AppHeader";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FamilyPage() {
  const { isAdmin } = useAuth();
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
    <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
      <AppHeader showSignOut showAddFamily />

      {/* Family Tree Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='text-center mb-12 space-y-3'>
          <h1 className='text-4xl md:text-5xl font-light text-gray-900 '>
            Your Family
          </h1>
          <p className='text-gray-600  font-light'>
            Select a family member to view their gallery
          </p>
        </div>

        <FamilyTree />
      </div>
    </main>
  );
}
