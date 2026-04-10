// =============================================================================
// Specialty Resolver — maps free-text queries to specialty slugs
// =============================================================================

import type { Specialty } from './types';

const MIN_QUERY_LENGTH = 2;

/**
 * Resolves a free-text search query to matching specialty slugs.
 * Uses partial, case-insensitive matching against label and slug fields.
 * Operates on the already-cached specialties array from ProviderLookupsContext.
 *
 * @returns Array of matched specialty slugs, or empty array if no matches.
 */
export function resolveSpecialtySlugs(query: string, specialties: Specialty[]): string[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  return specialties
    .filter(s =>
      s.label.toLowerCase().includes(trimmed) ||
      s.slug.toLowerCase().includes(trimmed)
    )
    .map(s => s.slug);
}
