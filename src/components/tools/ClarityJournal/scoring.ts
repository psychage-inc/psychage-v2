// Clarity Journal — Screening score calculations
// PHQ-2, GAD-2, PSS-4, WHO-5 scoring + threshold classifiers

import type { ScoreLevel } from './types';
import { PHQ2_THRESHOLDS, GAD2_THRESHOLDS, PSS4_THRESHOLDS, WHO5_THRESHOLDS } from './constants';

/** PHQ-2 total: sum of two items (0-3 each, 0-6 total) */
export function scorePHQ2(q1: number, q2: number): number {
  return Math.max(0, Math.min(6, q1 + q2));
}

/** GAD-2 total: sum of two items (0-3 each, 0-6 total) */
export function scoreGAD2(q1: number, q2: number): number {
  return Math.max(0, Math.min(6, q1 + q2));
}

/**
 * PSS-4 adapted scoring (2 items from PSS-4).
 * q1 = "unable to control" (direct), q2 = "confident" (reverse scored).
 * Reverse q2: score = (4 - q2). Total = q1 + (4 - q2). Range 0-8.
 */
export function scorePSS4(q1: number, q2: number): number {
  const reversed = 4 - q2;
  return Math.max(0, Math.min(8, q1 + reversed));
}

/**
 * WHO-5 adapted scoring (2 items).
 * Both items direct-scored (0-5 each). Total 0-10. Higher = better.
 */
export function scoreWHO5(q1: number, q2: number): number {
  return Math.max(0, Math.min(10, q1 + q2));
}

/** Classify PHQ-2 score into levels */
export function classifyPHQ2(total: number): ScoreLevel {
  if (total <= PHQ2_THRESHOLDS.low) return 'low';
  if (total <= PHQ2_THRESHOLDS.moderate) return 'moderate';
  return 'elevated';
}

/** Classify GAD-2 score into levels */
export function classifyGAD2(total: number): ScoreLevel {
  if (total <= GAD2_THRESHOLDS.low) return 'low';
  if (total <= GAD2_THRESHOLDS.moderate) return 'moderate';
  return 'elevated';
}

/** Classify PSS-4 score into levels (0-8 range) */
export function classifyPSS4(total: number): ScoreLevel {
  if (total <= PSS4_THRESHOLDS.low) return 'low';
  if (total <= PSS4_THRESHOLDS.moderate) return 'moderate';
  return 'elevated';
}

/** Classify WHO-5 score into levels (inverted — higher is better) */
export function classifyWHO5(total: number): ScoreLevel {
  if (total >= WHO5_THRESHOLDS.good) return 'low'; // Good well-being
  if (total >= WHO5_THRESHOLDS.moderate) return 'moderate';
  return 'elevated'; // Low well-being → elevated concern
}

/** Get display color class for a score level */
export function getScoreColor(level: ScoreLevel): string {
  switch (level) {
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    case 'moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'elevated': return 'text-red-600 bg-red-50 border-red-200';
  }
}

/** Get label for score level */
export function getScoreLabel(level: ScoreLevel): string {
  switch (level) {
    case 'low': return 'Low concern';
    case 'moderate': return 'Moderate';
    case 'elevated': return 'Elevated';
  }
}
