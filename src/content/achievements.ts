import type { ExperienceItem } from "@/content/experience";

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface Award {
  name: string;
  // 프로젝트 카드 배지에 쓰는 짧은 상 이름
  shortName: string;
  issuer: string;
  date: string;
  project?: ExperienceItem["id"];
}

export const certificates: Certificate[] = [
  {
    name: "SQLD (SQL 개발자)",
    issuer: "한국데이터산업진흥원",
    date: "2025.09.19",
  },
  {
    name: "ADsP (데이터분석 준전문가)",
    issuer: "한국데이터산업진흥원",
    date: "2025.11.28",
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "2026.01.19",
  },
];

export const awards: Award[] = [
  {
    name: "AI융합대학 해커톤 최우수상",
    shortName: "최우수상",
    issuer: "동국대학교 AI융합대학",
    date: "2024.11.15",
    project: "olaf",
  },
  {
    name: "2025 X-Thon 대상",
    shortName: "대상",
    issuer: "동국대학교 첨단융합대학",
    date: "2025.11.23",
    project: "aico",
  },
  {
    name: "2026학년도 1학기 S.M.A.R.T. 토너먼트 장려상",
    shortName: "장려상",
    issuer: "동국대학교 사물인터넷 혁신융합대학사업단",
    date: "2026.06.19",
    project: "mulsaemi",
  },
];

export function getAwardByProject(projectId: ExperienceItem["id"]) {
  return awards.find((award) => award.project === projectId);
}

// 날짜는 화면에 YYYY.MM 까지만 보여준다
export function formatAchievementDate(date: string) {
  return date.slice(0, 7);
}

export function compareAchievementByLatest(
  a: { date: string },
  b: { date: string },
) {
  if (a.date === b.date) return 0;
  return a.date < b.date ? 1 : -1;
}
