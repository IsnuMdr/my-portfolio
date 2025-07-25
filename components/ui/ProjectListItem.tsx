"use client";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { TechIcons } from "./TechIcons";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  completedAt: string;
  duration?: string;
}

interface ProjectListItemProps {
  project: Project;
}

export const ProjectListItem = ({ project }: ProjectListItemProps) => {
  return (
    <motion.div whileHover={{ x: 5 }} className="card-elegant p-6 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Project Image */}
        <div className="lg:col-span-3">
          <div className="aspect-project rounded-xl overflow-hidden">
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Project Info */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {project.completedAt}
            </div>
            {project.duration && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {project.duration}
              </div>
            )}
            <div className="capitalize">{project.category}</div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
              >
                <TechIcons name={tech} size={12} />
                <span className="text-gray-700 font-medium">{tech}</span>
              </div>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-3">
          <div className="flex lg:flex-col gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium"
            >
              View Details
              <ArrowRight size={16} />
            </Link>

            <div className="flex gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  title="Live Demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  title="Source Code"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// components/ui/ProjectHoverCard.tsx - Enhanced project card with more animations

// components/ui/ProjectMasonryCard.tsx - Masonry layout card
