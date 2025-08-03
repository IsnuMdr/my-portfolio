"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skill } from "@prisma/client";

interface SkillFormProps {
  skill?: Skill;
  isEditing?: boolean;
}

interface FormData {
  id?: string;
  name: string;
  category: string;
  level: number;
  description?: string | null;
  experience?: string | null;
}

export function SkillForm({ skill, isEditing = false }: SkillFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "Fullstack",
    level: 70,
    description: "",
    experience: "",
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        description: skill.description,
        experience: skill.experience,
      });
    }
  }, [skill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        formData.id = skill?.id as string;
      }
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch("/api/skills", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save skill");
      }

      router.push("/admin/skills");
      router.refresh();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Error saving skill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const categories = [
    "Frontend",
    "Backend",
    "Database",
    "Mobile",
    "DevOps",
    "Design",
    "Testing",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="name"
                placeholder="React, Node.js, Python..."
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                Skill Level * (1-100)
              </label>
              <input
                type="number"
                id="level"
                required
                value={formData.level}
                onChange={(e) =>
                  handleInputChange("level", parseInt(e.target.value))
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience
              </label>
              <input
                type="text"
                id="experience"
                required
                value={formData.experience || ""}
                onChange={(e) =>
                  handleInputChange("experience", parseInt(e.target.value))
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Years of experience with this skill..."
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="description"
                placeholder="Brief description of your experience with this skill..."
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
          {loading ? "Saving..." : isEditing ? "Update Skill" : "Create Skill"}
        </button>
      </div>
    </form>
  );
}
