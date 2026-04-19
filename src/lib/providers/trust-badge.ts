// =============================================================================
// Trust Badge — Type derivation from provider DB columns
// =============================================================================

import type { ProviderStatus } from './types';

export type TrustBadgeType = 'verified' | 'claimed' | 'unclaimed' | 'featured';

/**
 * Determines the trust badge type for a provider based on their DB columns.
 * Returns null if no trust badge applies (e.g., submitted/suspended status).
 *
 * CRITICAL: Verified requires verified_at IS NOT NULL AND status IN ('active', 'verified').
 * Do NOT use OR — that would grant Verified to unverified active providers.
 */
export function getTrustBadgeType(provider: {
  status: string;
  verified_at?: string | null;
}): 'verified' | 'claimed' | 'unclaimed' | null {
  // Verified: must have been verified AND be currently live
  if (
    provider.verified_at != null &&
    (provider.status === 'active' || provider.status === 'verified')
  ) {
    return 'verified';
  }
  // Claimed: status = claimed but no verification yet
  if (provider.status === 'claimed' && provider.verified_at == null) {
    return 'claimed';
  }
  // Unclaimed: seeded status, no user engagement
  if (provider.status === 'seeded') {
    return 'unclaimed';
  }
  return null; // submitted, suspended, rejected — no public badge
}

export function shouldShowFeaturedBadge(provider: {
  tier?: string | null;
}): boolean {
  return provider.tier === 'pro' || provider.tier === 'elite';
}

/**
 * Legacy compatibility — used by queries.ts for filtering.
 * Uses the corrected AND logic (not the old OR logic).
 */
export function isProviderVerified(
  status: ProviderStatus,
  verifiedAt: string | null
): boolean {
  return verifiedAt != null && (status === 'active' || status === 'verified');
}
