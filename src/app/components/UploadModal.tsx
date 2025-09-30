"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../contexts/AuthContext";
import { FaTimes } from "react-icons/fa";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  personId: string;
  personName: string;
  onUploadComplete?: () => void;
}

export function UploadModal({
  isOpen,
  onClose,
  personId,
  personName,
  onUploadComplete,
}: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const { uploadPhoto, error } = usePhotos();
  const { user, isAdmin } = useAuth();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setUploadProgress(0);
      setUploadComplete(false);
      setUploadedCount(0);
      setTotalFiles(acceptedFiles.length);

      try {
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i];
          await uploadPhoto(file, personId, (progress) => {
            // Calculate overall progress across all files
            const fileProgress = progress / acceptedFiles.length;
            const totalProgress =
              (i / acceptedFiles.length) * 100 + fileProgress;
            setUploadProgress(totalProgress);
          });
          setUploadedCount(i + 1);
        }

        setUploadComplete(true);
        onUploadComplete?.();

        // Auto-close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (err) {
        console.error("Upload failed:", err);
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [personId, uploadPhoto, onUploadComplete, onClose]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".heic", ".heif"],
    },
    multiple: true,
    disabled: uploading,
  });

  if (!isOpen) return null;

  // Check if user is authenticated
  if (!user || !isAdmin) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6'>
          <div className='text-center'>
            <div className='text-4xl mb-4'>🔒</div>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
              Authentication Required
            </h2>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              You need to be logged in to upload photos.
            </p>
            <button
              onClick={onClose}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Upload Photos</h2>
            <p className='text-gray-600'>
              Add photos to {personName}&apos;s gallery
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            aria-label='Close modal'
          >
            <FaTimes className='text-gray-500 text-xl' />
          </button>
        </div>

        {/* Upload Area */}
        <div className='p-6'>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }
              ${
                uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }
            `}
          >
            <input {...getInputProps()} />

            {uploading ? (
              <div className='space-y-4'>
                {uploadComplete ? (
                  <div className='space-y-4'>
                    <div className='text-4xl'>✅</div>
                    <div className='text-lg font-medium text-green-600'>
                      Upload Complete!
                    </div>
                    <div className='text-sm text-gray-600'>
                      Successfully uploaded {uploadedCount} photo(s) to{" "}
                      {personName}&apos;s gallery
                    </div>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div className='text-lg font-medium text-gray-900'>
                      Uploading photos... ({uploadedCount} of {totalFiles})
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className='text-sm text-gray-600'>
                      {Math.round(uploadProgress)}% complete
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='text-4xl'>📸</div>
                <div className='text-lg font-medium text-gray-900'>
                  {isDragActive
                    ? "Drop photos here..."
                    : "Drag & drop photos here, or click to select"}
                </div>
                <div className='text-sm text-gray-600'>
                  Supports JPG, PNG, HEIC, HEIF formats
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <div className='text-red-800 text-sm'>{error}</div>
            </div>
          )}

          {/* Instructions */}
          <div className='mt-6 text-sm text-gray-600'>
            <h3 className='font-medium mb-2 text-gray-900'>
              Upload Instructions:
            </h3>
            <ul className='list-disc list-inside space-y-1'>
              <li>Drag and drop photos or click to browse</li>
              <li>You can upload multiple photos at once</li>
              <li>Photos will be added to {personName}&apos;s gallery</li>
              <li>Photos are automatically organized by date</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end gap-3 p-6 border-t border-gray-200'>
          <button
            onClick={onClose}
            disabled={uploading}
            className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
