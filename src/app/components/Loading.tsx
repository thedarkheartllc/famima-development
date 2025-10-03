"use client";

import { Logo } from "./Logo";

interface LoadingProps {
  message?: string;
  size?: "small" | "medium" | "large";
  showLogo?: boolean;
  className?: string;
}

export function Loading({
  message = "Loading...",
  size = "medium",
  showLogo = true,
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    small: {
      logo: "small",
      text: "text-sm",
      container: "gap-3",
    },
    medium: {
      logo: "medium",
      text: "text-lg",
      container: "gap-4",
    },
    large: {
      logo: "large",
      text: "text-xl",
      container: "gap-6",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`flex flex-col items-center justify-center ${currentSize.container} ${className}`}
    >
      {showLogo && (
        <Logo size={currentSize.logo as "small" | "medium" | "large"} />
      )}
      <div className={`text-gray-600 font-light ${currentSize.text}`}>
        {message}
      </div>
    </div>
  );
}
