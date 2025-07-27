import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/ui/Header";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/ui/Footer";
import { Experiences } from "@/components/sections/Experiences";
import { getAllExperience, getAllProjects, getAllSkills } from "@/lib/data";

export default async function Home() {
  const projects = await getAllProjects();
  const skills = await getAllSkills();
  const experience = await getAllExperience();

  return (
    <main className="min-h-screen bg-gradient-elegant container">
      <Header />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Experiences experiences={experience} />
      <Skills skills={skills} />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
