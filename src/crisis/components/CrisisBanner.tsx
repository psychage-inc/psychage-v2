/**
 * CRISIS BANNER (TIER 2)
 *
 * Inline banner for elevated distress (hopelessness, worthlessness, feeling trapped).
 * Includes AI response from Claude + crisis resources.
 */

import React from 'react';
import type { CrisisBannerProps } from '../types/crisis.types';

export function CrisisBanner({ tier, aiResponse, resources, onDismiss }: CrisisBannerProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 p-4 my-4 rounded"
    >
      {/* TODO: Implement banner content */}
      <p className="text-sm text-amber-900 dark:text-amber-100">
        {aiResponse || 'We noticed you might be going through something difficult...'}
      </p>
      {/* Display crisis resources */}
      {/* Dismiss button */}
    </div>
  );
}
