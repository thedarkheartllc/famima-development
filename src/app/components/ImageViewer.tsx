"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
  storagePath?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoWithDate[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onDeletePhoto?: (photoId: string, storagePath: string) => Promise<void>;
}

export function ImageViewer({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
  onDeletePhoto,
}: ImageViewerProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isAdmin } = useAuth();

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

  const handleDeletePhoto = async () => {
    if (!currentPhoto?.id || !currentPhoto?.storagePath || !onDeletePhoto)
      return;

    try {
      setIsDeleting(true);
      await onDeletePhoto(currentPhoto.id, currentPhoto.storagePath);

      // Close the viewer after successful deletion
      onClose();
    } catch (error) {
      console.error("Failed to delete photo:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

      {/* Delete button - only show for admin users */}
      {isAdmin &&
        currentPhoto.id &&
        currentPhoto.storagePath &&
        onDeletePhoto && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className='absolute top-4 right-16 z-10 p-2 bg-red-600 bg-opacity-50 hover:bg-opacity-70 rounded-full text-white transition-colors'
            aria-label='Delete photo'
          >
            <FaTrash className='text-xl' />
          </button>
        )}

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

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 z-60 bg-black bg-opacity-75 flex items-center justify-center'>
          <div className='bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Delete Photo
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              Are you sure you want to delete &ldquo;{currentPhoto.filename}
              &rdquo;? This action cannot be undone.
            </p>
            <div className='flex space-x-3'>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors'
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePhoto}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50'
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
