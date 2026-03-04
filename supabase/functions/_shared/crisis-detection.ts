/**
 * CRISIS DETECTION
 *
 * Determines if assessment responses indicate immediate crisis requiring intervention
 */

import type { InstrumentScores } from './scoring.ts';

export interface CrisisResult {
  detected: boolean;
  triggers: string[];
  severity: 'none' | 'moderate' | 'high' | 'severe';
}

/**
 * Detect crisis conditions based on published thresholds
 *
 * Crisis is triggered by ANY of the following:
 * 1. PHQ-2 ≥ 5 (severe depression symptoms)
 * 2. WHO-5 percentage ≤ 16 (very poor wellbeing, critical threshold)
 * 3. PHQ-4 total ≥ 10 (severe combined depression + anxiety)
 *
 * These thresholds indicate need for immediate professional evaluation.
 */
export function detectCrisis(instruments: InstrumentScores): CrisisResult {
  const triggers: string[] = [];
  let maxSeverity: CrisisResult['severity'] = 'none';

  // Trigger 1: PHQ-2 ≥ 5 (severe depression screen)
  if (instruments.phq2_raw >= 5) {
    triggers.push('severe_depression_symptoms');
    maxSeverity = updateSeverity(maxSeverity, 'severe');
  }

  // Trigger 2: WHO-5 percentage ≤ 16 (critical low wellbeing)
  if (instruments.who5_percentage <= 16) {
    triggers.push('critical_low_wellbeing');
    maxSeverity = updateSeverity(maxSeverity, 'severe');
  }

  // Trigger 3: PHQ-4 total ≥ 10 (severe combined anxiety + depression)
  if (instruments.phq4_total >= 10) {
    triggers.push('severe_emotional_distress');
    maxSeverity = updateSeverity(maxSeverity, 'severe');
  }

  // Additional concern: PHQ-4 total ≥ 8 (moderate-high distress, not crisis but notable)
  // This doesn't trigger crisis but informs severity
  if (instruments.phq4_total >= 8 && instruments.phq4_total < 10) {
    maxSeverity = updateSeverity(maxSeverity, 'high');
  }

  return {
    detected: triggers.length > 0,
    triggers,
    severity: maxSeverity,
  };
}

/**
 * Update severity to the higher of current or new level
 */
function updateSeverity(
  current: CrisisResult['severity'],
  newLevel: CrisisResult['severity']
): CrisisResult['severity'] {
  const levels: CrisisResult['severity'][] = ['none', 'moderate', 'high', 'severe'];
  const currentIndex = levels.indexOf(current);
  const newIndex = levels.indexOf(newLevel);
  return levels[Math.max(currentIndex, newIndex)];
}

/**
 * Get human-readable message for crisis detection
 */
export function getCrisisMessage(result: CrisisResult): string {
  if (!result.detected) {
    return '';
  }

  if (result.severity === 'severe') {
    return 'Your responses indicate you may be experiencing significant distress. ' +
      'Please consider reaching out to a mental health professional or crisis support service immediately.';
  }

  return 'Your responses show some concerning patterns. ' +
    'We recommend speaking with a mental health professional soon.';
}

/**
 * Get recommended crisis resources based on detection
 */
export interface CrisisResource {
  name: string;
  phone: string;
  text?: string;
  url?: string;
  available: string;
  description: string;
}

export function getRecommendedCrisisResources(): CrisisResource[] {
  return [
    {
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      text: '988',
      url: 'https://988lifeline.org',
      available: '24/7',
      description: 'Free, confidential support for people in distress',
    },
    {
      name: 'Crisis Text Line',
      phone: '',
      text: 'Text HOME to 741741',
      url: 'https://crisistextline.org',
      available: '24/7',
      description: 'Text-based crisis support with trained counselors',
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      available: '24/7',
      description: 'Treatment referral and information service for mental health and substance use',
    },
    {
      name: 'NAMI HelpLine',
      phone: '1-800-950-6264',
      text: 'Text NAMI to 741741',
      url: 'https://nami.org/help',
      available: 'Mon-Fri 10am-10pm ET',
      description: 'Information, support, and resources for mental health conditions',
    },
  ];
}

/**
 * Log crisis event (anonymously) for system monitoring
 * This function prepares data for logging - actual logging happens in Edge Function
 */
export function prepareCrisisLogData(result: CrisisResult) {
  return {
    timestamp: new Date().toISOString(),
    severity: result.severity,
    trigger_count: result.triggers.length,
    // Note: NEVER log user ID or any PII
    // Triggers are logged as count only, not specific types
  };
}
