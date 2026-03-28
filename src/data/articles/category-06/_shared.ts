// ============================================================================
// Category 6 — Family, Parenting & Childhood Patterns | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_FAMILY_PARENTING: Category = {
  id: 'family-parenting',
  name: 'Family, Parenting & Childhood Patterns',
  slug: 'family-parenting',
  description:
    'Understanding family dynamics, parenting challenges, childhood patterns, and intergenerational healing.',
  image: '/images/categories/family-parenting.svg',
  subTopics: [
    'Understanding Family Systems',
    'Childhood Experiences & Adult Patterns',
    'Parenting Stress & Mental Health',
    'Intergenerational Trauma & Healing',
    'Co-Parenting, Divorce & Blended Families',
    "Supporting Children's Mental Health",
    'Eldercare, Caregiving & Aging Parents',
    'Sibling Relationships & Family Roles',
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a consistent article ID for Category 6 */
export const catId = (n: number): string => `cat06-${String(n).padStart(3, '0')}`;
