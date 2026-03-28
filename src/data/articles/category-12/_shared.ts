// ============================================================================
// Category 12 — Cultural Perspectives, Inclusion & Global Wellness | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_CULTURAL_GLOBAL: Category = {
  id: 'cultural-global',
  name: 'Cultural Perspectives, Inclusion & Global Wellness',
  slug: 'cultural-global',
  description:
    'Cultural perspectives on mental health, reducing stigma, and building inclusive approaches to psychological wellness.',
  image: '/images/categories/cultural-global.svg',
  subTopics: [
    'Mental Health Across Cultures',
    'Stigma, Shame & Help-Seeking',
    'Race, Ethnicity & Mental Health',
    'Immigration, Displacement & Mental Health',
    'Traditional Healing & Global Approaches',
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

export const catId = (n: number): string => `cat12-${String(n).padStart(3, '0')}`;
