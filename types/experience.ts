export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  achievements: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  companyUrl?: string;
  companyLogo?: string;
  technologies: string[];
  type: "full-time" | "part-time" | "contract" | "internship";
}
