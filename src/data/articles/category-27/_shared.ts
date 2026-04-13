// ============================================================================
// Category 27 — Military, Veterans & First Responder Mental Health | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_MILITARY_VETERANS: Category = {
  id: 'military-veterans-firstresponder',
  name: 'Military, Veterans & First Responder Mental Health',
  slug: 'military-veterans-firstresponder',
  description:
    'Mental health for those who serve — combat trauma, moral injury, first responder stress, military families, transition challenges, and evidence-based treatment approaches.',
  image: '/images/categories/military-veterans-firstresponder.svg',
  subTopics: [
    'Combat-Related Mental Health',
    'First Responder Mental Health',
    'Military Culture & Psychology',
    'Military Families & Relationships',
    'Transition & Reintegration',
    'Treatment & Recovery',
    'Veteran-Specific Issues',
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

/** Generate a consistent article ID for Category 27 */
export const catId = (n: number): string => `cat27-${String(n).padStart(3, '0')}`;
