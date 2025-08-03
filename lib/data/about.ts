import { About } from "@/types/about";
import { prisma } from "../prisma";

export async function getAbout(): Promise<About | null> {
  try {
    const about = prisma.about.findFirst();

    return about;
  } catch (error) {
    console.error("Error fetching about:", error);
    return null;
  }
}
