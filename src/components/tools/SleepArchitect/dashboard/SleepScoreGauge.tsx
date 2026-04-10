/**
 * Sleep Score Gauge — Circular gauge displaying the composite sleep score.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SleepScoreBreakdown } from '@/lib/sleep/types';

interface SleepScoreGaugeProps {
  score: SleepScoreBreakdown;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#1A9B8C'; // teal
  if (score >= 60) return '#22C55E'; // green
  if (score >= 40) return '#F59E0B'; // amber
  return '#EF4444'; // red
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Attention';
}

function getScoreLabelColor(score: number): string {
  if (score >= 80) return 'text-teal-600 dark:text-teal-400';
  if (score >= 60) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

const RADIUS = 80;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SleepScoreGauge: React.FC<SleepScoreGaugeProps> = ({ score }) => {
  const dashOffset = CIRCUMFERENCE * (1 - score.overall / 100);
  const color = getScoreColor(score.overall);

  const dimensions = [
    { label: 'Duration', value: score.duration },
    { label: 'Efficiency', value: score.efficiency },
    { label: 'Quality', value: score.quality },
    { label: 'Consistency', value: score.consistency },
    { label: 'Latency', value: score.latency },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-6 text-center">
        Sleep Score
      </h3>

      {/* Circular Gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full -rotate-90"
            aria-label={`Sleep score: ${score.overall} out of 100`}
          >
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              className="text-gray-100 dark:text-gray-700"
            />
            {/* Score arc */}
            <motion.circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-white"
            >
              {score.overall}
            </motion.span>
            <span
              className={cn(
                'text-xs font-bold',
                getScoreLabelColor(score.overall)
              )}
            >
              {getScoreLabel(score.overall)}
            </span>
          </div>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className="space-y-2">
        {dimensions.map((dim) => (
          <div key={dim.label} className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-24">
              {dim.label}
            </span>
            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dim.value}%` }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-full rounded-full"
                style={{ backgroundColor: getScoreColor(dim.value) }}
              />
            </div>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-8 text-right">
              {dim.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepScoreGauge;
