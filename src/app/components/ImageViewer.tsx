"use client";

import { useState, useEffect, useCallback } from "react";
import { ReliableImage } from "./ReliableImage";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./Button";
import { Loading } from "./Loading";

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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white md:bg-transparent p-4 md:p-12'>
      {/* Close button */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 z-10 p-3 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full text-gray-700 transition-all shadow-lg'
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
            className='absolute top-6 left-6 z-10 p-3 bg-gradient-to-br from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 rounded-full text-red-700 transition-all shadow-lg'
            aria-label='Delete photo'
          >
            <FaTrash className='text-xl' />
          </button>
        )}

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className='absolute left-6 bottom-6 md:top-1/2 md:bottom-auto md:transform md:-translate-y-1/2 z-10 p-4 bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-full text-gray-700 transition-all shadow-lg'
          aria-label='Previous image'
        >
          <FaChevronLeft className='text-2xl' />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={goToNext}
          className='absolute right-6 bottom-6 md:top-1/2 md:bottom-auto md:transform md:-translate-y-1/2 z-10 p-4 bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-full text-gray-700 transition-all shadow-lg'
          aria-label='Next image'
        >
          <FaChevronRight className='text-2xl' />
        </button>
      )}

      {/* Image container with backdrop */}
      <div className='relative bg-white md:bg-white/90 md:backdrop-blur rounded-none md:rounded-3xl shadow-none md:shadow-2xl p-2 md:p-8'>
        {imageLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loading size='small' showLogo={false} />
          </div>
        )}

        <ReliableImage
          src={currentPhoto.url || `/photos/${currentPhoto.filename}`}
          alt={currentPhoto.filename}
          width={1200}
          height={900}
          className={`rounded-lg md:rounded-2xl object-contain transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ maxHeight: "85vh", maxWidth: "95vw" }}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          priority={true} // Always prioritize images in the viewer
        />
      </div>

      {/* Image info */}
      <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md text-gray-700 px-6 py-3 rounded-full shadow-lg'>
        <div className='text-center space-y-1'>
          {currentPhoto.dateObj && (
            <div className='text-xs font-light text-gray-500'>
              {currentPhoto.dateObj.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
          <div className='text-xs font-light text-gray-500'>
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
        <div className='fixed inset-0 z-60 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-white rounded-3xl p-8 max-w-md w-full shadow-xl'>
            <h3 className='text-2xl font-light text-gray-900 mb-3'>
              Delete Photo
            </h3>
            <p className='text-gray-600 font-light mb-6'>
              Are you sure you want to delete &ldquo;{currentPhoto.filename}
              &rdquo;? This action cannot be undone.
            </p>
            <div className='flex gap-3'>
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                variant='secondary'
                disabled={isDeleting}
                className='flex-1'
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeletePhoto}
                variant='primary'
                loading={isDeleting}
                disabled={isDeleting}
                className='flex-1 !bg-red-600 hover:!bg-red-700'
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
