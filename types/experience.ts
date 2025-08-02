import { ExperienceType } from "@prisma/client";

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  achievements: string[];
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  location?: string | null;
  companyUrl?: string | null;
  companyLogo?: string | null;
  technologies: string[];
  type: ExperienceType;
}
