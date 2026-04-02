// ============================================================================
// Category 26 — Forensic Psychology, Legal & Justice Systems | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_FORENSIC_JUSTICE: Category = {
  id: 'forensic-legal-justice',
  name: 'Forensic Psychology, Legal & Justice Systems',
  slug: 'forensic-legal-justice',
  description:
    'Psychology within the legal and justice systems — criminal behavior, forensic assessment, mental health in incarceration, juvenile justice, victim psychology, and rehabilitation.',
  image: '/images/categories/forensic-legal-justice.svg',
  subTopics: [
    'Forensic Assessment and Evaluation',
    'Forensic Ethics and Professional Issues',
    'Juvenile Justice and Mental Health',
    'Mental Health in the Justice System',
    'Psychology of Criminal Behavior',
    'Reentry, Rehabilitation & Prevention',
    'Specialized Forensic Topics',
    'Victims and Survivors',
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

/** Generate a consistent article ID for Category 26 */
export const catId = (n: number): string => `cat26-${String(n).padStart(3, '0')}`;
