// ============================================================================
// Category 24 — Creativity, Therapeutic Arts & Expressive Healing | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_CREATIVITY_ARTS: Category = {
  id: 'creativity-therapeutic-arts',
  name: 'Creativity, Therapeutic Arts & Expressive Healing',
  slug: 'creativity-therapeutic-arts',
  description:
    'The science and practice of creative expression as a pathway to mental health — art therapy, music therapy, drama therapy, writing therapy, and the psychology of the creative process.',
  image: '/images/categories/creativity-therapeutic-arts.svg',
  subTopics: [
    'Clinical Creative Interventions',
    'Creative Modalities and Practices',
    'Creative Process and Challenges',
    'Foundations of Creative Wellbeing',
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

/** Generate a consistent article ID for Category 24 */
export const catId = (n: number): string => `cat24-${String(n).padStart(3, '0')}`;
