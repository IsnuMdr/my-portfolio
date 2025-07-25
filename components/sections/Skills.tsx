"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { TechIcons } from "../ui/TechIcons";
import { AnimatedSection } from "../animations/AnimatedSection";
import {
  Code,
  Database,
  Cloud,
  Palette,
  Zap,
  Trophy,
  Wrench,
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience: string;
  description: string;
}

const skillsData: Skill[] = [
  // Frontend Skills
  {
    id: "1",
    name: "JavaScript",
    category: "Frontend",
    level: 95,
    experience: "3+ years",
    description:
      "Expert in modern ES6+ features, async programming, and frameworks",
  },
  {
    id: "2",
    name: "TypeScript",
    category: "Frontend",
    level: 90,
    experience: "2+ years",
    description:
      "Strong typing, interfaces, generics, and advanced type manipulation",
  },
  {
    id: "3",
    name: "React",
    category: "Frontend",
    level: 92,
    experience: "3+ years",
    description: "Hooks, Context API, performance optimization, and testing",
  },
  {
    id: "4",
    name: "Next.js",
    category: "Frontend",
    level: 88,
    experience: "2+ years",
    description: "SSR, SSG, API routes, and deployment optimization",
  },
  {
    id: "5",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 90,
    experience: "2+ years",
    description:
      "Utility-first CSS, responsive design, and custom configurations",
  },
  {
    id: "6",
    name: "Vue.js",
    category: "Frontend",
    level: 75,
    experience: "1+ years",
    description: "Component-based architecture and Vuex state management",
  },
  // Backend Skills
  {
    id: "7",
    name: "Node.js",
    category: "Backend",
    level: 85,
    experience: "2+ years",
    description:
      "Express.js, API development, middleware, and performance tuning",
  },
  {
    id: "8",
    name: "Python",
    category: "Backend",
    level: 80,
    experience: "2+ years",
    description: "Django, Flask, data processing, and automation scripts",
  },
  {
    id: "9",
    name: "PHP",
    category: "Backend",
    level: 70,
    experience: "1+ years",
    description: "Laravel framework and RESTful API development",
  },
  // Database Skills
  {
    id: "10",
    name: "PostgreSQL",
    category: "Database",
    level: 80,
    experience: "2+ years",
    description: "Database design, optimization, queries, and migrations",
  },
  {
    id: "11",
    name: "Prisma",
    category: "Database",
    level: 85,
    experience: "1+ years",
    description:
      "ORM, schema design, migrations, and type-safe database access",
  },
  {
    id: "12",
    name: "MongoDB",
    category: "Database",
    level: 75,
    experience: "1+ years",
    description: "NoSQL database design, aggregation pipelines, and indexing",
  },
  {
    id: "13",
    name: "Redis",
    category: "Database",
    level: 65,
    experience: "1+ years",
    description: "Caching strategies and session management",
  },
  // DevOps Skills
  {
    id: "14",
    name: "Docker",
    category: "DevOps",
    level: 70,
    experience: "1+ years",
    description: "Containerization, Docker Compose, and deployment strategies",
  },
  {
    id: "15",
    name: "AWS",
    category: "DevOps",
    level: 65,
    experience: "1+ years",
    description: "EC2, S3, Lambda, RDS, and serverless architectures",
  },
  {
    id: "16",
    name: "Vercel",
    category: "DevOps",
    level: 80,
    experience: "2+ years",
    description: "Deployment, edge functions, and performance optimization",
  },
  // Tools Skills
  {
    id: "17",
    name: "Git",
    category: "Tools",
    level: 90,
    experience: "3+ years",
    description:
      "Version control, branching strategies, and collaborative workflows",
  },
  {
    id: "18",
    name: "Figma",
    category: "Tools",
    level: 75,
    experience: "2+ years",
    description: "UI/UX design, prototyping, and design system creation",
  },
  {
    id: "19",
    name: "VS Code",
    category: "Tools",
    level: 95,
    experience: "3+ years",
    description: "Advanced usage, extensions, and workflow optimization",
  },
];

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Categories with icons and counts
  const categories = useMemo(() => {
    const categoryConfig = {
      Frontend: { icon: Code, color: "text-blue-600" },
      Backend: { icon: Database, color: "text-green-600" },
      Database: { icon: Database, color: "text-orange-600" },
      DevOps: { icon: Cloud, color: "text-red-600" },
      Tools: { icon: Wrench, color: "text-purple-600" },
    };

    const allCategories = [
      {
        id: "all",
        label: "All Skills",
        icon: Zap,
        color: "text-purple-600",
        count: skillsData.length,
      },
    ];

    // Get unique categories from skills
    const uniqueCategories = [...new Set(skillsData.map((s) => s.category))];
    const categoryOptions = uniqueCategories.map((cat) => ({
      id: cat,
      label: cat,
      icon: categoryConfig[cat as keyof typeof categoryConfig]?.icon || Trophy,
      color:
        categoryConfig[cat as keyof typeof categoryConfig]?.color ||
        "text-gray-600",
      count: skillsData.filter((s) => s.category === cat).length,
    }));

    return [...allCategories, ...categoryOptions];
  }, []);

  // Filtered skills with proper memoization
  const filteredSkills = useMemo(() => {
    let filtered: Skill[] = [];

    if (selectedCategory === "all") {
      filtered = skillsData;
    } else {
      filtered = skillsData.filter(
        (skill) => skill.category === selectedCategory
      );
    }
    return filtered;
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    console.log("Changing skills category to:", categoryId);
    setSelectedCategory(categoryId);
    setHoveredSkill(null); // Reset hover state
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="skills" className="section-padding bg-gradient-elegant">
      <div className="container-elegant">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
            >
              Expertise
            </motion.span>
            <h2 className="responsive-text-display font-bold mb-6 text-gradient">
              Skills & Technologies
            </h2>
            <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of modern technologies and frameworks that
              I use to craft exceptional digital experiences and robust
              applications.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-white text-primary-600 shadow-medium border-2 border-primary-200"
                      : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-soft border-2 border-transparent"
                  }`}
                >
                  <IconComponent size={18} className={category.color} />
                  {category.label}
                  <span className="text-xs opacity-70">({category.count})</span>
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill) => (
                  <motion.div
                    key={`${selectedCategory}-${skill.id}`}
                    variants={itemVariants}
                    layout
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="card-elegant p-6 group hover:shadow-glow transition-all duration-500"
                  >
                    {/* Skill Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="tech-icon bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-300">
                        <TechIcons name={skill.name} size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {skill.experience}
                        </p>
                      </div>
                    </div>

                    {/* Skill Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">
                          Proficiency
                        </span>
                        <span className="text-xs font-bold text-primary-600">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredSkill === skill.id ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl pointer-events-none"
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-gray-500">
                    <div className="text-4xl mb-4">🔧</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No skills found
                    </h3>
                    <p>Try selecting a different category</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <AnimatedSection delay={0.4}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Technologies",
                value: skillsData.length.toString(),
                icon: Code,
              },
              {
                label: "Avg Proficiency",
                value: `${Math.round(
                  skillsData.reduce((acc, skill) => acc + skill.level, 0) /
                    skillsData.length
                )}%`,
                icon: Trophy,
              },
              { label: "Categories", value: categories.length - 1, icon: Zap }, // -1 to exclude 'all'
              {
                label: "Expert Level",
                value: skillsData.filter((s) => s.level >= 90).length,
                icon: Palette,
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={28} className="text-primary-600" />
                  </div>
                  <motion.div
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
