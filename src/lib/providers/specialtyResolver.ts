// =============================================================================
// Specialty Resolver — maps free-text queries to specialty slugs
// =============================================================================

import type { Specialty } from './types';

const MIN_QUERY_LENGTH = 2;

/**
 * Legacy entry point — substring match against the entire query.
 * Kept for backwards compatibility; prefer `resolveSpecialtyQuery` which
 * also returns the residual free-text portion of the query for FTS.
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

/**
 * Resolve a free-text query into specialty slugs PLUS the residual free-text
 * (matched tokens stripped). Lets callers pass `q_text` alongside
 * `specialty_slugs` to the provider RPC so combined queries like
 * "anxiety therapist" become `specialty=anxiety AND q_text=therapist` rather
 * than discarding the rest of the user's intent.
 */
export function resolveSpecialtyQuery(
  query: string,
  specialties: Specialty[],
): { slugs: string[]; residual: string } {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return { slugs: [], residual: trimmed };

  const tokens = trimmed.split(/\s+/);
  const matchedSlugs = new Set<string>();
  const remaining: string[] = [];

  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (lower.length < MIN_QUERY_LENGTH) {
      remaining.push(token);
      continue;
    }
    const hits = specialties.filter(s =>
      s.label.toLowerCase().includes(lower) || s.slug.toLowerCase().includes(lower),
    );
    if (hits.length > 0) {
      for (const h of hits) matchedSlugs.add(h.slug);
    } else {
      remaining.push(token);
    }
  }

  // If no individual token matched, fall back to whole-phrase legacy behaviour
  // so "social anxiety" (treated as one specialty label) still resolves.
  if (matchedSlugs.size === 0) {
    const legacy = resolveSpecialtySlugs(trimmed, specialties);
    return {
      slugs: legacy,
      residual: legacy.length > 0 ? '' : trimmed,
    };
  }

  return {
    slugs: Array.from(matchedSlugs),
    residual: remaining.join(' ').trim(),
  };
}
