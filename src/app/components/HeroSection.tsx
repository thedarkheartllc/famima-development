import Link from "next/link";
import { Logo } from "./Logo";

export function HeroSection() {
  return (
    <section className='pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 bg-gradient-to-b from-white to-green-50/30'>
      <div className='max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 flex flex-col items-center'>
        <Logo size='xlarge' />
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-gray-900 leading-tight px-2'>
          A safe and private space <br className='hidden sm:block' /> to share
          family memories
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed px-2'>
          No ads. No doomscrolling. No noise.
        </p>
        <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2'>
          Just your family, your photos, your peace of mind.
        </p>
        <div className='pt-4 sm:pt-6'>
          <Link
            href='/login'
            className='inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gray-900 text-white rounded-full font-light text-base sm:text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
