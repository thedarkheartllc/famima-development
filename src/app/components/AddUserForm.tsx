"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { usePeople } from "@/hooks/usePeople";
import { Person } from "@/types/person";

interface AddUserFormProps {
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { name: "Yellow", value: "from-yellow-400 to-yellow-600" },
  { name: "Sky", value: "from-sky-300 to-sky-500" },
  { name: "Blue", value: "from-blue-600 to-blue-800" },
  { name: "Lime", value: "from-lime-400 to-lime-600" },
  { name: "Pink", value: "from-pink-400 to-pink-600" },
  { name: "Purple", value: "from-purple-400 to-purple-600" },
  { name: "Green", value: "from-green-400 to-green-600" },
  { name: "Red", value: "from-red-400 to-red-600" },
];

export function AddUserForm({ onClose }: AddUserFormProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [color, setColor] = useState("from-yellow-400 to-yellow-600");
  const [relationshipType, setRelationshipType] = useState<
    "parent" | "child" | "partner" | "grandchild" | "other"
  >("other");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addPerson } = usePeople();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const personData: Omit<Person, "id" | "createdAt"> = {
        name: name.trim(),
        birthDate: birthDate || undefined,
        color,
        relationshipType,
      };

      await addPerson(personData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add person");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-black'>
            Add Family Member
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-black mb-1'>
              Name *
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg bg-white text-black'
              placeholder='Enter name'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-black mb-1'>
              Birth Date
            </label>
            <input
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg bg-white text-black'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-black mb-1'>
              Relationship Type
            </label>
            <select
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value as any)}
              className='w-full p-3 border border-gray-300 rounded-lg bg-white text-black'
            >
              <option value='parent'>Parent</option>
              <option value='child'>Child</option>
              <option value='partner'>Partner</option>
              <option value='grandchild'>Grandchild</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-black mb-2'>
              Color Theme
            </label>
            <div className='grid grid-cols-4 gap-2'>
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => setColor(option.value)}
                  className={`p-2 rounded-lg text-white text-xs font-medium transition-transform hover:scale-105 bg-gradient-to-br ${
                    option.value
                  } ${
                    color === option.value
                      ? "ring-2 ring-black ring-offset-2"
                      : ""
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {error && <div className='text-red-500 text-sm'>{error}</div>}

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium'
            >
              {loading ? "Adding..." : "Add Person"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
