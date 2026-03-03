/**
 * GENTLE CHECK-IN (TIER 1)
 *
 * Soft nudge for mild distress (sadness, anxiety, stress).
 * Non-intrusive, supportive tone.
 */

import React from 'react';
import type { GentleCheckInProps } from '../types/crisis.types';

export function GentleCheckIn({ aiResponse, onDismiss }: GentleCheckInProps) {
  return (
    <div className="bg-teal-50 dark:bg-teal-950 p-4 my-4 rounded-lg">
      {/* TODO: Implement check-in content */}
      <p className="text-sm text-teal-900 dark:text-teal-100">
        {aiResponse || "It sounds like you're going through something. Want to talk about it?"}
      </p>
      {/* Optional: link to resources or mood logger */}
    </div>
  );
}
