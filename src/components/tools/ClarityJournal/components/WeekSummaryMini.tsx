import React from 'react';
import type { DailyCheckIn } from '../types';

interface WeekSummaryMiniProps {
  checkIns: DailyCheckIn[];
}

const WeekSummaryMini: React.FC<WeekSummaryMiniProps> = ({ checkIns }) => {
  if (checkIns.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-neutral-900 rounded-xl p-4 mb-6 text-sm text-slate-400 dark:text-neutral-500 text-center">
        No daily check-ins this week yet.
      </div>
    );
  }

  const avg = (arr: number[]) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const avgMood = avg(checkIns.map(c => c.mood));
  const avgEnergy = avg(checkIns.map(c => c.energy));
  const avgSleep = avg(checkIns.map(c => c.sleepHours));

  const stats = [
    { label: 'Avg Mood', value: avgMood.toFixed(1), max: '10' },
    { label: 'Avg Energy', value: avgEnergy.toFixed(1), max: '10' },
    { label: 'Avg Sleep', value: `${avgSleep.toFixed(1)}h`, max: '' },
    { label: 'Check-ins', value: checkIns.length.toString(), max: '7' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-neutral-900 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="text-center">
          <p className="text-lg font-semibold text-slate-800 dark:text-neutral-200">
            {s.value}{s.max && <span className="text-xs text-slate-400 dark:text-neutral-500 font-normal">/{s.max}</span>}
          </p>
          <p className="text-xs text-slate-500 dark:text-neutral-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default WeekSummaryMini;
