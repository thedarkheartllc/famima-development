import Link from "next/link";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <main className='bg-black dark:bg-white min-h-screen flex flex-col items-center justify-center p-4'>
        <div className='text-center mb-16'>
          <h1
            className='text-6xl font-bold text-white dark:text-black'
            style={{ fontFamily: '"Style Script", cursive' }}
          >
            Famima
          </h1>
          <p className='text-xl text-white dark:text-black opacity-80'>
            stay connected with family
          </p>
        </div>

        <div className='flex flex-col items-center space-y-8'>
          {/* Parents - Amy and Chris with slight overlap */}
          <div className='flex justify-center items-center -space-x-4'>
            <Link
              href='/gallery/amy'
              className='group transition-transform duration-300 hover:scale-110 z-10'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Amy
              </div>
            </Link>

            <Link
              href='/gallery/chris'
              className='group transition-transform duration-300 hover:scale-110 z-20'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Chris
              </div>
            </Link>
          </div>

          {/* Children */}
          <div className='flex flex-wrap justify-center gap-8'>
            <Link
              href='/gallery/gunnar'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <div>Gunnar</div>
                <div className='text-xs opacity-80'>11/19/93</div>
              </div>
            </Link>

            {/* Austin and Neda with overlap */}
            <div className='flex flex-col items-center'>
              <div className='flex justify-center items-center -space-x-4'>
                <Link
                  href='/gallery/austin'
                  className='group transition-transform duration-300 hover:scale-110 z-10'
                >
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <div>Austin</div>
                    <div className='text-xs opacity-80'>04/23/91</div>
                  </div>
                </Link>

                <Link
                  href='/gallery/neda'
                  className='group transition-transform duration-300 hover:scale-110 z-20'
                >
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    Neda
                  </div>
                </Link>
              </div>

              {/* Mila below Austin/Neda */}
              <div className='mt-4'>
                <Link
                  href='/gallery/mila'
                  className='group transition-transform duration-300 hover:scale-110'
                >
                  <div className='w-20 h-20 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    Mila
                  </div>
                </Link>
              </div>
            </div>

            {/* Payton with Amelia below */}
            <div className='flex flex-col items-center'>
              <Link
                href='/gallery/payton'
                className='group transition-transform duration-300 hover:scale-110'
              >
                <div className='w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex flex-col items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
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
                  <div className='w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    Amelia
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
