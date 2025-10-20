"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../contexts/AuthContext";
import { FaTimes } from "react-icons/fa";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  personId?: string;
  albumId?: string;
  personName?: string;
  albumName?: string;
  storageId?: string;
  onUploadComplete?: () => void;
}

export function UploadModal({
  isOpen,
  onClose,
  personId,
  albumId,
  personName,
  albumName,
  storageId,
  onUploadComplete,
}: UploadModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [failedFiles, setFailedFiles] = useState<
    { filename: string; error: string }[]
  >([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const { uploadPhoto, error } = usePhotos();
  const { user, isAdmin } = useAuth();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setUploadProgress(0);
      setUploadComplete(false);
      setUploadedCount(0);
      setFailedCount(0);
      setFailedFiles([]);
      setTotalFiles(acceptedFiles.length);

      try {
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i];
          const isAlbumUpload = !!albumId;
          const targetId = isAlbumUpload ? albumId : personId;
          const targetStorageId = isAlbumUpload ? albumId : storageId;

          const result = await uploadPhoto(
            file,
            targetId!,
            targetStorageId!,
            (progress) => {
              // Calculate overall progress across all files
              const fileProgress = progress / acceptedFiles.length;
              const totalProgress =
                (i / acceptedFiles.length) * 100 + fileProgress;
              setUploadProgress(totalProgress);
            },
            isAlbumUpload
          );

          if (result.success) {
            setUploadedCount((prev) => prev + 1);
          } else {
            setFailedCount((prev) => prev + 1);
            setFailedFiles((prev) => [
              ...prev,
              {
                filename: file.name,
                error: result.error || "Unknown error",
              },
            ]);
          }
        }

        setUploadComplete(true);
        onUploadComplete?.();

        // Auto-close after 3 seconds (increased to allow reading results)
        setTimeout(() => {
          onClose();
        }, 3000);
      } catch (err) {
        console.error("Upload process failed:", err);
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [personId, albumId, storageId, uploadPhoto, onUploadComplete, onClose]
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
      <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-3xl shadow-xl max-w-md w-full p-8'>
          <div className='text-center space-y-4'>
            <div className='text-5xl'>🔒</div>
            <h2 className='text-2xl font-light text-gray-900'>
              Authentication Required
            </h2>
            <p className='text-gray-600 font-light'>
              You need to be logged in to upload photos.
            </p>
            <button
              onClick={onClose}
              className='px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-lg font-light'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-3xl shadow-xl max-w-2xl w-full'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div>
            <h2 className='text-2xl font-light text-gray-900'>Upload Photos</h2>
            <p className='text-sm text-gray-600 font-light mt-1'>
              {albumName
                ? `Add photos to ${albumName} album`
                : `Add photos to ${personName}'s gallery`}
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-50 rounded-full transition-colors'
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
              border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all
              ${
                isDragActive
                  ? "border-green-300 bg-green-50/50"
                  : "border-gray-200 hover:border-gray-300"
              }
              ${
                uploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50/50"
              }
            `}
          >
            <input {...getInputProps()} />

            {uploading ? (
              <div className='space-y-3'>
                {uploadComplete ? (
                  <div className='space-y-3'>
                    <div className='text-4xl'>
                      {failedCount === 0
                        ? "✅"
                        : failedCount === totalFiles
                        ? "❌"
                        : "⚠️"}
                    </div>
                    <div
                      className={`text-lg font-light ${
                        failedCount === 0
                          ? "text-green-600"
                          : failedCount === totalFiles
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {failedCount === 0
                        ? "Upload Complete!"
                        : failedCount === totalFiles
                        ? "Upload Failed!"
                        : "Upload Partially Complete!"}
                    </div>
                    <div className='text-sm font-light text-gray-600'>
                      {uploadedCount > 0 &&
                        `Successfully uploaded ${uploadedCount} photo(s)`}
                      {uploadedCount > 0 && failedCount > 0 && " • "}
                      {failedCount > 0 && `${failedCount} photo(s) failed`}
                    </div>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <div className='text-base font-light text-gray-700'>
                      Uploading photos... ({uploadedCount + failedCount} of{" "}
                      {totalFiles})
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-2'>
                      <div
                        className='bg-gray-900 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className='text-sm font-light text-gray-600'>
                      {Math.round(uploadProgress)}% complete
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='text-4xl'>📸</div>
                <div className='text-base font-light text-gray-700'>
                  {isDragActive
                    ? "Drop photos here..."
                    : "Drag & drop photos here, or click to select"}
                </div>
                <div className='text-sm font-light text-gray-500'>
                  Supports JPG, PNG, HEIC, HEIF formats
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className='mt-4 p-3 bg-red-50 border border-red-100 rounded-2xl'>
              <div className='text-red-600 text-sm font-light'>{error}</div>
            </div>
          )}

          {/* Failed Files Display */}
          {uploadComplete && failedFiles.length > 0 && (
            <div className='mt-4 p-3 bg-red-50 border border-red-100 rounded-2xl'>
              <div className='text-red-600 text-sm font-medium mb-2'>
                Failed uploads:
              </div>
              <div className='space-y-1 max-h-32 overflow-y-auto'>
                {failedFiles.map((failedFile, index) => (
                  <div key={index} className='text-xs text-red-600'>
                    <span className='font-medium'>{failedFile.filename}</span>
                    <span className='text-red-500 ml-1'>
                      • {failedFile.error}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className='mt-4 text-xs font-light text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-4'>
            <ul className='space-y-1.5'>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 mt-0.5'>✓</span>
                <span>Drag and drop photos or click to browse</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 mt-0.5'>✓</span>
                <span>Upload multiple photos at once</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-green-600 mt-0.5'>✓</span>
                <span>Automatically organized by date</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end gap-3 p-6 border-t border-gray-100'>
          <button
            onClick={onClose}
            disabled={uploading}
            className='px-6 py-2 text-gray-600 hover:text-gray-900 font-light transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
