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
    return (
      <div className='p-4 text-gray-600 font-light'>Loading people...</div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-3xl font-light text-gray-900 mb-8'>Upload Photos</h2>

      {/* Person Selection */}
      <div className='mb-6'>
        <label
          htmlFor='person-select'
          className='block text-sm font-light text-gray-600 mb-2'
        >
          Select Person
        </label>
        <select
          id='person-select'
          value={selectedPersonId}
          onChange={(e) => setSelectedPersonId(e.target.value)}
          className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
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
          border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all
          ${
            isDragActive
              ? "border-green-300 bg-green-50/50"
              : "border-gray-200 hover:border-gray-300"
          }
          ${
            uploading || !selectedPersonId
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50/50"
          }
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className='space-y-4'>
            <div className='text-lg font-light text-gray-700'>
              Uploading photos...
            </div>
            <div className='w-full bg-gray-100 rounded-full h-2'>
              <div
                className='bg-gray-900 h-2 rounded-full transition-all duration-300'
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className='text-sm font-light text-gray-600'>
              {uploadProgress}% complete
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <div className='text-5xl'>📸</div>
            <div className='text-lg font-light text-gray-700'>
              {isDragActive
                ? "Drop photos here..."
                : "Drag & drop photos here, or click to select"}
            </div>
            <div className='text-sm font-light text-gray-500'>
              Supports JPG, PNG, HEIC, HEIF formats
            </div>
            {!selectedPersonId && (
              <div className='text-sm font-light text-red-600 bg-red-50 py-2 px-4 rounded-2xl inline-block'>
                Please select a person first
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className='mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl'>
          <div className='text-red-600 text-sm font-light'>{error}</div>
        </div>
      )}

      {/* Instructions */}
      <div className='mt-8 text-sm font-light text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl p-6'>
        <h3 className='font-light text-gray-900 mb-3'>Upload Instructions:</h3>
        <ul className='space-y-2'>
          <li className='flex items-start gap-2'>
            <span className='text-green-600 mt-0.5'>✓</span>
            <span>Select a person from the dropdown above</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-green-600 mt-0.5'>✓</span>
            <span>Drag and drop photos or click to browse</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-green-600 mt-0.5'>✓</span>
            <span>You can upload multiple photos at once</span>
          </li>
          <li className='flex items-start gap-2'>
            <span className='text-green-600 mt-0.5'>✓</span>
            <span>Photos will be automatically organized by person</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
