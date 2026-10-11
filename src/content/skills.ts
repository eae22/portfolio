// Skills 섹션: 맨 위 Languages 한 줄 + 분야별 카드 4개 (2×2: 위 Data · AI가 주력, 아래 Web · Infra & Tools)
// 언어는 여러 분야에 걸쳐 쓰여서 분야 카드에 넣지 않고 따로 둔다
export type SkillCategory = "languages" | "data" | "ai" | "web" | "tools";

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
  | "numpy"
  | "scikitlearn"
  | "pytorch"
  | "huggingface"
  | "neo4j"
  | "dbeaver"
  | "hadoop"
  | "spark"
  | "qwen"
  | "awsrds"
  | "llamacpp"
  | "sql";

export type SkillKey =
  // Languages
  | "python"
  | "sql"
  | "typescript"
  | "javascript"
  | "c"
  // Data
  | "mysql"
  | "pandas"
  | "numpy"
  | "spark"
  | "hadoop"
  // AI
  | "pytorch"
  | "transformers"
  | "scikit-learn"
  | "opencv"
  | "mediapipe"
  | "yolo"
  | "llama-cpp"
  // Web
  | "react"
  | "html-css"
  | "tailwind"
  | "vite"
  | "nextjs"
  | "nodejs"
  | "express"
  // Infra & Tools
  | "git"
  | "github-actions"
  | "docker"
  | "aws-rds"
  | "cloudflare-workers"
  | "figma";

export interface SkillGroup {
  label: string;
  value: SkillCategory;
}

export interface SkillItem {
  key: SkillKey;
  name: string;
  icon: string | string[];
  categories: SkillCategory[];
  accent: SkillAccent;
  secondaryAccent?: SkillAccent;
}

export interface TechBadge {
  name: string;
  icon?: string | string[];
  accent?: SkillAccent;
  secondaryAccent?: SkillAccent;
}

// Languages를 맨 위 한 줄로 두고, 분야 카드는 헤드라인 순서(데이터를 모으고 → AI로 활용하고 → 화면까지)를 따른다
export const skillGroups: SkillGroup[] = [
  { label: "Languages", value: "languages" },
  { label: "Data", value: "data" },
  { label: "AI", value: "ai" },
  { label: "Web", value: "web" },
  { label: "Infra & Tools", value: "tools" },
];

// 카드 안에서는 이 배열 순서대로 보인다 (분야마다 중요한 것부터)
export const skills: SkillItem[] = [
  // Languages
  {
    key: "python",
    name: "Python",
    icon: "python",
    categories: ["languages"],
    accent: "python",
  },
  {
    // Simple Icons에 일반 SQL 아이콘이 없어 표 모양 아이콘을 쓴다
    key: "sql",
    name: "SQL",
    icon: "/icons/sql.svg",
    categories: ["languages"],
    accent: "sql",
  },
  {
    key: "typescript",
    name: "TypeScript",
    icon: "typescript",
    categories: ["languages"],
    accent: "typescript",
  },
  {
    key: "javascript",
    name: "JavaScript",
    icon: "javascript",
    categories: ["languages"],
    accent: "javascript",
  },
  { key: "c", name: "C", icon: "c", categories: ["languages"], accent: "c" },

  // Data
  {
    key: "mysql",
    name: "MySQL",
    icon: "mysql",
    categories: ["data"],
    accent: "mysql",
  },
  {
    key: "pandas",
    name: "Pandas",
    icon: "pandas",
    categories: ["data"],
    accent: "pandas",
  },
  {
    key: "numpy",
    name: "NumPy",
    icon: "numpy",
    categories: ["data"],
    accent: "numpy",
  },
  {
    key: "spark",
    name: "Spark",
    icon: "apachespark",
    categories: ["data"],
    accent: "spark",
  },
  {
    key: "hadoop",
    name: "Hadoop",
    icon: "apachehadoop",
    categories: ["data"],
    accent: "hadoop",
  },

  // AI
  {
    key: "pytorch",
    name: "PyTorch",
    icon: "pytorch",
    categories: ["ai"],
    accent: "pytorch",
  },
  {
    key: "transformers",
    name: "Transformers",
    icon: "huggingface",
    categories: ["ai"],
    accent: "huggingface",
  },
  {
    key: "scikit-learn",
    name: "scikit-learn",
    icon: "scikitlearn",
    categories: ["ai"],
    accent: "scikitlearn",
  },
  {
    key: "opencv",
    name: "OpenCV",
    icon: "opencv",
    categories: ["ai"],
    accent: "opencv",
  },
  {
    key: "mediapipe",
    name: "MediaPipe",
    icon: "mediapipe",
    categories: ["ai"],
    accent: "mediapipe",
  },
  {
    key: "yolo",
    name: "YOLO",
    icon: "yolo",
    categories: ["ai"],
    accent: "yolo",
  },
  {
    // Simple Icons에 llama.cpp 아이콘이 없어 범용 CPU 아이콘을 쓴다
    key: "llama-cpp",
    name: "llama.cpp",
    icon: "/icons/cpu.svg",
    categories: ["ai"],
    accent: "llamacpp",
  },

  // Web
  {
    key: "react",
    name: "React",
    icon: "react",
    categories: ["web"],
    accent: "react",
  },
  {
    key: "html-css",
    name: "HTML/CSS",
    icon: ["html5", "css"],
    categories: ["web"],
    accent: "html",
    secondaryAccent: "css",
  },
  {
    key: "tailwind",
    name: "Tailwind CSS",
    icon: "tailwindcss",
    categories: ["web"],
    accent: "tailwind",
  },
  {
    key: "vite",
    name: "Vite",
    icon: "vite",
    categories: ["web"],
    accent: "vite",
  },
  {
    key: "nextjs",
    name: "Next.js",
    icon: "nextdotjs",
    categories: ["web"],
    accent: "nextjs",
  },
  {
    key: "nodejs",
    name: "Node.js",
    icon: "nodedotjs",
    categories: ["web"],
    accent: "nodejs",
  },
  {
    key: "express",
    name: "Express",
    icon: "express",
    categories: ["web"],
    accent: "express",
  },

  // Infra & Tools
  {
    key: "git",
    name: "Git",
    icon: "git",
    categories: ["tools"],
    accent: "git",
  },
  {
    key: "github-actions",
    name: "GitHub Actions",
    icon: "githubactions",
    categories: ["tools"],
    accent: "githubactions",
  },
  {
    key: "docker",
    name: "Docker",
    icon: "docker",
    categories: ["tools"],
    accent: "docker",
  },
  {
    key: "aws-rds",
    name: "AWS RDS",
    icon: "/icons/database.svg",
    categories: ["tools"],
    accent: "awsrds",
  },
  {
    key: "cloudflare-workers",
    name: "Cloudflare Workers",
    icon: "cloudflareworkers",
    categories: ["tools"],
    accent: "cloudflare",
  },
  {
    key: "figma",
    name: "Figma",
    icon: "figma",
    categories: ["tools"],
    accent: "figma",
  },
];

// Experience 기술 스택 이름 → 아이콘(Simple Icons slug 또는 /public 경로)과 브랜드 색
// 목록에 없는 이름은 아이콘 없이 기본 색 pill로 보인다 (예: K-Means, CatBoost, LightGBM)
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
  Neo4j: { icon: "neo4j", accent: "neo4j" },
  DBeaver: { icon: "dbeaver", accent: "dbeaver" },
  // Simple Icons에 AWS 아이콘이 없어 범용 데이터베이스 아이콘을 쓴다
  "AWS RDS": { icon: "/icons/database.svg", accent: "awsrds" },
  Docker: { icon: "docker", accent: "docker" },
  Git: { icon: "git", accent: "git" },
  Figma: { icon: "figma", accent: "figma" },
  "GitHub Actions": { icon: "githubactions", accent: "githubactions" },
  "Cloudflare Workers": { icon: "cloudflareworkers", accent: "cloudflare" },
  OpenCV: { icon: "opencv", accent: "opencv" },
  MediaPipe: { icon: "mediapipe", accent: "mediapipe" },
  YOLO: { icon: "yolo", accent: "yolo" },
  Pandas: { icon: "pandas", accent: "pandas" },
  NumPy: { icon: "numpy", accent: "numpy" },
  "scikit-learn": { icon: "scikitlearn", accent: "scikitlearn" },
  PyTorch: { icon: "pytorch", accent: "pytorch" },
  // Hugging Face Transformers 라이브러리
  Transformers: { icon: "huggingface", accent: "huggingface" },
  Hadoop: { icon: "apachehadoop", accent: "hadoop" },
  Spark: { icon: "apachespark", accent: "spark" },
  "Qwen2.5-3B-Instruct": { icon: "qwen", accent: "qwen" },
  // Simple Icons에 llama.cpp 아이콘이 없어 범용 CPU 아이콘을 쓴다
  "llama.cpp": { icon: "/icons/cpu.svg", accent: "llamacpp" },
};

export function getTechBadge(name: string): TechBadge {
  return { name, ...techBadges[name] };
}

export function getSkillIconSrc(icon: string) {
  return icon.startsWith("/") ? icon : `https://cdn.simpleicons.org/${icon}`;
}
