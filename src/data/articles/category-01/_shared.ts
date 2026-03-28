// ============================================================================
// Category 1 — Emotional Regulation & Self-Awareness | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_EMOTIONAL_REGULATION: Category = {
  id: 'emotional-regulation',
  name: 'Emotional Regulation & Self-Awareness',
  slug: 'emotional-regulation',
  description:
    'Foundational emotional literacy — identifying, naming, and modulating emotions. The gateway skill for every other mental health topic.',
  image: '/images/categories/emotional-regulation.svg',
  subTopics: [
    'Understanding Your Emotions',
    'Everyday Emotional Regulation Strategies',
    'Self-Awareness & Reflection',
    'Emotional Intelligence in Practice',
    'Emotional Patterns & Habits',
    'The Neuroscience of Emotions',
    'Emotions Across Life Stages',
    'Advanced: Emotional Complexity & Growth',
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const PRIMARY_AUTHOR: Author = {
  id: 'psychage-team',
  name: 'Psychage Team',
  role: 'Clinical Editorial Team',
  image: '/images/authors/author-team.svg',
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

/** Generate a consistent article ID for Category 1 */
export const catId = (n: number): string => `cat01-${String(n).padStart(3, '0')}`;
