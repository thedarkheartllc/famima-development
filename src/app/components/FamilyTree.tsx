"use client";

import Link from "next/link";
import { Person } from "@/types";

interface FamilyTreeProps {
  people: Person[];
}

export function FamilyTree({ people }: FamilyTreeProps) {
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

  const pets = people.filter((person) => person.relationshipType === "pet");

  const others = people.filter(
    (person) => person.relationshipType === "other" || !person.relationshipType
  );

  const renderPersonCard = (
    person: { id: string; name: string; color: string; birthDate?: string },
    size: "large" | "medium" | "small" = "medium"
  ) => {
    const sizeClasses = {
      large: "w-32 h-32 text-xl",
      medium: "w-24 h-24 text-lg",
      small: "w-20 h-20 text-sm",
    };

    const personColor = person.color || "from-sky-200 to-sky-300";

    return (
      <Link
        key={person.id}
        href={`/gallery/${person.name.toLowerCase()}`}
        className='group transition-all duration-300 hover:scale-105'
      >
        <div className='flex flex-col items-center gap-2'>
          <div
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${personColor} flex flex-col items-center justify-center text-gray-700 font-light shadow-sm group-hover:shadow-lg transition-all duration-300`}
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

      {/* Pets Section */}
      {pets.length > 0 && (
        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-xl font-light text-gray-900'>Pets</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {pets.map((person) => renderPersonCard(person, "medium"))}
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
