export function FeaturesSection() {
  return (
    <section className='py-20 px-6 bg-white '>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl md:text-5xl font-light text-gray-900  text-center mb-16'>
          What Makes Famima Different
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-green-50/50  rounded-2xl p-8 text-center space-y-3'>
            <div className='text-3xl'>🛡️</div>
            <h3 className='text-lg font-light text-gray-900 '>Privacy First</h3>
            <p className='text-sm text-gray-600 '>
              Your data is yours, always. No noise, no politics, no rage
              baiting.
            </p>
          </div>
          <div className='bg-green-50/50  rounded-2xl p-8 text-center space-y-3'>
            <div className='text-3xl'>🔒</div>
            <h3 className='text-lg font-light text-gray-900 '>
              Private by Default
            </h3>
            <p className='text-sm text-gray-600 '>
              Your photos stay with family, not advertisers. End-to-end
              protection.
            </p>
          </div>
          <div className='bg-green-50/50  rounded-2xl p-8 text-center space-y-3'>
            <div className='text-3xl'>✨</div>
            <h3 className='text-lg font-light text-gray-900 '>Simple to Use</h3>
            <p className='text-sm text-gray-600 '>
              No likes, no comments, no follower counts. Upload, share, and view
              in a clean grid.
            </p>
          </div>
          <div className='bg-green-50/50  rounded-2xl p-8 text-center space-y-3'>
            <div className='text-3xl'>🕊️</div>
            <h3 className='text-lg font-light text-gray-900 '>Peace of Mind</h3>
            <p className='text-sm text-gray-600 '>
              Free from ads, algorithms, and distractions. No manipulation, no
              endless feeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
