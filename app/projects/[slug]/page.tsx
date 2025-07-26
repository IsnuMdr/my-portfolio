import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/ui/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getAllProjects, getProjectBySlug } from "@/lib/data/projects";
import { Header } from "@/components/ui/Header";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

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
      url: `/projects/${project.slug}`,
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

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

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
