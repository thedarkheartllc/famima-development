import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineHeart,
} from "react-icons/hi2";

export function FeaturesSection() {
  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 text-center mb-12 sm:mb-16 px-2'>
          What Makes Famima Different
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
          <div className='bg-green-50/50 rounded-2xl p-6 sm:p-8 text-center space-y-3'>
            <HiOutlineShieldCheck className='text-2xl sm:text-3xl text-green-600 mx-auto' />
            <h3 className='text-base sm:text-lg font-light text-gray-900'>
              Privacy First
            </h3>
            <p className='text-xs sm:text-sm text-gray-600'>
              Your data is yours, always. No noise, no politics, no rage
              baiting.
            </p>
          </div>
          <div className='bg-green-50/50 rounded-2xl p-6 sm:p-8 text-center space-y-3'>
            <HiOutlineSparkles className='text-2xl sm:text-3xl text-green-600 mx-auto' />
            <h3 className='text-base sm:text-lg font-light text-gray-900'>
              Simple to Use
            </h3>
            <p className='text-xs sm:text-sm text-gray-600'>
              No likes, no comments, no follower counts. Upload, share, and view
              in a clean grid.
            </p>
          </div>
          <div className='bg-green-50/50 rounded-2xl p-6 sm:p-8 text-center space-y-3'>
            <HiOutlineHeart className='text-2xl sm:text-3xl text-green-600 mx-auto' />
            <h3 className='text-base sm:text-lg font-light text-gray-900'>
              Peace of Mind
            </h3>
            <p className='text-xs sm:text-sm text-gray-600'>
              Free from ads, algorithms, and distractions. No manipulation, no
              endless feeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
