"use client";

import { AppHeader } from "../components/AppHeader";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import Image from "next/image";
import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlinePhoto,
  HiOutlineFolder,
} from "react-icons/hi2";

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AppHeader showSignIn={true} />

      <main className='max-w-4xl mx-auto px-4 sm:px-6 py-20'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl font-light text-gray-900 mb-4'>
            Simple, Transparent Pricing
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-8'>
            No hidden fees. No recurring bills unless you want them. Just your
            family, your photos, your peace of mind.
          </p>

          {/* Hero Image */}
          <div className='relative w-full max-w-2xl mx-auto h-64 rounded-lg overflow-hidden shadow-lg'>
            <Image
              src='/homepage/famima-1.jpg'
              alt='Happy family moments'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>

        <div className='max-w-md mx-auto mb-16'>
          {/* Famima Family */}
          <div className='bg-white rounded-lg border-2 border-green-200 p-8 relative'>
            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
              <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                Most Popular
              </span>
            </div>

            <div className='text-center'>
              <h3 className='text-2xl font-light text-gray-900 mb-2'>
                Famima Family
              </h3>
              <div className='text-4xl font-light text-gray-900 mb-4'>
                $49.99
              </div>
              <p className='text-gray-600 mb-6'>One-time payment</p>
            </div>

            <ul className='space-y-3 mb-8'>
              <li className='flex items-center text-gray-700'>
                <HiOutlinePhoto className='text-green-600 mr-3' />
                Up to 10,000 photos
              </li>
              <li className='flex items-center text-gray-700'>
                <HiOutlineUsers className='text-green-600 mr-3' />
                Unlimited family members
              </li>
              <li className='flex items-center text-gray-700'>
                <HiOutlineLockClosed className='text-green-600 mr-3' />
                Private galleries
              </li>
              <li className='flex items-center text-gray-700'>
                <HiOutlineSparkles className='text-green-600 mr-3' />
                Family tree view
              </li>
            </ul>

            <Button variant='primary' className='w-full'>
              Choose Famima Family
            </Button>
          </div>
        </div>

        {/* Ethos Section */}
        <div className='text-center mt-20'>
          <h2 className='text-3xl font-light text-gray-900 mb-8'>
            Why Choose Famima?
          </h2>

          {/* Family Photo */}
          <div className='relative w-full max-w-lg mx-auto h-48 mb-12 rounded-lg overflow-hidden shadow-lg'>
            <Image
              src='/homepage/famima-15.jpg'
              alt='Family memories'
              fill
              className='object-cover'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div className='flex items-start'>
                <HiOutlineShieldCheck className='text-green-600 mr-3 mt-1' />
                <div>
                  <h4 className='font-medium text-gray-900'>Privacy First</h4>
                  <p className='text-gray-600'>Your data is yours, always.</p>
                </div>
              </div>
              <div className='flex items-start'>
                <HiOutlineHeart className='text-green-600 mr-3 mt-1' />
                <div>
                  <h4 className='font-medium text-gray-900'>
                    No Ads or Algorithms
                  </h4>
                  <p className='text-gray-600'>
                    Free from distractions and noise.
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-start'>
                <HiOutlineLockClosed className='text-green-600 mr-3 mt-1' />
                <div>
                  <h4 className='font-medium text-gray-900'>Simple & Secure</h4>
                  <p className='text-gray-600'>
                    End-to-end protection of your family&apos;s memories.
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <HiOutlineFolder className='text-green-600 mr-3 mt-1' />
                <div>
                  <h4 className='font-medium text-gray-900'>Legacy Archive</h4>
                  <p className='text-gray-600'>
                    Preserve memories for future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
