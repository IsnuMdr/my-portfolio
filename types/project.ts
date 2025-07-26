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
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  completedAt: string;
  slug: string;
  challenge?: string;
  solution?: string;
  results: string[];
  images: ProjectImage[];
  features: string[];
  category: ProjectCategories;
  duration: string;
  role?: string;
  teamSize: number;
  testimonial: ProjectTestimonial[];
}
