"use client";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Coffee,
} from "lucide-react";
import { TechIcons } from "../ui/TechIcons";
import { About } from "@/types/about";

export const Hero = ({ about }: { about: About | null }) => {
  const socialLinks = [
    {
      icon: Github,
      href: about?.github || "https://github.com/IsnuMdr",
      label: "GitHub",
      color: "hover:text-gray-900 hover:bg-gray-100",
    },
    {
      icon: Linkedin,
      href:
        about?.linkedin ||
        "https://www.linkedin.com/in/muhammad-isnu-munandar-b256961b3/",
      label: "LinkedIn",
      color: "hover:text-blue-600 hover:bg-blue-50",
    },
    {
      icon: Mail,
      href: `mailto:${about?.email}` || "mailto:isnu.mdr@gmail.com",
      label: "Email",
      color: "hover:text-red-500 hover:bg-red-50",
    },
  ];

  const floatingTechs = [
    { name: "React", position: "top-20 left-10", delay: 0 },
    { name: "Next.js", position: "top-40 right-16", delay: 1 },
    { name: "TypeScript", position: "bottom-32 left-20", delay: 2 },
    { name: "Tailwind CSS", position: "bottom-20 right-12", delay: 3 },
  ];

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-pattern opacity-40"></div>

      {/* Floating tech icons */}
      {floatingTechs.map((tech) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tech.delay, duration: 1 }}
          className={`absolute hidden lg:block ${tech.position} floating-element`}
        >
          <div className="tech-icon bg-white/80 backdrop-blur-sm border border-white/50 shadow-soft">
            <TechIcons name={tech.name} size={24} />
          </div>
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"></div>

      <div className="container-elegant relative z-10">
        <div className="text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 text-sm font-medium text-gray-600 shadow-soft">
              <Coffee size={16} className="text-accent-500" />
              {about?.status === "available"
                ? "Available for new opportunities"
                : "Open for opportunities"}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="responsive-text-hero font-bold mb-6 text-shadow">
              Hi, I&apos;m{" "}
              <span className="text-gradient block sm:inline">
                {about?.name || "Muhammad Isnu Munandar"}
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto max-w-md mb-8"
            />

            <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {about?.headline || "I'm a passionate Software Engineer"}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-12 text-gray-500"
          >
            <MapPin size={16} className="text-primary-500" />
            <span className="text-sm">Based in Indonesia</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              onClick={() => handleScrollToSection("about")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-elegant group"
            >
              <span>Learn More</span>
              <motion.div
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => handleScrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary-elegant"
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center gap-6 mb-16"
          >
            {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-soft transition-all duration-300 ${color}`}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-400 mb-4">
              Scroll to explore
            </span>
            <motion.button
              onClick={() => handleScrollToSection("about")}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/80 transition-all duration-300"
            >
              <ArrowDown size={20} className="text-gray-600" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
