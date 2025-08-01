import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create New Project
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Add a new project to your portfolio with images and details.
        </p>
      </div>

      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
