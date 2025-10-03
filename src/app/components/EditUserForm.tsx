"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { usePeople } from "@/hooks/usePeople";
import { Person } from "@/types";
import { Button } from "./Button";

interface EditUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  person: Person;
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

export function EditUserForm({ isOpen, onClose, person }: EditUserFormProps) {
  const [name, setName] = useState(person.name);
  const [birthDate, setBirthDate] = useState(person.birthDate || "");
  const [color, setColor] = useState(person.color || "from-sky-200 to-sky-300");
  const [relationshipType, setRelationshipType] = useState<
    "parent" | "child" | "partner" | "grandchild" | "pet" | "other"
  >(person.relationshipType || "other");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { updatePerson, deletePerson } = usePeople();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const updatedData: Partial<Person> = {
        name:
          name.trim().charAt(0).toUpperCase() +
          name.trim().slice(1).toLowerCase(),
        birthDate: birthDate || undefined,
        color,
        relationshipType,
      };

      await updatePerson(person.id, updatedData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update person");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");

    try {
      await deletePerson(person.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete person");
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-4'>
      <div className='bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto sm:max-h-none sm:overflow-visible'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-light text-gray-900'>
            Edit Family Member
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-900 transition-colors'
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Name *
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
              placeholder='Enter name'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Birth Date
            </label>
            <input
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-light text-gray-600 mb-2'>
              Relationship Type
            </label>
            <select
              value={relationshipType}
              onChange={(e) =>
                setRelationshipType(
                  e.target.value as
                    | "parent"
                    | "child"
                    | "partner"
                    | "grandchild"
                    | "pet"
                    | "other"
                )
              }
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            >
              <option value='parent'>Parent</option>
              <option value='child'>Child</option>
              <option value='partner'>Partner</option>
              <option value='grandchild'>Grandchild</option>
              <option value='pet'>Pet</option>
              <option value='other'>Other</option>
            </select>
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
                  className={`p-2 sm:p-3 rounded-2xl text-gray-700 text-xs font-light transition-all hover:scale-105 bg-gradient-to-br ${
                    option.value
                  } ${
                    color === option.value
                      ? "ring-2 ring-gray-900 ring-offset-2 shadow-md"
                      : "shadow-sm"
                  }`}
                >
                  <span className='hidden sm:inline'>{option.name}</span>
                  <span className='sm:hidden text-[10px]'>
                    {option.name.slice(0, 3)}
                  </span>
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
              Save
            </Button>
          </div>
        </form>

        {/* Delete Section */}
        <div className='mt-6 pt-6 border-t border-gray-100'>
          <button
            type='button'
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting}
            className='text-sm font-light text-red-600 hover:text-red-700 transition-colors disabled:opacity-50'
          >
            Delete {person.name}
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4'>
          <div className='bg-white rounded-3xl p-8 w-full max-w-sm shadow-xl'>
            <div className='text-center space-y-4'>
              <div className='text-5xl'>⚠️</div>
              <h3 className='text-xl font-light text-gray-900'>
                Delete {person.name}?
              </h3>
              <p className='text-sm font-light text-gray-600'>
                This will permanently delete {person.name} and all their photos.
                This action cannot be undone.
              </p>

              <div className='flex gap-3 pt-4'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className='flex-1'
                >
                  Cancel
                </Button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className='flex-1 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-light'
                >
                  {deleting ? "Deleting..." : "Delete Forever"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
