import { Metadata } from "next";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Header } from "@/components/ui/Header";
import { ProjectsPageContent } from "@/components/pages/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects - Isnu Munandar Portfolio",
  description:
    "Explore my portfolio of projects showcasing modern web development, full-stack applications, and innovative solutions.",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "react",
    "next.js",
    "full-stack",
  ],
  openGraph: {
    title: "Projects - Isnu Munandar Portfolio",
    description:
      "Explore my portfolio of projects showcasing modern web development.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-elegant">
      <Header />
      <ProjectsPageContent />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
