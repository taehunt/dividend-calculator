import { getSortedPostsData, type PostMeta } from "@/lib/posts";
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

const STOP = new Set([
  "with",
  "from",
  "that",
  "this",
  "your",
  "into",
  "about",
  "using",
  "how",
  "the",
  "and",
  "for",
  "are",
  "you",
]);

function tokensFromSlug(slug: string): string[] {
  return slug
    .toLowerCase()
    .split(/[-_]+/)
    .filter((t) => t.length > 3 && !STOP.has(t) && !/^\d+$/.test(t));
}

function relatedScore(currentSlug: string, candidate: PostMeta): number {
  const tokens = tokensFromSlug(currentSlug);
  const hay = `${candidate.slug} ${candidate.title}`.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (hay.includes(token)) score += 2;
  }
  return score;
}

/** Other posts to cross-link: keyword overlap first, then newest. */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const others = getSortedPostsData().filter((p) => p.slug !== slug);
  if (!others.length) return [];

  return [...others]
    .sort((a, b) => {
      const scoreDiff = relatedScore(slug, b) - relatedScore(slug, a);
      if (scoreDiff !== 0) return scoreDiff;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, limit);
}
