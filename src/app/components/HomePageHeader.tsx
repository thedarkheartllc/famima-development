"use client";

import { useAuth } from "../contexts/AuthContext";
import { Logo } from "./Logo";

export function HomePageHeader() {
  const { isAdmin, logout } = useAuth();

  return (
    <div className='w-full mb-16 p-4'>
      <Logo size='lg' showTagline={true} />

      {/* Admin controls in top right */}
      {isAdmin && (
        <div className='absolute top-4 right-4'>
          <button
            onClick={logout}
            className='bg-black hover:bg-blue-400 text-white px-3 py-1 rounded text-sm transition-colors'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
