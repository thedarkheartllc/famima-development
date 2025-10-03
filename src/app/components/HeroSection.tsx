import Link from "next/link";
import { Logo } from "./Logo";

export function HeroSection() {
  return (
    <section className='pt-32 pb-20 px-6 bg-gradient-to-b from-white to-green-50/30'>
      <div className='max-w-6xl mx-auto text-center space-y-8 flex flex-col items-center'>
        <Logo size='xlarge' />
        <h1 className='text-5xl md:text-6xl font-light tracking-wide text-gray-900 leading-tight'>
          A safe and private space <br /> to share family memories
        </h1>
        <p className='text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed'>
          No ads. No doomscrolling. No noise.
        </p>
        <p className='text-lg text-gray-600  max-w-2xl mx-auto'>
          Just your family, your photos, your peace of mind.
        </p>
        <div className='pt-6'>
          <Link
            href='/login'
            className='inline-block px-12 py-4 bg-gray-900  text-white  rounded-full font-light text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
