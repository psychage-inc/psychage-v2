// ============================================================================
// Category 14 — Therapy, Treatment & Mental Health Navigation | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_THERAPY_NAVIGATION: Category = {
  id: 'therapy-navigation',
  name: 'Therapy, Treatment & Mental Health Navigation',
  slug: 'therapy-navigation',
  description:
    'Navigating the therapy landscape — types of therapy, medication, finding providers, and the mental health system.',
  image: '/images/categories/therapy-navigation.svg',
  subTopics: [
    'Types of Therapy Explained',
    'Medication & Pharmacological Treatment',
    'Your First Steps into Treatment',
    'Navigating the Mental Health System',
    'Supporting Someone in Treatment',
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

export const catId = (n: number): string => `cat14-${String(n).padStart(3, '0')}`;
