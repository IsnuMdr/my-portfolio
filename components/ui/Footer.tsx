"use client";
import { motion } from "framer-motion";
import {
  Heart,
  Code,
  Coffee,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUp,
  MapPin,
  Phone,
} from "lucide-react";
import { TechIcons } from "./TechIcons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/IsnuMdr",
      label: "GitHub",
      color: "hover:text-gray-900 hover:bg-gray-100",
      username: "@yourusername",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammad-isnu-munandar-b256961b3/",
      label: "LinkedIn",
      color: "hover:text-blue-600 hover:bg-blue-50",
      username: "/in/yourusername",
    },
    {
      icon: Mail,
      href: "mailto:your.email@example.com",
      label: "Email",
      color: "hover:text-red-500 hover:bg-red-50",
      username: "your.email@example.com",
    },
  ];

  const quickLinks = [
    {
      label: "About Me",
      href: "#about",
      description: "Learn about my journey",
    },
    {
      label: "My Work",
      href: "#projects",
      description: "Check out my projects",
    },
    { label: "Skills", href: "#skills", description: "Technologies I use" },
    {
      label: "Get In Touch",
      href: "#contact",
      description: "Let's collaborate",
    },
  ];

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Framer Motion",
  ];

  const services = [
    { title: "Web Development", description: "Modern, responsive websites" },
    { title: "Full Stack Apps", description: "End-to-end applications" },
    { title: "UI/UX Design", description: "Beautiful user experiences" },
    { title: "Consultation", description: "Technical guidance & advice" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element: HTMLElement | null = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full blur-3xl"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container-elegant relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-glow"
                  >
                    <Code size={24} className="text-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                      Isnu Munandar
                    </div>
                    <div className="text-gray-400 text-sm">
                      Software Engineer
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  Passionate about creating elegant solutions to complex
                  problems. Always learning, always building, always pushing the
                  boundaries of what&apos;s possible.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={16} className="text-primary-400" />
                    <span className="text-sm">South Tangerang, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={16} className="text-primary-400" />
                    <span className="text-sm">+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={16} className="text-primary-400" />
                    <span className="text-sm">your.email@example.com</span>
                  </div>
                </div>

                {/* Availability Status */}
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-sm">
                    Available for new opportunities
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-6 text-white">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 5 }}
                      className="block text-left group"
                    >
                      <div className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                        <span className="font-medium">{link.label}</span>
                        <ExternalLink
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                        {link.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-6 text-white">What I Do</h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="group"
                    >
                      <div className="font-medium text-gray-200 group-hover:text-primary-400 transition-colors duration-300">
                        {service.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {service.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tech Stack & Social */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-6 text-white">
                  Built With
                </h3>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                      title={tech}
                    >
                      <TechIcons name={tech} size={20} />
                      <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tech}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <h4 className="font-semibold mb-4 text-white">
                  Connect With Me
                </h4>
                <div className="space-y-3">
                  {socialLinks.map(
                    ({ icon: Icon, href, label, color, username }, index) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className={`flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 ${color} group`}
                      >
                        <Icon size={20} />
                        <div>
                          <div className="font-medium text-sm">{label}</div>
                          <div className="text-xs text-gray-400">
                            {username}
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </motion.a>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="py-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
              <span>and</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coffee size={16} className="text-amber-500" />
              </motion.div>
              <span>
                by{" "}
                <span className="font-semibold text-white">Isnu Munandar</span>
              </span>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-sm font-medium"
            >
              <ArrowUp size={16} />
              Back to Top
            </motion.button>
          </div>

          {/* Additional Footer Note */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Designed and built from scratch with passion. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
