"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Calendar,
  ArrowRight,
  Heart,
  Share,
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
}

interface ProjectHoverCardProps {
  project: Project;
  index?: number;
}

export const ProjectHoverCard = ({
  project,
  index = 0,
}: ProjectHoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: `/projects/${project.id}`,
      });
    } else {
      // Fallback untuk browser yang tidak support Web Share API
      navigator.clipboard.writeText(
        `${window.location.origin}/projects/${project.id}`
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      className="card-elegant group cursor-pointer overflow-hidden h-full relative"
    >
      {/* Background Gradient Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Project Image */}
      <div className="relative overflow-hidden aspect-project">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Featured Badge */}
          {project.featured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full shadow-soft"
            >
              Featured
            </motion.span>
          )}

          {/* Quick Actions */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`p-2 backdrop-blur-sm rounded-full shadow-soft transition-all duration-300 ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-800 hover:bg-white"
              }`}
            >
              <Heart size={16} className={isLiked ? "fill-current" : ""} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:bg-white transition-all duration-300"
            >
              <Share size={16} />
            </button>
          </motion.div>
        </div>

        {/* Center Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
        >
          <div className="flex gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isHovered ? 1 : 0, rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <Eye size={24} />
              </Link>
            </motion.div>

            {project.demoUrl && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: isHovered ? 1 : 0, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={24} />
                </a>
              </motion.div>
            )}

            {project.githubUrl && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: isHovered ? 1 : 0, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 shadow-soft hover:shadow-medium transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={24} />
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-soft"
          >
            {project.category.charAt(0).toUpperCase() +
              project.category.slice(1)}
          </motion.span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            {project.completedAt}
          </div>
        </div>

        <motion.p
          className="text-gray-600 mb-4 leading-relaxed flex-1"
          animate={{ opacity: isHovered ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + techIndex * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs hover:bg-primary-100 transition-colors duration-300"
            >
              <TechIcons name={tech} size={12} />
              <span className="text-gray-700 font-medium">{tech}</span>
            </motion.div>
          ))}
          {project.technologies.length > 3 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
            >
              +{project.technologies.length - 3}
            </motion.span>
          )}
        </div>

        {/* View Details Link */}
        <motion.div
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 group"
          >
            View Details
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-bl-full"
        animate={{ scale: isHovered ? 1.2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent-500/10 to-primary-500/10 rounded-tr-full"
        animate={{ scale: isHovered ? 1.2 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  );
};
