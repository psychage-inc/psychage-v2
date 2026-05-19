// =============================================================================
// Provider Type Resolver — maps free-text queries to provider_type_ids
// =============================================================================

import type { ProviderType } from './types';

const MIN_TOKEN_LENGTH = 3;

const STOPWORDS = new Set([
  'in', 'at', 'on', 'near', 'around', 'a', 'an', 'the', 'and', 'or', 'for', 'of', 'to',
]);

// Common ways users describe each provider type. Slug keys here MUST match
// the slugs seeded in provider_directory_v2_seed.sql.
const TYPE_SYNONYMS: Record<string, string[]> = {
  psychologist: ['psychologist', 'psychologists', 'psychology', 'psyd', 'phd'],
  psychiatrist: ['psychiatrist', 'psychiatrists', 'psychiatry'],
  therapist: ['therapist', 'therapists', 'therapy'],
  counselor: ['counselor', 'counselors', 'counsellor', 'counsellors', 'counseling', 'counselling', 'lpc', 'lmhc'],
  social_worker: ['lcsw', 'msw', 'lmsw'],
  clinic: ['clinic', 'clinics', 'treatment'],
  support_group: ['hotline'],
  crisis_service: ['crisis'],
};

// Multi-word phrases that should be matched before single-token scan.
const TYPE_PHRASES: Array<{ phrase: string; slug: string }> = [
  { phrase: 'social worker', slug: 'social_worker' },
  { phrase: 'social workers', slug: 'social_worker' },
  { phrase: 'support group', slug: 'support_group' },
  { phrase: 'treatment center', slug: 'clinic' },
];

/**
 * Resolve a free-text query into matched provider_type ids plus the residual
 * free-text (matched tokens/phrases stripped). Pairs with resolveSpecialtyQuery
 * so "anxiety psychologist" maps to specialty=anxiety + type=psychologist.
 */
export function resolveProviderTypeQuery(
  query: string,
  providerTypes: ProviderType[],
): { typeIds: string[]; residual: string } {
  const trimmed = query.trim();
  if (!trimmed || providerTypes.length === 0) {
    return { typeIds: [], residual: trimmed };
  }

  const slugToId = new Map<string, string>();
  for (const t of providerTypes) slugToId.set(t.slug, t.id);

  const matchedSlugs = new Set<string>();
  let remaining = ` ${trimmed.toLowerCase()} `;

  // Phase 1: strip multi-word phrases.
  for (const { phrase, slug } of TYPE_PHRASES) {
    const padded = ` ${phrase} `;
    if (remaining.includes(padded) && slugToId.has(slug)) {
      matchedSlugs.add(slug);
      remaining = remaining.split(padded).join(' ');
    }
  }

  // Phase 2: per-token match against synonyms, slugs, and labels.
  const tokens = remaining.split(/\s+/).filter(Boolean);
  const residualTokens: string[] = [];

  for (const token of tokens) {
    if (token.length < MIN_TOKEN_LENGTH || STOPWORDS.has(token)) {
      if (!STOPWORDS.has(token)) residualTokens.push(token);
      continue;
    }

    let matched = false;
    for (const t of providerTypes) {
      const synonyms = TYPE_SYNONYMS[t.slug] || [];
      const slug = t.slug.toLowerCase();
      const labelWords = t.label.toLowerCase().split(/[\s/]+/).filter(Boolean);

      if (
        synonyms.includes(token) ||
        slug === token ||
        labelWords.includes(token)
      ) {
        matchedSlugs.add(t.slug);
        matched = true;
        break;
      }
    }

    if (!matched) residualTokens.push(token);
  }

  const typeIds: string[] = [];
  for (const slug of matchedSlugs) {
    const id = slugToId.get(slug);
    if (id) typeIds.push(id);
  }

  return {
    typeIds,
    residual: residualTokens.join(' ').trim(),
  };
}
