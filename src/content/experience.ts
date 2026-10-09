// Experience 데이터 (실제 이력 기준, docs/portfolio-experience.ts 2026.10 정정본에서 옮김)
// - 기간 표기: "YYYY.MM". 진행 중이면 end: "Present"
// - github / link 가 없으면 필드를 빼두고, 화면에서 버튼을 렌더링하지 않는다
// - subtitle: 제목 아래 작은 줄 (팀, 수업, 주최 등 괄호에 들어가던 내용)
// - summary: 카드 한줄 소개. "\n"을 넣은 곳에서 줄이 바뀐다. 수상 내용은 배지로 보이므로 넣지 않는다
// - TODO 주석이 붙은 값은 본인이 채우거나 확인해야 함 (확인 전에는 사이트에 노출하지 말 것)

export type ExperienceCategory = "Project" | "Activity" | "Study";

export type ExperienceFilter = "all" | ExperienceCategory;

export type ExperienceTrack = "Data" | "Frontend" | "AI";

export interface ExperienceFilterOption {
  label: string;
  value: ExperienceFilter;
}

export interface ExperiencePeriod {
  start: string;
  end: string;
}

export interface ExperienceFeature {
  title: string;
  desc: string;
}

export interface ExperienceProblem {
  title: string;
  desc: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle?: string;
  category: ExperienceCategory;
  tracks?: ExperienceTrack[];
  period: ExperiencePeriod;
  summary: string;
  github?: string;
  link?: string;
  overview: string;
  features: ExperienceFeature[];
  stack: string[];
  roles: string[];
  problems: ExperienceProblem[];
}

export const experienceFilters: ExperienceFilterOption[] = [
  { label: "All", value: "all" },
  { label: "Project", value: "Project" },
  { label: "Activity", value: "Activity" },
  { label: "Study", value: "Study" },
];

// 카테고리별 색 (tokens.css의 --color-category-*)
export const experienceCategoryColors: Record<ExperienceCategory, string> = {
  Project: "var(--color-category-project)",
  Activity: "var(--color-category-activity)",
  Study: "var(--color-category-study)",
};

export const experiences: ExperienceItem[] = [
  // ───────────── Project ─────────────
  {
    id: "olaf",
    title: "올라프",
    subtitle: "All Lost And Found",
    category: "Project",
    tracks: ["Frontend", "AI"],
    period: { start: "2024.11", end: "2024.11" },
    summary: "CCTV 영상 속 카드를 탐지하는 분실물 관리 서비스",
    // github: "", // TODO
    overview:
      "CCTV 영상에서 카드 객체를 실시간으로 탐지해 분실물을 관리하는 서비스입니다. AI융합대학 교내 해커톤에서 최우수상을 받았습니다.",
    features: [
      {
        title: "실시간 카드 탐지",
        desc: "YOLO로 CCTV 영상 속 카드를 인식합니다.",
      },
      {
        title: "분실물 관리 화면",
        desc: "분실물 목록과 상세 조회, 관리자 페이지, CCTV 확인 화면을 제공합니다.",
      },
    ],
    stack: ["React", "YOLO", "Python"], // TODO: JavaScript인지 TypeScript인지 확인
    roles: [
      "React 프론트엔드 전반 구현 (분실물 목록과 상세, 관리자 페이지, CCTV 확인 화면)",
      "YOLO 학습 데이터를 여러 구도로 직접 촬영하고 라벨링",
      "탐지 결과가 서비스 화면으로 이어지는 흐름을 팀원과 함께 구성",
    ],
    problems: [
      {
        title: "특정 각도와 조명에서 인식률이 낮던 문제",
        desc: "학습 데이터가 일부 구도에 치우쳐 있다는 것을 확인하고, 촬영 구도와 환경을 다양하게 바꿔 데이터셋을 보완했습니다.",
      },
      {
        title: "직전 해커톤의 레이아웃 실패",
        desc: "한 달 전 해커톤에서 컴포넌트가 겹치는 레이아웃 문제를 끝내 못 고쳤던 경험을 바탕으로, 화면 구조와 배치를 먼저 설계하고 중간마다 확인하며 같은 문제 없이 완성했습니다.",
      },
    ],
  },
  {
    id: "personal-color",
    title: "퍼스널컬러 측정 시스템",
    subtitle: "인간컴퓨터상호작용 수업",
    category: "Project",
    tracks: ["AI"],
    period: { start: "2025.05", end: "2025.06" },
    summary: "셀카 이미지로 퍼스널컬러와 상의의 어울림을 판단하는 시스템",
    overview:
      "셀카 이미지에서 피부톤 기반 퍼스널컬러를 측정하고, 입고 있는 상의 색과 잘 어울리는지 판단하는 전공 수업 프로젝트입니다.",
    features: [
      {
        title: "상의 영역 추출",
        desc: "MediaPipe와 OpenCV로 이미지에서 상의 영역을 분리합니다.",
      },
      {
        title: "대표 색상 판별",
        desc: "K-Means로 상의의 대표 색상을 구합니다.",
      },
    ],
    stack: ["Python", "OpenCV", "MediaPipe", "K-Means"],
    roles: [
      "데이터 수집",
      "이미지 전처리",
      "상의 영역 추출과 색상 분석 로직 구현",
    ],
    problems: [
      {
        title: "패턴 의상과 가림에서 색상이 틀어지던 문제",
        desc: "줄무늬, 체크, 그라데이션 의상이나 머리카락에 가려진 경우 판별이 자주 틀렸습니다. 테스트 이미지 30장을 직접 촬영해 검증하고, 최대 군집 비율이 과반이면 그 색을 채택하고 아니면 비율 순으로 합산하는 기준을 설계했습니다.",
      },
    ],
  },
  {
    id: "aico",
    title: "AICO",
    subtitle: "AI 면접 코치",
    category: "Project",
    tracks: ["Frontend", "AI"],
    period: { start: "2025.11", end: "2025.11" },
    summary: "자소서와 포트폴리오 기반 AI 면접 코칭 서비스",
    // github: "", // TODO: 팀 레포 공개 여부 확인
    overview:
      "자소서와 포트폴리오를 바탕으로 면접 질문을 만들고, 여러 AI 에이전트가 토론해 면접을 평가하는 서비스입니다. 첨단융합대학 교내 해커톤 2025 X-Thon에서 대상을 받았습니다.",
    features: [
      {
        title: "면접 기록 홈",
        desc: "과거 면접 기록을 보고 새 면접을 만드는 홈 화면입니다.",
      },
      {
        title: "새 면접 생성 팝업",
        desc: "회사명, 직군, 질문 수를 입력하고 PDF를 올린 뒤 카메라와 마이크를 점검합니다.",
      },
      {
        title: "음성 안내",
        desc: "면접 진행 화면에서 질문을 음성으로 읽어줍니다 (Cloudflare Workers TTS).",
      },
    ],
    stack: ["React", "Cloudflare Workers"], // TODO: 빌드 도구(CRA인지 Vite인지)와 JS/TS 확인
    roles: [
      "React 프로젝트 초기 세팅",
      "메인, 로그인, 회원가입 화면 구현",
      "면접 기록 홈 화면과 새 면접 생성 팝업 구현",
      "면접 진행 화면 TTS 추가, 녹화 타이머 버그 수정",
    ],
    problems: [
      {
        title: "백엔드 연동이 늦어진 상황의 시연",
        desc: "마감 안에 전체 흐름을 보여줘야 해서 홈 화면 목록은 임시 데이터로 채우고, 최종 시연 흐름이 끊기지 않도록 화면을 먼저 완성했습니다.",
      },
    ],
  },
  {
    id: "movie",
    title: "영화 탐색 및 추천 시스템",
    subtitle: "데이터베이스설계 수업 · 2인",
    category: "Project",
    tracks: ["Data", "Frontend"],
    period: { start: "2025.11", end: "2025.12" },
    summary: "MySQL 설계와 그룹 통계 기반 추천 API",
    // github: "", // TODO
    overview:
      "OTT, 장르, 개봉연도 등으로 영화를 탐색하고, 성별과 나이대가 같은 사용자 그룹의 선호를 바탕으로 영화를 추천하는 전공 수업 프로젝트입니다.",
    features: [
      {
        title: "그룹 기반 추천",
        desc: "같은 성별과 나이대 그룹이 등록한 선호 장르를 집계해 추천합니다.",
      },
      {
        title: "추천 3종",
        desc: "Top5, 최근 60일 리뷰 수 기준 인기 급상승, 최신 개봉을 각 5편씩 보여줍니다.",
      },
      {
        title: "그룹 리뷰",
        desc: "영화 상세 화면에서 같은 성별과 나이대 사용자의 리뷰를 따로 보여줍니다.",
      },
    ],
    stack: ["MySQL", "AWS RDS", "Node.js", "Express", "React", "Vite"],
    roles: [
      "영화 60편 데이터 직접 조사, ERD와 스키마 설계 (다대다 연결 테이블 4개)",
      "Express 서버 초기 구축과 AWS RDS 연결",
      "추천 API와 React 추천 화면 개발",
    ],
    problems: [
      {
        title: "리뷰 없는 영화가 집계에서 빠질 위험",
        desc: "리뷰가 없는 신작도 평점 집계 결과에 남도록 리뷰 테이블을 LEFT JOIN으로 결합하도록 설계했습니다.",
      },
      {
        title: "그룹 인원이 적을 때 추천이 비는 문제",
        desc: "그룹의 50% 이상이 선호하는 장르를 기본으로 하되, 3명 이하 그룹은 1명 기준으로, 해당 장르가 없으면 선호 수 상위 3개로 대체하는 규칙을 만들었습니다.",
      },
    ],
  },
  {
    id: "yakjosim",
    title: "약조심",
    subtitle: "GDGoC SDGs 팀 프로젝트",
    category: "Project",
    tracks: ["Frontend"],
    period: { start: "2026.02", end: "2026.06" },
    summary: "약, 음식, 영양제 상호작용을 확인하는 서비스",
    // github: "", // TODO
    // link: "",   // TODO: 배포 주소가 있으면
    overview:
      "여러 약을 함께 복용하는 고령층이 늘면서 커지는 상호작용 위험에 주목해, 약과 음식과 영양제를 함께 먹어도 되는지 확인하는 서비스입니다.",
    features: [
      {
        title: "온보딩",
        desc: "처음 쓰는 사용자를 위한 단계별 안내 흐름입니다.",
      },
      {
        title: "검색과 조합 분석",
        desc: "약품을 검색하고 조합을 골라 상호작용 결과를 확인합니다.",
      },
      {
        title: "결과 리포트 내보내기",
        desc: "결과를 PDF나 이미지로 저장할 수 있습니다.",
      },
      {
        title: "시니어 모드",
        desc: "고령 사용자를 위해 화면을 더 크고 단순하게 보여줍니다.",
      },
    ],
    stack: ["React", "Vite", "TypeScript"],
    roles: [
      "프론트엔드 전체 구현 (온보딩, 검색과 조합 분석, 결과 화면)",
      "결과 리포트 PDF와 이미지 내보내기, 시니어 모드 UX",
      "드롭다운 재검색 버그 수정, 홍보용 목업 디자인",
    ],
    problems: [
      {
        title: "역할이 다른 팀원 간 소통",
        desc: "백엔드, AI, 프론트엔드 간 혼선을 줄이려고 API 명세와 데이터 형식을 문서로 공유했는데, 문서가 길어져 오히려 읽기 어려워졌습니다. 이후 당장 확인할 부분을 짚어주고 그 자리에서 맞춰보는 시간을 따로 가졌습니다.",
      },
    ],
  },
  {
    id: "mulsaemi",
    title: "물샘이",
    subtitle: "서울교통공사 협업 졸업 프로젝트",
    category: "Project",
    tracks: ["Data", "Frontend"],
    period: { start: "2026.03", end: "Present" },
    summary: "77개 역 상수도와 승하차 데이터 자동 수집 파이프라인",
    // github: "", // TODO
    overview:
      "서울교통공사와 협업해 지하철 역사의 상수도 사용량을 예측하고 이상을 탐지하는 4인 졸업 프로젝트입니다. 데이터 수집 자동화를 맡았습니다.",
    features: [
      {
        title: "매일 자동 수집",
        desc: "GitHub Actions 워크플로 3개로 상수도, 승하차, 위험도 스냅샷을 매일 수집합니다.",
      },
      {
        title: "학습 데이터셋",
        desc: "상수도 일 사용량과 승하차 데이터를 결합한 77개 역, 65,856행 데이터셋입니다.",
      },
      {
        title: "역 상세 화면",
        desc: "청구서, 위험도, 일 사용량, 승하차를 한 화면에서 보여줍니다.",
      },
    ],
    stack: ["Python", "GitHub Actions", "React", "Vite"],
    roles: [
      "수집 워크플로 3개 구현과 운영 (2026.05~09, 약 4개월)",
      "학습 데이터셋 구축 (역 이름 호선 기준 통일, 평일과 주말과 공휴일 구분, 날짜순 8:1:1 분할)",
      "팀원이 만든 LightGBM 모델을 매일 다시 실행되도록 파이프라인에 연결",
      "React 역 상세 화면 구현과 전체 현황 화면 개편",
    ],
    problems: [
      {
        title: "원천 데이터 적재 지연으로 생기는 누락",
        desc: "아직 올라오지 않은 날짜는 오류가 아니라 건너뛸 대상으로 처리하고, 매일 최근 며칠을 다시 수집하는 구간을 3일에서 5일로 늘렸습니다. 승하차 데이터 117일치를 빠짐없이 수집했습니다.",
      },
      {
        title: "일시적 오류와 실제 장애가 섞이던 문제",
        desc: "네트워크 오류는 호출 단위로 최대 3회 재시도하고 그래도 실패하면 경고만 남기며, 코드나 데이터 문제는 실패로 처리하도록 나눴습니다. 일부 날짜가 실패해도 성공분은 먼저 저장합니다.",
      },
      {
        title: "날짜가 HTML 속성에 숨어 있던 사이트",
        desc: "조회 날짜가 class 속성 안에 들어 있어 정규식으로 파싱했고, 월 단위로만 조회되는 제약은 전체 조회 후 필요한 날짜만 거르는 방식으로 우회했습니다.",
      },
      {
        title: "자동 저장과 개발 작업의 충돌",
        desc: "코드와 수집 데이터를 서로 다른 브랜치로 분리하고, 동시 푸시 충돌은 rebase로 처리했습니다.",
      },
    ],
  },
  {
    id: "ai-agent-contest",
    title: "AI Agent 행동 의사결정 예측 경진대회",
    subtitle: "주최 정보통신기획평가원",
    category: "Project",
    tracks: ["AI"],
    period: { start: "2026.07", end: "2026.07" },
    summary: "14개 클래스 행동 예측 코드 제출형 대회",
    overview:
      "AI·SW중심대학 학생 대상으로 AI 에이전트의 다음 행동을 14개 클래스 중에서 예측하는 코드 제출형 경진대회입니다. 오프라인, T4 GPU, 추론 10분 제약이 있었습니다.",
    features: [
      {
        title: "인코더 기반 분류 모델",
        desc: "텍스트로 직렬화한 입력을 인코더 모델로 분류합니다.",
      },
      {
        title: "자체 검증 체계",
        desc: "리더보드와 별개로 OOF 검증으로 실제 성능을 확인합니다.",
      },
    ],
    stack: ["Python"], // TODO: 실제로 쓴 프레임워크 추가 (PyTorch, Transformers 등)
    roles: ["인코더 기반 모델링", "앙상블 검증과 최종 제출 패키징"],
    problems: [
      {
        title: "서로 헷갈리는 클래스",
        desc: "혼동행렬로 자주 섞이는 클래스 묶음을 찾고, 입력 텍스트 구성을 다시 설계해 단일 모델 최고 기록을 갱신했습니다.",
      },
      {
        title: "부풀려 보이던 검증 점수",
        desc: "별도 OOF 검증 체계를 만들어 성능이 실제보다 높게 보이던 리크 사례 여러 건을 찾아 수정했습니다.",
      },
    ],
    // TODO: 최종 순위 확인 후 summary에 추가 (기록마다 "예선 21위"와 "269팀 중 22위"가 섞여 있음)
  },
  {
    id: "marc-2026",
    title: "MARC 2026",
    subtitle: "MetaSejong AI Robot Challenge",
    category: "Project",
    tracks: ["AI"],
    period: { start: "2026.07", end: "Present" },
    summary:
      "로봇 자연어 지시 이해 모듈 단독 담당\n본선 진출, IEEE MetaCom 2026 워크숍 논문 채택",
    // github: "", // TODO: 공개 가능 여부 확인
    overview:
      "로봇이 사람의 자연어 지시를 이해해 물건을 찾아 배달하는 대회입니다. 5인 팀에서 자연어 이해 모듈을 단독으로 맡았고, 채점 환경은 인터넷이 차단된 CPU 전용 오프라인 환경이었습니다.",
    features: [
      {
        title: "지시문 구조화",
        desc: "자연어 지시에서 목표물, 랜드마크, 관계, 상황 정보를 추출합니다.",
      },
      {
        title: "오프라인 로컬 LLM",
        desc: "양자화 모델(GGUF Q4_K_M)을 llama.cpp로 구동해 문장당 평균 0.66초로 처리합니다.",
      },
    ],
    stack: ["Python", "Qwen2.5-3B-Instruct", "llama.cpp", "Docker"],
    roles: [
      "Qwen2.5 크기 3종과 다른 계열 모델 5종 비교 후 모델 선정",
      "평가 문장 176개 직접 작성 (기존 표현 39, 바꿔 말한 표현 66, 새로운 상황 71)",
      "동의어 정규화, 관계 보정, 상황 판정 등 후처리 로직 구현",
    ],
    problems: [
      {
        title: "클라우드 LLM을 쓸 수 없는 채점 환경",
        desc: "파인튜닝 없이 프롬프트만으로 로컬 모델을 비교해, 규칙 기반 방식 대비 목표물 유형 정확도를 53%p, 랜드마크 16%p, 관계 10%p 높였습니다.",
      },
      {
        title: "모델 출력과 채점 명칭의 불일치",
        desc: '"drink machine"처럼 모델이 원문 표현을 그대로 내도 채점 기준 명칭(vending_machine)으로 바뀌도록 정규화했습니다. 상황 판정 규칙으로 사람이 대상인 문항 정확도를 73%에서 93~97%로 올렸습니다.',
      },
      {
        title: "팀이 전제한 채점 기준과 실제의 차이",
        desc: "채점 기록을 라운드별로 모두 분석해 기준이 다르다는 것을 확인하고 개발 우선순위를 다시 정했습니다.",
      },
    ],
  },
  // TODO: 빅콘테스트(2026 데이터+AI 혁신 챌린지, 팀 StreamFit) 진행 중이면 추가

  // ───────────── Activity ─────────────
  {
    id: "student-council-2023",
    title: "AI융합대학 학생회 기획/소통부장",
    category: "Activity",
    period: { start: "2023.01", end: "2023.12" },
    summary: "학과 행사 기획과 운영\n학생 소통 채널 운영",
    overview:
      "동국대학교 AI융합대학 학생회에서 기획부장과 소통부장을 맡았습니다.",
    features: [
      {
        title: "행사 기획",
        desc: "신입생 OT 등 학과 행사를 기획하고 운영했습니다.",
      },
      {
        title: "대외 협업",
        desc: "공과대학과 함께 아이디어, 스피치 경진대회를 기획했습니다.",
      },
      {
        title: "소통 채널",
        desc: "인스타그램, 카카오톡, 에브리타임 채널과 링크트리를 관리했습니다.",
      },
    ],
    stack: [],
    roles: ["행사 기획과 운영", "SNS 채널 관리와 학생 의견 수렴"],
    problems: [
      {
        title: "예상보다 참여 인원이 몰린 간식 행사",
        desc: "준비한 간식이 행사 중간에 떨어진 뒤로, 기획안을 짤 때 예상 변수와 반드시 지킬 조건을 먼저 정리하는 방식으로 바꿨습니다.",
      },
    ],
  },
  {
    id: "student-council-2024",
    title: "AI융합학부 학생회 홍보부원",
    category: "Activity",
    period: { start: "2024.01", end: "2024.12" },
    summary: "학과 행사 홍보 카드뉴스 제작",
    overview: "동국대학교 AI융합학부 학생회에서 홍보 콘텐츠를 맡았습니다.",
    features: [
      {
        title: "카드뉴스",
        desc: "미리캔버스로 행사 홍보 카드뉴스와 학부 소식 콘텐츠를 만들었습니다.",
      },
    ],
    stack: [],
    roles: ["홍보 콘텐츠 기획과 제작"],
    problems: [],
  },
  {
    id: "gdgoc",
    title: "GDGoC 동국대학교 Web/App 파트",
    category: "Activity",
    tracks: ["Frontend"],
    period: { start: "2025.09", end: "2026.06" },
    summary: "프론트엔드 세션 발표, 전체 세미나 발표, 약조심 팀 프로젝트",
    overview:
      "처음 소속된 개발자 커뮤니티로, Web/App 파트에서 약 1년간 활동했습니다.",
    features: [
      {
        title: "파트 세션 발표",
        desc: "프론트엔드 에러 핸들링, 프론트엔드 부트캠프 후기를 발표했습니다.",
      },
      {
        title: "전체 세미나",
        desc: '"해커톤, 실패에서 수상까지"를 주제로 발표했습니다.',
      },
    ],
    stack: ["React", "TypeScript", "Next.js"],
    roles: [
      "필참 활동 1년 개근, 개인 과제 기한 전 제출",
      "약조심 프론트엔드 구현",
    ],
    problems: [],
  },
  {
    id: "boaz",
    title: "BOAZ 데이터 엔지니어링 파트",
    category: "Activity",
    tracks: ["Data"],
    period: { start: "2026.01", end: "Present" },
    summary: "Hadoop과 Spark 분산 처리 세션 진행\n7주 기술 블로그",
    // link: "", // TODO: 블로그 시리즈 링크
    overview:
      "빅데이터 연합동아리 BOAZ의 데이터 엔지니어링 파트에서 활동하고 있습니다.",
    features: [
      {
        title: "세션 진행",
        desc: "같은 기수 대상 Spark Streaming, 신입 기수 대상 Hadoop과 Spark 분산 처리 세션을 준비해 진행했습니다.",
      },
      {
        title: "실습 환경",
        desc: "두 세션 모두 Docker 실습 환경을 처음부터 구성해 동작을 검증한 뒤 공유했습니다.",
      },
      {
        title: "기술 블로그",
        desc: "Kafka, 2PC의 한계 등을 7주간 정리했습니다.",
      },
    ],
    stack: ["Hadoop", "Spark", "Docker"],
    roles: [
      "멘토멘티 스터디로 분산 처리 학습, 넷플릭스 데이터 처리 사례 조사",
      "세션 자료와 실습 가이드 작성",
    ],
    problems: [],
  },

  // ───────────── Study ─────────────
  {
    id: "comento-frontend",
    title: "코멘토 프론트엔드 직무 부트캠프",
    category: "Study",
    tracks: ["Frontend"],
    period: { start: "2025.12", end: "2026.01" },
    summary: "현직자 피드백을 받으며 5주간 매주 웹 과제 구현",
    overview:
      "현직 프론트엔드 개발자에게 매주 업무 요청서를 받아 구현하고 피드백을 반영하는 5주 과정입니다.",
    features: [
      {
        title: "주차별 과제",
        desc: "정적 레이아웃부터 시계, 계산기처럼 이벤트와 상태를 다루는 페이지를 만들었습니다.",
      },
      {
        title: "최종 프로젝트",
        desc: "할 일 목록과 회원가입 검증 기능을 구현했습니다.",
      },
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    roles: ["과제 구현과 문서화, 피드백을 다음 과제에 반영"],
    problems: [],
  },
  {
    id: "lg-aimers",
    title: "LG Aimers 9기",
    category: "Study",
    tracks: ["AI"],
    period: { start: "2026.06", end: "2026.09" },
    summary: "AI 교육 수료\n온라인 해커톤 1,090팀 중 58위",
    overview: "LG AI연구원이 운영하는 청년 AI 교육 프로그램입니다.",
    features: [
      {
        title: "AI 이론과 실습",
        desc: "11주간 AI와 머신러닝 교육을 이수했습니다.",
      },
      {
        title: "온라인 해커톤",
        desc: "야구 투구 데이터로 제구 성공 확률을 예측하는 모델을 만들어 1,090팀 중 58위를 기록했습니다.",
      },
    ],
    stack: ["Python"],
    roles: ["모델 개발과 코드 제출"],
    problems: [],
  },
  {
    id: "comento-data-engineer",
    title: "코멘토 데이터 엔지니어 직무 부트캠프",
    category: "Study",
    tracks: ["Data"],
    period: { start: "2026.07", end: "2026.08" },
    summary: "DB 설계, 성능 개선, 이관 파이프라인 실무 과제",
    overview:
      "현직 데이터 엔지니어 멘토링 기반 5주 과정에 DB팀으로 참여했습니다.",
    features: [
      {
        title: "DB 설계",
        desc: "리버스 ERD, 상품 추천 DB 논리 ERD, NoSQL용 ERD를 설계했습니다.",
      },
      {
        title: "운영 과제",
        desc: "SQL 추출과 조작, 인덱스 성능 개선, 프로시저, 장애 처리와 백업, 복원을 실습했습니다.",
      },
      {
        title: "데이터 품질",
        desc: "이상 데이터 검출 로직과 데이터 라이프사이클, 변환과 이관 파이프라인을 만들었습니다.",
      },
    ],
    stack: ["MySQL", "AWS RDS", "Pandas"], // Airflow는 사용하지 않음 (본인 확인)
    roles: ["DB 구축과 성능 개선, 이관 파이프라인 과제 수행"],
    problems: [],
  },
];

const PRESENT = "Present";

function toPeriodSortKey(value: string) {
  return value === PRESENT ? "9999.99" : value;
}

function compareDescending(a: string, b: string) {
  if (a === b) return 0;
  return a < b ? 1 : -1;
}

// 최신순: 시작일이 늦은 순, 시작일이 같으면 종료일이 늦은 순 (진행 중이 가장 최신)
export function compareExperienceByLatest(
  a: ExperienceItem,
  b: ExperienceItem,
) {
  return (
    compareDescending(
      toPeriodSortKey(a.period.start),
      toPeriodSortKey(b.period.start),
    ) ||
    compareDescending(
      toPeriodSortKey(a.period.end),
      toPeriodSortKey(b.period.end),
    )
  );
}

export function formatExperiencePeriod({ start, end }: ExperiencePeriod) {
  return start === end ? start : `${start} - ${end}`;
}

export function getExperienceYear({ period }: ExperienceItem) {
  return period.start.slice(0, 4);
}
