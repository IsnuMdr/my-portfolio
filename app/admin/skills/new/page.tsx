import { SkillForm } from "@/components/admin/SkillForm";

export default function NewSkillPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Skill</h1>
        <p className="mt-2 text-sm text-gray-700">
          Add a new skill to your portfolio with proficiency level.
        </p>
      </div>

      <div className="mt-8">
        <SkillForm />
      </div>
    </div>
  );
}
