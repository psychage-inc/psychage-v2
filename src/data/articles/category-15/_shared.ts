// ============================================================================
// Category 15 — Loneliness, Social Connection & Belonging | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

export const CATEGORY_LONELINESS_CONNECTION: Category = {
  id: 'loneliness-connection',
  name: 'Loneliness, Social Connection & Belonging',
  slug: 'loneliness-connection',
  description:
    'Understanding loneliness, building social connection, and finding belonging in an increasingly disconnected world.',
  image: '/images/categories/loneliness-connection.svg',
  subTopics: [
    'The Science of Loneliness & Social Connection',
    'Loneliness Across the Lifespan',
    'Building & Deepening Friendships',
    'Community, Belonging & Purpose',
    'Digital Connection & Modern Isolation',
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

export const catId = (n: number): string => `cat15-${String(n).padStart(3, '0')}`;
