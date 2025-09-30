import { GalleryContent } from "../../components/GalleryContent";
import { usePhotos } from "../../../hooks/usePhotos";
import { usePeople } from "../../../hooks/usePeople";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
  url: string;
}

export default async function Gallery({
  params,
}: {
  params: { name: string };
}) {
  // This will be a client component that fetches from Firebase
  // For now, we'll create a client component wrapper
  return <GalleryClient personName={params.name} />;
}

function GalleryClient({ personName }: { personName: string }) {
  const { people, loading: peopleLoading } = usePeople();
  const person = people.find(
    (p) => p.name.toLowerCase() === personName.toLowerCase()
  );
  const { photos, loading: photosLoading, error } = usePhotos(person?.id);

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
    date: photo.takenAt ? formatDate(photo.takenAt) : undefined,
    dateObj: photo.takenAt,
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

  if (!hasPhotos) {
    return (
      <main className='bg-black dark:bg-white min-h-screen p-4'>
        <div className='flex justify-between items-center mb-5'>
          <div>
            <h1 className='text-3xl text-white dark:text-black capitalize'>
              {personName}&apos;s Gallery
            </h1>
            <p className='text-white dark:text-black'>0 photos</p>
          </div>

          <div className='flex gap-3'>
            <a
              href='/'
              className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
              aria-label='Go to home'
            >
              <svg
                className='w-6 h-6 text-white dark:text-black'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </a>

            <button
              className='p-3 rounded-full bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors'
              aria-label='Toggle theme'
            >
              <svg
                className='w-6 h-6 text-yellow-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <p className='text-2xl text-white dark:text-black mb-4'>
              Nothing here yet
            </p>
            <p className='text-6xl'>😢</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='bg-black dark:bg-white min-h-screen p-4'>
      <GalleryContent
        files={photos.map((p) => p.filename)}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
        personName={personName}
        photos={photos} // Pass Firebase photos for URL access
      />
    </main>
  );
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}
