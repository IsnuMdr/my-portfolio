import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/ui/Header";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/ui/Footer";
import { Experiences } from "@/components/sections/Experiences";
import {
  getAbout,
  getAllExperience,
  getAllProjects,
  getAllSkills,
} from "@/lib/data";
import { LazySection } from "@/components/ui/LazySection";
import { Suspense } from "react";
import { getSummary } from "@/lib/data/summary";

const SectionSkeleton = () => (
  <div className="py-20">
    <div className="container-elegant">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default async function Home() {
  const projects = await getAllProjects();
  const skills = await getAllSkills();
  const experience = await getAllExperience();
  const summary = await getSummary();
  const about = await getAbout();

  return (
    <main className="min-h-screen bg-gradient-elegant container">
      <Header about={about} />
      <Hero about={about} />
      <About about={about} experience={experience} summary={summary} />

      <LazySection fallback={<SectionSkeleton />} rootMargin="200px">
        <Suspense fallback={<SectionSkeleton />}>
          <Projects projects={projects} />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionSkeleton />} rootMargin="200px">
        <Suspense fallback={<SectionSkeleton />}>
          <Experiences
            experiences={experience}
            summary={summary}
            resume={about?.resume}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionSkeleton />} rootMargin="200px">
        <Suspense fallback={<SectionSkeleton />}>
          <Skills skills={skills} />
        </Suspense>
      </LazySection>

      <Contact about={about} />
      <Footer about={about} />
      <ScrollToTop />
    </main>
  );
}
