"use client";

import { use } from "react";
import { GalleryContent } from "../../components/GalleryContent";
import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { usePhotos } from "../../../hooks/usePhotos";
import { useAlbums } from "../../../hooks/useAlbums";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url: string;
  storagePath?: string;
}

export default function AlbumPage({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const resolvedParams = use(params);
  const { albums, loading: albumsLoading } = useAlbums();

  // Decode the URL parameter to handle spaces and special characters
  const decodedAlbumId = decodeURIComponent(resolvedParams.albumId);

  console.log("📚 Album: Looking for album:", decodedAlbumId);
  console.log("📚 Album: Albums available:", albums.length);
  console.log(
    "📚 Album: Album IDs:",
    albums.map((a) => a.albumId)
  );

  const album = albums.find((a) => a.albumId === decodedAlbumId);

  console.log("📚 Album: Album found:", album ? album.name : "NOT FOUND");

  // Use the album's ID to fetch photos for this specific album
  const {
    photos,
    loading: photosLoading,
    error,
    fetchPhotos,
    deletePhoto,
  } = usePhotos(undefined, album?.albumId); // Pass albumId to filter photos

  const handleUploadComplete = () => {
    // Fetch photos for the specific album
    if (album?.albumId) {
      fetchPhotos(undefined, album.albumId);
    }
  };

  if (albumsLoading || photosLoading) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-red-600 font-light'>
            Error loading photos: {error}
          </div>
        </div>
      </main>
    );
  }

  if (!album) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-gray-600 font-light'>Album not found</div>
        </div>
      </main>
    );
  }

  // Photos are already filtered by albumId in the usePhotos hook
  const albumPhotos = photos;

  // Convert Firebase photos to the format expected by GalleryContent
  const photosWithDates: PhotoWithDate[] = albumPhotos.map((photo) => ({
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

  // Create combined array of all photos (sorted by date, most recent first)
  const allPhotos = [...sortedPhotos, ...photosWithUnknownDates];

  return (
    <>
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <GalleryContent
          files={albumPhotos.map((p) => p.filename)}
          sortedGroupKeys={sortedGroupKeys}
          groupedPhotos={groupedPhotos}
          photosWithUnknownDates={photosWithUnknownDates}
          allPhotos={allPhotos}
          albumName={album.name}
          albumId={album.albumId}
          photos={albumPhotos}
          onUploadComplete={handleUploadComplete}
          onDeletePhoto={deletePhoto}
        />
      </main>
      <Footer />
    </>
  );
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}
