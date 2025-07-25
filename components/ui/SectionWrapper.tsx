"use client";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({
  id,
  children,
  className = "",
}: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${className}`} // scroll-mt-20 accounts for header
    >
      {children}
    </section>
  );
};
