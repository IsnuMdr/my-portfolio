"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "../animations/AnimatedSection";
import {
  Calendar,
  MapPin,
  Briefcase,
  TrendingUp,
  Award,
  Users,
  Code,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useExperience } from "@/lib/hooks/useExperience";
import Image from "next/image";

export const Experience = () => {
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(
    null
  );

  const { experiences } = useExperience();

  const getTypeColor = (type: string) => {
    const colors = {
      "full-time": "text-green-600 bg-green-100",
      "part-time": "text-blue-600 bg-blue-100",
      contract: "text-purple-600 bg-purple-100",
      internship: "text-orange-600 bg-orange-100",
    };
    return colors[type as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
        remainingMonths !== 1 ? "s" : ""
      }`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="section-padding bg-gradient-section">
      <div className="container-elegant">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
            >
              Career Journey
            </motion.span>
            <h2 className="responsive-text-display font-bold mb-6 text-gradient">
              Work Experience
            </h2>
            <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
              My professional journey through different roles, companies, and
              projects that have shaped my skills and expertise in software
              development.
            </p>
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-accent-500 hidden md:block"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <AnimatedSection key={experience.id} delay={index * 0.1}>
                <motion.div
                  className="relative flex flex-col md:flex-row gap-8 group"
                  onMouseEnter={() => setHoveredExperience(experience.id)}
                  onMouseLeave={() => setHoveredExperience(null)}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        duration: 0.5,
                        type: "spring",
                      }}
                      className={`w-6 h-6 rounded-full border-4 border-white shadow-medium z-10 ${
                        experience.current
                          ? "bg-primary-600 animate-pulse"
                          : "bg-white"
                      }`}
                    />

                    {/* Connecting Line to Card */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "2rem" }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      className="absolute top-1/2 left-6 h-0.5 bg-gradient-to-r from-primary-400 to-transparent transform -translate-y-1/2"
                    />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-1 card-elegant p-8 group-hover:shadow-glow transition-all duration-500"
                  >
                    {/* Card Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex items-start gap-4 mb-4 lg:mb-0">
                        {/* Company Logo */}
                        {experience.companyLogo && (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-16 h-16 rounded-xl overflow-hidden shadow-soft flex-shrink-0"
                          >
                            <Image
                              src={experience.companyLogo}
                              alt={`${experience.company} logo`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                              {experience.position}
                            </h3>
                            {experience.current && (
                              <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full animate-pulse">
                                Current
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            {experience.companyUrl ? (
                              <motion.a
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300 flex items-center gap-1 group/link"
                              >
                                <Briefcase size={18} />
                                {experience.company}
                                <ExternalLink
                                  size={14}
                                  className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                                />
                              </motion.a>
                            ) : (
                              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                <Briefcase size={18} />
                                {experience.company}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                                experience.type
                              )}`}
                            >
                              {experience.type.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date & Location Info */}
                      <div className="text-right space-y-2">
                        <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>
                            {formatDate(experience.startDate)} -{" "}
                            {experience.current
                              ? "Present"
                              : formatDate(experience.endDate!)}
                          </span>
                        </div>

                        <div className="text-xs text-gray-500">
                          {experience.endDate && (
                            <span>
                              {calculateDuration(
                                experience.startDate,
                                experience.endDate
                              )}
                            </span>
                          )}
                        </div>

                        {experience.location && (
                          <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                            <MapPin size={16} />
                            <span>{experience.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {experience.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={18} className="text-accent-500" />
                        Key Achievements
                      </h4>
                      <div className="space-y-3">
                        {experience.achievements.map(
                          (achievement, achievementIndex) => (
                            <motion.div
                              key={achievementIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: achievementIndex * 0.1,
                                duration: 0.4,
                              }}
                              className="flex items-start gap-3 group/achievement"
                            >
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <ChevronRight
                                  size={14}
                                  className="text-green-600 group-hover/achievement:translate-x-0.5 transition-transform"
                                />
                              </div>
                              <span className="text-gray-700 leading-relaxed">
                                {achievement}
                              </span>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Code size={18} className="text-primary-500" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: techIndex * 0.05,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Gradient Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredExperience === experience.id ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <AnimatedSection delay={0.5}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Briefcase,
                label: "Companies",
                value: new Set(experiences.map((exp) => exp.company)).size,
                color: "text-blue-600 bg-blue-100",
              },
              {
                icon: Calendar,
                label: "Years Experience",
                value: "3+",
                color: "text-green-600 bg-green-100",
              },
              {
                icon: TrendingUp,
                label: "Projects Delivered",
                value: "25+",
                color: "text-purple-600 bg-purple-100",
              },
              {
                icon: Users,
                label: "Team Members",
                value: "15+",
                color: "text-orange-600 bg-orange-100",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  <div
                    className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent size={28} />
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

        {/* CTA Section */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 text-center">
            <div className="card-elegant p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Add Value to Your Team?
              </h3>
              <p className="text-gray-600 mb-6">
                I&apos;m always open to discussing new opportunities and
                challenges. Let&apos;s talk about how my experience can
                contribute to your next project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary-elegant"
                >
                  Download Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary-elegant"
                >
                  Let&apos;s Connect
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
