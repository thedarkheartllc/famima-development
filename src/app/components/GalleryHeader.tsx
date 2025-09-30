"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaUpload,
} from "react-icons/fa";
import Link from "next/link";
import { Logo } from "./Logo";
import { UploadModal } from "./UploadModal";
import { usePeople } from "../../hooks/usePeople";

interface GalleryHeaderProps {
  photoCount: number;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
  personName?: string;
  onUploadComplete?: () => void;
}

export function GalleryHeader({
  photoCount,
  onToggleAllMonths,
  allExpanded,
  personName,
  onUploadComplete,
}: GalleryHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { people } = usePeople();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Find the person by name to get their ID
  const person = people.find(
    (p) => p.name.toLowerCase() === personName?.toLowerCase()
  );

  return (
    <>
      <header className='sticky top-0 z-50 bg-black dark:bg-white flex justify-between items-center mb-4 p-4 -mx-4'>
        <div>
          <h1 className='text-2xl text-white dark:text-black capitalize'>
            {personName ? `${personName}'s Gallery` : "Photo Gallery"}
          </h1>
          <p className='text-white dark:text-black'>{photoCount} photos</p>
        </div>

        <div className='flex-1 flex justify-center'>
          <Logo size='md' showTagline={false} linkToHome={true} />
        </div>

        <div className='flex gap-3'>
          <Link
            href='/'
            className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
            aria-label='Go to home'
          >
            <FaHome className='text-white dark:text-black text-xl' />
          </Link>

          <button
            onClick={() => setShowUploadModal(true)}
            disabled={!person}
            className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            aria-label='Upload photos'
            title={
              !person
                ? `No person found for "${personName}" - upload disabled`
                : "Upload photos"
            }
          >
            <FaUpload className='text-white dark:text-black text-xl' />
          </button>

          <button
            onClick={onToggleAllMonths}
            className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
            aria-label={
              allExpanded ? "Collapse all months" : "Expand all months"
            }
          >
            {allExpanded ? (
              <FaChevronUp className='text-white dark:text-black text-xl' />
            ) : (
              <FaChevronDown className='text-white dark:text-black text-xl' />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
            aria-label='Toggle theme'
          >
            {theme === "dark" ? (
              <FaSun className='text-yellow-400 text-xl' />
            ) : (
              <FaMoon className='text-blue-600 text-xl' />
            )}
          </button>
        </div>
      </header>

      {/* Upload Modal */}
      {person && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          personId={person.id}
          personName={person.name}
          onUploadComplete={onUploadComplete}
        />
      )}
    </>
  );
}
