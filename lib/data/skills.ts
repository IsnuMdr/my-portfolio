import { Skill } from "@/types/skills";
import { prisma } from "../prisma";

export async function getAllSkills(): Promise<Skill[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        category: "asc",
      },
    });
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}
