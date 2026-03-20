// ============================================================================
// Category 9 — Sleep, Body & Mind-Body Connection | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_SLEEP_BODY: Category = {
  id: 'sleep-body-connection',
  name: 'Sleep, Body & Mind-Body Connection',
  slug: 'sleep-body-connection',
  description:
    'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
  image: '/images/categories/sleep-body-connection.svg',
  subTopics: [
    'Sleep Science & Mental Health',
    'Sleep Disorders & Common Problems',
    'Exercise, Movement & Mental Wellness',
    'Nutrition, Gut Health & the Brain',
    'Somatic Awareness & Body-Based Healing',
    'Pain, Chronic Illness & Psychological Impact',
  ],
};

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

export const catId = (n: number): string => `cat09-${String(n).padStart(3, '0')}`;
