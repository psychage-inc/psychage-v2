// ============================================================================
// Category 22 — Spirituality, Meaning & Existential Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_SPIRITUALITY_MEANING: Category = {
  id: 'spirituality-meaning',
  name: 'Spirituality, Meaning & Existential Mental Health',
  slug: 'spirituality-meaning',
  description:
    'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches that help people navigate the deepest human concerns.',
  image: '/images/categories/spirituality-meaning.svg',
  subTopics: [
    'Existential Psychology',
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

/** Generate a consistent article ID for Category 22 */
export const catId = (n: number): string => `cat22-${String(n).padStart(3, '0')}`;
