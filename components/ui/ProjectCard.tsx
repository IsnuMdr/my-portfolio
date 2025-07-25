"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Eye, Calendar, ArrowRight } from "lucide-react";
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
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="card-elegant group cursor-pointer overflow-hidden h-full"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden aspect-project">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
        >
          <div className="flex gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <Eye size={20} />
            </Link>

            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </motion.a>
            )}

            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full shadow-soft">
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-soft">
            {project.category.charAt(0).toUpperCase() +
              project.category.slice(1)}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {project.completedAt}
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
            >
              <TechIcons name={tech} size={12} />
              <span className="text-gray-700 font-medium">{tech}</span>
            </div>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* View Details Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 group"
        >
          View Details
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};
