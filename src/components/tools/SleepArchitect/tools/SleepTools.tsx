/**
 * Sleep Tools — Tab container for intelligence tools.
 * Includes bedtime calculator, sleep debt, chronotype quiz, and hygiene audit.
 */

import React, { useMemo } from 'react';
import type { useSleepEntries } from '../hooks/useSleepEntries';
import BedtimeCalculator from './BedtimeCalculator';
import SleepDebtTracker from './SleepDebtTracker';
import ChronotypeQuiz from './ChronotypeQuiz';
import HygieneAudit from './HygieneAudit';

interface SleepToolsProps {
  sleepData: ReturnType<typeof useSleepEntries>;
}

const SleepTools: React.FC<SleepToolsProps> = ({ sleepData }) => {
  // Calculate average onset from diary data
  const averageOnset = useMemo(() => {
    if (sleepData.entryCount === 0) return 15;
    const recent = sleepData.getRecentEntries(30);
    if (recent.length === 0) return 15;
    return Math.round(
      recent.reduce((sum, e) => sum + e.sleep_onset_minutes, 0) / recent.length
    );
  }, [sleepData]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BedtimeCalculator averageOnset={averageOnset} />
        <SleepDebtTracker sleepData={sleepData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChronotypeQuiz />
        <HygieneAudit />
      </div>
    </div>
  );
};

export default SleepTools;
