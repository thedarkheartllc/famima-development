"use client";

import { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "./Logo";
import { AddUserForm } from "./AddUserForm";

export function HomePageHeader() {
  const { isAdmin, logout } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className='w-full mb-16 py-2 px-4 sticky top-0 z-50 bg-white shadow-sm'>
      <div className='flex items-center justify-between'>
        {/* Leading Section - Add Family Member */}
        <div className='flex-1 flex justify-start'>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className='flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors'
            >
              <FaPlus />
              Add Family Member
            </button>
          )}
        </div>

        {/* Primary Section - Logo */}
        <div className='flex-1 flex justify-center'>
          <Logo size='md' showTagline={true} />
        </div>

        {/* Trailing Section - Logout */}
        <div className='flex-1 flex justify-end'>
          {isAdmin && (
            <button
              onClick={logout}
              className='flex items-center gap-2 bg-black hover:bg-blue-400 text-white px-3 py-2 rounded text-sm transition-colors'
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Add User Form Modal */}
      {showAddForm && <AddUserForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}
