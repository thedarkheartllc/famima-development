"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
}

export function Logo({
  href = "/",
  className = "",
  size = "medium",
}: LogoProps) {
  const sizeClasses = {
    small: {
      image: "w-6 sm:w-8 h-6 sm:h-8",
      text: "text-base sm:text-lg",
      gap: "",
      space: "-space-x-1",
    },
    medium: {
      image: "w-8 sm:w-10 h-8 sm:h-10",
      text: "text-lg sm:text-xl",
      gap: "",
      space: "-space-x-2 sm:-space-x-1",
    },
    large: {
      image: "w-12 sm:w-16 h-12 sm:h-16",
      text: "text-2xl sm:text-3xl",
      gap: "",
      space: "-space-x-3 sm:-space-x-2",
    },
    xlarge: {
      image: "w-24 sm:w-32 h-24 sm:h-32",
      text: "text-4xl sm:text-6xl",
      gap: "",
      space: "-space-x-4 sm:-space-x-3",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link
      href={href}
      className={`flex items-center ${currentSize.gap} hover:opacity-80 transition-opacity ${className} ${currentSize.space}`}
    >
      <Image
        src='/logo.png'
        alt='Famima Logo'
        width={
          size === "xlarge"
            ? 128
            : size === "large"
            ? 64
            : size === "small"
            ? 24
            : 32
        }
        height={
          size === "xlarge"
            ? 128
            : size === "large"
            ? 64
            : size === "small"
            ? 24
            : 32
        }
        className={currentSize.image}
      />
      <span className={`${currentSize.text} font-light text-gray-900`}>
        Famima
      </span>
    </Link>
  );
}
