"use client";

import { useState } from "react";
import { GalleryHeader } from "./Header";
import { CollapsibleMonth } from "../CollapsibleMonth";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
  url?: string;
}

interface GalleryContentProps {
  files: string[];
  sortedGroupKeys: string[];
  groupedPhotos: Record<string, PhotoWithDate[]>;
  personName?: string;
  photos?: Array<{ url?: string; filename: string }>; // Firebase photos for URL access
  onUploadComplete?: () => void;
}

export function GalleryContent({
  files,
  sortedGroupKeys,
  groupedPhotos,
  personName,
  onUploadComplete,
}: GalleryContentProps) {
  const formatMonthYear = (key: string) => {
    const [year, month] = key.split("-");
    const date = new Date(parseInt(year), parseInt(month));
    return date.toLocaleDateString("en-US", { month: "long" });
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
      <GalleryHeader
        photoCount={files.length}
        onToggleAllMonths={toggleAllMonths}
        allExpanded={allExpanded}
        personName={personName}
        onUploadComplete={onUploadComplete}
      />

      {files.length === 0 ? (
        <p className='text-white dark:text-black'>
          No photos found in /public/photos/
        </p>
      ) : (
        <div className='space-y-10 mx-32'>
          {sortedGroupKeys.map((groupKey) => (
            <CollapsibleMonth
              key={groupKey}
              monthName={formatMonthYear(groupKey)}
              photos={groupedPhotos[groupKey]}
              isExpanded={expandedMonths[groupKey] ?? allExpanded}
              onToggle={() => toggleMonth(groupKey)}
            />
          ))}
        </div>
      )}
    </>
  );
}
