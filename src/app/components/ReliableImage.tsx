"use client";

import { useState } from "react";
import Image from "next/image";
import { useImageCache } from "../../hooks/useImageCache";

interface ReliableImageProps {
  src: string | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

export function ReliableImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  fallbackSrc = "/placeholder-image.png",
  onLoad,
  onError,
  style,
}: ReliableImageProps) {
  const [imageError, setImageError] = useState(false);

  // Use our image cache hook for reliable loading
  const {
    data: validatedSrc,
    isLoading: isValidating,
    error,
  } = useImageCache(src, {
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log("🖼️ ReliableImage: Component state:", {
    src,
    validatedSrc,
    isValidating,
    error: error?.message,
    imageError,
  });

  const handleLoad = () => {
    console.log("✅ ReliableImage: Image loaded successfully:", imageSrc);
    onLoad?.();
  };

  const handleError = () => {
    console.error("❌ ReliableImage: Image failed to load:", {
      imageSrc,
      originalSrc: src,
      validatedSrc,
      imageError,
      isValidating,
    });
    setImageError(true);
    onError?.();
  };

  // Determine which image source to use
  const imageSrc = imageError
    ? fallbackSrc
    : validatedSrc || src || fallbackSrc;

  console.log("🎯 ReliableImage: Final image source:", imageSrc);

  // Show loading state - only show if we're validating OR if we don't have a validated source yet
  if (isValidating || (!validatedSrc && !imageError)) {
    console.log("⏳ ReliableImage: Showing loading state");
    return (
      <div
        className={`bg-gray-100 animate-pulse flex items-center justify-center ${className}`}
        style={fill ? { width: "100%", height: "100%" } : { width, height }}
      >
        <div className='w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin' />
      </div>
    );
  }

  // Show error state
  if (error && !imageError) {
    console.log("❌ ReliableImage: Showing error state:", error.message);
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <div className='text-gray-400 text-xs text-center p-2'>
          <div className='mb-1'>⚠️</div>
          <div>Failed to load</div>
        </div>
      </div>
    );
  }

  console.log(
    "🖼️ ReliableImage: Rendering Image component with src:",
    imageSrc
  );

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={style}
      priority={priority}
      onLoad={handleLoad}
      onError={handleError}
      // Add quality and placeholder for better UX
      quality={85}
      placeholder='blur'
      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
    />
  );
}
