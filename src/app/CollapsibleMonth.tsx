"use client";

import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Image from "next/image";
import { ImageViewer } from "./components/ImageViewer";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
  storagePath?: string;
}

interface CollapsibleMonthProps {
  monthName: string;
  photos: PhotoWithDate[];
  isExpanded?: boolean;
  onToggle?: () => void;
  onDeletePhoto?: (photoId: string, storagePath: string) => Promise<void>;
}

export function CollapsibleMonth({
  monthName,
  photos,
  isExpanded: externalExpanded,
  onToggle,
  onDeletePhoto,
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
        className='w-full text-gray-900 text-3xl md:text-4xl font-light text-center border-b border-gray-100 pb-4 hover:border-gray-200 transition-colors'
      >
        <div className='flex items-center justify-center gap-3'>
          <span>{monthName}</span>
          {isExpanded ? (
            <MdExpandLess className='text-2xl text-gray-600' />
          ) : (
            <MdExpandMore className='text-2xl text-gray-600' />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {photos.map((photo, index) => (
            <div key={photo.filename} className='flex flex-col space-y-2'>
              <div
                className='relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group'
                onClick={() => openImageViewer(index)}
              >
                <Image
                  src={photo.url || `/photos/${photo.filename}`}
                  alt={photo.filename}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <p className='text-gray-600 text-sm font-light text-right'>
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
        onDeletePhoto={onDeletePhoto}
      />
    </div>
  );
}
