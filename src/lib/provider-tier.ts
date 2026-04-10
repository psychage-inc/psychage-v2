// =============================================================================
// Provider Tier Utility
// Feature gating, limits, and access control for the 3-tier provider system.
// =============================================================================

export type ProviderTier = 'free' | 'pro' | 'elite';

const TIER_RANK: Record<ProviderTier, number> = { free: 0, pro: 1, elite: 2 };

/**
 * Check if a provider's tier meets the required tier level.
 * Elite >= Pro >= Free.
 */
export function hasAccess(userTier: ProviderTier, requiredTier: ProviderTier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier];
}

/** Max profile photos allowed per tier */
export function getMaxPhotos(tier: ProviderTier): number {
  return { free: 1, pro: 3, elite: 5 }[tier];
}

/** Max bio character length per tier */
export function getMaxBioLength(tier: ProviderTier): number {
  return { free: 500, pro: 1500, elite: 3000 }[tier];
}

/** Search result boost factor per tier (used in RPC ORDER BY) */
export function getSearchBoost(tier: ProviderTier): number {
  return { free: 0, pro: 1, elite: 2 }[tier];
}

/** Max practice photos (Elite only) */
export function getMaxPracticePhotos(tier: ProviderTier): number {
  return { free: 0, pro: 0, elite: 8 }[tier];
}

/** Tier display labels */
export function getTierLabel(tier: ProviderTier): string {
  return { free: 'Free', pro: 'Pro', elite: 'Elite' }[tier];
}

/** Tier badge color classes */
export function getTierBadgeVariant(tier: ProviderTier): 'neutral' | 'teal' | 'amber' {
  return { free: 'neutral' as const, pro: 'teal' as const, elite: 'amber' as const }[tier];
}

/** Monthly pricing in dollars */
export const TIER_PRICING = {
  pro: { monthly: 50, annual: 480 },
  elite: { monthly: 120, annual: 1150 },
} as const;
