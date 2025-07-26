"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-14 h-14 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full shadow-large hover:shadow-glow transition-all duration-300 flex items-center justify-center group"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={163.36} // 2 * Math.PI * 26
                strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Arrow Icon */}
            <ChevronUp size={20} className="group-hover:animate-bounce" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
