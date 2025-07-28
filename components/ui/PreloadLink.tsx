"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePerformance } from "../providers/PerformanceProvider";

interface PreloadLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  preloadImages?: string[];
}

export const PreloadLink = ({
  href,
  children,
  className,
  preloadImages = [],
}: PreloadLinkProps) => {
  const { preloadRoute, preloadImage } = usePerformance();

  const handleMouseEnter = () => {
    // Preload the route on hover
    preloadRoute(href);

    // Preload associated images
    preloadImages.forEach((src) => preloadImage(src));
  };

  return (
    <Link href={href} className={className} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
};
