"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoWithDate[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function ImageViewer({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
}: ImageViewerProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const currentPhoto = photos[currentIndex];

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  const goToNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onIndexChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    },
    [isOpen, onClose, goToPrevious, goToNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    setImageLoading(true);
  }, [currentIndex]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center'>
      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white transition-colors'
        aria-label='Close image viewer'
      >
        <FaTimes className='text-xl' />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white transition-colors'
          aria-label='Previous image'
        >
          <FaChevronLeft className='text-xl' />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={goToNext}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white transition-colors'
          aria-label='Next image'
        >
          <FaChevronRight className='text-xl' />
        </button>
      )}

      {/* Image container */}
      <div className='relative w-full h-full flex items-center justify-center p-8'>
        {imageLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-white text-lg'>Loading...</div>
          </div>
        )}

        <Image
          src={currentPhoto.url || `/photos/${currentPhoto.filename}`}
          alt={currentPhoto.filename}
          width={800}
          height={600}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ maxHeight: "calc(100vh - 8rem)" }}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>

      {/* Image info */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg'>
        <div className='text-center'>
          <div className='font-semibold'>{currentPhoto.filename}</div>
          {currentPhoto.date && (
            <div className='text-sm opacity-75'>{currentPhoto.date}</div>
          )}
          <div className='text-sm opacity-75'>
            {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </div>

      {/* Click areas for navigation */}
      <div
        className='absolute left-0 top-0 w-1/2 h-full cursor-w-resize'
        onClick={goToPrevious}
        style={{ cursor: currentIndex > 0 ? "w-resize" : "default" }}
      />
      <div
        className='absolute right-0 top-0 w-1/2 h-full cursor-e-resize'
        onClick={goToNext}
        style={{
          cursor: currentIndex < photos.length - 1 ? "e-resize" : "default",
        }}
      />
    </div>
  );
}
