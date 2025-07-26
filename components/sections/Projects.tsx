"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { ExternalLink, Github, Eye, Calendar } from "lucide-react";
import { TechIcons } from "../ui/TechIcons";
import { AnimatedSection } from "../animations/AnimatedSection";
import { useProjects } from "@/lib/hooks/useProjects";
import { Project } from "@/types/project";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { projects } = useProjects();

  // Categories with counts
  const categories = useMemo(() => {
    const allCategories = [
      { id: "all", label: "All Projects", count: projects.length },
      {
        id: "featured",
        label: "Featured",
        count: projects.filter((p) => p.featured).length,
      },
    ];

    // Get unique categories from projects
    const uniqueCategories = [...new Set(projects.map((p) => p.category))];
    const categoryOptions = uniqueCategories.map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: projects.filter((p) => p.category === cat).length,
    }));

    return [...allCategories, ...categoryOptions];
  }, [projects]);

  // Filtered projects with proper memoization
  const filteredProjects = useMemo(() => {
    let filtered: Project[] = [];

    if (selectedCategory === "all") {
      filtered = projects;
    } else if (selectedCategory === "featured") {
      filtered = projects.filter((project) => project.featured);
    } else {
      filtered = projects.filter(
        (project) => project.category === selectedCategory
      );
    }

    return filtered;
  }, [projects, selectedCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setHoveredProject(null); // Reset hover state
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-gradient-section">
      <div className="container-elegant">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
            >
              Portfolio
            </motion.span>
            <h2 className="responsive-text-display font-bold mb-6 text-gradient">
              Featured Projects
            </h2>
            <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collection of projects that showcase my skills in modern web
              development, from concept to deployment with attention to detail
              and user experience.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white shadow-glow"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:text-primary-600 shadow-soft"
                }`}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={`${selectedCategory}-${project.id}`}
                    variants={itemVariants}
                    layout
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="card-elegant group cursor-pointer overflow-hidden"
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden rounded-t-2xl aspect-project">
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
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                      >
                        <div className="flex gap-4">
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
                              <Eye size={20} />
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
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {project.completedAt}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            <TechIcons name={tech} size={16} />
                            <span className="text-gray-700 font-medium">
                              {tech}
                            </span>
                          </div>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
                          >
                            <Github size={16} />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-gray-500">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No projects found
                    </h3>
                    <p>Try selecting a different category</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View More Button */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline-elegant"
            >
              View All Projects ({projects.length})
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
