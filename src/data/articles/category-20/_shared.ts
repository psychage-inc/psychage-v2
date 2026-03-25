// ============================================================================
// Category 20 — Chronic Illness, Pain & Medical Psychology | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_CHRONIC_ILLNESS_PAIN: Category = {
  id: 'chronic-illness-pain',
  name: 'Chronic Illness, Pain & Medical Psychology',
  slug: 'chronic-illness-pain',
  description:
    'Evidence-based education on the psychological dimensions of chronic illness — covering pain neuroscience, medical trauma, identity shifts after diagnosis, and resilience-building strategies for people living with ongoing health conditions.',
  image: '/images/categories/chronic-illness-pain.svg',
  subTopics: [
    'Psychology of Chronic Illness',
    'Chronic Pain and the Mind',
    'Specific Medical Conditions and Mental Health',
    'Medical Trauma and Healthcare Experiences',
    'Supporting Wellbeing Alongside Illness',
    'Psychological Resilience in Medical Settings',
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

/** Generate a consistent article ID for Category 20 */
export const catId = (n: number): string => `cat20-${String(n).padStart(3, '0')}`;
