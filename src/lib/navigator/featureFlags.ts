/**
 * Symptom Navigator — Feature Flags
 *
 * Controls phased rollout of new conditions via environment variables.
 * Original 16 conditions (no tier assignment) are always enabled.
 *
 * Environment variables:
 *   VITE_NAV_TIER1_ENABLED — SCZ, BPD, BN, PGD
 *   VITE_NAV_TIER2_ENABLED — ASD, BDD, DPDR, SPP, PMDD
 *   VITE_NAV_TIER3_ENABLED — SADD, HD, SSD, IAD, AVPD, SEPA
 */

import type { ConditionWithMappings } from './types';

type Tier = 1 | 2 | 3;

const TIER_MAP: Record<string, Tier> = {
  // Tier 1
  SCZ: 1,
  BPD: 1,
  BN: 1,
  PGD: 1,
  // Tier 2
  ASD: 2,
  BDD: 2,
  DPDR: 2,
  SPP: 2,
  PMDD: 2,
  // Tier 3
  SADD: 3,
  HD: 3,
  SSD: 3,
  IAD: 3,
  AVPD: 3,
  SEPA: 3,
};

const ENV_KEYS: Record<Tier, string> = {
  1: 'VITE_NAV_TIER1_ENABLED',
  2: 'VITE_NAV_TIER2_ENABLED',
  3: 'VITE_NAV_TIER3_ENABLED',
};

function isTierEnabled(tier: Tier): boolean {
  const key = ENV_KEYS[tier];
  const value = import.meta.env[key];
  // Enabled if explicitly set to 'true'; disabled by default
  return value === 'true' || value === true;
}

/**
 * Filter conditions based on feature flag tiers.
 * Conditions not in TIER_MAP (the original 16) always pass through.
 */
export function filterByFeatureFlags(
  conditions: ConditionWithMappings[]
): ConditionWithMappings[] {
  return conditions.filter((c) => {
    const tier = TIER_MAP[c.id];
    if (!tier) return true; // Original condition — always enabled
    return isTierEnabled(tier);
  });
}

/** Check which tiers are currently enabled (useful for UI/debug). */
export function getEnabledTiers(): Tier[] {
  return ([1, 2, 3] as Tier[]).filter(isTierEnabled);
}
