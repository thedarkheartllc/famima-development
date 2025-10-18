"use client";

import { useState } from "react";
import { GalleryHeader } from "./GalleryHeader";
import { CollapsibleMonth } from "../CollapsibleMonth";

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
  personName?: string;
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
  personName,
  albumName,
  albumId,
  onUploadComplete,
  onDeletePhoto,
  isPublicView = false,
}: GalleryContentProps) {
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
          albumName={albumName}
          albumId={albumId}
          onUploadComplete={onUploadComplete}
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
        <div className='max-w-7xl mx-auto px-4 sm:px-6 space-y-12'>
          {sortedGroupKeys.map((groupKey) => (
            <CollapsibleMonth
              key={groupKey}
              monthName={formatMonthYear(groupKey)}
              photos={groupedPhotos[groupKey]}
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
              isExpanded={expandedMonths["date-unknown"] ?? allExpanded}
              onToggle={() => toggleMonth("date-unknown")}
              onDeletePhoto={isPublicView ? undefined : onDeletePhoto}
            />
          )}
        </div>
      )}
    </>
  );
}
