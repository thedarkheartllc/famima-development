"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Person } from "@/types";
import { Button } from "./Button";

interface AddFamilyMemberFormProps {
  onClose: () => void;
  addPerson: (
    personData: Omit<Person, "id" | "personId" | "createdAt">
  ) => Promise<string>;
  refetch: () => Promise<void>;
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

export function AddFamilyMemberForm({
  onClose,
  addPerson,
  refetch,
}: AddFamilyMemberFormProps) {
  const [name, setName] = useState("John Smith");
  const [birthDate, setBirthDate] = useState("1990-01-15");
  const [color, setColor] = useState("from-sky-200 to-sky-300");
  const [relationshipType, setRelationshipType] = useState<
    "parent" | "child" | "partner" | "grandchild" | "other"
  >("parent");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const personData: Omit<Person, "id" | "personId" | "createdAt"> = {
        name:
          name.trim().charAt(0).toUpperCase() +
          name.trim().slice(1).toLowerCase(),
        birthDate: birthDate || undefined,
        color,
        relationshipType,
      };

      await addPerson(personData);

      // Refetch people data to update the UI
      await refetch();

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add person");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-3xl p-8 w-full max-w-md shadow-xl'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-light text-gray-900'>
            Add Family Member
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
                    | "other"
                )
              }
              className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            >
              <option value='parent'>Parent</option>
              <option value='child'>Child</option>
              <option value='partner'>Partner</option>
              <option value='grandchild'>Grandchild</option>
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
              Add Person
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
