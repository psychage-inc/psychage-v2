// ============================================================================
// Eating & Body — alias of category-18 eating-disorder TSX content
// Republishes the 10 archived eating-disorder articles under the eating-body
// category slug so /learn/eating-body/<slug> renders full JSX bodies via the
// articleService mock-JSX preference branch.
// ============================================================================

import type { Article } from '@/types/models';
import { articles as edA } from '../category-18/05a-eating-disorders';
import { articles as edB } from '../category-18/05b-eating-disorders';
import { EATING_BODY_CATEGORY } from './_shared';

export const articles: Article[] = [...edA, ...edB].map((a) => ({
  ...a,
  category: EATING_BODY_CATEGORY,
  status: 'published' as const,
}));
