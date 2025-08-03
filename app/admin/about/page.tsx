import { AboutForm } from "@/components/admin/AboutForm";
import { prisma } from "@/lib/prisma";
import { About } from "@prisma/client";

async function getAbout(): Promise<About | null> {
  const about = await prisma.about.findFirst();
  return about;
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">About</h1>
        <p className="mt-2 text-sm text-gray-700">Edit about information.</p>
      </div>

      <div className="mt-8">
        <AboutForm about={about} isEditing={about !== null} />
      </div>
    </div>
  );
}
