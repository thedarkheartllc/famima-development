"use client";

import { useQuery } from "@tanstack/react-query";

interface ImageCacheOptions {
  retry?: number;
  staleTime?: number;
  enabled?: boolean;
}

// Function to preload an image and return a promise
const preloadImage = (src: string): Promise<string> => {
  // console.log("🖼️ useImageCache: Starting to preload image:", src);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // console.log("✅ useImageCache: Image loaded successfully:", src);
      resolve(src);
    };
    img.onerror = (error) => {
      console.error("❌ useImageCache: Image failed to load:", src, error);
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};

// Function to validate if an image URL is accessible
const validateImageUrl = async (url: string): Promise<string> => {
  console.log("🔍 useImageCache: Validating image URL:", url);
  try {
    // First try to preload the image
    await preloadImage(url);
    // console.log("✅ useImageCache: Image validation successful:", url);
    return url;
  } catch (error) {
    console.error("❌ useImageCache: Image validation failed:", url, error);
    // If Firebase URL fails, it might be expired - we'll let the component handle fallback
    throw new Error(`Image validation failed: ${url}`);
  }
};

export function useImageCache(
  imageUrl: string | undefined,
  options: ImageCacheOptions = {}
) {
  const {
    retry = 3,
    staleTime = 5 * 60 * 1000, // 5 minutes
    enabled = true,
  } = options;

  // console.log("🎯 useImageCache: Hook called with:", {
  //   imageUrl,
  //   enabled,
  //   retry,
  // });

  return useQuery({
    queryKey: ["image", imageUrl],
    queryFn: () => {
      // console.log("🚀 useImageCache: Query function called for:", imageUrl);
      return validateImageUrl(imageUrl!);
    },
    enabled: enabled && !!imageUrl,
    staleTime,
    retry,
    retryDelay: (attemptIndex) => {
      const delay = Math.min(1000 * 2 ** attemptIndex, 10000);
      console.log(
        `🔄 useImageCache: Retry attempt ${
          attemptIndex + 1
        } for ${imageUrl}, delay: ${delay}ms`
      );
      return delay;
    },
    // Don't refetch on window focus for images
    refetchOnWindowFocus: false,
    // Keep failed images in cache for a short time to avoid rapid retries
    gcTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for preloading multiple images
export function useImagePreload(imageUrls: string[]) {
  return useQuery({
    queryKey: ["imagePreload", imageUrls],
    queryFn: async () => {
      const promises = imageUrls.map((url) => preloadImage(url));
      return Promise.allSettled(promises);
    },
    enabled: imageUrls.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
