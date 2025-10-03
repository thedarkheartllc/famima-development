"use client";

import { AppHeader } from "../components/AppHeader";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AppHeader showSignIn={true} />

      <main className='max-w-4xl mx-auto px-4 sm:px-6 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl sm:text-5xl font-light text-gray-900 mb-4'>
            Simple, Transparent Pricing
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            No hidden fees. No recurring bills unless you want them. Just your
            family, your photos, your peace of mind.
          </p>
        </div>

        <div className='max-w-md mx-auto mb-12'>
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
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3'></span>
                Up to 10,000 photos
              </li>
              <li className='flex items-center text-gray-700'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3'></span>
                5 family members included
              </li>
              <li className='flex items-center text-gray-700'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3'></span>
                Private galleries
              </li>
              <li className='flex items-center text-gray-700'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3'></span>
                Family tree view
              </li>
            </ul>

            <Button variant='primary' className='w-full'>
              Choose Famima Family
            </Button>
          </div>
        </div>

        {/* Additional Family Members */}
        <div className='bg-white rounded-lg border border-gray-200 p-8 mb-12'>
          <div className='text-center'>
            <h3 className='text-2xl font-light text-gray-900 mb-4'>
              Add Family Members
            </h3>
            <div className='text-3xl font-light text-gray-900 mb-2'>$5</div>
            <p className='text-gray-600 mb-6'>One-time per additional member</p>
            <p className='text-sm text-gray-500'>
              Example: A family of 8 could unlock Famima for life at $64.99
              total.
            </p>
          </div>
        </div>

        {/* Ethos Section */}
        <div className='text-center'>
          <h2 className='text-3xl font-light text-gray-900 mb-8'>
            Why Choose Famima?
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <div className='flex items-start'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3 mt-2'></span>
                <div>
                  <h4 className='font-medium text-gray-900'>Privacy First</h4>
                  <p className='text-gray-600'>Your data is yours, always.</p>
                </div>
              </div>
              <div className='flex items-start'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3 mt-2'></span>
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
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3 mt-2'></span>
                <div>
                  <h4 className='font-medium text-gray-900'>Simple & Secure</h4>
                  <p className='text-gray-600'>
                    End-to-end protection of your family&apos;s memories.
                  </p>
                </div>
              </div>
              <div className='flex items-start'>
                <span className='w-2 h-2 bg-green-400 rounded-full mr-3 mt-2'></span>
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
