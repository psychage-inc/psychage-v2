// ============================================================================
// Category 17 — Aging, Dementia & Late-Life Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_AGING: Category = {
  id: 'aging-dementia-late-life',
  name: 'Aging, Dementia & Late-Life Mental Health',
  slug: 'aging-dementia-late-life',
  description:
    'Comprehensive resources on mental health challenges unique to older adults, including dementia, Alzheimer disease, late-life depression, cognitive decline, caregiving, and strategies for healthy aging.',
  image: '/images/categories/aging-dementia-late-life.svg',
  subTopics: [
    'Understanding Mental Health in Later Life',
    'Dementia and Alzheimer Disease',
    'Depression and Anxiety in Older Adults',
    'Caregiving and Family Support',
    'Cognitive Aging and Brain Health',
    'Late-Life Mental Health Research and Interventions',
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

/** Generate a consistent article ID for Category 17 */
export const catId = (n: number): string => `cat17-${String(n).padStart(3, '0')}`;
