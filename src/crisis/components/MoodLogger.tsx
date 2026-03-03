/**
 * MOOD LOGGER
 *
 * Daily mood input (0-5 scale) + 30-day visual history.
 * Enables pattern-based proactive intervention.
 */

import React, { useState } from 'react';
import { useMoodTracking } from '../hooks/useMoodTracking';
import type { MoodLevel } from '../types/crisis.types';

export function MoodLogger() {
  const { logs, logMood, isLoading } = useMoodTracking();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);

  const handleSubmit = async () => {
    if (selectedMood === null) return;
    await logMood(selectedMood);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
      {/* TODO: Mood selector (0-5 visual scale) */}
      {/* 30-day chart using Recharts */}
      {/* Pattern alerts if applicable */}
    </div>
  );
}
