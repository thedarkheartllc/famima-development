"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAlbums } from "@/hooks/useAlbums";
import { Album } from "@/types";
import { Button } from "./Button";
import { useToastContext } from "../contexts/ToastContext";

interface EditAlbumFormProps {
  isOpen: boolean;
  onClose: () => void;
  album: Album;
}

const COLOR_OPTIONS = [
  { name: "Sky", value: "from-sky-200 to-sky-300" },
  { name: "Grass", value: "from-emerald-200 to-emerald-300" },
  { name: "Sand", value: "from-amber-200 to-amber-300" },
  { name: "Rose", value: "from-rose-200 to-rose-300" },
  { name: "Lavender", value: "from-violet-200 to-violet-300" },
  { name: "Ocean", value: "from-teal-200 to-teal-300" },
  { name: "Water", value: "from-blue-200 to-blue-300" },
  { name: "Lime", value: "from-lime-200 to-lime-300" },
  { name: "Sunset", value: "from-orange-200 to-orange-300" },
  { name: "Cyan", value: "from-cyan-200 to-cyan-300" },
  { name: "Stone", value: "from-stone-200 to-stone-300" },
  { name: "Cloud", value: "from-slate-200 to-slate-300" },
];

export function EditAlbumForm({ isOpen, onClose, album }: EditAlbumFormProps) {
  const { updateAlbum, deleteAlbum } = useAlbums();
  const { showSuccess, showError } = useToastContext();
  const [name, setName] = useState(album.name);
  const [description, setDescription] = useState(album.description || "");
  const [eventDate, setEventDate] = useState(album.eventDate || "");
  const [color, setColor] = useState(album.color);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Album name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formattedName =
        name.trim().charAt(0).toUpperCase() +
        name.trim().slice(1).toLowerCase();

      await updateAlbum(album.albumId, {
        name: formattedName,
        ...(description.trim() && { description: description.trim() }),
        ...(eventDate && { eventDate }),
        color,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update album");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      await deleteAlbum(album.albumId);
      showSuccess("Album deleted successfully");
      onClose();
      // Navigate back to family page after deletion
      window.location.href = "/family";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete album");
      showError(
        "Failed to delete album: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-3xl p-8 w-full max-w-md shadow-xl'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-light text-gray-900'>Edit Album</h2>
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
              Album Name *
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
              placeholder='e.g., Christmas 2023, Summer Vacation'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all resize-none'
              placeholder='Optional description of the album or event'
              rows={3}
            />
          </div>

          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Event Date
            </label>
            <input
              type='date'
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-light text-gray-600 mb-3'>
              Color Theme
            </label>
            <div className='grid grid-cols-4 gap-2'>
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => setColor(option.value)}
                  className={`p-3 rounded-2xl text-gray-700 text-xs font-light transition-all hover:scale-105 bg-gradient-to-br ${
                    option.value
                  } ${
                    color === option.value
                      ? "ring-2 ring-gray-900 ring-offset-2 shadow-md"
                      : "shadow-sm"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
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
              Update Album
            </Button>
          </div>

          <div className='mt-6 pt-6 border-t border-gray-100'>
            <button
              type='button'
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
              className='text-sm font-light text-red-600 hover:text-red-700 transition-colors disabled:opacity-50'
            >
              Delete {album.name}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-60 p-4'>
          <div className='bg-white rounded-3xl p-8 w-full max-w-md shadow-xl'>
            <h3 className='text-xl font-light text-gray-900 mb-4'>
              Delete Album
            </h3>
            <p className='text-gray-600 font-light mb-6'>
              Are you sure you want to delete &quot;{album.name}&quot;? This
              action cannot be undone and will remove all photos in this album.
            </p>
            <div className='flex gap-3'>
              <Button
                variant='secondary'
                onClick={() => setShowDeleteConfirm(false)}
                className='flex-1'
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                onClick={handleDelete}
                loading={deleting}
                className='flex-1 bg-red-600 hover:bg-red-700'
              >
                Delete Album
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
