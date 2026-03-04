/**
 * CLINICAL FLAGS GENERATOR
 *
 * Generates clinical flags based on validated instrument cutoff thresholds
 */

import type { InstrumentScores } from './scoring.ts';
import type { ClinicalFlag } from './validation.ts';

/**
 * Generate all clinical flags from instrument scores
 *
 * Flags are generated based on published clinical cutoffs:
 * - PHQ-2 ≥3: moderate depression screen, ≥5: high
 * - GAD-2 ≥3: moderate anxiety screen, ≥5: high
 * - WHO-5% ≤50: moderate low wellbeing, ≤28: high (depression screen)
 * - UCLA-3 ≥6: moderate loneliness, ≥7: high
 * - PSS-4 ≥8: moderate stress, ≥12: high
 * - Functioning ≥6: moderate impairment, ≥10: high
 */
export function generateClinicalFlags(instruments: InstrumentScores): ClinicalFlag[] {
  const flags: ClinicalFlag[] = [];

  // PHQ-2 (Depression screening)
  if (instruments.phq2_raw >= 5) {
    flags.push({ type: 'depression_screen', severity: 'high' });
  } else if (instruments.phq2_raw >= 3) {
    flags.push({ type: 'depression_screen', severity: 'moderate' });
  }

  // GAD-2 (Anxiety screening)
  if (instruments.gad2_raw >= 5) {
    flags.push({ type: 'anxiety_screen', severity: 'high' });
  } else if (instruments.gad2_raw >= 3) {
    flags.push({ type: 'anxiety_screen', severity: 'moderate' });
  }

  // WHO-5 (Wellbeing)
  // Note: ≤28% indicates need to screen for depression per WHO-5 guidelines
  if (instruments.who5_percentage <= 28) {
    flags.push({ type: 'low_wellbeing', severity: 'high' });
  } else if (instruments.who5_percentage <= 50) {
    flags.push({ type: 'low_wellbeing', severity: 'moderate' });
  }

  // UCLA-3 (Loneliness)
  if (instruments.ucla3_raw >= 7) {
    flags.push({ type: 'loneliness', severity: 'high' });
  } else if (instruments.ucla3_raw >= 6) {
    flags.push({ type: 'loneliness', severity: 'moderate' });
  }

  // PSS-4 (Perceived Stress)
  if (instruments.pss4_raw >= 12) {
    flags.push({ type: 'high_stress', severity: 'high' });
  } else if (instruments.pss4_raw >= 8) {
    flags.push({ type: 'high_stress', severity: 'moderate' });
  }

  // Functioning (WHODAS-adapted)
  if (instruments.functioning_raw >= 10) {
    flags.push({ type: 'impairment', severity: 'high' });
  } else if (instruments.functioning_raw >= 6) {
    flags.push({ type: 'impairment', severity: 'moderate' });
  }

  return flags;
}

/**
 * Get human-readable description for a clinical flag
 */
export function getFlagDescription(flag: ClinicalFlag): string {
  const severityText = flag.severity === 'high' ? 'significant' : 'moderate';

  switch (flag.type) {
    case 'depression_screen':
      return `${severityText} depression symptoms detected - professional screening recommended`;
    case 'anxiety_screen':
      return `${severityText} anxiety symptoms detected - professional screening recommended`;
    case 'low_wellbeing':
      return flag.severity === 'high'
        ? 'Very low wellbeing - strongly recommend professional consultation'
        : 'Below-average wellbeing - consider professional support';
    case 'loneliness':
      return `${severityText} loneliness - social connection support may be beneficial`;
    case 'high_stress':
      return `${severityText} perceived stress - stress management strategies recommended`;
    case 'impairment':
      return `${severityText} functional impairment - professional support may help improve daily functioning`;
    default:
      return 'Clinical concern detected';
  }
}

/**
 * Priority ranking for flags (used for determining which to show first)
 * Higher number = higher priority
 */
export function getFlagPriority(flag: ClinicalFlag): number {
  const basePriorities: Record<ClinicalFlag['type'], number> = {
    depression_screen: 100,
    anxiety_screen: 90,
    low_wellbeing: 85,
    impairment: 70,
    high_stress: 60,
    loneliness: 50,
  };

  const severityBonus = flag.severity === 'high' ? 10 : 0;
  return basePriorities[flag.type] + severityBonus;
}

/**
 * Sort flags by priority (highest first)
 */
export function sortFlagsByPriority(flags: ClinicalFlag[]): ClinicalFlag[] {
  return [...flags].sort((a, b) => getFlagPriority(b) - getFlagPriority(a));
}
