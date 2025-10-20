import { Logo } from "./Logo";
import { ShareLink } from "../../types";

interface PublicShareHeaderProps {
  shareLink: ShareLink | null;
  photoCount: number;
}

export function PublicShareHeader({
  shareLink,
  photoCount,
}: PublicShareHeaderProps) {
  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 mb-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-4 mb-2'>
              <Logo href='/' size='small' />
            </div>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-light text-gray-900 capitalize'>
              {shareLink?.personName}&apos;s Gallery
            </h1>
            <p className='text-sm text-gray-600 font-light'>
              Shared by {shareLink?.familyId} • {photoCount} photos
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
