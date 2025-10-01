"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaUpload,
  FaChevronUp,
  FaChevronDown,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Link from "next/link";
import { UploadModal } from "./UploadModal";
import { usePeople } from "../../hooks/usePeople";
import { Button } from "./Button";

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

  const person = people.find(
    (p) => p.name.toLowerCase() === personName?.toLowerCase()
  );

  return (
    <>
      <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 mb-6'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex justify-between items-center'>
            {/* Left: Title and Count */}
            <div className='flex-1'>
              <Link
                href='/family'
                className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors mb-2'
              >
                <span>←</span>
                <span>Back to Family</span>
              </Link>
              <h1 className='text-2xl md:text-3xl font-light text-gray-900 capitalize'>
                {personName ? `${personName}'s Gallery` : "Photo Gallery"}
              </h1>
              <p className='text-sm text-gray-600 font-light'>
                {photoCount} photos
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className='flex items-center gap-3'>
              <Button
                onClick={() => setShowUploadModal(true)}
                disabled={!person}
                variant='primary'
                size='sm'
                title={
                  !person
                    ? `No person found for "${personName}" - upload disabled`
                    : "Upload photos"
                }
              >
                <FaUpload />
                <span>Upload</span>
              </Button>

              <Button
                onClick={onToggleAllMonths}
                variant='ghost'
                size='sm'
                aria-label={
                  allExpanded ? "Collapse all months" : "Expand all months"
                }
              >
                {allExpanded ? (
                  <>
                    <FaChevronUp />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <FaChevronDown />
                    <span>Expand All</span>
                  </>
                )}
              </Button>

              <button
                onClick={toggleTheme}
                className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-sm font-light text-gray-700'
                aria-label='Toggle theme'
              >
                {theme === "dark" ? (
                  <>
                    <FaSun className='text-yellow-500' />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <FaMoon className='text-gray-600' />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

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
