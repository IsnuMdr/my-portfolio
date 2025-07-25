"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { AnimatedSection } from "../animations/AnimatedSection";
import { ProjectCard } from "../ui/ProjectCard";
import { ProjectListItem } from "../ui/ProjectListItem";
import { getAllProjects, getProjectsByCategory } from "@/lib/data/projects";

export const ProjectsPageContent = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const allProjects = getAllProjects();

  // Categories with counts
  const categories = useMemo(() => {
    const allCategories = [
      { id: "all", label: "All Projects", count: allProjects.length },
      {
        id: "featured",
        label: "Featured",
        count: allProjects.filter((p) => p.featured).length,
      },
    ];

    const uniqueCategories = [...new Set(allProjects.map((p) => p.category))];
    const categoryOptions = uniqueCategories.map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: allProjects.filter((p) => p.category === cat).length,
    }));

    return [...allCategories, ...categoryOptions];
  }, [allProjects]);

  // Filtered and searched projects
  const filteredProjects = useMemo(() => {
    let filtered = getProjectsByCategory(selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container-elegant">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
              >
                My Work
              </motion.span>
              <h1 className="responsive-text-display font-bold mb-6 text-gradient">
                Project Portfolio
              </h1>
              <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore my collection of projects showcasing modern web
                development, innovative solutions, and attention to detail in
                every implementation.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-white/20">
        <div className="container-elegant">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    selectedCategory === category.id
                      ? "bg-primary-600 text-white shadow-glow"
                      : "bg-white/80 text-gray-700 hover:bg-white hover:text-primary-600 shadow-soft"
                  }`}
                >
                  {category.label} ({category.count})
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-white/80 rounded-xl p-1 shadow-soft">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-primary-600 text-white shadow-soft"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-primary-600 text-white shadow-soft"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="section-padding">
        <div className="container-elegant">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredProjects.length}</span>{" "}
              projects
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "all" &&
                ` in ${
                  categories.find((c) => c.id === selectedCategory)?.label
                }`}
            </p>
          </div>

          {/* Projects Display */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchQuery}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "space-y-6"
                }
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      {viewMode === "grid" ? (
                        <ProjectCard project={project} />
                      ) : (
                        <ProjectListItem project={project} />
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-gray-500">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-semibold mb-2">
                        No projects found
                      </h3>
                      <p className="text-lg mb-6">
                        {searchQuery
                          ? `No projects match "${searchQuery}"`
                          : "No projects in this category"}
                      </p>
                      <div className="flex gap-4 justify-center">
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="btn-primary-elegant"
                          >
                            Clear Search
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="btn-secondary-elegant"
                        >
                          View All Projects
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
