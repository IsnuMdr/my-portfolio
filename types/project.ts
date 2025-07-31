import {
  ProjectCategories,
  ProjectImage,
  ProjectTestimonial,
} from "@prisma/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured: boolean;
  completedAt: Date;
  slug: string;
  challenge?: string | null;
  solution?: string | null;
  results: string[];
  images?: ProjectImage[];
  features: string[];
  category: ProjectCategories;
  duration: string;
  role?: string | null;
  teamSize: number;
  testimonial?: ProjectTestimonial[];
}

export type ProjectData = Omit<Project, "id">;
