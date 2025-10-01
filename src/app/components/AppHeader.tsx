"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AddUserForm } from "./AddUserForm";
import { Button } from "./Button";

interface AppHeaderProps {
  showSignIn?: boolean;
  showSignOut?: boolean;
  showAddFamily?: boolean;
  fixed?: boolean;
}

export function AppHeader({
  showSignIn = false,
  showSignOut = false,
  showAddFamily = false,
  fixed = false,
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
        <nav className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='flex items-center gap-3 hover:opacity-80 transition-opacity'
            >
              <div className='w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center'>
                <span className='text-gray-700 font-light text-lg'>F</span>
              </div>
              <span className='text-xl font-light text-gray-900'>Famima</span>
            </Link>

            {showAddFamily && isAdmin && (
              <Button
                onClick={() => setShowAddForm(true)}
                variant='primary'
                size='sm'
                className='ml-4'
              >
                Add Family Member
              </Button>
            )}
          </div>

          <div className='flex items-center gap-4'>
            {showSignIn && (
              <Link
                href='/login'
                className='px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Sign In
              </Link>
            )}

            {showSignOut && isAdmin && (
              <button
                onClick={handleLogout}
                className='px-6 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors'
              >
                Sign Out
              </button>
            )}
          </div>
        </nav>
      </header>

      {showAddForm && <AddUserForm onClose={() => setShowAddForm(false)} />}
    </>
  );
}
