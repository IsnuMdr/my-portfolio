"use client";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { threshold });

  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    switch (direction) {
      case "up":
        variants.hidden = { ...variants.hidden, y: 50 };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case "down":
        variants.hidden = { ...variants.hidden, y: -50 };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case "left":
        variants.hidden = { ...variants.hidden, x: -50 };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      case "right":
        variants.hidden = { ...variants.hidden, x: 50 };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      case "scale":
        variants.hidden = { ...variants.hidden, scale: 0.8 };
        variants.visible = { ...variants.visible, scale: 1 };
        break;
      case "fade":
        // Already set with default opacity values
        break;
    }

    return variants;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: direction === "scale" ? "spring" : "tween",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
