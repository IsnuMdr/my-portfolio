import { Project } from "@/types/project";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/api/projects`);
  return res.json();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/api/projects?featured=true`);
  return res.json();
}

export async function getProjectsByCategory(
  category: string
): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/api/projects?category=${category}`);
  return res.json();
}
