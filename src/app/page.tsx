import Link from "next/link";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <main className='bg-black dark:bg-white min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-6xl font-bold text-white dark:text-black mb-16'>
          Famima
        </h1>

        <div className='flex flex-col items-center space-y-8'>
          <div className='flex flex-wrap justify-center gap-8'>
            <Link
              href='/gallery/gunnar'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Gunnar
              </div>
            </Link>

            <Link
              href='/gallery/austin'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Austin
              </div>
            </Link>

            <Link
              href='/gallery/payton'
              className='group transition-transform duration-300 hover:scale-110'
            >
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300'>
                Payton
              </div>
            </Link>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
