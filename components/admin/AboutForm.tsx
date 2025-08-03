"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { About } from "@prisma/client";
import { ImageUpload } from "../ui/ImageUpload";
import { CircleMinus, Plus } from "lucide-react";

interface AboutFormProps {
  about?: About | null;
  isEditing?: boolean;
}

interface FormData {
  id?: string;
  name: string;
  title: string;
  headline?: string | null;
  tagline?: string | null;
  summary?: string | null;
  imageUrl?: string | null;
  personal: string[];
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  resume?: string | null;
  status?: string;
}

export function AboutForm({ about, isEditing = false }: AboutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    headline: null,
    tagline: null,
    summary: null,
    imageUrl: null,
    personal: [""],
    location: null,
    email: null,
    phone: null,
    linkedin: null,
    github: null,
    resume: null,
    status: "available",
  });

  useEffect(() => {
    if (about) {
      setFormData({
        id: about.id,
        name: about.name,
        title: about.title,
        headline: about.headline,
        tagline: about.tagline,
        summary: about.summary,
        imageUrl: about.imageUrl,
        personal: about.personal,
        location: about.location,
        email: about.email,
        phone: about.phone,
        linkedin: about.linkedin,
        github: about.github,
        resume: about.resume,
        status: about.status,
      });
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        formData.id = about?.id as string;
      }
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch("/api/about", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save about");
      }

      router.push("/admin/about");
      router.refresh();
    } catch (error) {
      console.error("Error saving about:", error);
      alert("Error saving about. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleArrayInputChange = (
    field: keyof FormData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const arrayField = [...(prev[field] as string[])];
      arrayField[index] = value;
      return { ...prev, [field]: arrayField };
    });
  };

  const addArrayItem = (field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => {
      const arrayField = [...(prev[field] as string[])];
      arrayField.splice(index, 1);
      return { ...prev, [field]: arrayField };
    });
  };

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
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                autoComplete="name"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                autoComplete="title"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="headline"
                className="block text-sm font-medium text-gray-700"
              >
                Headline
              </label>
              <input
                type="text"
                id="headline"
                value={formData.headline || ""}
                onChange={(e) => handleInputChange("headline", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="headline"
                placeholder="A professional headline goes here."
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="tagline"
                className="block text-sm font-medium text-gray-700"
              >
                Tagline
              </label>
              <input
                type="text"
                id="tagline"
                value={formData.tagline || ""}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="tagline"
                placeholder="A catchy tagline goes here."
              />
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700"
              >
                Summary
              </label>
              <textarea
                id="summary"
                value={formData.summary || ""}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="summary"
                placeholder="A short summary goes here."
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="email"
                placeholder="e.g. 2oMwW@example.com"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="phone"
                placeholder="e.g. +1 (123) 456-7890"
              />
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
                autoComplete="location"
                placeholder="e.g. New York, USA"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub
              </label>
              <input
                type="text"
                id="github"
                value={formData.github || ""}
                onChange={(e) => handleInputChange("github", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="github"
                placeholder="https://github.com/username"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn
              </label>
              <input
                type="text"
                id="linkedin"
                value={formData.linkedin || ""}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                autoComplete="linkedin"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="sm:col-span-3"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <ImageUpload
                value={formData.imageUrl || ""}
                onChange={(url) => handleInputChange("imageUrl", url)}
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="personal"
                className="block text-sm font-medium text-gray-700"
              >
                Personal
              </label>

              {formData.personal.map((personal, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={personal}
                    onChange={(e) =>
                      handleArrayInputChange("personal", index, e.target.value)
                    }
                    className="mt-1 input-elegant py-2 px-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={`personal ${index + 1}`}
                  />
                  {formData.personal.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("personal", index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <CircleMinus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("personal")}
                className="flex items-center mt-2 text-sm bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 "
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
