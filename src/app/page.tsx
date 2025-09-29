import fs from "fs";
import path from "path";
import { parse } from "exifr";
import { GalleryContent } from "./components/GalleryContent";

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

      let dateObj: Date | undefined;
      if (date) {
        dateObj = new Date(date);
      }

      return { filename, date, dateObj };
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

  // Group photos by month/year
  const groupedPhotos = sortedPhotos.reduce((groups, photo) => {
    if (photo.dateObj) {
      const monthYear = `${photo.dateObj.getFullYear()}-${photo.dateObj.getMonth()}`;
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(photo);
    } else {
      // Photos without dates go in a special group
      if (!groups["no-date"]) {
        groups["no-date"] = [];
      }
      groups["no-date"].push(photo);
    }
    return groups;
  }, {} as Record<string, PhotoWithDate[]>);

  // Sort group keys (most recent first, no-date last)
  const sortedGroupKeys = Object.keys(groupedPhotos).sort((a, b) => {
    if (a === "no-date") return 1;
    if (b === "no-date") return -1;
    return b.localeCompare(a); // Most recent first
  });

  return (
    <main className='bg-black dark:bg-white min-h-screen p-4'>
      <GalleryContent
        files={files}
        sortedGroupKeys={sortedGroupKeys}
        groupedPhotos={groupedPhotos}
      />
    </main>
  );
}
