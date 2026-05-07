export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface BulletPoint {
  text: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  isCurrent: boolean;
  description: string;
  bullets: string[];
  tech: string[];
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  paperUrl?: string;
  gradient: string;
  accentColor: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  confidence: number;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface ModelCardSpec {
  key: string;
  value: string;
}

export interface NavItem {
  label: string;
  href: string;
}
