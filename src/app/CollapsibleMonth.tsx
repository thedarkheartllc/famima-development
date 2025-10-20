"use client";

import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { ReliableImage } from "./components/ReliableImage";
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
  allPhotos: PhotoWithDate[];
  isExpanded?: boolean;
  onToggle?: () => void;
  onDeletePhoto?: (photoId: string, storagePath: string) => Promise<void>;
}

export function CollapsibleMonth({
  monthName,
  photos,
  allPhotos,
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
    // Find the global index of this photo in allPhotos
    const clickedPhoto = photos[index];
    const globalIndex = allPhotos.findIndex(
      (photo) =>
        photo.filename === clickedPhoto.filename && photo.id === clickedPhoto.id
    );
    setCurrentImageIndex(globalIndex >= 0 ? globalIndex : index);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={toggleExpanded}
        className='w-full text-gray-900  text-md sm:text-2xl md:text-3xl font-light text-left border-b border-gray-100  pb-1 hover:border-gray-200  transition-colors'
      >
        <div className='flex items-center justify-start gap-3'>
          <span>{monthName}</span>
          {isExpanded ? (
            <MdExpandLess className='text-md sm:text-xl text-gray-600 ' />
          ) : (
            <MdExpandMore className='text-md sm:text-xl text-gray-600 ' />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3'>
          {photos.map((photo, index) => {
            const imageSrc = photo.url || `/photos/${photo.filename}`;
            console.log(`🖼️ CollapsibleMonth: Rendering photo ${index}:`, {
              filename: photo.filename,
              url: photo.url,
              finalSrc: imageSrc,
              priority: index < 6,
            });

            return (
              <div key={photo.filename} className='flex flex-col space-y-2'>
                <div
                  className='relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group'
                  onClick={() => openImageViewer(index)}
                >
                  <ReliableImage
                    src={imageSrc}
                    alt={photo.filename}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    priority={index < 6} // Prioritize first 6 images for better UX
                  />
                </div>
                <p className='text-gray-600  text-xs sm:text-sm font-light text-right'>
                  {photo.date || "?"}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Viewer Modal */}
      <ImageViewer
        isOpen={viewerOpen}
        onClose={closeImageViewer}
        photos={allPhotos}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        onDeletePhoto={onDeletePhoto}
      />
    </div>
  );
}
