// ============================================================================
// Category 29 — Environmental, Eco-Psychology & Planetary Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_ENVIRONMENTAL_ECO: Category = {
  id: 'environmental-eco-psychology',
  name: 'Environmental, Eco-Psychology & Planetary Mental Health',
  slug: 'environmental-eco-psychology',
  description:
    'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
  image: '/images/categories/environmental-eco-psychology.svg',
  subTopics: [
    'Climate and Eco-Anxiety',
    'Climate, Seasons, and Psychological Rhythms',
    'Emerging Topics in Environmental Psychology',
    'Environmental Justice and Mental Health',
    'Nature-Based Therapy and Ecotherapy',
    'Planetary Mental Health',
    'Resilience, Adaptation, and the Future',
    'Sustainability and Wellbeing',
    'Urban Psychology and Built Environment',
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

/** Generate a consistent article ID for Category 29 */
export const catId = (n: number): string => `cat29-${String(n).padStart(3, '0')}`;
