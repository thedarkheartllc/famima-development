"use client";

import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Image from "next/image";
import { ImageViewer } from "./components/ImageViewer";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
}

interface CollapsibleMonthProps {
  monthName: string;
  photos: PhotoWithDate[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function CollapsibleMonth({
  monthName,
  photos,
  isExpanded: externalExpanded,
  onToggle,
}: CollapsibleMonthProps) {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use external control if provided, otherwise use internal state
  const isExpanded =
    externalExpanded !== undefined ? externalExpanded : internalExpanded;

  const toggleExpanded = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
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
          {photos.map((photo, index) => (
            <div key={photo.filename} className='flex flex-col'>
              <div
                className='relative w-full aspect-square mb-2 border border-white dark:border-black rounded overflow-hidden cursor-pointer'
                onClick={() => openImageViewer(index)}
              >
                <Image
                  src={photo.url || `/photos/${photo.filename}`}
                  alt={photo.filename}
                  fill
                  className='object-cover rounded transition-transform duration-300 hover:scale-105'
                />
              </div>
              <p className='text-white dark:text-black text-sm text-right'>
                {photo.date || "?"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      <ImageViewer
        isOpen={viewerOpen}
        onClose={closeImageViewer}
        photos={photos}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  );
}
