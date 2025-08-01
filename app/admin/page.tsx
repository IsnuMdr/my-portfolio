// app/admin/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getDashboardStats() {
  const [projectsCount, skillsCount, experiencesCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
  ]);

  return {
    projectsCount,
    skillsCount,
    experiencesCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "Projects",
      count: stats.projectsCount,
      href: "/admin/projects",
      description: "Manage your portfolio projects",
      color: "bg-blue-500",
    },
    {
      title: "Skills",
      count: stats.skillsCount,
      href: "/admin/skills",
      description: "Manage your technical skills",
      color: "bg-green-500",
    },
    {
      title: "Experiences",
      count: stats.experiencesCount,
      href: "/admin/experiences",
      description: "Manage your work experience",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome to your portfolio admin panel. Manage your projects, skills,
          and experiences.
        </p>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-md ${card.color} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-sm">
                          {card.count}
                        </span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.title}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {card.count} {card.count === 1 ? "item" : "items"}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">{card.description}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Manage {card.title.toLowerCase()} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-5">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin/projects/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add New Project
                </Link>
                <Link
                  href="/admin/skills/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Add New Skill
                </Link>
                <Link
                  href="/admin/experiences/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Add New Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
