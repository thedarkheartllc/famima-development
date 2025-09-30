"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { usePhotos } from "../../hooks/usePhotos";
import { usePeople } from "../../hooks/usePeople";

interface PhotoUploadProps {
  onUploadComplete?: () => void;
}

export function PhotoUpload({ onUploadComplete }: PhotoUploadProps) {
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { people, loading: peopleLoading } = usePeople();
  const { uploadPhoto, error } = usePhotos();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!selectedPersonId) {
        alert("Please select a person first");
        return;
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i];
          await uploadPhoto(file, selectedPersonId, (progress) => {
            setUploadProgress(progress);
          });
        }

        onUploadComplete?.();
        alert(`Successfully uploaded ${acceptedFiles.length} photo(s)`);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [selectedPersonId, uploadPhoto, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".heic", ".heif"],
    },
    multiple: true,
    disabled: uploading || !selectedPersonId,
  });

  if (peopleLoading) {
    return <div className='p-4'>Loading people...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Upload Photos</h2>

      {/* Person Selection */}
      <div className='mb-6'>
        <label
          htmlFor='person-select'
          className='block text-sm font-medium mb-2'
        >
          Select Person
        </label>
        <select
          id='person-select'
          value={selectedPersonId}
          onChange={(e) => setSelectedPersonId(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          disabled={uploading}
        >
          <option value=''>Choose a person...</option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
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
            uploading || !selectedPersonId
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50"
          }
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className='space-y-4'>
            <div className='text-lg font-medium'>Uploading photos...</div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className='text-sm text-gray-600'>
              {uploadProgress}% complete
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='text-4xl'>📸</div>
            <div className='text-lg font-medium'>
              {isDragActive
                ? "Drop photos here..."
                : "Drag & drop photos here, or click to select"}
            </div>
            <div className='text-sm text-gray-600'>
              Supports JPG, PNG, HEIC, HEIF formats
            </div>
            {!selectedPersonId && (
              <div className='text-sm text-red-600'>
                Please select a person first
              </div>
            )}
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
        <h3 className='font-medium mb-2'>Upload Instructions:</h3>
        <ul className='list-disc list-inside space-y-1'>
          <li>Select a person from the dropdown above</li>
          <li>Drag and drop photos or click to browse</li>
          <li>You can upload multiple photos at once</li>
          <li>Photos will be automatically organized by person</li>
        </ul>
      </div>
    </div>
  );
}
