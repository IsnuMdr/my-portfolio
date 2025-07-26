"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "../animations/AnimatedSection";
import {
  Download,
  User,
  Code,
  Coffee,
  Heart,
  Award,
  MapPin,
  Calendar,
  Mail,
} from "lucide-react";

export const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "My Story", icon: User },
    { id: "journey", label: "Journey", icon: Award },
    { id: "personal", label: "Personal", icon: Heart },
  ];

  const achievements = [
    {
      icon: Code,
      label: "Projects Completed",
      value: "25+",
      color: "text-blue-600",
    },
    {
      icon: User,
      label: "Years Experience",
      value: "3+",
      color: "text-green-600",
    },
    {
      icon: Heart,
      label: "Happy Clients",
      value: "15+",
      color: "text-red-500",
    },
    {
      icon: Coffee,
      label: "Cups of Coffee",
      value: "1000+",
      color: "text-amber-600",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description:
        "Leading development team, architecting scalable solutions, and mentoring junior developers.",
      current: true,
    },
    {
      year: "2023",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      description:
        "Built multiple client projects using modern web technologies and improved team productivity.",
      current: false,
    },
    {
      year: "2022",
      title: "Frontend Developer",
      company: "StartupXYZ",
      description:
        "Specialized in React development and created responsive, user-friendly interfaces.",
      current: false,
    },
    {
      year: "2021",
      title: "Started Coding Journey",
      company: "Self-Taught",
      description:
        "Began learning programming through online courses and building personal projects.",
      current: false,
    },
  ];

  const personalFacts = [
    "🚀 Passionate about clean code and performance",
    "🌱 Always learning new technologies",
    "🎯 Detail-oriented problem solver",
    "🤝 Love collaborating with teams",
    "📚 Tech blog writer and open source contributor",
    "🎵 Music lover and occasional guitarist",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "story":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              Hey there! I&apos;m a passionate{" "}
              <span className="font-semibold text-primary-600">
                Software Engineer
              </span>{" "}
              based in Indonesia with over 3 years of experience crafting
              digital experiences that matter. My journey started with curiosity
              about how websites work, and it evolved into a love affair with
              code.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              I specialize in{" "}
              <span className="font-semibold text-accent-600">
                full-stack development
              </span>{" "}
              with a focus on modern technologies like React, Next.js, and
              Node.js. I believe in writing clean, maintainable code and
              creating solutions that not only work beautifully but also scale
              gracefully.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open source projects, or sharing
              knowledge through blog posts. I&apos;m always excited about the
              next challenge and the opportunity to learn something new.
            </p>
          </motion.div>
        );

      case "journey":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full border-4 ${
                      item.current
                        ? "bg-primary-600 border-primary-200"
                        : "bg-white border-gray-300"
                    }`}
                  />
                  {index !== timeline.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-medium mb-2">
                    {item.company}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case "personal":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center p-4 bg-white/60 rounded-xl border border-white/50 hover:bg-white/80 transition-all duration-300"
                >
                  <span className="text-lg leading-relaxed">{fact}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-600" />
                Currently Based In
              </h4>
              <p className="text-gray-700 mb-4">
                <strong>South Tangerang, Banten, Indonesia</strong> 🇮🇩
              </p>
              <p className="text-gray-600 leading-relaxed">
                Available for remote work and open to relocation for the right
                opportunity. I enjoy working with international teams and
                embracing different perspectives.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-section">
      <div className="container-elegant">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Image & Stats */}
          <div className="lg:col-span-5">
            <AnimatedSection>
              {/* Profile Image */}
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/20652209?v=4"
                    alt="Profile"
                    className="w-full aspect-[4/5] object-cover rounded-3xl shadow-large"
                  />
                  <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary-200 to-accent-200 rounded-3xl -z-10" />
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-4 bg-white rounded-2xl shadow-medium"
                >
                  <Code size={24} className="text-primary-600" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 p-4 bg-white rounded-2xl shadow-medium"
                >
                  <Coffee size={24} className="text-accent-600" />
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="card-elegant p-4 text-center group"
                    >
                      <IconComponent
                        size={24}
                        className={`mx-auto mb-2 ${achievement.color}`}
                      />
                      <div className="font-bold text-xl text-gray-900 mb-1">
                        {achievement.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {achievement.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.2}>
              {/* Header */}
              <div className="mb-8">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
                >
                  About Me
                </motion.span>
                <h2 className="responsive-text-display font-bold mb-6 text-gradient">
                  Passionate Developer
                  <br />
                  Creative Problem Solver
                </h2>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-primary-600 text-white shadow-glow"
                          : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-soft"
                      }`}
                    >
                      <IconComponent size={18} />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="mb-8">{renderTabContent()}</div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary-elegant group flex items-center"
                >
                  <Download
                    size={20}
                    className="mr-2 group-hover:animate-bounce"
                  />
                  <div>Download Resume</div>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary-elegant group flex items-center"
                >
                  <Mail size={20} className="mr-2 group-hover:animate-pulse" />
                  Let&apos;s Connect
                </motion.a>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
