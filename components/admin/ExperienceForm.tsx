"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Experience } from "@prisma/client";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface ExperienceFormProps {
  experience?: Experience;
  isEditing?: boolean;
}

interface FormData {
  id?: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  location?: string | null;
  companyLogo?: string | null;
}

export function ExperienceForm({
  experience,
  isEditing = false,
}: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: null,
    current: false,
    location: null,
    companyLogo: null,
  });

  // Initialize form data when project data is available
  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        startDate: experience.startDate.toISOString().split("T")[0],
        endDate: experience.endDate?.toISOString().split("T")[0] || null,
        current: experience.current || false,
        location: experience?.location || null,
        companyLogo: experience?.companyLogo || null,
      });
    }
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        formData.id = experience?.id as string;
      }

      const payload = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null,
      };

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch("/api/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save experience");
      }

      router.push("/admin/experiences");
      router.refresh();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("Error saving experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700"
              >
                Position *
              </label>
              <input
                type="text"
                id="position"
                required
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe your role, responsibilities, and achievements..."
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                required
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                disabled={formData.current}
                value={formData.endDate ? formData.endDate : ""}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    id="current"
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => {
                      handleInputChange("current", e.target.checked);
                      if (e.target.checked) {
                        handleInputChange("endDate", "");
                      }
                    }}
                    className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="current"
                    className="font-medium text-gray-700"
                  >
                    Current Position
                  </label>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="City, Country"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo
              </label>
              <ImageUpload
                value={formData.companyLogo || ""}
                onChange={(url) => handleInputChange("companyLogo", url)}
                // className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditing
            ? "Update Experience"
            : "Create Experience"}
        </button>
      </div>
    </form>
  );
}
