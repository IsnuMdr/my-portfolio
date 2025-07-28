"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createIntersectionObserver } from "@/lib/performance";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  lazy?: boolean;
  onLoad?: () => void;
  fallbackSrc?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  quality = 85,
  lazy = true,
  onLoad,
  fallbackSrc = "/api/placeholder/400/300",
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lazy && !priority && imgRef.current) {
      const observer = createIntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100px" } // Load images 100px before they come into view
      );

      if (observer) {
        observer.observe(imgRef.current);
        return () => observer.disconnect();
      }
    }
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      )}

      {/* Main Image */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={error ? fallbackSrc : src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-2xl">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🖼️</div>
            <span className="text-sm">Image not available</span>
          </div>
        </div>
      )}
    </div>
  );
};
