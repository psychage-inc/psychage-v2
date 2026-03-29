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
 *   VITE_NAV_TIER4_ENABLED — NPD, ASPD, CPTSD, DID
 *   VITE_NAV_TIER5_ENABLED — DPD, SZPD, OSDD, ASD_ACUTE, TTM, SPD_EXCOR
 *   VITE_NAV_TIER6_ENABLED — IED, HYPER, ARFID, CYC
 */

import type { ConditionWithMappings } from './types';

type Tier = 1 | 2 | 3 | 4 | 5 | 6;

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
  // Tier 4 (Phase 4 — personality & high clinical severity)
  NPD: 4,
  ASPD: 4,
  CPTSD: 4,
  DID: 4,
  // Tier 5 (Phase 4 — moderate-high complexity)
  DPD: 5,
  SZPD: 5,
  OSDD: 5,
  ASD_ACUTE: 5,
  TTM: 5,
  SPD_EXCOR: 5,
  // Tier 6 (Phase 4 — extensions)
  IED: 6,
  HYPER: 6,
  ARFID: 6,
  CYC: 6,
};

const ENV_KEYS: Record<Tier, string> = {
  1: 'VITE_NAV_TIER1_ENABLED',
  2: 'VITE_NAV_TIER2_ENABLED',
  3: 'VITE_NAV_TIER3_ENABLED',
  4: 'VITE_NAV_TIER4_ENABLED',
  5: 'VITE_NAV_TIER5_ENABLED',
  6: 'VITE_NAV_TIER6_ENABLED',
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
  return ([1, 2, 3, 4, 5, 6] as Tier[]).filter(isTierEnabled);
}
