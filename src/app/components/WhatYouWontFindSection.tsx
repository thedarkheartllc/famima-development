export function WhatYouWontFindSection() {
  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-white'>
      <div className='max-w-4xl mx-auto text-center space-y-8 sm:space-y-12'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 px-2'>
          What You Won&apos;t Find
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6'>
          {[
            "No doomscrolling",
            "No advertisements",
            "No influencers",
            "No NSFW",
            "No addiction",
          ].map((text, index) => (
            <div key={index} className='space-y-2'>
              <div className='text-gray-400 text-3xl sm:text-4xl'>✕</div>
              <p className='text-sm sm:text-base text-gray-600'>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
