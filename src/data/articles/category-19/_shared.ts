// ============================================================================
// Category 19 — Men's Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_MENS_MENTAL_HEALTH: Category = {
  id: 'mens-mental-health',
  name: "Men's Mental Health",
  slug: 'mens-mental-health',
  description:
    "Evidence-based education on men's mental health — exploring the gender paradox in suicide, masked depression, help-seeking barriers, and the impact of cultural norms on men's psychological wellbeing.",
  image: '/images/categories/mens-mental-health.svg',
  subTopics: [
    "Understanding Men's Mental Health",
    "Men's Relationships and Family",
    "Men's Physical and Mental Health",
    "Men in Specific Contexts",
    "Myths About Men's Mental Health",
    "Men's Health Interventions Part 1",
    "Men's Health Interventions Part 2",
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const PRIMARY_AUTHOR: Author = {
  id: 'psychage-editorial',
  name: 'Psychage Editorial Team',
  role: 'Mental Health Education',
  image: '/images/authors/author-team.svg',
};

export const CLINICAL_REVIEWER: Author = {
  id: 'dr-dobson',
  name: 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology',
  role: 'Clinical Neuropsychology',
  image: '/images/authors/author-female-2.svg',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a consistent article ID for Category 19 */
export const catId = (n: number): string => `cat19-${String(n).padStart(3, '0')}`;
