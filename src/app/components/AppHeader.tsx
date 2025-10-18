"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { AccountDropdown } from "./AccountDropdown";
import { Logo } from "./Logo";
import { Person, Family, Album } from "@/types";

interface AppHeaderProps {
  showSignIn?: boolean;
  showSignOut?: boolean;
  fixed?: boolean;
  addPerson?: (
    personData: Omit<Person, "id" | "personId" | "createdAt" | "familyId">
  ) => Promise<string>;
  addAlbum?: (
    albumData: Omit<Album, "id" | "albumId" | "createdAt" | "familyId">
  ) => Promise<string>;
  refetch?: () => Promise<void>;
  refetchAlbums?: () => Promise<void>;
  family?: Family | null;
  updateFamily?: (newFamilyName: string) => Promise<void>;
  updateFamilyImage?: (imageUrl: string) => Promise<void>;
}

export function AppHeader({
  showSignIn = false,
  showSignOut = false,
  fixed = false,
  addPerson,
  addAlbum,
  refetch,
  refetchAlbums,
  family,
  updateFamily,
  updateFamilyImage,
}: AppHeaderProps) {
  const { isAdmin, user } = useAuth();

  const headerClasses = fixed
    ? "fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
    : "border-b border-gray-100";

  return (
    <>
      <header className={headerClasses}>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Logo />
          </div>

          <div className='flex items-center gap-2 sm:gap-4'>
            {!user && (
              <Link
                href='/pricing'
                className='px-4 sm:px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Pricing
              </Link>
            )}

            {showSignIn && !user && (
              <Link
                href='/login'
                className='px-4 sm:px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Sign In
              </Link>
            )}

            {showSignIn && user && (
              <Link
                href='/family'
                className='px-4 sm:px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                My Family Tree
              </Link>
            )}

            {isAdmin && user && (
              <AccountDropdown
                showSignOut={showSignOut}
                addPerson={addPerson}
                addAlbum={addAlbum}
                refetch={refetch}
                refetchAlbums={refetchAlbums}
                family={family}
                updateFamily={updateFamily}
                updateFamilyImage={updateFamilyImage}
              />
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
