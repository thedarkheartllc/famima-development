import Image from "next/image";

const homepageImages = Array.from(
  { length: 15 },
  (_, i) => `famima-${i + 1}.jpg`
);

export function HeroImageSection() {
  return (
    <section className='px-6 pb-20'>
      <div className='max-w-5xl mx-auto'>
        <div className='grid grid-cols-5 gap-4'>
          {homepageImages.map((imageName, index) => (
            <div
              key={index}
              className='aspect-square rounded-lg shadow-md overflow-hidden'
            >
              <Image
                src={`/homepage/${imageName}`}
                alt={`Homepage image ${index + 1}`}
                width={300}
                height={300}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
