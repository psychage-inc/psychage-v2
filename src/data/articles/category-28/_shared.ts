// ============================================================================
// Category 28 — Sexuality, Intimacy & Sexual Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_SEXUALITY_INTIMACY: Category = {
  id: 'sexuality-intimacy',
  name: 'Sexuality, Intimacy & Sexual Health',
  slug: 'sexuality-intimacy',
  description:
    'The psychology of human sexuality — sexual health, intimacy, identity, dysfunction, trauma recovery, sex therapy, and the intersection of sexuality with mental wellbeing.',
  image: '/images/categories/sexuality-intimacy.svg',
  subTopics: [
    'Gender, Identity & Sexuality',
    'Intimacy & Relationships',
    'Myths & Future Directions',
    'Sex Therapy and Professional Help',
    'Sexual Dysfunction & Treatment',
    'Sexual Health & Education',
    'Sexual Trauma & Recovery',
    'Sexuality Myths',
    'Sexuality and Specific Populations',
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

/** Generate a consistent article ID for Category 28 */
export const catId = (n: number): string => `cat28-${String(n).padStart(3, '0')}`;
