export function BenefitsSection() {
  return (
    <section className='py-20 px-6 bg-gradient-to-b from-white to-green-50/20  '>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        <div className='space-y-6'>
          <h2 className='text-4xl md:text-5xl font-light text-gray-900 '>
            Connection Without Distraction
          </h2>
          <p className='text-lg text-gray-600  leading-relaxed'>
            Most platforms profit from stealing your focus. Famima is built for
            something else.
          </p>
          <ul className='space-y-4'>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1'>✓</span>
              <span className='text-gray-600 '>
                Share travel photos with grandparents
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1'>✓</span>
              <span className='text-gray-600 '>
                Post your kids&apos; milestones without worry
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='text-green-600 mt-1'>✓</span>
              <span className='text-gray-600 '>
                Keep family memories in one safe place
              </span>
            </li>
          </ul>
        </div>
        <div className='aspect-square rounded-3xl shadow-lg overflow-hidden'>
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
