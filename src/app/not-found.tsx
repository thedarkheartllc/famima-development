import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50/30'>
      <div className='text-center'>
        <h1 className='text-6xl font-light text-gray-900 mb-4'>404</h1>
        <p className='text-xl text-gray-600 font-light mb-8'>Page not found</p>
        <Link
          href='/'
          className='inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-light'
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
