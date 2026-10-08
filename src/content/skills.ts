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
  | "docker"
  | "vite"
  | "express"
  | "githubactions"
  | "cloudflare"
  | "opencv"
  | "mediapipe"
  | "yolo"
  | "pandas"
  | "hadoop"
  | "spark"
  | "qwen"
  | "awsrds";

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

export interface TechBadge {
  name: string;
  icon?: string | string[];
  accent?: SkillAccent;
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

// Experience 기술 스택 이름 → 아이콘(Simple Icons slug 또는 /public 경로)과 브랜드 색
// 목록에 없는 이름은 아이콘 없이 기본 색 pill로 보인다 (예: llama.cpp, K-Means)
const techBadges: Record<string, Omit<TechBadge, "name">> = {
  JavaScript: { icon: "javascript", accent: "javascript" },
  TypeScript: { icon: "typescript", accent: "typescript" },
  Python: { icon: "python", accent: "python" },
  HTML: { icon: "html5", accent: "html" },
  CSS: { icon: "css", accent: "css" },
  React: { icon: "react", accent: "react" },
  "Next.js": { icon: "nextdotjs", accent: "nextjs" },
  Vite: { icon: "vite", accent: "vite" },
  "Node.js": { icon: "nodedotjs", accent: "nodejs" },
  Express: { icon: "express", accent: "express" },
  MySQL: { icon: "mysql", accent: "mysql" },
  // Simple Icons에 AWS 아이콘이 없어 범용 데이터베이스 아이콘을 쓴다
  "AWS RDS": { icon: "/icons/database.svg", accent: "awsrds" },
  Docker: { icon: "docker", accent: "docker" },
  "GitHub Actions": { icon: "githubactions", accent: "githubactions" },
  "Cloudflare Workers": { icon: "cloudflareworkers", accent: "cloudflare" },
  OpenCV: { icon: "opencv", accent: "opencv" },
  MediaPipe: { icon: "mediapipe", accent: "mediapipe" },
  YOLO: { icon: "yolo", accent: "yolo" },
  Pandas: { icon: "pandas", accent: "pandas" },
  Hadoop: { icon: "apachehadoop", accent: "hadoop" },
  Spark: { icon: "apachespark", accent: "spark" },
  "Qwen2.5-3B-Instruct": { icon: "qwen", accent: "qwen" },
};

export function getTechBadge(name: string): TechBadge {
  return { name, ...techBadges[name] };
}

export function getSkillIconSrc(icon: string) {
  return icon.startsWith("/") ? icon : `https://cdn.simpleicons.org/${icon}`;
}
