"use client";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

// Lazy load heavy components
const HeavyChart = lazy(() => import("./HeavyChart"));

export const LazyChart = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyChart />
    </Suspense>
  );
};
