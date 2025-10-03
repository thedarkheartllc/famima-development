export function HeroImageSection() {
  return (
    <section className='px-6 pb-20'>
      <div className='max-w-5xl mx-auto'>
        <div className='grid grid-cols-5 gap-4'>
          {Array.from({ length: 15 }, (_, index) => (
            <div
              key={index}
              className='aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-lg shadow-md flex items-center justify-center'
            >
              <p className='text-gray-400 font-light text-sm'>{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
