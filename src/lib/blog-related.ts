import type { RelatedToolsKey } from "@/lib/related-tools";

/** Map a blog slug to the closest RelatedTools preset. */
export function relatedToolsKeyFromSlug(slug: string): RelatedToolsKey {
  const s = slug.toLowerCase();
  if (s.includes("fire")) return "fire";
  if (s.includes("tax")) return "tax";
  if (s.includes("compound")) return "compound";
  if (
    s.includes("retirement") ||
    s.includes("income-goal") ||
    s.includes("estimate-retirement") ||
    s.includes("passive-dividend")
  ) {
    return "goal";
  }
  if (s.includes("inflation")) return "inflation";
  if (s.includes("average") || s.includes("cost-basis")) return "average";
  if (s.includes("cagr")) return "cagr";
  return "dividend";
}
