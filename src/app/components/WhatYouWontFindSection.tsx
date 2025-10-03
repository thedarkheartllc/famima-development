export function WhatYouWontFindSection() {
  return (
    <section className='py-20 px-6 bg-white '>
      <div className='max-w-4xl mx-auto text-center space-y-12'>
        <h2 className='text-4xl md:text-5xl font-light text-gray-900 '>
          What You Won&apos;t Find
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='space-y-2'>
            <div className='text-gray-400 text-4xl'>✕</div>
            <p className='text-gray-600 '>No doomscrolling</p>
          </div>
          <div className='space-y-2'>
            <div className='text-gray-400 text-4xl'>✕</div>
            <p className='text-gray-600 '>No advertisements</p>
          </div>
          <div className='space-y-2'>
            <div className='text-gray-400 text-4xl'>✕</div>
            <p className='text-gray-600 '>No NSFW</p>
          </div>
          <div className='space-y-2'>
            <div className='text-gray-400 text-4xl'>✕</div>
            <p className='text-gray-600 '>No addiction</p>
          </div>
        </div>
        <div className='pt-8 space-y-3 text-gray-700  text-xl font-light'>
          <p>Your photos.</p>
          <p>Your family.</p>
          <p>Your peace of mind.</p>
        </div>
      </div>
    </section>
  );
}
