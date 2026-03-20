// ============================================================================
// Category 2 — Anxiety, Stress & Overwhelm | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_ANXIETY_STRESS: Category = {
  id: 'anxiety-stress',
  name: 'Anxiety, Stress & Overwhelm',
  slug: 'anxiety-stress',
  description:
    'Understanding anxiety disorders, stress responses, and evidence-based coping strategies for managing worry, panic, and overwhelm.',
  image: '/images/categories/anxiety-stress.svg',
  subTopics: [
    'Understanding Anxiety',
    'Panic, Physical Anxiety & Somatic Symptoms',
    'Social Anxiety & Fear of Judgment',
    'Chronic Stress & Overwhelm',
    'Burnout & Emotional Exhaustion',
    'Phobias & Specific Fears',
    'Evidence-Based Coping Strategies',
    'Anxiety in Relationships, Work & Daily Life',
    'Treatment Approaches & Recovery',
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const PRIMARY_AUTHOR: Author = {
  id: 'sarah-chen',
  name: 'Dr. Sarah Chen',
  role: 'Licensed Clinical Psychologist',
  image: '/images/authors/author-female-1.svg',
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

/** Generate a consistent article ID for Category 2 */
export const catId = (n: number): string => `cat02-${String(n).padStart(3, '0')}`;
