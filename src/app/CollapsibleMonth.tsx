"use client";

import { useState } from "react";
import Image from "next/image";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
}

interface CollapsibleMonthProps {
  monthName: string;
  photos: PhotoWithDate[];
}

export function CollapsibleMonth({ monthName, photos }: CollapsibleMonthProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='space-y-6'>
      <button
        onClick={toggleExpanded}
        className='w-full text-white dark:text-black text-4xl font-semibold text-center border-b border-gray-600 dark:border-gray-300 pb-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors'
      >
        <div className='flex items-center justify-center gap-3'>
          <span>{monthName}</span>
          {isExpanded ? (
            <MdExpandLess className='text-3xl' />
          ) : (
            <MdExpandMore className='text-3xl' />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8'>
          {photos.map((photo) => (
            <div key={photo.filename} className='flex flex-col'>
              <div className='relative w-full h-80 mb-2 border border-white dark:border-black rounded'>
                <Image
                  src={`/photos/${photo.filename}`}
                  alt={photo.filename}
                  fill
                  className='object-cover rounded'
                />
              </div>
              <p className='text-white dark:text-black text-sm text-right'>
                {photo.date || "?"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
