/**
 * MOOD PATTERN ALERT
 *
 * Proactive alert triggered by longitudinal mood analysis.
 * Shows when patterns indicate increased risk (6.8 days before crisis language).
 */

import React from 'react';
import type { PatternAlert } from '../types/crisis.types';

interface MoodPatternAlertProps {
  alert: PatternAlert;
  onAcknowledge: () => void;
}

export function MoodPatternAlert({ alert, onAcknowledge }: MoodPatternAlertProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-orange-50 dark:bg-orange-950 border-l-4 border-orange-500 p-4 rounded"
    >
      {/* TODO: Display pattern-based alert */}
      <p className="font-semibold">We've noticed a pattern in your mood logs...</p>
      {/* Action buttons based on alert.triggerAction */}
    </div>
  );
}
