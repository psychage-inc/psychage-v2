// ============================================================================
// Category 30 — Applied Life Skills, Self-Design & Practical Psychology | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_LIFE_SKILLS: Category = {
  id: 'life-skills-practical-psychology',
  name: 'Applied Life Skills, Self-Design & Practical Psychology',
  slug: 'life-skills-practical-psychology',
  description:
    'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
  image: '/images/categories/life-skills-practical-psychology.svg',
  subTopics: [
    'Career & Professional Development',
    'Communication & Social Skills',
    'Creativity & Problem-Solving',
    'Decision-Making & Critical Thinking',
    'Emotional Intelligence & Self-Regulation',
    'Financial Psychology',
    'Habit Formation & Behavior Change',
    'Integration & the Examined Life',
    'Productivity & Time Management',
    'Self-Design & Life Architecture',
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

/** Generate a consistent article ID for Category 30 */
export const catId = (n: number): string => `cat30-${String(n).padStart(3, '0')}`;
