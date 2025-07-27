import { Experience } from "@/types/experience";
import { prisma } from "../prisma";

export async function getAllExperience(): Promise<Experience[]> {
  try {
    const experience = prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });

    return experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}
