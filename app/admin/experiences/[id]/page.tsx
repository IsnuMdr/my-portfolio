import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "@/components/admin/ExperienceForm";

interface EditExperiencePageProps {
  params: { id: string };
}

async function getExperience(id: string) {
  const experience = await prisma.experience.findUnique({
    where: { id },
  });

  return experience;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const experience = await getExperience(params.id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Experience
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Update work experience information.
        </p>
      </div>

      <div className="mt-8">
        <ExperienceForm experience={experience} isEditing={true} />
      </div>
    </div>
  );
}
