import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getProjectById } from "@/lib/data/projects";
import { Header } from "@/components/ui/Header";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";
import { dateFormat } from "@/lib/utils/dateFormat";
import { getAbout } from "@/lib/data";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const project = await getProjectById(id);
  const about = await getAbout();

  if (!project) {
    notFound();
  }

  const completedAtFormatted = dateFormat(project.completedAt);

  return (
    <main className="min-h-screen bg-gradient-elegant">
      <Header />
      <ProjectDetailContent
        project={project}
        completedAtFormatted={completedAtFormatted}
      />
      <Footer about={about} />
      <ScrollToTop />
    </main>
  );
}
