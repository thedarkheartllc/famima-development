export function BenefitsSection() {
  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-green-50/20'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
        <div className='space-y-4 sm:space-y-6 order-2 lg:order-1'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 px-2'>
            Connection Without Distraction
          </h2>
          <p className='text-base sm:text-lg text-gray-600 leading-relaxed px-2'>
            Most platforms profit from stealing your focus. Famima is built for
            something else.
          </p>
          <ul className='space-y-3 sm:space-y-4 px-2'>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1 text-sm sm:text-base'>
                ✓
              </span>
              <span className='text-sm sm:text-base text-gray-600'>
                Share travel photos with grandparents
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1 text-sm sm:text-base'>
                ✓
              </span>
              <span className='text-sm sm:text-base text-gray-600'>
                Post your kids&apos; milestones without worry
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1 text-sm sm:text-base'>
                ✓
              </span>
              <span className='text-sm sm:text-base text-gray-600'>
                Keep family memories in one safe place
              </span>
            </li>
          </ul>
        </div>
        <div className='aspect-square rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden order-1 lg:order-2'>
          <img
            src='/homepage/famima-4.jpg'
            alt='Family connection and memories'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
