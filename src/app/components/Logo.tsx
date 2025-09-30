"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  linkToHome?: boolean;
}

export function Logo({
  size = "md",
  showTagline = true,
  linkToHome = false,
}: LogoProps) {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const taglineSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const logoContent = (
    <div className='text-center'>
      <h1
        className={`${sizeClasses[size]} font-bold text-white dark:text-black`}
        style={{ fontFamily: '"Style Script", cursive' }}
      >
        Famima
      </h1>
      {showTagline && (
        <p
          className={`${taglineSizeClasses[size]} text-white dark:text-black opacity-80`}
        >
          a family memory book{" "}
        </p>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href='/' className='hover:opacity-80 transition-opacity'>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
