"use client";

import Link from "next/link";
import { AppHeader } from "./components/AppHeader";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  return (
    <div className='bg-white'>
      <AppHeader showSignIn fixed />

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-6 bg-gradient-to-b from-white to-green-50/30'>
        <div className='max-w-6xl mx-auto text-center space-y-8'>
          <h1 className='text-5xl md:text-7xl font-light tracking-wide text-gray-900 leading-tight'>
            A safe space for your photos
          </h1>
          <p className='text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Simple. Private. Peaceful.
          </p>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Not another social media app. A digital home for the people who
            matter most.
          </p>
          <div className='pt-6'>
            <Link
              href='/login'
              className='inline-block px-12 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image Placeholder */}
      <section className='px-6 pb-20'>
        <div className='max-w-5xl mx-auto'>
          <div className='aspect-video bg-gradient-to-br from-green-100 to-green-50 rounded-3xl shadow-xl flex items-center justify-center'>
            <p className='text-gray-400 font-light text-lg'>Hero Image</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-6 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900 text-center mb-16'>
            What Makes Famima Different
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-green-50/50 rounded-2xl p-8 text-center space-y-3'>
              <div className='text-3xl'>🛡️</div>
              <h3 className='text-lg font-light text-gray-900'>
                Safe by Design
              </h3>
              <p className='text-sm text-gray-600'>
                No noise, no politics, no rage baiting
              </p>
            </div>
            <div className='bg-green-50/50 rounded-2xl p-8 text-center space-y-3'>
              <div className='text-3xl'>🔒</div>
              <h3 className='text-lg font-light text-gray-900'>
                Private by Default
              </h3>
              <p className='text-sm text-gray-600'>
                Your photos stay with family, not advertisers
              </p>
            </div>
            <div className='bg-green-50/50 rounded-2xl p-8 text-center space-y-3'>
              <div className='text-3xl'>✨</div>
              <h3 className='text-lg font-light text-gray-900'>
                Simple to Use
              </h3>
              <p className='text-sm text-gray-600'>
                Upload, share, and view in a clean grid
              </p>
            </div>
            <div className='bg-green-50/50 rounded-2xl p-8 text-center space-y-3'>
              <div className='text-3xl'>🕊️</div>
              <h3 className='text-lg font-light text-gray-900'>
                Respectful of Your Time
              </h3>
              <p className='text-sm text-gray-600'>
                No manipulation, no endless feeds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section className='py-20 px-6 bg-gradient-to-b from-white to-green-50/20'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6'>
            <h2 className='text-4xl md:text-5xl font-light text-gray-900'>
              Connection Without Distraction
            </h2>
            <p className='text-lg text-gray-600 leading-relaxed'>
              Most platforms profit from stealing your focus. Famima is built
              for something else.
            </p>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3'>
                <span className='text-green-600 mt-1'>✓</span>
                <span className='text-gray-600'>
                  Share travel photos with grandparents
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-600 mt-1'>✓</span>
                <span className='text-gray-600'>
                  Post your kids&apos; milestones without worry
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-green-600 mt-1'>✓</span>
                <span className='text-gray-600'>
                  Keep family memories in one safe place
                </span>
              </li>
            </ul>
          </div>
          <div className='aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-3xl shadow-lg flex items-center justify-center'>
            <p className='text-gray-400 font-light text-lg'>Feature Image</p>
          </div>
        </div>
      </section>

      {/* What You Won't Find */}
      <section className='py-20 px-6 bg-white'>
        <div className='max-w-4xl mx-auto text-center space-y-12'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900'>
            What You Won&apos;t Find
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='space-y-2'>
              <div className='text-gray-400 text-4xl'>✕</div>
              <p className='text-gray-600'>No doomscrolling</p>
            </div>
            <div className='space-y-2'>
              <div className='text-gray-400 text-4xl'>✕</div>
              <p className='text-gray-600'>No advertisements</p>
            </div>
            <div className='space-y-2'>
              <div className='text-gray-400 text-4xl'>✕</div>
              <p className='text-gray-600'>No NSFW</p>
            </div>
            <div className='space-y-2'>
              <div className='text-gray-400 text-4xl'>✕</div>
              <p className='text-gray-600'>No addiction</p>
            </div>
          </div>
          <div className='pt-8 space-y-3 text-gray-700 text-xl font-light'>
            <p>Just you.</p>
            <p>Your family.</p>
            <p>Your peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-20 px-6 bg-gradient-to-b from-green-50/30 to-white'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900'>
            Start Small. Share Simply.
          </h2>
          <p className='text-xl text-gray-600'>
            Be part of something calmer. A digital space that actually feels
            good to use.
          </p>
          <Link
            href='/login'
            className='inline-block px-12 py-4 bg-gray-900 text-white rounded-full font-light text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
          >
            Join Famima
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
