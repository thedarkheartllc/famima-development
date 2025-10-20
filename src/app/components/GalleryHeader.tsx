"use client";

import { useTheme } from "../contexts/ThemeContext";
import { usePeople } from "../../hooks/usePeople";
import { GalleryActionButtons } from "./GalleryActionButtons";
import { GalleryHeaderTitle } from "./GalleryHeaderTitle";
import { Person } from "../../types";

interface GalleryHeaderProps {
  photoCount: number;
  onToggleAllMonths: () => void;
  allExpanded: boolean;
  personName?: string;
  person?: Person;
  albumName?: string;
  albumId?: string;
  onUploadComplete?: () => void;
  onShowUploadModal?: () => void;
  onShowEditModal?: () => void;
}

export function GalleryHeader({
  photoCount,
  onToggleAllMonths,
  allExpanded,
  personName,
  person,
  albumName,
  albumId,
  onUploadComplete,
  onShowUploadModal,
  onShowEditModal,
}: GalleryHeaderProps) {
  const {} = useTheme();
  const { people } = usePeople();

  // Use passed person object or find by name as fallback
  const personData =
    person ||
    people.find((p) => p.name.toLowerCase() === personName?.toLowerCase());

  // Determine if we're in album mode or person mode
  const isAlbumMode = !!albumName && !!albumId;
  const isPersonMode = !!personName && !!personData;

  return (
    <>
      <header className='sticky top-0 z-50 bg-white/90 /90 backdrop-blur-md border-b border-gray-100  mb-4 py-4'>
        <div className='max-w-full mx-auto px-4 sm:pr-4 lg:pr-12 sm:pl-6'>
          {/* Responsive layout: Desktop (same row) / Mobile (2 rows) */}
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
            <GalleryHeaderTitle
              personName={personName}
              person={personData}
              albumName={albumName}
              photoCount={photoCount}
              isAlbumMode={isAlbumMode}
            />
            <GalleryActionButtons
              isPersonMode={isPersonMode}
              isAlbumMode={isAlbumMode}
              personData={personData}
              albumId={albumId}
              albumName={albumName}
              onUploadComplete={onUploadComplete}
              onToggleAllMonths={onToggleAllMonths}
              allExpanded={allExpanded}
              onShowUploadModal={onShowUploadModal}
              onShowEditModal={onShowEditModal}
            />
          </div>
        </div>
      </header>
    </>
  );
}
