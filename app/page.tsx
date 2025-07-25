import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/ui/Header";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/ui/Footer";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-elegant container">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
