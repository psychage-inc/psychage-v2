// ============================================================================
// Content Plan — Master Index
// ============================================================================
// 1,000 articles across 15 categories, organized into ~100 subtopics.
//
// Files:
//   types.ts           — Shared types & helpers
//   categories-01-03   — Emotional Regulation, Anxiety, Relationships
//   categories-04-06   — Self-Worth, Work, Family
//   categories-07-09   — Depression, Habits, Sleep/Body
//   categories-10-12   — Digital Life, Trauma, Cultural Perspectives
//   categories-13-15   — Conditions ★, Therapy ★, Loneliness ★
// ============================================================================

export type { ArticlePlan, SubtopicPlan, CategoryPlan, ArticleType } from './types';
export { planId } from './types';

export { CATEGORY_01, CATEGORY_02, CATEGORY_03 } from './categories-01-03';
export { CATEGORY_04, CATEGORY_05, CATEGORY_06 } from './categories-04-06';
export { CATEGORY_07, CATEGORY_08, CATEGORY_09 } from './categories-07-09';
export { CATEGORY_10, CATEGORY_11, CATEGORY_12 } from './categories-10-12';
export { CATEGORY_13, CATEGORY_14, CATEGORY_15 } from './categories-13-15';

import { CATEGORY_01, CATEGORY_02, CATEGORY_03 } from './categories-01-03';
import { CATEGORY_04, CATEGORY_05, CATEGORY_06 } from './categories-04-06';
import { CATEGORY_07, CATEGORY_08, CATEGORY_09 } from './categories-07-09';
import { CATEGORY_10, CATEGORY_11, CATEGORY_12 } from './categories-10-12';
import { CATEGORY_13, CATEGORY_14, CATEGORY_15 } from './categories-13-15';

import { CategoryPlan } from './types';

// ---------------------------------------------------------------------------
// All 15 categories in order
// ---------------------------------------------------------------------------

export const ALL_CATEGORIES: CategoryPlan[] = [
  CATEGORY_01,
  CATEGORY_02,
  CATEGORY_03,
  CATEGORY_04,
  CATEGORY_05,
  CATEGORY_06,
  CATEGORY_07,
  CATEGORY_08,
  CATEGORY_09,
  CATEGORY_10,
  CATEGORY_11,
  CATEGORY_12,
  CATEGORY_13,
  CATEGORY_14,
  CATEGORY_15,
];

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

/** Total planned articles across all categories */
export const TOTAL_PLANNED = ALL_CATEGORIES.reduce(
  (sum, c) => sum + c.subtopics.reduce((s, st) => s + st.articles.length, 0),
  0
);

/** Total subtopics across all categories */
export const TOTAL_SUBTOPICS = ALL_CATEGORIES.reduce(
  (sum, c) => sum + c.subtopics.length,
  0
);

/** Get a category plan by number (1–15) */
export const getCategoryPlan = (n: number): CategoryPlan | undefined =>
  ALL_CATEGORIES.find((c) => c.category === n);

/** Get all articles across all categories as a flat list */
export const getAllArticles = () =>
  ALL_CATEGORIES.flatMap((c) =>
    c.subtopics.flatMap((st) => st.articles)
  );

/** Count articles by type */
export const getArticleCountsByType = () => {
  const counts: Record<string, number> = {};
  for (const article of getAllArticles()) {
    counts[article.type] = (counts[article.type] || 0) + 1;
  }
  return counts;
};
