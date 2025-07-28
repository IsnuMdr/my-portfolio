"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { AnimatedSection } from "../animations/AnimatedSection";
import { Project } from "@/types/project";
import { ProjectCard } from "../ui/ProjectCard";

export const Projects = ({ projects }: { projects: Project[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      filtered = projects.slice(0, 6);
    } else if (selectedCategory === "featured") {
      filtered = projects.filter((project) => project.featured).slice(0, 6);
    } else {
      filtered = projects
        .filter((project) => project.category === selectedCategory)
        .slice(0, 6);
    }

    return filtered;
  }, [projects, selectedCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
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

  const itemVariants: Variants = {
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
                    className="card-elegant group cursor-pointer overflow-hidden"
                  >
                    <ProjectCard project={project} />
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
