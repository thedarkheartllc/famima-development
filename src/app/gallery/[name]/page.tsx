"use client";

import { use } from "react";
import { GalleryContent } from "../../components/GalleryContent";
import { usePhotos } from "../../../hooks/usePhotos";
import { usePeople } from "../../../hooks/usePeople";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url: string;
  storagePath?: string;
}

export default function Gallery({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  const { people, loading: peopleLoading } = usePeople();

  // Decode the URL parameter to handle spaces and special characters
  const decodedName = decodeURIComponent(resolvedParams.name);

  console.log("🖼️ Gallery: Looking for person:", decodedName);
  console.log("🖼️ Gallery: People available:", people.length);
  console.log(
    "🖼️ Gallery: People names:",
    people.map((p) => p.name)
  );

  const person = people.find(
    (p) => p.name.toLowerCase() === decodedName.toLowerCase()
  );

  console.log("🖼️ Gallery: Person found:", person ? person.name : "NOT FOUND");
  const {
    photos,
    loading: photosLoading,
    error,
    fetchPhotos,
    deletePhoto,
  } = usePhotos(person?.id);

  const handleUploadComplete = () => {
    if (person?.id) {
      fetchPhotos(person.id);
    }
  };

  if (peopleLoading || photosLoading) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-gray-600  font-light'>Loading...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-red-600 font-light'>
            Error loading photos: {error}
          </div>
        </div>
      </main>
    );
  }

  if (!person) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-gray-600  font-light'>Person not found</div>
        </div>
      </main>
    );
  }

  // Convert Firebase photos to the format expected by GalleryContent
  const photosWithDates: PhotoWithDate[] = photos.map((photo) => ({
    id: photo.id,
    filename: photo.filename,
    url: photo.url || "",
    storagePath: photo.storagePath,
    date: photo.takenAt ? formatDate(photo.takenAt) : undefined,
    dateObj: photo.takenAt,
  }));

  // Separate photos with known dates from those without
  const photosWithKnownDates = photosWithDates.filter((photo) => photo.dateObj);
  const photosWithUnknownDates = photosWithDates.filter(
    (photo) => !photo.dateObj
  );

  // Sort photos with known dates by date (most recent first)
  const sortedPhotos = photosWithKnownDates.sort((a, b) => {
    if (!a.dateObj || !b.dateObj) return 0;
    return b.dateObj.getTime() - a.dateObj.getTime(); // Most recent first
  });

  // Group photos by month/year
  const groupedPhotos = sortedPhotos.reduce((groups, photo) => {
    if (!photo.dateObj) return groups;
    const monthYear = `${photo.dateObj.getFullYear()}-${String(
      photo.dateObj.getMonth() + 1
    ).padStart(2, "0")}`;
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

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
      <GalleryContent
        files={photos.map((p) => p.filename)}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
        photosWithUnknownDates={photosWithUnknownDates}
        personName={decodedName}
        photos={photos}
        onUploadComplete={handleUploadComplete}
        onDeletePhoto={deletePhoto}
      />
    </main>
  );
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}
