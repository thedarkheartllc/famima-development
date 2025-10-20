"use client";

import Link from "next/link";
import { HiUsers } from "react-icons/hi2";
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
    <div className='hidden sm:flex flex-col gap-1'>
      {/* Row 1: Back button + Title */}
      <div className='flex items-center gap-4'>
        <Link
          href='/family'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors'
        >
          <HiUsers className='w-4 h-4' />
          <span>Back</span>
        </Link>
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
      </div>

      {/* Row 2: Photo count and birthday */}
      <div className='flex items-center gap-4'>
        <p className='text-sm text-gray-600 font-light'>{photoCount} photos</p>
        {!isAlbumMode && personData?.birthDate && (
          <p className='text-sm text-gray-500 font-light'>
            {new Date(personData.birthDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
