// =============================================================================
// Provider Directory V2 — Search Helpers
// =============================================================================

import type { ProviderWithDetails, Specialty } from './types';

/**
 * Score a provider for relevance ranking.
 * Higher = more relevant.
 */
export function scoreProvider(
  provider: ProviderWithDetails,
  matchedSpecialtySlugs?: string[]
): number {
  let score = 0;

  // Specialty match count (strongest signal)
  if (matchedSpecialtySlugs?.length) {
    const matchCount = provider.specialties.filter(s =>
      matchedSpecialtySlugs.includes(s.slug)
    ).length;
    score += matchCount * 3;
  }

  // Paid tier boost
  if (provider.tier === 'elite') score += 2;
  else if (provider.tier === 'pro') score += 1;

  // Profile completeness signals
  if (provider.photo_url) score += 0.5;
  if (provider.bio && provider.bio.length > 100) score += 0.5;
  if (provider.is_accepting_patients) score += 0.5;
  if (provider.verified_at) score += 1;

  return score;
}

/**
 * Find providers similar to a given provider by overlapping specialties.
 */
export function findSimilarProviders(
  target: ProviderWithDetails,
  allProviders: ProviderWithDetails[],
  limit = 3
): ProviderWithDetails[] {
  const targetSpecialtyIds = new Set(target.specialties.map(s => s.id));

  return allProviders
    .filter(p => p.id !== target.id)
    .map(p => {
      const overlapCount = p.specialties.filter(s => targetSpecialtyIds.has(s.id)).length;
      return { provider: p, overlap: overlapCount };
    })
    .filter(item => item.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(item => item.provider);
}

/**
 * Group specialties by category for display.
 */
export function groupSpecialtiesByCategory(specialties: Specialty[]): Record<string, Specialty[]> {
  const groups: Record<string, Specialty[]> = {
    condition: [],
    treatment_approach: [],
    population: [],
  };

  for (const s of specialties) {
    if (groups[s.category]) {
      groups[s.category].push(s);
    }
  }

  return groups;
}

/**
 * Map Navigator condition IDs to specialty slugs for provider search integration.
 */
export const CONDITION_TO_SPECIALTY: Record<string, string> = {
  GAD: 'anxiety',
  MDE: 'depression',
  PDD: 'depression',
  PTSD: 'ptsd',
  CPTSD: 'cptsd',
  BPD_II: 'bipolar_disorder',
  OCD: 'ocd',
  ADHD: 'adhd',
  AN: 'eating_disorders',
  BN: 'eating_disorders',
  ARFID: 'eating_disorders',
  SCZ: 'schizophrenia',
  NPD: 'personality_disorders',
  ASPD: 'personality_disorders',
  DPD: 'personality_disorders',
  SZPD: 'personality_disorders',
  SUD: 'substance_use',
  PGD: 'grief_loss',
  INS: 'sleep_disorders',
  ASD: 'autism_spectrum',
  SPP: 'phobias',
  PD: 'panic_disorder',
  SAD: 'social_anxiety',
  DID: 'dissociative_disorders',
  OSDD: 'dissociative_disorders',
  BDD: 'body_dysmorphia',
};
