// ============================================================================
// Category 11 — Trauma-Informed Education & Healing | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_TRAUMA_HEALING: Category = {
  id: 'trauma-healing',
  name: 'Trauma-Informed Education & Healing',
  slug: 'trauma-healing',
  description:
    'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
  image: '/images/categories/trauma-healing.svg',
  subTopics: [
    'Understanding Trauma & Its Impact',
    'PTSD & Complex Trauma',
    'Trauma Responses & Survival Patterns',
    'Body-Based Trauma Healing',
    'Trauma-Informed Care & Relationships',
    'Collective Trauma, Resilience & Growth',
  ],
};

export const PRIMARY_AUTHOR: Author = {
  id: 'psychage-team',
  name: 'Psychage Team',
  role: 'Clinical Editorial Team',
  image: '/images/authors/author-team.svg',
};

export const CLINICAL_REVIEWER: Author = {
  id: 'clinical-board',
  name: 'Clinical Review Board',
  role: 'Medical Review',
  image: '/images/authors/author-team.svg',
};

export const catId = (n: number): string => `cat11-${String(n).padStart(3, '0')}`;
