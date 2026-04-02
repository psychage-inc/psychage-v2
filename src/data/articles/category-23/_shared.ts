// ============================================================================
// Category 23 — The Brain & Neuroscience of Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_BRAIN_NEUROSCIENCE: Category = {
  id: 'brain-neuroscience',
  name: 'The Brain & Neuroscience of Mental Health',
  slug: 'brain-neuroscience',
  description:
    'Evidence-based exploration of the brain science behind mental health — neuroplasticity, neurotransmitters, brain-body connections, and how neuroscience informs modern treatment approaches.',
  image: '/images/categories/brain-neuroscience.svg',
  subTopics: [
    'Brain Basics',
    'Brain Fundamentals',
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

/** Generate a consistent article ID for Category 23 */
export const catId = (n: number): string => `cat23-${String(n).padStart(3, '0')}`;
