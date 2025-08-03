export interface About {
  id: string;
  name: string;
  title: string;
  headline?: string | null;
  tagline?: string | null;
  summary?: string | null;
  imageUrl?: string | null;
  personal: string[];
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  resume?: string | null;
  status?: string;
}
