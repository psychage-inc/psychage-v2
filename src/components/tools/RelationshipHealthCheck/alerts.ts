/**
 * Safety alert detection for Relationship Health Check v2.
 *
 * DV Safety: Multi-factor detection using distress items, trust/safety
 * sub-dimension, contempt markers, and Four Horsemen risk.
 *
 * Social Isolation: Two-tier severity (moderate / severe) using
 * composite score, domain scores, and cross-domain analysis.
 */

import type { DVAlertResult, IsolationAlertResult, DomainScores, FourHorsemenResult } from './types';

/**
 * Check for domestic violence / relationship safety concern.
 *
 * Triggers:
 * 1. Safety item (p_ts_02) raw score ≤ 2 → automatic critical
 * 2. Both distress items (p_ts_02, p_ap_02) strongly endorsed + low partner domain → critical
 * 3. At least one distress item strongly endorsed + low partner domain → warning
 * 4. Contempt present + very low trust/safety sub-dimension → warning
 * 5. Four Horsemen elevated + low partner domain → warning
 */
export function checkDVSafety(
  answers: Record<string, number>,
  partnerDomainScore: number,
  trustSafetySubScore: number,
  fourHorsemen: FourHorsemenResult | null
): DVAlertResult {
  const safetyRaw = answers['p_ts_02'] ?? 3;
  const contemptRaw = answers['p_ap_02'] ?? 3;

  // Trigger 1: Very low safety score is an immediate critical signal
  if (safetyRaw <= 2) {
    return { triggered: true, severity: 'critical' };
  }

  // Trigger 2: Both distress items strongly endorsed + low partner domain
  if (partnerDomainScore < 25 && safetyRaw <= 2 && contemptRaw >= 4) {
    return { triggered: true, severity: 'critical' };
  }

  // Trigger 3: At least one distress item strongly endorsed + low partner domain
  if (partnerDomainScore < 25 && (safetyRaw <= 3 || contemptRaw >= 4)) {
    return { triggered: true, severity: 'warning' };
  }

  // Trigger 4: Contempt present + very low trust/safety
  if (contemptRaw >= 4 && trustSafetySubScore < 25) {
    return { triggered: true, severity: 'warning' };
  }

  // Trigger 5: Four Horsemen elevated + low partner domain
  if (fourHorsemen && fourHorsemen.overallRisk === 'elevated' && partnerDomainScore < 30) {
    return { triggered: true, severity: 'warning' };
  }

  return { triggered: false, severity: 'warning' };
}

/**
 * Check for social isolation risk with severity tiers.
 *
 * Severe: Composite < 20 (extreme isolation across all relationship domains)
 * Moderate: Friends + community both < 30, OR composite < 30 with no domain above 50
 */
export function checkSocialIsolation(
  compositeScore: number,
  domainScores: DomainScores,
  skipPartner: boolean
): IsolationAlertResult {
  // Severe: very low composite
  if (compositeScore < 20) {
    return { triggered: true, severity: 'severe' };
  }

  // Moderate: friends + community both critically low
  if (domainScores.friends < 30 && domainScores.community < 30) {
    return { triggered: true, severity: 'moderate' };
  }

  // Moderate: low composite with no strong domain
  const activeDomains = skipPartner
    ? [domainScores.family, domainScores.friends, domainScores.community]
    : [domainScores.partner, domainScores.family, domainScores.friends, domainScores.community];
  const hasStrongDomain = activeDomains.some((s) => s >= 50);

  if (compositeScore < 30 && !hasStrongDomain) {
    return { triggered: true, severity: 'moderate' };
  }

  return { triggered: false, severity: 'moderate' };
}
