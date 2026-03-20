// ============================================================================
// Category 13 — Understanding Mental Health Conditions | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_MENTAL_HEALTH_CONDITIONS: Category = {
  id: 'mental-health-conditions',
  name: 'Understanding Mental Health Conditions',
  slug: 'mental-health-conditions',
  description:
    'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
  image: '/images/categories/mental-health-conditions.svg',
  subTopics: [
    'Anxiety Disorders',
    'Mood Disorders',
    'Trauma & Dissociative Disorders',
    'OCD Spectrum & Impulse Control Disorders',
    'Neurodevelopmental Conditions',
    'Eating Disorders',
    'Substance Use, Sleep & Somatic Disorders',
    'Psychotic, Personality & Adjustment Disorders',
  ],
};

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

export const catId = (n: number): string => `cat13-${String(n).padStart(3, '0')}`;
