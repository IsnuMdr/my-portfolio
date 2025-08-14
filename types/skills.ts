export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience?: Date | null;
  description?: string | null;
}
