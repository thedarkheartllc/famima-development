"use client";

import Link from "next/link";
import { Person } from "../../types";

interface GalleryHeaderTitleMobileProps {
  personName?: string;
  person?: Person;
  albumName?: string;
  photoCount: number;
  isAlbumMode: boolean;
}

export function GalleryHeaderTitleMobile({
  personName,
  person,
  albumName,
  photoCount,
  isAlbumMode,
}: GalleryHeaderTitleMobileProps) {
  // Use passed person object or find by name as fallback
  const personData = person;

  return (
    <div className='flex sm:hidden items-center justify-between mb-4'>
      {/* Leading: Back link */}
      <Link
        href='/family'
        className='inline-flex items-center gap-2 text-gray-600  hover:text-gray-900 font-light transition-colors'
      >
        <span>←</span>
        <span>Back</span>
      </Link>

      {/* Primary: Title */}
      <h1 className='text-lg font-light text-gray-900  capitalize flex items-center gap-2'>
        {isAlbumMode ? (
          `${albumName} Album`
        ) : personName ? (
          <>
            <span className='truncate'>{personName}&apos;s Gallery</span>
            {personData && (
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 border border-black bg-gradient-to-br ${personData.color}`}
              />
            )}
          </>
        ) : (
          "Photo Gallery"
        )}
      </h1>

      {/* Trailing: Photo count */}
      <p className='text-sm text-gray-600  font-light whitespace-nowrap'>
        {photoCount} photos
      </p>
    </div>
  );
}
