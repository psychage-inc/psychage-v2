// ============================================================================
// Category 25 — Disability, Accessibility & Inclusive Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_DISABILITY_ACCESSIBILITY: Category = {
  id: 'disability-accessibility',
  name: 'Disability, Accessibility & Inclusive Mental Health',
  slug: 'disability-accessibility',
  description:
    'Mental health at the intersection of disability — identity, access to care, chronic illness, neurodivergence, universal design, and the psychology of inclusion and advocacy.',
  image: '/images/categories/disability-accessibility.svg',
  subTopics: [
    'Access & Service Design',
    'Accessing Mental Health Care With a Disability',
    'Aging, Disability & Mental Health',
    'Caregiving & Family Systems',
    'Chronic Illness & Mental Health',
    'Disability & Identity',
    'Disability Advocacy and Future Directions',
    'Disability Identity and Community',
    'Disability Myths',
    'Disability, Sexuality & Relationships',
    'Employment & Economic Inclusion',
    'Intellectual & Developmental Disability',
    'Neurodivergence & Disability',
    'Sensory Disability & Mental Health',
    'Specific Disability Contexts',
    'Universal Design & Inclusion',
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

/** Generate a consistent article ID for Category 25 */
export const catId = (n: number): string => `cat25-${String(n).padStart(3, '0')}`;
