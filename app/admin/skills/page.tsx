import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteSkillButton } from "@/components/admin/DeleteSkillsButton";
import { Edit } from "lucide-react";
import { calculateYearsFromDate } from "@/lib/utils/dateFormat";

async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export default async function AdminSkills() {
  const skills = await getSkills();
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Skills</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your technical skills and expertise levels.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/skills/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Add Skill
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </h4>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-2 w-2 rounded-full ${
                                  level <= Math.ceil((skill.level / 100) * 5)
                                    ? "bg-blue-500"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            Level {skill.level}/100
                          </span>
                        </div>
                        {skill.description && (
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {skill.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-between items-center space-y-1">
                        <span className="text-xs text-gray-500">
                          {skill.experience &&
                            calculateYearsFromDate(skill.experience)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/skills/${skill.id}`}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeleteSkillButton skillId={skill.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">No skills yet</p>
              <p className="mt-1">Get started by adding your first skill.</p>
              <Link
                href="/admin/skills/new"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Skill
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
