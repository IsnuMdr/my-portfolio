"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import ImageUpload from "../ui/ImageUpload";
// import MultiImageUpload from "../ui/MultiImageUpload";

interface ProjectFormProps {
  project?:
    | (Project & { images: Array<{ id: string; imageUrl: string }> })
    | null;
  isEditing?: boolean;
}

interface FormData {
  id?: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string;
  imageUrl: string;
  images: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  category: string;
  completedAt: Date;
  duration: string;
  teamSize: number;
}

export function ProjectForm({ project, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: project?.title || "",
    description: project?.description || "",
    longDescription: project?.longDescription || "",
    technologies: project?.technologies?.join(", ") || "",
    imageUrl: project?.imageUrl || "",
    images: project?.images?.map((img) => img.imageUrl) || [],
    githubUrl: project?.githubUrl || "",
    demoUrl: project?.demoUrl || "",
    featured: project?.featured || false,
    category: project?.category || "fullstack",
    completedAt: project?.completedAt
      ? new Date(project.completedAt)
      : new Date(),
    duration: project?.duration || "",
    teamSize: project?.teamSize || 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        formData.id = project?.id as string;
      }

      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[] | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Title */}
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="title"
              />
            </div>

            {/* Category */}
            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="category"
              >
                <option value="fullstack">Full Stack</option>
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>

            {/* Short Description */}
            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description *
              </label>
              <input
                type="text"
                id="description"
                required
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief description for project cards"
                autoComplete="description"
              />
            </div>

            {/* Full Description */}
            <div className="sm:col-span-6">
              <label
                htmlFor="longDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Full Description *
              </label>
              <textarea
                id="longDescription"
                required
                rows={6}
                value={formData.longDescription}
                onChange={(e) =>
                  handleInputChange("longDescription", e.target.value)
                }
                className="mt-1 textarea-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Detailed project description, features, challenges overcome, etc."
                autoComplete="longDescription"
              />
            </div>

            {/* Technologies */}
            <div className="sm:col-span-6">
              <label
                htmlFor="technologies"
                className="block text-sm font-medium text-gray-700"
              >
                Technologies *
              </label>
              <input
                type="text"
                id="technologies"
                required
                value={formData.technologies}
                onChange={(e) =>
                  handleInputChange("technologies", e.target.value)
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="React, Next.js, TypeScript, Tailwind CSS (comma separated)"
                autoComplete="technologies"
              />
              <p className="mt-2 text-sm text-gray-500">
                Separate technologies with commas
              </p>
            </div>

            {/* URLs */}
            <div className="sm:col-span-3">
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub URL
              </label>
              <input
                type="url"
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://github.com/username/repo"
                autoComplete="githubUrl"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="demoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Live Demo URL
              </label>
              <input
                type="url"
                id="demoUrl"
                value={formData.demoUrl}
                onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="https://your-project.com"
                autoComplete="demoUrl"
              />
            </div>

            {/* Durations */}

            <div className="sm:col-span-3">
              <label
                htmlFor="completedAt"
                className="block text-sm font-medium text-gray-700"
              >
                Completed At
              </label>
              <input
                type="date"
                id="completedAt"
                value={formData.completedAt.toISOString().split("T")[0]}
                onChange={(e) =>
                  handleInputChange("completedAt", e.target.value)
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="completedAt"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="text"
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="3 months"
                autoComplete="duration"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="teamSize"
                className="block text-sm font-medium text-gray-700"
              >
                teamSize
              </label>
              <input
                type="number"
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="3 months"
                autoComplete="teamSize"
              />
            </div>

            {/* Featured */}
            <div className="sm:col-span-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      handleInputChange("featured", e.target.checked)
                    }
                    className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="featured"
                    className="font-medium text-gray-700"
                  >
                    Featured Project
                  </label>
                  <p className="text-gray-500">
                    Featured projects will be highlighted on the homepage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Project Images
          </h3>

          {/* Main Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image (Thumbnail) *
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => handleInputChange("imageUrl", url || "")}
            />
            <p className="mt-2 text-sm text-gray-500">
              This image will be used as the project thumbnail in listings
            </p>
          </div>

          {/* Detail Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detail Images (Slideshow)
            </label>
            {/* <MultiImageUpload
              value={formData.images}
              onChange={(urls) => handleInputChange("images", urls)}
              maxFiles={10}
            /> */}
            <p className="mt-2 text-sm text-gray-500">
              These images will be shown in the project detail slideshow (max 10
              images)
            </p>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Project"
            : "Create Project"}
        </button>
      </div>
    </form>
  );
}
