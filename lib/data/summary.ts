import { prisma } from "../prisma";

export async function getSummary(): Promise<{
  skills: number;
  projects: number;
  experiences: number;
}> {
  try {
    const [skillsCount, projectsCount, experiencesCount, contactCount] =
      await Promise.all([
        prisma.skill.count(),
        prisma.project.count(),
        prisma.experience.count(),
        prisma.contact.count(),
      ]);

    return {
      skills: skillsCount,
      projects: projectsCount,
      experiences: experiencesCount,
    };
  } catch (error) {
    console.error("Error fetching summary:", error);
    return {
      skills: 0,
      projects: 0,
      experiences: 0,
    };
  }
}
