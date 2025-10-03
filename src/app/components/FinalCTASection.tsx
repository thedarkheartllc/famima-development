import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className='py-20 px-6 bg-gradient-to-b from-green-50/30 to-white'>
      <div className='max-w-4xl mx-auto text-center space-y-8'>
        <h2 className='text-4xl md:text-5xl font-light text-gray-900 '>
          Start Small. Share Simply.
        </h2>
        <p className='text-xl text-gray-600 '>
          Be part of something calmer. A digital space that actually feels good
          to use.
        </p>
        <Link
          href='/login'
          className='inline-block px-12 py-4 bg-gray-900  text-white  rounded-full font-light text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg'
        >
          Join Famima
        </Link>
      </div>
    </section>
  );
}
