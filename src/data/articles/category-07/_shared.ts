// ============================================================================
// Category 7 — Depression, Grief & Loss | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_DEPRESSION_GRIEF: Category = {
  id: 'depression-grief',
  name: 'Depression, Grief & Loss',
  slug: 'depression-grief',
  description:
    'Navigating depression, processing grief, and finding paths to recovery with evidence-based approaches.',
  image: '/images/categories/depression-grief.svg',
  subTopics: [
    'Understanding Depression',
    'Types of Depression & How They Differ',
    'Grief, Loss & Bereavement',
    'Coping with Depression',
    'Seasonal Patterns & Mood Cycles',
    'Depression in Specific Populations',
    'Treatment, Recovery & Moving Forward',
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

export const catId = (n: number): string => `cat07-${String(n).padStart(3, '0')}`;
