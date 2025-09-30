import Link from "next/link";
import { FaHeart, FaBaby } from "react-icons/fa";

export function FamilyTree() {
  return (
    <div className='flex flex-col items-center space-y-8'>
      {/* Parents - Chris and Amy with slight overlap */}
      <div className='flex justify-center items-center -space-x-4 relative'>
        <Link
          href='/gallery/chris'
          className='group transition-transform duration-300 hover:scale-110 z-10'
        >
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
            Chris
          </div>
        </Link>

        <Link
          href='/gallery/amy'
          className='group transition-transform duration-300 hover:scale-110 z-20'
        >
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-sky-300 to-sky-500 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
            Amy
          </div>
        </Link>

        {/* Heart icon in center of overlap */}
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none'>
          <FaHeart className='text-white text-lg' />
        </div>
      </div>

      {/* Children */}
      <div className='flex flex-wrap justify-center gap-8'>
        {/* Austin and Neda with overlap */}
        <div className='flex flex-col items-center'>
          <div className='flex justify-center items-center -space-x-4 relative'>
            <Link
              href='/gallery/austin'
              className='group transition-transform duration-300 hover:scale-110 z-10'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <div>Austin</div>
                <div className='text-xs opacity-80'>04/23/91</div>
              </div>
            </Link>

            <Link
              href='/gallery/neda'
              className='group transition-transform duration-300 hover:scale-110 z-20'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Neda
              </div>
            </Link>

            {/* Heart icon in center of overlap */}
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none'>
              <FaHeart className='text-white text-lg' />
            </div>
          </div>

          {/* Mila below Austin/Neda */}
          <div className='mt-4'>
            <Link
              href='/gallery/mila'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <FaBaby className='text-sm mb-1' />
                <div className='text-xs'>Mila</div>
              </div>
            </Link>
          </div>
        </div>

        <Link
          href='/gallery/gunnar'
          className='group transition-transform duration-300 hover:scale-110'
        >
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-lime-400 to-lime-600 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <div>Gunnar</div>
            <div className='text-xs opacity-80'>11/19/93</div>
          </div>
        </Link>

        {/* Payton with Amelia below */}
        <div className='flex flex-col items-center'>
          <Link
            href='/gallery/payton'
            className='group transition-transform duration-300 hover:scale-110'
          >
            <div className='w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div>Payton</div>
              <div className='text-xs opacity-80'>10/11/97</div>
            </div>
          </Link>

          {/* Amelia below Payton */}
          <div className='mt-4'>
            <Link
              href='/gallery/amelia'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex flex-col items-center justify-center text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <FaBaby className='text-sm mb-1' />
                <div className='text-xs'>Amelia</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
