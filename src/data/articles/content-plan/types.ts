// ============================================================================
// Content Plan — Type Definitions
// ============================================================================
// Master roadmap for 1,000 articles across 15 categories.
// Each category is broken into ~5–9 subtopics of ~10 articles each.
// ============================================================================

export type ArticleType =
  | 'self_help'
  | 'condition_deep_dive'
  | 'treatment_guide'
  | 'research_digest'
  | 'crisis_safety';

export interface ArticlePlan {
  /** e.g. "CAT01-001" */
  id: string;
  /** Full article title */
  title: string;
  /** Template type from CONTENT_GUIDELINES.md */
  type: ArticleType;
}

export interface SubtopicPlan {
  /** Subtopic number within category (1-based) */
  number: number;
  /** Subtopic name */
  name: string;
  /** Article ID range, e.g. "001–010" */
  range: string;
  /** Planned articles */
  articles: ArticlePlan[];
}

export interface CategoryPlan {
  /** Category number (1–15) */
  category: number;
  /** Full category name */
  name: string;
  /** URL-safe slug */
  slug: string;
  /** Target article count */
  target: number;
  /** Subtopic breakdown */
  subtopics: SubtopicPlan[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a category-scoped article ID */
export const planId = (cat: number, n: number): string =>
  `CAT${String(cat).padStart(2, '0')}-${String(n).padStart(3, '0')}`;
