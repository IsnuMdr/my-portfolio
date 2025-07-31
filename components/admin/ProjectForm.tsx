"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Project, ProjectData } from "@/types/project";
import { ProjectCategories } from "@prisma/client";
import ImageUpload from "../ui/ImageUpload";
import { useMultiImageUpload } from "@/lib/hooks/useMultiImageUpload";
import MultiImageUpload from "../ui/MultiImageUpload";

interface ProjectFormProps {
  project: Project | null;
  onSave: (project: ProjectData) => void;
  onCancel: () => void;
}

export const ProjectForm = ({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    demoUrl: "",
    githubUrl: "",
    technologies: "",
    featured: false,
    category: "fullstack",
    completedAt: new Date().toISOString().split("T")[0],
    slug: "",
    results: "",
    features: "",
    duration: "",
    teamSize: 0,
  });
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription || "",
        imageUrl: project.imageUrl || "",
        demoUrl: project.demoUrl || "",
        githubUrl: project.githubUrl || "",
        technologies: project.technologies.join(", "),
        featured: project.featured,
        category: project.category,
        completedAt: new Date(project.completedAt).toISOString().split("T")[0],
        slug: project.slug || "",
        results: project.results.join(", "),
        features: project.features.join(", "),
        duration: project.duration || "",
        teamSize: project.teamSize || 0,
      });
    }
  }, [project]);

  const {
    images: detailImages,
    addImageSlot,
    handleUploadBegin,
    handleUploadComplete,
    handleUploadError,
    removeImage,
    getImageUrls,
    canAddMore,
  } = useMultiImageUpload({
    maxImages: 8,
    onUploadComplete: (images) => {
      setFormData((prev) => ({
        ...prev,
        images: images.map((img) => {
          return {
            imageUrl: img.url,
          };
        }),
      }));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSave({
        ...formData,
        imageUrl: imageUrl,
        category: formData.category as ProjectCategories,
        completedAt: new Date(formData.completedAt),
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim()),
        results: formData.results.split(",").map((result) => result.trim()),
        features: formData.features.split(",").map((feature) => feature.trim()),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {project ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Long Description
            </label>
            <textarea
              rows={3}
              value={formData.longDescription}
              onChange={(e) =>
                setFormData({ ...formData, longDescription: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={ProjectCategories.fullstack}>Full Stack</option>
                <option value={ProjectCategories.frontend}>Frontend</option>
                <option value={ProjectCategories.backend}>Backend</option>
                <option value={ProjectCategories.mobile}>Mobile</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Completed Date *
              </label>
              <input
                type="date"
                required
                value={formData.completedAt}
                onChange={(e) =>
                  setFormData({ ...formData, completedAt: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technologies (comma separated) *
            </label>
            <input
              type="text"
              required
              placeholder="React, Next.js, TypeScript"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <ImageUpload
              value={imageUrl || formData.imageUrl}
              onChange={(url) => setImageUrl(url || "")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, demoUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Featured Project
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Results (comma separated)
            </label>
            <input
              type="text"
              value={formData.results}
              onChange={(e) =>
                setFormData({ ...formData, results: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Features (comma separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Size
            </label>
            <input
              type="number"
              value={formData.teamSize}
              onChange={(e) =>
                setFormData({ ...formData, teamSize: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Product Images
              <span className="text-gray-500 font-normal">
                (Optional - up to 8 images)
              </span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Add more images to showcase different angles, details, or
              variations of your product.
            </p>

            <MultiImageUpload
              images={detailImages}
              onUploadBegin={handleUploadBegin}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              onRemoveImage={removeImage}
              onAddImage={addImageSlot}
              canAddMore={canAddMore}
              // disabled={isSubmitting}
              maxImages={8}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {project ? "Update" : "Create"} Project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
