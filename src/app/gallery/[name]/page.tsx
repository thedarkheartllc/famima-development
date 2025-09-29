import fs from "fs";
import path from "path";
import { parse } from "exifr";
import { GalleryContent } from "../../components/GalleryContent";

interface PhotoWithDate {
  filename: string;
  date?: string;
  dateObj?: Date;
}

async function getPhotoDate(filePath: string): Promise<string | undefined> {
  try {
    const buffer = fs.readFileSync(filePath);
    const exif = await parse(buffer);

    console.log(`EXIF data for ${path.basename(filePath)}:`, {
      dateTimeOriginal: exif?.DateTimeOriginal,
      dateTime: exif?.DateTime,
      dateTimeDigitized: exif?.DateTimeDigitized,
    });

    // Try different date fields in order of preference
    const dateTime =
      exif?.DateTimeOriginal || exif?.DateTime || exif?.DateTimeDigitized;

    if (dateTime) {
      console.log(`Raw dateTime value: ${dateTime} (type: ${typeof dateTime})`);

      // Handle different date formats
      let date: Date;
      if (typeof dateTime === "string") {
        // iPhone EXIF dates are often in format "2025:07:28 17:08:38"
        if (dateTime.includes(":")) {
          // Convert "2025:07:28 17:08:38" to "2025-07-28T17:08:38"
          const parts = dateTime.split(" ");
          const datePart = parts[0].replace(/:/g, "-");
          const timePart = parts[1] || "00:00:00";
          const formattedDateString = `${datePart}T${timePart}`;
          date = new Date(formattedDateString);
        } else {
          date = new Date(dateTime);
        }
      } else {
        date = new Date(dateTime);
      }

      console.log(`Parsed date: ${date} (valid: ${!isNaN(date.getTime())})`);

      if (!isNaN(date.getTime())) {
        // Format as MM/DD
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${month}/${day}`;
        console.log(
          `Found date for ${path.basename(filePath)}: ${formattedDate}`
        );
        return formattedDate;
      }
    }
  } catch (error) {
    console.log(`Could not read EXIF data for ${filePath}:`, error);
  }
  return undefined;
}

export default async function Gallery({
  params,
}: {
  params: { name: string };
}) {
  // Create person-specific photos directory
  const photosDir = path.join(
    process.cwd(),
    "public/photos",
    params.name.toLowerCase()
  );

  // Check if photos directory exists, if not return empty array
  let files: string[] = [];
  try {
    const allFiles = fs.readdirSync(photosDir);
    // Filter for common iPhone image formats
    const imageExtensions = [".jpg", ".jpeg", ".png", ".heic", ".heif"];
    files = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    console.log("Found image files:", files);
  } catch (error) {
    // Directory doesn't exist yet
    console.log("Photos directory not found:", error);
  }

  // Extract dates for each photo
  const photosWithDates: PhotoWithDate[] = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(photosDir, filename);
      const date = await getPhotoDate(filePath);
      console.log(`Photo ${filename}: date = ${date || "no date found"}`);

      let dateObj: Date | undefined;
      if (date) {
        dateObj = new Date(date);
      }

      return { filename, date, dateObj };
    })
  );

  console.log("All photos with dates:", photosWithDates);

  // Filter out photos without dates and sort by date (most recent first)
  const photosWithValidDates = photosWithDates.filter((photo) => photo.date);
  const sortedPhotos = photosWithValidDates.sort((a, b) => {
    // Parse dates for comparison (MM/DD/YYYY format)
    const dateA = new Date(a.date!);
    const dateB = new Date(b.date!);

    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  console.log("Sorted photos (most recent first):", sortedPhotos);

  // Group photos by month/year
  const groupedPhotos = sortedPhotos.reduce((groups, photo) => {
    const monthYear = `${photo.dateObj!.getFullYear()}-${photo.dateObj!.getMonth()}`;
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
  const hasPhotos = files.length > 0;

  if (!hasPhotos) {
    return (
      <main className='bg-black dark:bg-white min-h-screen p-4'>
        <div className='flex justify-between items-center mb-5'>
          <div>
            <h1 className='text-3xl text-white dark:text-black'>
              {params.name.charAt(0).toUpperCase() + params.name.slice(1)}
              &apos;s Gallery
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
        files={files}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
        personName={params.name}
      />
    </main>
  );
}
