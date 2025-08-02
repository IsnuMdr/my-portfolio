import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Project } from "@prisma/client";

async function getProject(
  id: string
): Promise<
  (Project & { images: Array<{ id: string; imageUrl: string }> }) | null
> {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });

  return project;
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Project</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update project details, images, and information.
        </p>
      </div>

      <div className="mt-8">
        <ProjectForm project={project} isEditing={true} />
      </div>
    </div>
  );
}
