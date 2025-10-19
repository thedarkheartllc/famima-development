import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-green-50/30 to-white'>
      <div className='max-w-4xl mx-auto text-center space-y-6 sm:space-y-8'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 px-2'>
          Your photos. Your family. Your peace of mind.
        </h2>
        {/* <p className='text-md sm:text-xl text-gray-600 px-2'>
          A digital space that actually feels good to use.
        </p> */}
        <Link
          href='/login'
          className='inline-block px-8 sm:px-12 py-3 sm:py-4 bg-gray-900 text-white rounded-full font-light text-base sm:text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
        >
          Join Famima
        </Link>
      </div>
    </section>
  );
}
