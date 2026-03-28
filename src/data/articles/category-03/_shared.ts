// ============================================================================
// Category 3 — Relationships & Communication | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const CATEGORY_RELATIONSHIPS: Category = {
  id: 'relationships-communication',
  name: 'Relationships & Communication',
  slug: 'relationships-communication',
  description:
    'Building healthier relationships through attachment awareness, communication skills, boundary setting, and conflict resolution.',
  image: '/images/categories/relationships-communication.svg',
  subTopics: [
    'Attachment Styles & Relationship Patterns',
    'Setting & Maintaining Boundaries',
    'Communication Skills for Connection',
    'Navigating Conflict & Repair',
    'Romantic Relationships & Intimacy',
    'Friendships & Social Circles',
    'Toxic Dynamics & Relationship Red Flags',
    'Breakups, Endings & Moving Forward',
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a consistent article ID for Category 3 */
export const catId = (n: number): string => `cat03-${String(n).padStart(3, '0')}`;
