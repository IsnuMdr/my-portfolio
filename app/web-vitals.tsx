"use client";
import { trackWebVitals } from "@/lib/analytics";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals(trackWebVitals);
  return null;
}
