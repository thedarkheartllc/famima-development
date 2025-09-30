import Link from "next/link";

export default function AdminPage() {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Admin Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Manage your family photo gallery
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Link
            href='/admin/upload'
            className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <div className='text-center'>
              <div className='text-4xl mb-4'>📸</div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Upload Photos
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Add new photos to your family gallery
              </p>
            </div>
          </Link>

          <Link
            href='/'
            className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <div className='text-center'>
              <div className='text-4xl mb-4'>👥</div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                View Gallery
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Browse your family photo collection
              </p>
            </div>
          </Link>

          <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md opacity-50'>
            <div className='text-center'>
              <div className='text-4xl mb-4'>⚙️</div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                Settings
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
