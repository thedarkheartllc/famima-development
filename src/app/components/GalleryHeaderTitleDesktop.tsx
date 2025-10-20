"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { Person } from "../../types";

interface GalleryHeaderTitleDesktopProps {
  personName?: string;
  person?: Person;
  albumName?: string;
  photoCount: number;
  isAlbumMode: boolean;
}

export function GalleryHeaderTitleDesktop({
  personName,
  person,
  albumName,
  photoCount,
  isAlbumMode,
}: GalleryHeaderTitleDesktopProps) {
  // Use passed person object or find by name as fallback
  const personData = person;

  return (
    <div className='hidden sm:flex gap-4'>
      {/* Back button column */}
      <div className='flex items-start pt-1'>
        <Link
          href='/family'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors'
        >
          <HiArrowLeft className='w-4 h-4' />
          <span>Back</span>
        </Link>
      </div>

      {/* Title and details column */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-xl md:text-2xl font-light text-gray-900 capitalize flex items-center gap-3'>
          {isAlbumMode ? (
            `${albumName} Album`
          ) : personName ? (
            <>
              <span className='truncate'>{personName}&apos;s Gallery</span>
              {personData && (
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 border border-black bg-gradient-to-br ${personData.color}`}
                />
              )}
            </>
          ) : (
            "Photo Gallery"
          )}
        </h1>

        <div className='flex items-center gap-4'>
          {!isAlbumMode && personData?.birthDate && (
            <p className='text-sm text-gray-500 font-light'>
              {new Date(personData.birthDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
          <p className='text-sm text-gray-600 font-light'>
            {photoCount} photos
          </p>
        </div>
      </div>
    </div>
  );
}
