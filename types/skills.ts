export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience?: string | null;
  description?: string | null;
}
