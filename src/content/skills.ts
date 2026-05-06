export type SkillCategory =
  | "all"
  | "languages"
  | "frontend"
  | "backend"
  | "tools";

export type SkillAccent =
  | "javascript"
  | "typescript"
  | "python"
  | "c"
  | "react"
  | "nextjs"
  | "html"
  | "css"
  | "tailwind"
  | "nodejs"
  | "mysql"
  | "git"
  | "figma"
  | "docker";

export interface SkillCategoryOption {
  label: string;
  value: SkillCategory;
}

export interface SkillItem {
  name: string;
  icon: string | string[];
  categories: Exclude<SkillCategory, "all">[];
  accent: SkillAccent;
  secondaryAccent?: SkillAccent;
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
  {
    name: "JavaScript",
    icon: "javascript",
    categories: ["languages"],
    accent: "javascript",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    categories: ["languages"],
    accent: "typescript",
  },
  {
    name: "Python",
    icon: "python",
    categories: ["languages"],
    accent: "python",
  },
  { name: "C", icon: "c", categories: ["languages"], accent: "c" },

  // Frontend
  { name: "React", icon: "react", categories: ["frontend"], accent: "react" },
  {
    name: "Next.js",
    icon: "nextdotjs",
    categories: ["frontend"],
    accent: "nextjs",
  },
  {
    name: "HTML/CSS",
    icon: ["html5", "css"],
    categories: ["frontend"],
    accent: "html",
    secondaryAccent: "css",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwindcss",
    categories: ["frontend"],
    accent: "tailwind",
  },

  // Backend
  {
    name: "Node.js",
    icon: "nodedotjs",
    categories: ["backend"],
    accent: "nodejs",
  },
  { name: "MySQL", icon: "mysql", categories: ["backend"], accent: "mysql" },

  // Tools
  { name: "Git", icon: "git", categories: ["tools"], accent: "git" },
  { name: "Figma", icon: "figma", categories: ["tools"], accent: "figma" },
  { name: "Docker", icon: "docker", categories: ["tools"], accent: "docker" },
];
