import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className='py-12 px-6 bg-white  border-t border-gray-100 '>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <Logo />
          <div className='flex items-center gap-6'>
            <Link
              href='/terms'
              className='text-sm text-gray-500  hover:text-gray-700 transition-colors'
            >
              Terms & Conditions
            </Link>
            <Link
              href='/privacy'
              className='text-sm text-gray-500  hover:text-gray-700 transition-colors'
            >
              Privacy Policy
            </Link>
          </div>
          <p className='text-sm text-gray-500 '>
            Your photos. Your family. Your peace of mind.
          </p>
          <p className='text-sm text-gray-400 '>© 2025 Famima</p>
        </div>
      </div>
    </footer>
  );
}
