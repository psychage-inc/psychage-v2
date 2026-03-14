/**
 * Safety alert detection for Relationship Health Check.
 *
 * DV Safety: Triggered when partner domain score is critically low
 * AND both distress items are strongly endorsed.
 *
 * Severe Loneliness: Triggered when composite score < 20.
 */

export interface DVAlertResult {
  triggered: boolean;
  severity: 'warning' | 'critical';
}

/**
 * Check for domestic violence safety concern.
 *
 * Distress items (partner_05, partner_06) are reverse-scored in the scoring
 * engine, but here we check the RAW values — a high raw value (4 or 5) on
 * these items means the user endorsed the distress statement strongly.
 */
export function checkDVSafety(
  answers: Record<string, number>,
  partnerDomainScore: number
): DVAlertResult {
  const distress1 = answers['partner_05'] ?? 1;
  const distress2 = answers['partner_06'] ?? 1;

  // Critical: both distress items strongly endorsed + very low domain score
  if (partnerDomainScore < 25 && distress1 >= 4 && distress2 >= 4) {
    return { triggered: true, severity: 'critical' };
  }

  // Warning: at least one distress item strongly endorsed + low domain score
  if (partnerDomainScore < 25 && (distress1 >= 4 || distress2 >= 4)) {
    return { triggered: true, severity: 'warning' };
  }

  return { triggered: false, severity: 'warning' };
}

/**
 * Check for severe loneliness / social isolation.
 */
export function checkSevereLoneliness(compositeScore: number): boolean {
  return compositeScore < 20;
}
