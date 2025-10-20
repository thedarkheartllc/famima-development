import { ReliableImage } from "./ReliableImage";

interface FamilyImageProps {
  familyImage: string;
  familyName: string;
}

export function FamilyImage({ familyImage, familyName }: FamilyImageProps) {
  return (
    <div className='flex justify-center'>
      <ReliableImage
        src={familyImage}
        alt={`${familyName} family photo`}
        width={320}
        height={180}
        className='w-64 h-36 md:w-96 md:h-52 rounded-xl object-cover shadow-lg border-4 border-white'
      />
    </div>
  );
}
