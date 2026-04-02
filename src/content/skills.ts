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

export type SkillKey =
  | "javascript"
  | "typescript"
  | "python"
  | "c"
  | "react"
  | "nextjs"
  | "html-css"
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
  key: SkillKey;
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
    key: "javascript",
    name: "JavaScript",
    icon: "javascript",
    categories: ["languages"],
    accent: "javascript",
  },
  {
    key: "typescript",
    name: "TypeScript",
    icon: "typescript",
    categories: ["languages"],
    accent: "typescript",
  },
  {
    key: "python",
    name: "Python",
    icon: "python",
    categories: ["languages"],
    accent: "python",
  },
  { key: "c", name: "C", icon: "c", categories: ["languages"], accent: "c" },

  // Frontend
  {
    key: "react",
    name: "React",
    icon: "react",
    categories: ["frontend"],
    accent: "react",
  },
  {
    key: "nextjs",
    name: "Next.js",
    icon: "nextdotjs",
    categories: ["frontend"],
    accent: "nextjs",
  },
  {
    key: "html-css",
    name: "HTML/CSS",
    icon: ["html5", "css"],
    categories: ["frontend"],
    accent: "html",
    secondaryAccent: "css",
  },
  {
    key: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwindcss",
    categories: ["frontend"],
    accent: "tailwind",
  },

  // Backend
  {
    key: "nodejs",
    name: "Node.js",
    icon: "nodedotjs",
    categories: ["backend"],
    accent: "nodejs",
  },
  {
    key: "mysql",
    name: "MySQL",
    icon: "mysql",
    categories: ["backend"],
    accent: "mysql",
  },

  // Tools
  {
    key: "git",
    name: "Git",
    icon: "git",
    categories: ["tools"],
    accent: "git",
  },
  {
    key: "figma",
    name: "Figma",
    icon: "figma",
    categories: ["tools"],
    accent: "figma",
  },
  {
    key: "docker",
    name: "Docker",
    icon: "docker",
    categories: ["tools"],
    accent: "docker",
  },
];

export const skillMap = skills.reduce(
  (acc, skill) => {
    acc[skill.key] = skill;
    return acc;
  },
  {} as Record<SkillKey, SkillItem>,
);

export function getSkillIconSrc(icon: string) {
  return `https://cdn.simpleicons.org/${icon}`;
}

export function getSkillsByKeys(keys: readonly SkillKey[]) {
  return keys.map((key) => skillMap[key]);
}
