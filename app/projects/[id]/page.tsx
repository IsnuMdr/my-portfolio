import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getProjectById } from "@/lib/data/projects";
import { Header } from "@/components/ui/Header";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Isnu Munandar Portfolio`,
    description: project.description,
    keywords: [...project.technologies, "project", "portfolio"],
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      type: "article",
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-elegant">
      <Header />
      <ProjectDetailContent project={project} />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
