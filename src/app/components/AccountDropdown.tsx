"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EditFamilyForm } from "./EditFamilyForm";
import { AddFamilyMemberForm } from "./AddFamilyMemberForm";
import { AddAlbumForm } from "./AddAlbumForm";
import { FamilyPhotoUploadModal } from "./FamilyPhotoUploadModal";
import { Person, Family, Album } from "@/types";
import {
  HiUser,
  HiChevronDown,
  HiArrowRightOnRectangle,
  HiPencil,
  HiPlus,
  HiPhoto,
  HiFolderPlus,
} from "react-icons/hi2";

interface AccountDropdownProps {
  showSignOut?: boolean;
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

export function AccountDropdown({
  showSignOut = false,
  addPerson,
  addAlbum,
  refetch,
  refetchAlbums,
  family,
  updateFamily,
  updateFamilyImage,
}: AccountDropdownProps) {
  const { logout, user } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditFamily, setShowEditFamily] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
  const [showFamilyPhotoUpload, setShowFamilyPhotoUpload] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileDropdown(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get sign-in method from user provider data
  const getSignInMethod = () => {
    if (!user) return "Unknown";

    const providerData = user.providerData;
    if (providerData.length > 0) {
      const provider = providerData[0].providerId;
      switch (provider) {
        case "google.com":
          return "Google";
        case "password":
          return "Email & Password";
        default:
          return provider;
      }
    }
    return "Email & Password";
  };

  if (!user) return null;

  return (
    <>
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className='flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 font-light transition-colors rounded-lg hover:bg-gray-50'
        >
          <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
            <HiUser className='w-4 h-4 text-gray-600' />
          </div>
          <HiChevronDown
            className={`w-4 h-4 transition-transform ${
              showProfileDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showProfileDropdown && (
          <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
            {/* User Info Section */}
            <div className='px-4 py-3 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                  <HiUser className='w-5 h-5 text-gray-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    {user.displayName || "User"}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>{user.email}</p>
                  <p className='text-xs text-gray-400'>
                    Signed in with {getSignInMethod()}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Options */}
            <div className='py-1'>
              {addPerson && refetch && (
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowAddForm(true);
                  }}
                  className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <HiPlus className='w-4 h-4' />
                  Add Family Member
                </button>
              )}

              {addAlbum && refetchAlbums && (
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowAddAlbumForm(true);
                  }}
                  className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <HiFolderPlus className='w-4 h-4' />
                  Add Album
                </button>
              )}

              {family && updateFamilyImage && (
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowFamilyPhotoUpload(true);
                  }}
                  className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <HiPhoto className='w-4 h-4' />
                  {family.familyImage
                    ? "Change Family Photo"
                    : "Add Family Photo"}
                </button>
              )}

              {family && (
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setShowEditFamily(true);
                  }}
                  className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <HiPencil className='w-4 h-4' />
                  Edit Family Name
                </button>
              )}
              {/* 
              <button
                onClick={() => {
                  setShowProfileDropdown(false);
                  // Add account settings functionality here
                }}
                className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
              >
                <HiCog className='w-4 h-4' />
                Account Settings
              </button> */}

              {showSignOut && (
                <button
                  onClick={handleLogout}
                  className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <HiArrowRightOnRectangle className='w-4 h-4' />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showAddForm && addPerson && refetch && (
        <AddFamilyMemberForm
          onClose={() => setShowAddForm(false)}
          addPerson={addPerson}
          refetch={refetch}
        />
      )}

      {showAddAlbumForm && addAlbum && refetchAlbums && (
        <AddAlbumForm
          onClose={() => setShowAddAlbumForm(false)}
          addAlbum={addAlbum}
          refetch={refetchAlbums}
        />
      )}

      {showFamilyPhotoUpload && updateFamilyImage && (
        <FamilyPhotoUploadModal
          isOpen={showFamilyPhotoUpload}
          onClose={() => setShowFamilyPhotoUpload(false)}
          onUploadComplete={updateFamilyImage}
        />
      )}

      {showEditFamily && family && updateFamily && (
        <EditFamilyForm
          isOpen={showEditFamily}
          onClose={() => setShowEditFamily(false)}
          currentFamilyName={family.familyName}
          onUpdate={updateFamily}
        />
      )}
    </>
  );
}
