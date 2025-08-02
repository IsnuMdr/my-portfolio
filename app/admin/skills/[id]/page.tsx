import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SkillForm } from "@/components/admin/SkillForm";

async function getSkill(id: string) {
  const skill = await prisma.skill.findUnique({
    where: { id },
  });

  return skill;
}

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const skill = await getSkill(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Skill</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update skill information and proficiency level.
        </p>
      </div>

      <div className="mt-8">
        <SkillForm skill={skill} isEditing={true} />
      </div>
    </div>
  );
}
