// ============================================================================
// Category 31 — Spirituality, Meaning & Existential Mental Health | Shared Utilities
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
    'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches.',
  image: '/images/categories/spirituality-meaning.svg',
  subTopics: [
    'Existential Psychology',
    'Existential Questions & Spiritual Practice',
    'Positive Psychology & Human Flourishing',
    'Secular Approaches to Meaning',
    'Spirituality and Mental Health',
    'Altered & Transcendent States',
    'Collective & Social Meaning',
    'Existential Concerns & Challenges',
    'Meaning & Symbolic Systems',
    'Spiritual Crises & Challenges',
    'Spiritual Practices & Methods',
    'Spiritual-Psychological Integration',
    'Values, Ethics & Conscience',
    'Existential Foundations',
    'Meaning, Purpose & Existential Growth',
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

/** Generate a consistent article ID for Category 31 */
export const catId = (n: number): string => `cat31-${String(n).padStart(3, '0')}`;
