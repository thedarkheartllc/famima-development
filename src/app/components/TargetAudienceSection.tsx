export function TargetAudienceSection() {
  return (
    <section className='py-20 px-6 bg-gradient-to-b from-green-50/30 to-white'>
      <div className='max-w-4xl mx-auto text-center space-y-12'>
        <h2 className='text-4xl md:text-5xl font-light text-gray-900'>
          🎯 Who is Famima for?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4 text-left'>
            <div className='flex items-start gap-3'>
              <span className='text-green-600 text-xl mt-1'>👨‍👩‍👧‍👦</span>
              <p className='text-gray-600'>
                Families who want a <strong>legacy archive</strong> of
                grandparents, parents, children, and future generations.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-green-600 text-xl mt-1'>👶</span>
              <p className='text-gray-600'>
                Parents who don&apos;t want their kids&apos; photos on
                Instagram, Facebook, or Google.
              </p>
            </div>
          </div>
          <div className='space-y-4 text-left'>
            <div className='flex items-start gap-3'>
              <span className='text-green-600 text-xl mt-1'>🔒</span>
              <p className='text-gray-600'>
                People who value{" "}
                <strong>privacy and intimacy over clout and noise</strong>.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <span className='text-green-600 text-xl mt-1'>📸</span>
              <p className='text-gray-600'>
                Anyone who wants to preserve memories without relying on big
                tech platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
