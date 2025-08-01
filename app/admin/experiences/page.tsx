import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { DeleteExperienceButton } from "@/components/admin/DeleteExperienceButton";

async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });
}

export default async function AdminExperiences() {
  const experiences = await getExperiences();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Experiences</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your work experience and career history.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/experiences/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Add Experience
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-lg object-cover"
                      src={
                        experience.companyLogo ||
                        "/images/default-company-logo.png"
                      }
                      alt={experience.company}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {experience.position}
                        </h3>
                        <p className="text-sm font-medium text-gray-500">
                          {experience.company}
                          {experience.location && ` • ${experience.location}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(experience.startDate).toLocaleDateString()}{" "}
                          -{" "}
                          {experience.current
                            ? "Present"
                            : experience.endDate
                            ? new Date(experience.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/experiences/${experience.id}`}
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Edit
                        </Link>
                        <DeleteExperienceButton experienceId={experience.id} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {experience.description}
                    </p>
                    {/* {experience.skills && experience.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {experience.skills.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                        {experience.skills.length > 5 && (
                          <span className="text-xs text-gray-500">
                            +{experience.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">No experiences yet</p>
              <p className="mt-1">
                Get started by adding your work experience.
              </p>
              <Link
                href="/admin/experiences/new"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Experience
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
