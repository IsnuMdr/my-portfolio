import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Experience
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Add a new work experience to your portfolio.
        </p>
      </div>

      <div className="mt-8">
        <ExperienceForm />
      </div>
    </div>
  );
}
