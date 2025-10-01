"use client";

import Link from "next/link";
import { usePeople } from "@/hooks/usePeople";

export function FamilyTree() {
  const { people, loading } = usePeople();

  if (loading) {
    return (
      <div className='flex flex-col items-center space-y-8'>
        <div className='text-gray-600 font-light'>Loading family tree...</div>
      </div>
    );
  }

  // Organize people by relationship type
  const parents = people.filter(
    (person) => person.relationshipType === "parent"
  );
  const children = people.filter(
    (person) => person.relationshipType === "child"
  );
  const partners = people.filter(
    (person) => person.relationshipType === "partner"
  );
  const grandchildren = people.filter(
    (person) => person.relationshipType === "grandchild"
  );
  const others = people.filter(
    (person) => person.relationshipType === "other" || !person.relationshipType
  );

  // Earthy color palette
  const earthyColors = [
    "from-sky-200 to-sky-300", // Sky blue
    "from-emerald-200 to-emerald-300", // Grass green
    "from-amber-200 to-amber-300", // Sand/earth
    "from-rose-200 to-rose-300", // Soft rose
    "from-violet-200 to-violet-300", // Soft lavender
    "from-teal-200 to-teal-300", // Ocean
    "from-blue-200 to-blue-300", // Water
    "from-lime-200 to-lime-300", // Fresh grass
    "from-orange-200 to-orange-300", // Sunset
    "from-cyan-200 to-cyan-300", // Clear water
    "from-stone-200 to-stone-300", // Cloud/stone
    "from-slate-200 to-slate-300", // Storm cloud
    "from-yellow-200 to-yellow-300", // Sunlight
    "from-pink-200 to-pink-300", // Flower
    "from-indigo-200 to-indigo-300", // Twilight
  ];

  // Assign unique color to each person based on their ID
  const getPersonColor = (personId: string) => {
    // Create a simple hash from the person ID
    let hash = 0;
    for (let i = 0; i < personId.length; i++) {
      hash = (hash << 5) - hash + personId.charCodeAt(i);
      hash = hash & hash;
    }
    const index = Math.abs(hash) % earthyColors.length;
    return earthyColors[index];
  };

  const renderPersonCard = (
    person: { id: string; name: string; color: string; birthDate?: string },
    size: "large" | "medium" | "small" = "medium"
  ) => {
    const sizeClasses = {
      large: "w-32 h-32 text-xl",
      medium: "w-24 h-24 text-lg",
      small: "w-20 h-20 text-sm",
    };

    const earthyColor = getPersonColor(person.id);

    return (
      <Link
        key={person.id}
        href={`/gallery/${person.name.toLowerCase()}`}
        className='group transition-all duration-300 hover:scale-105'
      >
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${earthyColor} flex flex-col items-center justify-center text-gray-700 font-light shadow-sm group-hover:shadow-lg transition-all duration-300`}
          >
            <div>{person.name}</div>
            {person.birthDate && (
              <div className='text-xs text-gray-600 mt-1'>
                {new Date(person.birthDate).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className='flex flex-col items-center space-y-12'>
      {/* Parents Section */}
      {parents.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>Parents</h3>
          <div className='flex justify-center items-center gap-6'>
            {parents.map((person) => renderPersonCard(person, "large"))}
          </div>
        </div>
      )}

      {/* Children Section */}
      {children.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>Children</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {children.map((person) => renderPersonCard(person, "large"))}
          </div>
        </div>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>Partners</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {partners.map((person) => renderPersonCard(person, "medium"))}
          </div>
        </div>
      )}

      {/* Grandchildren Section */}
      {grandchildren.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>Grandchildren</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {grandchildren.map((person) => renderPersonCard(person, "small"))}
          </div>
        </div>
      )}

      {/* Other Family Members */}
      {others.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>
            Other Family Members
          </h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {others.map((person) => renderPersonCard(person, "medium"))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {people.length === 0 && (
        <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-sm text-center max-w-md'>
          <p className='text-lg text-gray-600 font-light'>
            No family members added yet.
          </p>
          <p className='text-sm text-gray-500 font-light mt-3'>
            Use the &quot;Add Family Member&quot; button in the header to get
            started!
          </p>
        </div>
      )}
    </div>
  );
}
