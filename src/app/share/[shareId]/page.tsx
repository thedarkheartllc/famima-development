"use client";

import { use } from "react";
import { GalleryContent } from "../../components/GalleryContent";
import { usePhotos } from "../../../hooks/usePhotos";
import { useShareLinks } from "../../../hooks/useShareLinks";
import { useEffect, useState, useRef } from "react";
import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { PublicShareHeader } from "../../components/PublicShareHeader";
import { ShareLink } from "../../../types";

interface PhotoWithDate {
  id?: string;
  filename: string;
  date?: string;
  dateObj?: Date;
  url: string;
  storagePath?: string;
}

export default function PublicShare({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const resolvedParams = use(params);
  const { getShareLink, trackView } = useShareLinks();
  const [shareLink, setShareLink] = useState<ShareLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedView = useRef(false);

  const {
    photos,
    loading: photosLoading,
    error: photosError,
  } = usePhotos(shareLink?.personId, undefined, true);

  // Fetch share link details
  useEffect(() => {
    const fetchShareLink = async () => {
      try {
        const link = await getShareLink(resolvedParams.shareId);

        if (!link) {
          setError("Share link not found");
          setLoading(false);
          return;
        }

        if (!link.isActive) {
          setError("This share link has been disabled");
          setLoading(false);
          return;
        }

        setShareLink(link);

        // Track the view only once per component instance
        if (!hasTrackedView.current) {
          console.log("Tracking view for share link:", resolvedParams.shareId);
          hasTrackedView.current = true;
          await trackView(resolvedParams.shareId);
        } else {
          console.log("View already tracked for this component instance");
        }
      } catch (err) {
        setError("Failed to load share link");
        console.error("Error fetching share link:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShareLink();
  }, [resolvedParams.shareId, getShareLink, trackView]);

  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };

  if (loading) {
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
          <div className='text-red-600 font-light'>{error}</div>
        </div>
      </main>
    );
  }

  if (photosError) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className='text-red-600 font-light'>
            Error loading photos: {photosError}
          </div>
        </div>
      </main>
    );
  }

  if (photosLoading) {
    return (
      <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
        <div className='flex justify-center items-center min-h-[60vh]'>
          <Loading message='Loading photos...' />
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

  // Create combined array of all photos (sorted by date, most recent first)
  const allPhotos = [...sortedPhotos, ...photosWithUnknownDates];

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
      <PublicShareHeader shareLink={shareLink} photoCount={photos.length} />

      <GalleryContent
        files={photos.map((p) => p.filename)}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
        photosWithUnknownDates={photosWithUnknownDates}
        allPhotos={allPhotos}
        personName={shareLink?.personName}
        photos={photos}
        isPublicView={true}
      />

      <Footer />
    </main>
  );
}
