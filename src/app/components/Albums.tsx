"use client";

import Link from "next/link";
import { Album } from "@/types";
import { HiFolder, HiCalendar, HiDocumentText } from "react-icons/hi2";

interface AlbumsProps {
  albums: Album[];
}

export function Albums({ albums }: AlbumsProps) {
  const renderAlbumCard = (album: Album) => {
    const albumColor = album.color || "from-sky-200 to-sky-300";

    return (
      <Link
        key={album.albumId}
        href={`/album/${album.albumId}`}
        className='group transition-all duration-300 hover:scale-105'
      >
        <div className='flex flex-col items-center gap-3'>
          <div
            className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${albumColor} flex flex-col items-center justify-center text-gray-700 font-light shadow-sm group-hover:shadow-lg transition-all duration-300 p-4`}
          >
            <HiFolder className='w-8 h-8 mb-2' />
            <div className='text-sm font-medium text-center leading-tight'>
              {album.name}
            </div>
          </div>

          {/* Album Details */}
          <div className='text-center space-y-1 max-w-32'>
            {album.eventDate && (
              <div className='flex items-center justify-center gap-1 text-xs text-gray-500'>
                <HiCalendar className='w-3 h-3' />
                <span>
                  {new Date(album.eventDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {album.description && (
              <div className='flex items-center justify-center gap-1 text-xs text-gray-500'>
                <HiDocumentText className='w-3 h-3' />
                <span className='truncate' title={album.description}>
                  {album.description}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className='flex flex-col items-center space-y-8'>
      {/* Albums Header */}
      <div className='text-center space-y-3'>
        <h2 className='text-3xl font-light text-gray-900'>Albums</h2>
        <p className='text-gray-600 font-light'>
          Collections of photos from special events and moments
        </p>
      </div>

      {/* Albums Grid */}
      {albums.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full max-w-6xl'>
          {albums.map((album) => renderAlbumCard(album))}
        </div>
      ) : (
        <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-sm text-center max-w-md'>
          <HiFolder className='w-12 h-12 text-gray-400 mx-auto mb-4' />
          <p className='text-lg text-gray-600 font-light'>
            No albums created yet.
          </p>
          <p className='text-sm text-gray-500 font-light mt-3'>
            Use the &quot;Add Album&quot; button in the header to create your
            first album!
          </p>
        </div>
      )}
    </div>
  );
}
