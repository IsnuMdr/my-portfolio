"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code,
  User,
  Briefcase,
  Award,
  MessageCircle,
  Download,
  Github,
  Linkedin,
  Mail,
  Bookmark,
} from "lucide-react";
import { redirect, usePathname } from "next/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();

  // Updated navigation items to include experience
  const navItems = [
    { href: "#about", label: "About", icon: User },
    { href: "#projects", label: "Projects", icon: Briefcase },
    { href: "#experience", label: "Experience", icon: Bookmark },
    { href: "#skills", label: "Skills", icon: Award },
    { href: "#contact", label: "Contact", icon: MessageCircle },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/IsnuMdr", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:isnu.mdr@gmail.com", label: "Email" },
  ];

  // Improved active section detection
  const detectActiveSection = useCallback(() => {
    const sections = [
      "home",
      "about",
      "experience",
      "projects",
      "skills",
      "contact",
    ];
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If we're at the very top, always show home as active
    if (scrollPosition < 100) {
      return "home";
    }

    // If we're near the bottom, show contact as active
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      return "contact";
    }

    let currentSection = "home";
    let maxVisibility = 0;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        const headerOffset = 80; // Header height

        // Calculate how much of the section is visible
        const visibleTop = Math.max(scrollPosition + headerOffset, elementTop);
        const visibleBottom = Math.min(
          scrollPosition + windowHeight,
          elementBottom
        );
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityPercentage = visibleHeight / rect.height;

        // If this section is more visible than the current best, use it
        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          currentSection = sectionId;
        }
      }
    }

    return currentSection;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Throttle the section detection for better performance
      const newActiveSection = detectActiveSection();
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [activeSection, detectActiveSection]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);

    const targetId = href.replace("#", "");

    // Special handling for home section
    if (targetId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveSection("home");
      return;
    }

    // For other sections
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 80; // Account for header height
      const offsetTop = element.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Immediately set active section for better UX
      setActiveSection(targetId);
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-soft border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <nav className="container-elegant">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() =>
                pathname === "/" ? handleNavClick("#home") : redirect("/")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 group"
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
                  <Code size={20} className="text-white" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 w-10 h-10 border-2 border-primary-300 rounded-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
              </motion.div>

              <div className="hidden sm:block">
                <div className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Isnu Munandar
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-primary-600 transition-colors duration-300">
                  Software Engineer
                </div>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.slice(1);

                return (
                  <motion.button
                    key={item.href}
                    onClick={() =>
                      item.href === "#projects" && pathname !== "/"
                        ? redirect("/projects")
                        : handleNavClick(item.href)
                    }
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-primary-600 text-white shadow-glow"
                        : "text-gray-700 hover:text-primary-600 hover:bg-white/80"
                    }`}
                  >
                    <IconComponent size={16} />
                    {item.label}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-600 rounded-xl -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors duration-300"
              >
                <Download size={16} />
                <span className="text-sm font-medium">Resume</span>
              </motion.a>

              <motion.button
                onClick={() => handleNavClick("#contact")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary-elegant"
              >
                Let&apos;s Talk
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 rounded-xl hover:bg-white/80 transition-colors duration-300 relative"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-large border-l border-white/20"
            >
              <div className="p-6 pt-24 h-full flex flex-col">
                {/* Mobile Navigation Items */}
                <div className="space-y-2 flex-1">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.href.slice(1);

                    return (
                      <motion.button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-4 w-full p-4 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-primary-600 text-white shadow-glow"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <IconComponent size={20} />
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="space-y-4 pt-6 border-t border-gray-200"
                >
                  {/* Resume Download */}
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Download size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700">
                      Download Resume
                    </span>
                  </a>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleNavClick("#contact")}
                    className="w-full btn-primary-elegant"
                  >
                    Let&apos;s Work Together
                  </button>
                </motion.div>

                {/* Social Links - Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="flex justify-center gap-4 pt-6"
                >
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-all duration-300"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// lib/utils/navigation.ts - Updated navigation utilities
export const scrollToSection = (sectionId: string) => {
  // Remove # if present
  const targetId = sectionId.replace("#", "");

  // Special handling for home section
  if (targetId === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  // For other sections
  const element = document.getElementById(targetId);
  if (element) {
    const headerHeight = 80; // Fixed header height
    const offsetTop = element.offsetTop - headerHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

export const getCurrentSection = () => {
  const sections = [
    "home",
    "about",
    "experience",
    "projects",
    "skills",
    "contact",
  ];
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // If we're at the very top, always show home as active
  if (scrollPosition < 100) {
    return "home";
  }

  // If we're near the bottom, show contact as active
  if (scrollPosition + windowHeight >= documentHeight - 100) {
    return "contact";
  }

  let currentSection = "home";
  let maxVisibility = 0;

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;
      const headerOffset = 80;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(scrollPosition + headerOffset, elementTop);
      const visibleBottom = Math.min(
        scrollPosition + windowHeight,
        elementBottom
      );
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityPercentage = visibleHeight / rect.height;

      // If this section is more visible than the current best, use it
      if (visibilityPercentage > maxVisibility) {
        maxVisibility = visibilityPercentage;
        currentSection = sectionId;
      }
    }
  }

  return currentSection;
};
