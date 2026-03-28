// ============================================================================
// Category 8 — Habits, Motivation & Behavior Change | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_HABITS_MOTIVATION: Category = {
  id: 'habits-behavior-change',
  name: 'Habits, Motivation & Behavior Change',
  slug: 'habits-behavior-change',
  description:
    'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
  image: '/images/categories/habits-behavior-change.svg',
  subTopics: [
    'The Science of Habit Formation',
    'Understanding Motivation',
    'Building Healthy Routines',
    'Breaking Unhealthy Patterns',
    'Discipline, Willpower & Self-Control',
    'Stages of Change & Readiness',
    'Systems, Environment & Identity-Based Change',
  ],
};

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

export const catId = (n: number): string => `cat08-${String(n).padStart(3, '0')}`;
