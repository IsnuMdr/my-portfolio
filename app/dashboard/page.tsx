import { Metadata } from "next";
import Dashboard from "@/components/admin/Dashboard";
import { getSummary } from "@/lib/data/summary";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard - Portfolio Management",
  description: "Manage portfolio content, projects, skills, and experience",
  robots: {
    index: false,
    follow: false,
  },
};
export default function DashboardPage() {
  const summary = getSummary();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard summary={summary} />
    </Suspense>
  );
}
