import { Project } from "@/types/project";
import { prisma } from "../prisma";
import { ProjectCategories } from "@prisma/client";

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        testimonial: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        testimonial: true,
        images: true,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      include: {
        testimonial: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectsByCategory(
  category: ProjectCategories
): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { category },
      include: {
        testimonial: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
