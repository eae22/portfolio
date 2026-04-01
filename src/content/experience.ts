export type ExperienceCategory = "all" | "project" | "activity" | "study";

export type ExperiencePrimaryCategory = Exclude<ExperienceCategory, "all">;

export type ExperienceIcon =
  | "rocket"
  | "trophy"
  | "terminal"
  | "users"
  | "graduation"
  | "sparkles";

export interface ExperienceCategoryOption {
  label: string;
  value: ExperienceCategory;
}

export interface ExperienceItem {
  title: string;
  period: string;
  description: string;
  category: ExperiencePrimaryCategory;
  tags?: string[];
  icon: ExperienceIcon;
}

export const experienceCategories: ExperienceCategoryOption[] = [
  { label: "All", value: "all" },
  { label: "Project", value: "project" },
  { label: "Activity", value: "activity" },
  { label: "Study", value: "study" },
];

export const experienceCategoryLabels: Record<
  ExperiencePrimaryCategory,
  string
> = {
  project: "Project",
  activity: "Activity",
  study: "Study",
};

export const experiences: ExperienceItem[] = [
  {
    title: "서비스 프로젝트",
    period: "2023 - Present",
    description:
      "기획부터 개발, 배포까지 참여하며 사용자 흐름을 개선하는 웹 서비스를 제작했습니다.",
    category: "project",
    tags: ["Team", "Club"],
    icon: "rocket",
  },
  {
    title: "해커톤 수상",
    period: "2024",
    description:
      "짧은 기간 안에 팀 프로젝트를 완성하고 발표하며 우수한 성과를 거두었습니다.",
    category: "project",
    tags: ["Award", "Team"],
    icon: "trophy",
  },
  {
    title: "알고리즘 스터디",
    period: "2023 - 2024",
    description:
      "문제 풀이와 코드 리뷰를 중심으로 스터디를 운영하며 꾸준한 학습 루틴을 만들었습니다.",
    category: "study",
    tags: ["Algorithm"],
    icon: "terminal",
  },
  {
    title: "개발 동아리 활동",
    period: "2022 - Present",
    description:
      "협업 프로젝트를 진행하며 프론트엔드 개발과 커뮤니케이션 경험을 함께 쌓았습니다.",
    category: "activity",
    tags: ["Club", "Leadership"],
    icon: "users",
  },
  {
    title: "웹 개발 부트캠프",
    period: "2024",
    description:
      "실무형 커리큘럼을 통해 서비스 구현, 협업 프로세스, 배포 경험을 집중적으로 학습했습니다.",
    category: "study",
    tags: ["Bootcamp"],
    icon: "graduation",
  },
  {
    title: "MVP 사이드 프로젝트",
    period: "2024",
    description:
      "아이디어를 빠르게 제품으로 옮기는 과정을 경험하며 기능 우선순위와 구현 속도를 다듬었습니다.",
    category: "project",
    tags: ["Personal"],
    icon: "sparkles",
  },
];
