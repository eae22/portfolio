export type SkillCategory =
  | "all"
  | "languages"
  | "frontend"
  | "backend"
  | "tools";

export interface SkillCategoryOption {
  label: string;
  value: SkillCategory;
}

export interface SkillItem {
  name: string;
  icon: string | string[];
  categories: Exclude<SkillCategory, "all">[];
}

export const skillCategories: SkillCategoryOption[] = [
  { label: "All", value: "all" },
  { label: "Languages", value: "languages" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Tools", value: "tools" },
];

export const skills: SkillItem[] = [
  // Languages
  { name: "JavaScript", icon: "javascript", categories: ["languages"] },
  { name: "TypeScript", icon: "typescript", categories: ["languages"] },
  { name: "Python", icon: "python", categories: ["languages"] },
  { name: "C", icon: "c", categories: ["languages"] },

  // Frontend
  { name: "React", icon: "react", categories: ["frontend"] },
  { name: "Next.js", icon: "nextdotjs", categories: ["frontend"] },
  { name: "HTML/CSS", icon: ["html5", "css"], categories: ["frontend"] },
  { name: "Tailwind CSS", icon: "tailwindcss", categories: ["frontend"] },

  // Backend
  { name: "Node.js", icon: "nodedotjs", categories: ["backend"] },
  { name: "MySQL", icon: "mysql", categories: ["backend"] },

  // Tools
  { name: "Git", icon: "git", categories: ["tools"] },
  { name: "Figma", icon: "figma", categories: ["tools"] },
  { name: "Docker", icon: "docker", categories: ["tools"] },
];
