import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteExperienceButton } from "@/components/admin/DeleteExperienceButton";
import { Briefcase, Calendar, Edit, MapPin } from "lucide-react";
import { dateFormat } from "@/lib/utils/dateFormat";

async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: {
      startDate: "desc",
    },
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

      <div className="space-y-6 mt-8">
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">No experience yet</p>
              <p className="mt-1">
                Get started by adding your first experience.
              </p>
              <Link
                href="/admin/experiences/new"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Experience
              </Link>
            </div>
          </div>
        ) : (
          experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Briefcase size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {experience.position}
                      </h3>
                      {experience.current && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-primary-600 font-semibold mb-2">
                      {experience.company}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {dateFormat(experience.startDate)} -{" "}
                          {experience.current
                            ? "Present"
                            : experience.endDate &&
                              dateFormat(experience.endDate)}
                        </span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{experience.location}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/experiences/${experience.id}`}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteExperienceButton experienceId={experience.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
