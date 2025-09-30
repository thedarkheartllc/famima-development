"use client";

import { use } from "react";
import Link from "next/link";
import { GalleryContent } from "../../components/GalleryContent";
import { usePhotos } from "../../../hooks/usePhotos";
import { usePeople } from "../../../hooks/usePeople";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
  url: string;
}

export default function Gallery({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  const { people, loading: peopleLoading } = usePeople();
  const person = people.find(
    (p) => p.name.toLowerCase() === resolvedParams.name.toLowerCase()
  );
  const {
    photos,
    loading: photosLoading,
    error,
    fetchPhotos,
  } = usePhotos(person?.id);

  const handleUploadComplete = () => {
    if (person?.id) {
      fetchPhotos(person.id);
    }
  };

  if (peopleLoading || photosLoading) {
    return (
      <main className='bg-black dark:bg-white min-h-screen p-4'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-white dark:text-black'>Loading...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='bg-black dark:bg-white min-h-screen p-4'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-red-500'>Error loading photos: {error}</div>
        </div>
      </main>
    );
  }

  if (!person) {
    return (
      <main className='bg-black dark:bg-white min-h-screen p-4'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-white dark:text-black'>Person not found</div>
        </div>
      </main>
    );
  }

  // Convert Firebase photos to the format expected by GalleryContent
  const photosWithDates: PhotoWithDate[] = photos.map((photo) => ({
    filename: photo.filename,
    url: photo.url || "",
    date: photo.takenAt
      ? formatDate(photo.takenAt)
      : formatDate(photo.uploadedAt),
    dateObj: photo.takenAt || photo.uploadedAt,
  }));

  // Filter out photos without dates and sort by date (most recent first)
  const photosWithValidDates = photosWithDates.filter((photo) => photo.date);
  const sortedPhotos = photosWithValidDates.sort((a, b) => {
    if (!a.dateObj || !b.dateObj) return 0;
    return b.dateObj.getTime() - a.dateObj.getTime(); // Most recent first
  });

  // Group photos by month/year
  const groupedPhotos = sortedPhotos.reduce((groups, photo) => {
    if (!photo.dateObj) return groups;
    const monthYear = `${photo.dateObj.getFullYear()}-${photo.dateObj.getMonth()}`;
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(photo);
    return groups;
  }, {} as Record<string, PhotoWithDate[]>);

  // Sort group keys (most recent first)
  const sortedGroupKeys = Object.keys(groupedPhotos).sort((a, b) => {
    return b.localeCompare(a); // Most recent first
  });

  // Check if this person has any photos
  const hasPhotos = photos.length > 0;

  // Always use GalleryContent component to get the proper header with upload button

  return (
    <main className='bg-black dark:bg-white min-h-screen p-4'>
      <GalleryContent
        files={photos.map((p) => p.filename)}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
        personName={resolvedParams.name}
        photos={photos} // Pass Firebase photos for URL access
        onUploadComplete={handleUploadComplete}
      />
    </main>
  );
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}
