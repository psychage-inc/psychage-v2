// ============================================================================
// Category 21 — Technology, Digital Life & Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_TECHNOLOGY_DIGITAL_LIFE: Category = {
  id: 'technology-digital-life',
  name: 'Technology, Digital Life & Mental Health',
  slug: 'technology-digital-life',
  description:
    'Evidence-based education on the psychological impact of technology — from social media and smartphone use to emerging tools like VR therapy and digital therapeutics, exploring both harms and benefits for mental health.',
  image: '/images/categories/technology-digital-life.svg',
  subTopics: [
    'Social Media and Psychological Impact',
    'Digital Addiction and Compulsive Use',
    'AI, Emerging Technology & Mental Health',
    'Online Relationships and Community',
    'Healthy Digital Life',
    'Digital Culture and Society',
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

/** Generate a consistent article ID for Category 21 */
export const catId = (n: number): string => `cat21-${String(n).padStart(3, '0')}`;
