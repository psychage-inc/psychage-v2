// ============================================================================
// Category 4 — Self-Worth, Confidence & Identity | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_SELF_WORTH: Category = {
  id: 'self-worth-identity',
  name: 'Self-Worth, Confidence & Identity',
  slug: 'self-worth-identity',
  description:
    'Developing self-worth, managing imposter syndrome, building confidence, and understanding identity from a psychological perspective.',
  image: '/images/categories/self-worth-identity.svg',
  subTopics: [
    'Understanding Self-Esteem',
    'Self-Compassion & Inner Dialogue',
    'Imposter Syndrome & Self-Doubt',
    'Body Image & Self-Perception',
    'Identity, Authenticity & Values',
    'Building Confidence Through Action',
    'Perfectionism & People-Pleasing',
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

/** Generate a consistent article ID for Category 4 */
export const catId = (n: number): string => `cat04-${String(n).padStart(3, '0')}`;
