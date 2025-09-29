import fs from "fs";
import path from "path";
import Image from "next/image";
import { parse } from "exifr";

interface PhotoWithDate {
  filename: string;
  date?: string;
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
          // Replace first 3 colons with slashes for proper parsing
          const formattedDateString = dateTime
            .replace(/:/g, "/")
            .replace(/\//, "/")
            .replace(/\//, "/");
          date = new Date(formattedDateString);
        } else {
          date = new Date(dateTime);
        }
      } else {
        date = new Date(dateTime);
      }

      console.log(`Parsed date: ${date} (valid: ${!isNaN(date.getTime())})`);

      if (!isNaN(date.getTime())) {
        // Format as MM/DD/YYYY
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
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

export default async function Gallery() {
  const photosDir = path.join(process.cwd(), "public/photos");

  // Check if photos directory exists, if not return empty array
  let files: string[] = [];
  try {
    files = fs.readdirSync(photosDir);
    console.log("Found files:", files);
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
      return { filename, date };
    })
  );

  console.log("All photos with dates:", photosWithDates);

  // Sort photos by date (most recent first)
  const sortedPhotos = photosWithDates.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1; // photos without dates go to end
    if (!b.date) return -1; // photos without dates go to end

    // Parse dates for comparison (MM/DD/YYYY format)
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  console.log("Sorted photos (most recent first):", sortedPhotos);

  return (
    <main className='bg-black min-h-screen p-4'>
      <h1 className='text-white text-3xl mb-5'>Gunnar's Photo Gallery</h1>
      <p className='text-white mb-5'>Found {files.length} photos</p>

      {files.length === 0 ? (
        <p className='text-white'>No photos found in /public/photos/</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8'>
          {sortedPhotos.map((photo) => (
            <div key={photo.filename} className='flex flex-col'>
              <div className='relative w-full h-80 mb-2 border border-white rounded'>
                <Image
                  src={`/photos/${photo.filename}`}
                  alt={photo.filename}
                  fill
                  className='object-cover rounded'
                />
              </div>
              {photo.date && (
                <p className='text-white text-sm text-right '>{photo.date}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
