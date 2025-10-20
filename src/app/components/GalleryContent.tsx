"use client";

import { useState } from "react";
import { GalleryHeader } from "./GalleryHeader";
import { CollapsibleMonth } from "../CollapsibleMonth";
import { UploadModal } from "./UploadModal";
import { EditUserForm } from "./EditUserForm";
import { EditAlbumForm } from "./EditAlbumForm";
import { useAlbums } from "../../hooks/useAlbums";
import { Person } from "../../types";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
  storagePath?: string;
}

interface GalleryContentProps {
  files: string[];
  sortedGroupKeys: string[];
  groupedPhotos: Record<string, PhotoWithDate[]>;
  photosWithUnknownDates?: PhotoWithDate[];
  allPhotos: PhotoWithDate[];
  personName?: string;
  person?: Person; // Add person object
  albumName?: string;
  albumId?: string;
  photos?: Array<{ url?: string; filename: string }>; // Firebase photos for URL access
  onUploadComplete?: () => void;
  onDeletePhoto?: (photoId: string, storagePath: string) => Promise<void>;
  isPublicView?: boolean;
}

export function GalleryContent({
  files,
  sortedGroupKeys,
  groupedPhotos,
  photosWithUnknownDates = [],
  allPhotos,
  personName,
  person,
  albumName,
  albumId,
  onUploadComplete,
  onDeletePhoto,
  isPublicView = false,
}: GalleryContentProps) {
  const { albums } = useAlbums();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const album = albums.find((a) => a.albumId === albumId);

  // Determine if we're in album mode or person mode
  const isAlbumMode = !!albumName && !!albumId;
  const isPersonMode = !!personName && !!person;
  const formatMonthYear = (key: string) => {
    const [year, month] = key.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };
  const [allExpanded, setAllExpanded] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
    {}
  );

  const toggleAllMonths = () => {
    const newExpanded = !allExpanded;
    setAllExpanded(newExpanded);

    // Update individual month states
    const newExpandedMonths: Record<string, boolean> = {};
    sortedGroupKeys.forEach((key) => {
      newExpandedMonths[key] = newExpanded;
    });
    setExpandedMonths(newExpandedMonths);
  };

  const toggleMonth = (groupKey: string) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));

    // Update allExpanded state based on individual month states
    const newExpandedMonths = {
      ...expandedMonths,
      [groupKey]: !expandedMonths[groupKey],
    };
    const allCurrentlyExpanded =
      Object.values(newExpandedMonths).every(Boolean);
    setAllExpanded(allCurrentlyExpanded);
  };

  return (
    <>
      {!isPublicView && (
        <GalleryHeader
          photoCount={files.length}
          onToggleAllMonths={toggleAllMonths}
          allExpanded={allExpanded}
          personName={personName}
          person={person}
          albumName={albumName}
          albumId={albumId}
          onUploadComplete={onUploadComplete}
          onShowUploadModal={() => setShowUploadModal(true)}
          onShowEditModal={() => setShowEditModal(true)}
        />
      )}

      {files.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 px-6'>
          <p className='text-lg text-gray-600  font-light text-center'>
            No photos found for this person.
          </p>
          <p className='text-sm text-gray-500  font-light mt-2'>
            Upload some photos to get started!
          </p>
        </div>
      ) : (
        <div className='max-w-7xl mx-auto px-2 sm:px-4 space-y-2'>
          {sortedGroupKeys.map((groupKey) => (
            <CollapsibleMonth
              key={groupKey}
              monthName={formatMonthYear(groupKey)}
              photos={groupedPhotos[groupKey]}
              allPhotos={allPhotos}
              isExpanded={expandedMonths[groupKey] ?? allExpanded}
              onToggle={() => toggleMonth(groupKey)}
              onDeletePhoto={isPublicView ? undefined : onDeletePhoto}
            />
          ))}

          {/* Date Unknown section */}
          {photosWithUnknownDates.length > 0 && (
            <CollapsibleMonth
              monthName={`Date Unknown (${photosWithUnknownDates.length})`}
              photos={photosWithUnknownDates}
              allPhotos={allPhotos}
              isExpanded={expandedMonths["date-unknown"] ?? allExpanded}
              onToggle={() => toggleMonth("date-unknown")}
              onDeletePhoto={isPublicView ? undefined : onDeletePhoto}
            />
          )}
        </div>
      )}

      {/* Modals */}
      {!isPublicView && (isPersonMode || isAlbumMode) && (
        <>
          <UploadModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            personId={isPersonMode ? person?.id : undefined}
            albumId={isAlbumMode ? albumId : undefined}
            personName={isPersonMode ? person?.name : undefined}
            albumName={isAlbumMode ? albumName : undefined}
            storageId={isPersonMode ? person?.storageId : albumId}
            onUploadComplete={onUploadComplete}
          />
          {isPersonMode && person && (
            <EditUserForm
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              person={person}
            />
          )}
          {isAlbumMode && album && (
            <EditAlbumForm
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
              album={album}
            />
          )}
        </>
      )}
    </>
  );
}
