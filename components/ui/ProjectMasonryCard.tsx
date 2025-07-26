"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import Link from "next/link";

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

interface ProjectMasonryCardProps {
  project: Project;
  height?: "short" | "medium" | "tall";
}

export const ProjectMasonryCard = ({
  project,
  height = "medium",
}: ProjectMasonryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const heightClasses = {
    short: "aspect-[4/3]",
    medium: "aspect-[4/5]",
    tall: "aspect-[4/6]",
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="card-elegant group cursor-pointer overflow-hidden"
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden ${heightClasses[height]}`}>
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        >
          {/* Content Overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            {/* Top badges */}
            <div className="flex justify-between items-start">
              {project.featured && (
                <span className="px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                {project.category}
              </span>
            </div>

            {/* Bottom content */}
            <div>
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {project.title}
              </h3>

              <p className="text-white/80 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Eye size={16} />
                </Link>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
