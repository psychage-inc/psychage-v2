// ============================================================================
// Category 5 — Work, Productivity & Burnout | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_WORK_PRODUCTIVITY: Category = {
  id: 'work-productivity',
  name: 'Work, Productivity & Burnout',
  slug: 'work-productivity',
  description:
    'Protecting mental health in professional settings — burnout prevention, productivity psychology, and work-life balance.',
  image: '/images/categories/work-productivity.svg',
  subTopics: [
    'Workplace Mental Health Fundamentals',
    'Burnout: Recognition & Recovery',
    'Work-Life Balance & Boundaries',
    'Productivity, Focus & Attention',
    'Workplace Relationships & Dynamics',
    'Career Transitions & Uncertainty',
    'Remote Work & the Digital Workplace',
    'Leadership & Organizational Wellbeing',
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const PRIMARY_AUTHOR: Author = {
  id: 'raima',
  name: 'Raima',
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

/** Generate a consistent article ID for Category 5 */
export const catId = (n: number): string => `cat05-${String(n).padStart(3, '0')}`;
