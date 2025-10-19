import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineCamera,
} from "react-icons/hi2";

export function TargetAudienceSection() {
  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-green-50/30 to-white'>
      <div className='max-w-4xl mx-auto text-center space-y-8 sm:space-y-12'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 px-2'>
          <HiOutlineUsers className='inline-block mr-2 sm:mr-3 text-green-600 text-2xl sm:text-3xl' />
          Who is Famima for?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
          <div className='space-y-4 text-left'>
            <div className='flex items-start gap-3'>
              <HiOutlineUsers className='text-green-600 text-lg sm:text-xl mt-1 flex-shrink-0' />
              <p className='text-sm sm:text-base text-gray-600'>
                Families who want a <strong>legacy archive</strong> of
                grandparents, parents, children, pets and future generations.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <HiOutlineShieldCheck className='text-green-600 text-lg sm:text-xl mt-1 flex-shrink-0' />
              <p className='text-sm sm:text-base text-gray-600'>
                People who don&apos;t want their photos on Instagram or
                Facebook.
              </p>
            </div>
          </div>
          <div className='space-y-4 text-left'>
            <div className='flex items-start gap-3'>
              <HiOutlineLockClosed className='text-green-600 text-lg sm:text-xl mt-1 flex-shrink-0' />
              <p className='text-sm sm:text-base text-gray-600'>
                People who value{" "}
                <strong>privacy and intimacy over clout and noise</strong>.
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <HiOutlineCamera className='text-green-600 text-lg sm:text-xl mt-1 flex-shrink-0' />
              <p className='text-sm sm:text-base text-gray-600'>
                Anyone who wants to preserve and share memories without
                distractions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
