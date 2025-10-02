"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AddFamilyMemberForm } from "./AddFamilyMemberForm";
import { Button } from "./Button";

interface AppHeaderProps {
  showSignIn?: boolean;
  showSignOut?: boolean;
  showAddFamily?: boolean;
  fixed?: boolean;
  addPerson?: (personData: any) => Promise<string>;
  refetch?: () => Promise<void>;
}

export function AppHeader({
  showSignIn = false,
  showSignOut = false,
  showAddFamily = false,
  fixed = false,
  addPerson,
  refetch,
}: AppHeaderProps) {
  const { logout, isAdmin } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const headerClasses = fixed
    ? "fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
    : "border-b border-gray-100";

  return (
    <>
      <header className={headerClasses}>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Link
              href='/'
              className='flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity'
            >
              <div className='w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center'>
                <span className='text-gray-700 font-light text-base sm:text-lg'>
                  F
                </span>
              </div>
              <span className='text-lg sm:text-xl font-light text-gray-900'>
                Famima
              </span>
            </Link>

            {showAddFamily && isAdmin && (
              <Button
                onClick={() => setShowAddForm(true)}
                variant='primary'
                size='sm'
                className='ml-2 sm:ml-4'
              >
                <span className='hidden sm:inline'>Add Family Member</span>
                <span className='sm:hidden'>Add</span>
              </Button>
            )}
          </div>

          <div className='flex items-center gap-2 sm:gap-4'>
            {showSignIn && (
              <Link
                href='/login'
                className='px-4 sm:px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Sign In
              </Link>
            )}

            {showSignOut && isAdmin && (
              <button
                onClick={handleLogout}
                className='px-4 sm:px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Sign Out
              </button>
            )}
          </div>
        </nav>
      </header>

      {showAddForm && (
        <AddFamilyMemberForm
          onClose={() => setShowAddForm(false)}
          addPerson={addPerson}
          refetch={refetch}
        />
      )}
    </>
  );
}
