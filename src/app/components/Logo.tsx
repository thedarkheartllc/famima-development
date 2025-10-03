"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href?: string;
  className?: string;
}

export function Logo({ href = "/", className = "" }: LogoProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity ${className}`}
    >
      <Image
        src='/logo.png'
        alt='Famima Logo'
        width={32}
        height={32}
        className='w-8 sm:w-10 h-8 sm:h-10'
      />
      <span className='text-lg sm:text-xl font-light text-gray-900'>
        Famima
      </span>
    </Link>
  );
}
