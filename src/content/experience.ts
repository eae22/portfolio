import type { SkillKey } from "@/content/skills";

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

export interface ExperienceFeature {
  title: string;
  description: string;
}

export interface ExperienceProblemItem {
  title: string;
  description: string;
}

export interface ExperienceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ExperienceItem {
  slug: string;
  title: string;
  headline: string;
  period: string;
  description: string;
  category: ExperiencePrimaryCategory;
  tags?: string[];
  icon: ExperienceIcon;
  overview: string;
  keyFeatures: ExperienceFeature[];
  techStack: SkillKey[];
  role: string[];
  problemSolving: ExperienceProblemItem[];
  githubUrl: string;
  image: ExperienceImage;
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

const defaultGithubUrl = "https://github.com/eae22?tab=repositories";

export const experiences: ExperienceItem[] = [
  {
    slug: "service-project",
    title: "서비스 프로젝트",
    headline: "사용자 흐름을 정리해 완성도를 높인 서비스 프로젝트",
    period: "2023 - Present",
    description:
      "기획부터 개발, 배포까지 참여하며 사용자 흐름을 개선하는 웹 서비스를 제작했습니다.",
    category: "project",
    tags: ["Team", "Club"],
    icon: "rocket",
    overview:
      "문제를 빠르게 구현하는 것에서 끝나지 않고, 사용자가 실제로 어떤 흐름으로 서비스를 경험하는지에 집중해 화면 구조와 주요 액션을 다듬은 프로젝트입니다. 초기 버전에서는 기능은 동작했지만 핵심 동선이 분산되어 있었고, 이를 해결하기 위해 정보 우선순위와 화면 전환 흐름을 다시 설계했습니다.",
    keyFeatures: [
      {
        title: "핵심 동선 재설계",
        description:
          "첫 방문 사용자도 주요 액션을 빠르게 이해할 수 있도록 진입 흐름과 CTA 배치를 정리했습니다.",
      },
      {
        title: "상태 기반 화면 분기",
        description:
          "사용자 상태에 따라 필요한 정보와 버튼만 노출되도록 UI 분기 로직을 구성했습니다.",
      },
      {
        title: "운영 편의성 고려",
        description:
          "관리와 배포 이후 수정이 쉬운 구조를 목표로 데이터를 분리하고 공통 UI 패턴을 정리했습니다.",
      },
      {
        title: "반응형 레이아웃",
        description:
          "데스크톱 중심 화면을 모바일 환경에서도 무리 없이 사용할 수 있도록 레이아웃을 보완했습니다.",
      },
    ],
    techStack: [
      "typescript",
      "react",
      "nextjs",
      "tailwind",
      "nodejs",
      "mysql",
      "git",
      "figma",
    ],
    role: [
      "서비스 구조와 주요 사용자 플로우를 정리하고 화면 우선순위를 재설계했습니다.",
      "프론트엔드 구현을 담당하며 재사용 가능한 컴포넌트와 상태 흐름을 정리했습니다.",
      "기획 의도와 실제 사용 흐름의 차이를 팀원과 함께 점검하며 UI를 반복 개선했습니다.",
    ],
    problemSolving: [
      {
        title: "정보가 많아 핵심 동작이 묻히던 문제",
        description:
          "초기 화면에서 너무 많은 정보가 동시에 노출되어 사용자가 어디서부터 시작해야 하는지 알기 어려웠습니다. 핵심 액션 중심으로 정보 밀도를 재조정하고 섹션 간 위계를 명확히 해 진입 장벽을 낮췄습니다.",
      },
      {
        title: "기능 추가 시 화면 구조가 쉽게 복잡해지던 문제",
        description:
          "새로운 기능이 붙을수록 화면 로직이 흩어지는 문제가 있어 공통 UI 패턴과 데이터 구조를 정리했습니다. 덕분에 이후 수정에서도 영향 범위를 빠르게 파악할 수 있었습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/service-project/cover.svg",
      alt: "서비스 프로젝트 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "hackathon-award",
    title: "해커톤 수상",
    headline: "짧은 시간 안에 아이디어를 제품으로 연결한 해커톤 프로젝트",
    period: "2024",
    description:
      "짧은 기간 안에 팀 프로젝트를 완성하고 발표하며 우수한 성과를 거두었습니다.",
    category: "project",
    tags: ["Award", "Team"],
    icon: "trophy",
    overview:
      "제한된 시간 안에서 문제 정의, 역할 분담, 구현 우선순위를 빠르게 맞추며 결과물을 완성한 프로젝트입니다. 완벽한 기능 수보다 발표 시점까지 설득력 있게 전달할 수 있는 핵심 흐름을 만드는 데 집중했습니다.",
    keyFeatures: [
      {
        title: "빠른 MVP 설계",
        description:
          "핵심 가치가 가장 잘 드러나는 기능만 먼저 구현해 짧은 시간 안에도 명확한 데모를 준비했습니다.",
      },
      {
        title: "협업 기반 개발",
        description:
          "디자인, 프론트엔드, 백엔드 작업이 동시에 진행될 수 있도록 역할과 인터페이스를 일찍 정리했습니다.",
      },
      {
        title: "발표 중심 정리",
        description:
          "기능 시연과 스토리 전달이 자연스럽게 이어지도록 데모 플로우를 별도로 정리했습니다.",
      },
    ],
    techStack: ["javascript", "react", "html-css", "nodejs", "git", "figma"],
    role: [
      "핵심 사용자 흐름을 빠르게 와이어프레임으로 정리하고 우선순위를 조율했습니다.",
      "프론트엔드 화면 구현과 발표용 데모 시나리오 정리를 함께 맡았습니다.",
      "제한된 시간 안에서 구현 범위를 조정하며 팀 진행 속도를 맞췄습니다.",
    ],
    problemSolving: [
      {
        title: "시간 제약으로 모든 기능을 구현하기 어려웠던 문제",
        description:
          "초기 아이디어는 범위가 넓어 데모 완성 가능성이 낮았습니다. 필수 기능과 부가 기능을 빠르게 분리하고, 사용자 가치가 가장 큰 흐름에 리소스를 집중했습니다.",
      },
      {
        title: "짧은 기간 안에 팀 의사결정을 맞춰야 했던 문제",
        description:
          "기획 변경이 잦아질수록 구현 속도가 떨어질 수 있어, 화면 단위 기준으로 역할을 나누고 결정 사항을 즉시 공유하는 방식으로 협업 비용을 줄였습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/hackathon-award/cover.svg",
      alt: "해커톤 수상 프로젝트 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "algorithm-study",
    title: "알고리즘 스터디",
    headline: "꾸준한 문제 해결 루틴을 만든 알고리즘 스터디 운영",
    period: "2023 - 2024",
    description:
      "문제 풀이와 코드 리뷰를 중심으로 스터디를 운영하며 꾸준한 학습 루틴을 만들었습니다.",
    category: "study",
    tags: ["Algorithm"],
    icon: "terminal",
    overview:
      "단순히 문제 수를 늘리는 방식보다, 서로의 풀이를 설명하고 개선 포인트를 나누는 학습 방식을 목표로 운영한 스터디입니다. 반복 가능한 학습 루틴을 만드는 것에 집중하면서 문제 선정, 풀이 공유, 회고 방식까지 함께 정리했습니다.",
    keyFeatures: [
      {
        title: "문제 풀이 아카이빙",
        description:
          "풀이 방식과 리뷰 포인트를 기록해 이후에 다시 참고할 수 있는 학습 자료로 정리했습니다.",
      },
      {
        title: "코드 리뷰 중심 진행",
        description:
          "정답 여부보다 풀이 접근 방식과 복잡도 개선 방향을 함께 보는 스터디 구조를 만들었습니다.",
      },
      {
        title: "꾸준한 학습 루틴",
        description:
          "주간 단위 목표와 회고를 반복하면서 학습 리듬이 끊기지 않도록 운영했습니다.",
      },
    ],
    techStack: ["python", "typescript", "git"],
    role: [
      "문제 난이도와 학습 목표에 맞춰 주간 스터디 주제를 선정했습니다.",
      "풀이 공유 방식과 코드 리뷰 포맷을 정리해 참여자들이 같은 기준으로 리뷰할 수 있게 했습니다.",
      "스터디 회고를 정리하며 다음 주 학습 방향을 조정했습니다.",
    ],
    problemSolving: [
      {
        title: "풀이만 하고 복습이 부족했던 문제",
        description:
          "한 번 푼 문제를 다시 돌아보지 않아 학습 효과가 분산되는 경우가 많았습니다. 풀이 요약과 회고를 기록하는 방식을 도입해 복습의 밀도를 높였습니다.",
      },
      {
        title: "참여자별 난이도 차이를 맞추기 어려웠던 문제",
        description:
          "공통 문제와 선택 문제를 분리해 부담은 줄이고, 각자 성장 포인트를 가져갈 수 있도록 진행 방식을 조정했습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/algorithm-study/cover.svg",
      alt: "알고리즘 스터디 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "dev-club-activity",
    title: "개발 동아리 활동",
    headline: "협업 경험과 운영 감각을 함께 키운 개발 동아리 활동",
    period: "2022 - Present",
    description:
      "협업 프로젝트를 진행하며 프론트엔드 개발과 커뮤니케이션 경험을 함께 쌓았습니다.",
    category: "activity",
    tags: ["Club", "Leadership"],
    icon: "users",
    overview:
      "프로젝트 진행뿐 아니라 팀 간 커뮤니케이션과 운영 방식까지 함께 경험한 활동입니다. 각기 다른 속도로 작업하는 사람들과 협업하면서, 일정 관리와 역할 조율이 결과물의 완성도에 얼마나 큰 영향을 주는지 체감할 수 있었습니다.",
    keyFeatures: [
      {
        title: "팀 프로젝트 운영",
        description:
          "아이디어 정리부터 역할 분담, 진행 체크까지 협업 프로세스를 실제로 경험했습니다.",
      },
      {
        title: "프론트엔드 구현 경험",
        description:
          "화면 구조 설계와 UI 구현을 맡으며 사용자 경험을 코드로 풀어내는 감각을 쌓았습니다.",
      },
      {
        title: "커뮤니케이션 정리",
        description:
          "회의 내용과 결정 사항을 명확히 남기며 팀 작업의 기준점을 맞추는 역할을 수행했습니다.",
      },
    ],
    techStack: ["react", "nextjs", "git", "figma", "docker"],
    role: [
      "프로젝트마다 프론트엔드 화면 구현과 공통 UI 정리를 주로 담당했습니다.",
      "작업 상황을 공유하고 팀원 간 일정 차이를 조율하는 역할을 맡았습니다.",
      "필요 시 기획안과 디자인 방향을 구현 관점에서 다시 정리해 제안했습니다.",
    ],
    problemSolving: [
      {
        title: "작업 속도 차이로 협업 리듬이 어긋나던 문제",
        description:
          "각자 진행 속도가 달라 병목이 생기는 구간이 있었고, 이를 해결하기 위해 작업 단위를 더 잘게 나누고 중간 점검 주기를 짧게 가져갔습니다.",
      },
      {
        title: "구현 기준이 달라 화면 품질이 흔들리던 문제",
        description:
          "공통 컴포넌트와 스타일 기준을 먼저 정리해 팀 전체 UI 결과물이 크게 흔들리지 않도록 조정했습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/dev-club-activity/cover.svg",
      alt: "개발 동아리 활동 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "web-bootcamp",
    title: "웹 개발 부트캠프",
    headline: "실무형 협업 흐름과 구현 경험을 압축해 익힌 부트캠프",
    period: "2024",
    description:
      "실무형 커리큘럼을 통해 서비스 구현, 협업 프로세스, 배포 경험을 집중적으로 학습했습니다.",
    category: "study",
    tags: ["Bootcamp"],
    icon: "graduation",
    overview:
      "단기간에 서비스 구현부터 협업, 배포까지 한 사이클을 집중적으로 경험한 학습 과정입니다. 기능 구현 속도뿐 아니라 작업 단위를 나누고 협업 맥락을 정리하는 방식까지 함께 익히는 데 의미가 있었습니다.",
    keyFeatures: [
      {
        title: "실습 중심 커리큘럼",
        description:
          "이론 학습보다 직접 구현과 리뷰를 반복하며 기술을 빠르게 체득하는 흐름으로 진행했습니다.",
      },
      {
        title: "배포 경험",
        description:
          "개발 환경에서 끝나지 않고 실제 배포 과정을 경험하며 운영 관점도 함께 익혔습니다.",
      },
      {
        title: "협업 프로세스 학습",
        description:
          "이슈 분리, 브랜치 전략, 코드 리뷰 같은 협업 기본기를 실제 과제에 적용했습니다.",
      },
    ],
    techStack: ["javascript", "react", "nodejs", "mysql", "git"],
    role: [
      "과제 구현 과정에서 프론트엔드 화면 구성과 사용자 흐름 정리를 담당했습니다.",
      "팀 과제에서는 역할 분담과 브랜치 전략을 정리하며 작업 흐름을 맞췄습니다.",
      "배포 과정에서 필요한 설정과 점검 항목을 직접 확인하며 운영 경험을 쌓았습니다.",
    ],
    problemSolving: [
      {
        title: "구현 위주 학습으로 구조 설계가 약해지던 문제",
        description:
          "빠르게 기능을 만드는 데 집중하다 보면 구조가 쉽게 흐트러질 수 있어, 기능 구현 전 데이터 흐름과 화면 단위를 먼저 정리하는 습관을 만들었습니다.",
      },
      {
        title: "처음 접하는 배포 환경에서 설정 오류가 잦던 문제",
        description:
          "배포 과정에서 발생한 오류를 정리하며 체크리스트를 만들었고, 이후에는 같은 유형의 문제를 더 빠르게 해결할 수 있었습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/web-bootcamp/cover.svg",
      alt: "웹 개발 부트캠프 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "mvp-side-project",
    title: "MVP 사이드 프로젝트",
    headline: "빠른 검증과 우선순위 판단에 집중한 MVP 사이드 프로젝트",
    period: "2024",
    description:
      "아이디어를 빠르게 제품으로 옮기는 과정을 경험하며 기능 우선순위와 구현 속도를 다듬었습니다.",
    category: "project",
    tags: ["Personal"],
    icon: "sparkles",
    overview:
      "아이디어를 오래 다듬기보다 빠르게 구현해 보고, 실제로 필요한 기능이 무엇인지 검증하는 방식으로 진행한 개인 프로젝트입니다. 제한된 시간 안에서 완성도와 속도 사이 균형을 잡는 감각을 익히는 데 목적을 두었습니다.",
    keyFeatures: [
      {
        title: "빠른 프로토타이핑",
        description:
          "핵심 가치만 빠르게 구현해 실제 사용 가능 여부를 먼저 확인할 수 있게 했습니다.",
      },
      {
        title: "우선순위 중심 개발",
        description:
          "있으면 좋은 기능보다 없어서는 안 되는 기능을 먼저 구현하며 범위를 관리했습니다.",
      },
      {
        title: "개인 프로젝트 운영",
        description:
          "기획, 디자인, 개발, 회고를 모두 직접 진행하며 의사결정 전 과정을 경험했습니다.",
      },
    ],
    techStack: ["typescript", "nextjs", "tailwind", "figma", "docker"],
    role: [
      "아이디어 검증을 위한 핵심 화면과 기능을 빠르게 설계하고 구현했습니다.",
      "기획과 디자인 방향을 직접 정리하며 제품 관점의 우선순위를 판단했습니다.",
      "구현 후 회고를 통해 다음 버전에서 보완할 점을 문서화했습니다.",
    ],
    problemSolving: [
      {
        title: "혼자 작업하면서 범위가 쉽게 커지던 문제",
        description:
          "아이디어가 확장될수록 완성 시점이 늦어질 수 있어, 한 번에 해결할 문제를 명확히 정의하고 이번 버전에서 다루지 않을 항목을 의도적으로 제외했습니다.",
      },
      {
        title: "빠른 구현 과정에서 일관성이 무너지던 문제",
        description:
          "속도를 유지하면서도 품질을 지키기 위해 공통 레이아웃과 반복 UI를 먼저 정리하고, 이후 세부 기능을 얹는 순서로 작업했습니다.",
      },
    ],
    githubUrl: defaultGithubUrl,
    image: {
      src: "/images/experience/mvp-side-project/cover.svg",
      alt: "MVP 사이드 프로젝트 상세 소개용 커버 이미지",
      width: 1600,
      height: 900,
    },
  },
];
