"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import {
  preloadCriticalResources,
  addResourceHints,
  preloadRoute,
  preloadImage,
} from "@/lib/performance";

interface PerformanceContextType {
  preloadRoute: (href: string) => void;
  preloadImage: (src: string, priority?: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within PerformanceProvider");
  }
  return context;
};

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider = ({ children }: PerformanceProviderProps) => {
  useEffect(() => {
    // Initialize performance optimizations
    const initializePerformance = () => {
      // Add resource hints
      addResourceHints();

      // Preload critical resources after initial render
      setTimeout(() => {
        preloadCriticalResources();
      }, 100);

      // Report web vitals
      if ("webVitals" in window) {
        window.webVitals?.getCLS(console.log);
        window.webVitals?.getFID(console.log);
        window.webVitals?.getFCP(console.log);
        window.webVitals?.getLCP(console.log);
        window.webVitals?.getTTFB(console.log);
      }
    };

    // Run after hydration
    if (document.readyState === "complete") {
      initializePerformance();
    } else {
      window.addEventListener("load", initializePerformance);
      return () => window.removeEventListener("load", initializePerformance);
    }
  }, []);

  const contextValue: PerformanceContextType = {
    preloadRoute,
    preloadImage,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};
