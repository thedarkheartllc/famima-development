"use client";

import Link from "next/link";
import { FaBaby } from "react-icons/fa";
import { usePeople } from "@/hooks/usePeople";

export function FamilyTree() {
  const { people, loading } = usePeople();

  if (loading) {
    return (
      <div className='flex flex-col items-center space-y-8'>
        <div className='text-gray-500'>Loading family tree...</div>
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

  const renderPersonCard = (
    person: { id: string; name: string; color: string; birthDate?: string },
    size: "large" | "medium" | "small" = "medium"
  ) => {
    const sizeClasses = {
      large: "w-32 h-32 text-2xl",
      medium: "w-24 h-24 text-lg",
      small: "w-20 h-20 text-sm",
    };

    return (
      <Link
        key={person.id}
        href={`/gallery/${person.name.toLowerCase()}`}
        className='group transition-transform duration-300 hover:scale-110'
      >
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${person.color} flex flex-col items-center justify-center text-white font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <div>{person.name}</div>
          {person.birthDate && (
            <div className='text-xs opacity-80'>
              {new Date(person.birthDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className='flex flex-col items-center space-y-8'>
      {/* Parents Section */}
      {parents.length > 0 && (
        <div className='flex flex-col items-center space-y-4'>
          <h3 className='text-lg font-semibold text-black'>Parents</h3>
          <div className='flex justify-center items-center gap-4'>
            {parents.map((person) => renderPersonCard(person, "large"))}
          </div>
        </div>
      )}

      {/* Children Section */}
      {children.length > 0 && (
        <div className='flex flex-col items-center space-y-4'>
          <h3 className='text-lg font-semibold text-black'>Children</h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {children.map((person) => renderPersonCard(person, "large"))}
          </div>
        </div>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <div className='flex flex-col items-center space-y-4'>
          <h3 className='text-lg font-semibold text-black'>Partners</h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {partners.map((person) => renderPersonCard(person, "medium"))}
          </div>
        </div>
      )}

      {/* Grandchildren Section */}
      {grandchildren.length > 0 && (
        <div className='flex flex-col items-center space-y-4'>
          <h3 className='text-lg font-semibold text-black'>Grandchildren</h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {grandchildren.map((person) => (
              <div key={person.id} className='flex flex-col items-center'>
                {renderPersonCard(person, "small")}
                <FaBaby className='text-xs mt-1 text-gray-500' />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Family Members */}
      {others.length > 0 && (
        <div className='flex flex-col items-center space-y-4'>
          <h3 className='text-lg font-semibold text-black'>
            Other Family Members
          </h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {others.map((person) => renderPersonCard(person, "medium"))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {people.length === 0 && (
        <div className='text-center text-gray-500 py-8'>
          <p>No family members added yet.</p>
          <p className='text-sm mt-2'>
            Use the &quot;Add Family Member&quot; button in the header to get
            started!
          </p>
        </div>
      )}
    </div>
  );
}
