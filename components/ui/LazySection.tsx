"use client";
import { ReactNode, useRef, useState, useEffect } from "react";
import { createIntersectionObserver } from "@/lib/performance";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export const LazySection = ({
  children,
  fallback,
  rootMargin = "200px",
  threshold = 0.1,
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const observer = createIntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin, threshold }
      );

      if (observer) {
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
      }
    }
  }, [rootMargin, threshold]);

  return (
    <div ref={sectionRef}>
      {isVisible ? children : fallback || <div className="min-h-[400px]" />}
    </div>
  );
};
