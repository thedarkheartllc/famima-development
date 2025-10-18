"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "./Button";
import { useFamily } from "@/hooks/useFamily";

interface EditFamilyFormProps {
  isOpen: boolean;
  onClose: () => void;
  currentFamilyName: string;
  onUpdate: (newFamilyName: string) => Promise<void>;
}

export function EditFamilyForm({
  isOpen,
  onClose,
  currentFamilyName,
  onUpdate,
}: EditFamilyFormProps) {
  const [familyName, setFamilyName] = useState(currentFamilyName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!familyName.trim()) {
      setError("Family name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onUpdate(familyName.trim());
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update family name"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-3xl p-8 w-full max-w-md shadow-xl'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-light text-gray-900'>
            Edit Family Name
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-900 transition-colors'
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Family Name *
            </label>
            <input
              type='text'
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
              placeholder='Enter family name'
              required
            />
          </div>

          {error && (
            <div className='text-sm font-light text-red-600 bg-red-50 py-2 px-4 rounded-2xl'>
              {error}
            </div>
          )}

          <div className='flex gap-3 pt-4'>
            <Button
              type='button'
              variant='secondary'
              onClick={onClose}
              className='flex-1'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='primary'
              loading={loading}
              className='flex-1'
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
