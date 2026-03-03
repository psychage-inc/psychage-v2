/**
 * GLOBAL RESOURCE PANEL
 *
 * Displays country-aware crisis resources from ThroughLine API.
 * Always visible in crisis contexts, never hidden.
 */

import React from 'react';
import type { CrisisResource } from '../types/crisis.types';

interface GlobalResourcePanelProps {
  resources: CrisisResource[];
  countryCode: string;
  countryName: string;
  onCountryChange: (code: string) => void;
}

export function GlobalResourcePanel({
  resources,
  countryCode,
  countryName,
  onCountryChange,
}: GlobalResourcePanelProps) {
  return (
    <aside className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Crisis Support Resources</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Showing resources for {countryName}
      </p>
      {/* TODO: Resource list with phone/chat/text options */}
      {/* Country selector */}
    </aside>
  );
}
