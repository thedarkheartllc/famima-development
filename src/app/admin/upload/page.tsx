import { PhotoUpload } from "../../components/PhotoUpload";

export default function UploadPage() {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Photo Upload
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Upload photos to your family gallery
          </p>
        </div>

        <PhotoUpload />
      </div>
    </main>
  );
}
