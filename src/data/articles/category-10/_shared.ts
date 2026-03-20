// ============================================================================
// Category 10 — Digital Life, Social Media & Modern Stressors | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_DIGITAL_LIFE: Category = {
  id: 'digital-life',
  name: 'Digital Life, Social Media & Modern Stressors',
  slug: 'digital-life',
  description:
    'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
  image: '/images/categories/digital-life.svg',
  subTopics: [
    'Social Media & Mental Health',
    'Screen Time, Digital Habits & Balance',
    'Online Comparison, Cyberbullying & Digital Harm',
    'Information Overload & Doomscrolling',
    'Digital Wellness & Intentional Technology Use',
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

export const catId = (n: number): string => `cat10-${String(n).padStart(3, '0')}`;
