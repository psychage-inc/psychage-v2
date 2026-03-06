/**
 * Symptom Navigator — Safety Screening Module
 *
 * SAFETY FIRST: This module runs BEFORE any condition matching.
 * It screens for crisis-level symptoms and determines whether
 * the flow should halt immediately.
 *
 * Red flag hierarchy: CRISIS > URGENT > WATCH
 * - CRISIS: Immediate danger — halt flow, show crisis resources
 * - URGENT: Serious concern — show resources alongside results
 * - WATCH: Monitor — note in results, suggest professional consultation
 */

import type {
  CrisisResource,
  CrisisResourcesByRegion,
  NormalizedSymptom,
  RedFlag,
  RedFlagLevel,
  SafetyResult,
  Symptom,
} from './types';

/**
 * Screen all normalized symptoms for red flags.
 *
 * Checks two categories:
 * 1. Inherent red flags: Symptoms that are ALWAYS flagged (e.g., suicidal thoughts)
 * 2. Severity-triggered flags: Symptoms that become flagged above a threshold
 *
 * @returns SafetyResult with all flags, highest level, and halt decision
 */
export function screenRedFlags(
  symptoms: NormalizedSymptom[],
  allSymptoms: Symptom[],
  crisisResources: CrisisResourcesByRegion,
  userRegion?: string
): SafetyResult {
  const flags: RedFlag[] = [];

  for (const normalized of symptoms) {
    const symptom = normalized.symptom;

    // Check 1: Inherent red flags (is_red_flag = true)
    if (symptom.is_red_flag && symptom.red_flag_level) {
      flags.push({
        symptom_id: symptom.id,
        symptom_name: symptom.name,
        level: symptom.red_flag_level,
        trigger: 'inherent',
        message: buildRedFlagMessage(symptom.name, symptom.red_flag_level),
      });
    }

    // Check 2: Severity-threshold red flags
    if (
      symptom.severity_red_flag_threshold !== null &&
      symptom.severity_red_flag_level !== null &&
      normalized.severity >= symptom.severity_red_flag_threshold
    ) {
      // Don't duplicate if already flagged as inherent
      const alreadyFlagged = flags.some(
        (f) => f.symptom_id === symptom.id && f.trigger === 'inherent'
      );
      if (!alreadyFlagged) {
        flags.push({
          symptom_id: symptom.id,
          symptom_name: symptom.name,
          level: symptom.severity_red_flag_level,
          trigger: 'severity_threshold',
          message: buildSeverityFlagMessage(
            symptom.name,
            normalized.severity,
            symptom.severity_red_flag_level
          ),
        });
      }
    }
  }

  const has_crisis = flags.some((f) => f.level === 'CRISIS');
  const has_urgent = flags.some((f) => f.level === 'URGENT');
  const has_watch = flags.some((f) => f.level === 'WATCH');

  const highest_level: RedFlagLevel | null = has_crisis
    ? 'CRISIS'
    : has_urgent
      ? 'URGENT'
      : has_watch
        ? 'WATCH'
        : null;

  // Resolve crisis resources for the user's region
  const regionResources = resolveCrisisResources(crisisResources, userRegion);

  return {
    has_crisis,
    has_urgent,
    has_watch,
    highest_level,
    flags,
    should_halt: has_crisis, // Only CRISIS halts the flow
    crisis_resources: regionResources,
  };
}

/**
 * Resolve crisis resources for a given region.
 * Falls back to DEFAULT region if the specific region isn't found.
 */
function resolveCrisisResources(
  resources: CrisisResourcesByRegion,
  region?: string
): CrisisResource[] {
  if (region && resources[region]) {
    return resources[region];
  }
  return resources['DEFAULT'] ?? [];
}

/**
 * Build a safe, non-diagnostic message for an inherent red flag.
 */
function buildRedFlagMessage(symptomName: string, level: RedFlagLevel): string {
  switch (level) {
    case 'CRISIS':
      return (
        `The experience you described ("${symptomName}") suggests you may benefit ` +
        'from immediate support. Please reach out to a crisis resource below — ' +
        'trained counselors are available 24/7 and want to help.'
      );
    case 'URGENT':
      return (
        `The experience you described ("${symptomName}") is something a healthcare ` +
        'professional should evaluate. We recommend scheduling an appointment soon.'
      );
    case 'WATCH':
      return (
        `The experience you described ("${symptomName}") is worth monitoring. ` +
        'Consider discussing this with a healthcare provider at your next visit.'
      );
    default: {
      const _exhaustive: never = level;
      return `The experience you described ("${symptomName}") is worth discussing with a healthcare provider. ${_exhaustive}`;
    }
  }
}

/**
 * Build a message for severity-triggered red flags.
 */
function buildSeverityFlagMessage(
  symptomName: string,
  severity: number,
  level: RedFlagLevel
): string {
  switch (level) {
    case 'CRISIS':
      return (
        `You rated "${symptomName}" at a high intensity (${severity}/10). ` +
        'Please reach out to a crisis resource below for immediate support.'
      );
    case 'URGENT':
      return (
        `You rated "${symptomName}" at a high intensity (${severity}/10). ` +
        'We recommend consulting with a healthcare professional soon.'
      );
    case 'WATCH':
      return (
        `You rated "${symptomName}" at an elevated intensity (${severity}/10). ` +
        'Consider discussing this with a healthcare provider.'
      );
    default: {
      const _exhaustive: never = level;
      return `You rated "${symptomName}" at intensity ${severity}/10. Consider consulting a healthcare provider. ${_exhaustive}`;
    }
  }
}
