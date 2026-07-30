export type BlogLanguage = "en" | "ko";

const CATEGORY_LABELS: Record<string, Record<BlogLanguage, string>> = {
  "Getting Started": { en: "Getting Started", ko: "시작하기" },
  "Dividend Growth": { en: "Dividend Growth", ko: "배당 성장" },
  Compounding: { en: "Compounding", ko: "복리" },
  "Retirement Planning": { en: "Retirement Planning", ko: "은퇴 설계" },
  "Risk Management": { en: "Risk Management", ko: "위험 관리" },
  "Tax Planning": { en: "Tax Planning", ko: "세금 계획" },
};

export function categoryLabel(
  category: string | undefined,
  lang: BlogLanguage
): string {
  if (!category) return lang === "ko" ? "배당 투자" : "Dividend Investing";
  return CATEGORY_LABELS[category]?.[lang] || category;
}
