// ============================================================================
// Category 16 — Psychosis, Schizophrenia & Severe Mental Illness | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_PSYCHOSIS: Category = {
  id: 'psychosis-schizophrenia',
  name: 'Psychosis, Schizophrenia & Severe Mental Illness',
  slug: 'psychosis-schizophrenia',
  description:
    'Comprehensive education on psychotic disorders, schizophrenia spectrum conditions, and severe mental illness — from neuroscience and treatment to family support and recovery.',
  image: '/images/categories/psychosis-schizophrenia.svg',
  subTopics: [
    'Understanding Psychosis',
    'Schizophrenia',
    'Treatment for Psychotic Conditions',
    'Supporting Someone With Psychosis',
    'Related Severe Conditions',
    'Psychosis Research and Emerging Approaches',
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

/** Generate a consistent article ID for Category 16 */
export const catId = (n: number): string => `cat16-${String(n).padStart(3, '0')}`;
