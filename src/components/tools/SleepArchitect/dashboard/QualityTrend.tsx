/**
 * Quality Trend — Line chart of self-rated sleep quality over time.
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SleepEntry } from '@/lib/sleep/types';

interface QualityTrendProps {
  entries: SleepEntry[];
}

const QUALITY_LABELS = ['', 'Poor', 'Below Avg', 'Average', 'Good', 'Excellent'];

const QualityTrend: React.FC<QualityTrendProps> = ({ entries }) => {
  const data = entries.map((entry) => {
    const dateObj = new Date(entry.date + 'T12:00:00');
    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      quality: entry.sleep_quality,
      mood: entry.morning_mood,
    };
  });

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
      <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-4">
        Quality & Mood Trend
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(31, 41, 55)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => [
              `${QUALITY_LABELS[value]} (${value}/5)`,
              name === 'quality' ? 'Sleep Quality' : 'Morning Mood',
            ]}
          />
          <Line
            type="monotone"
            dataKey="quality"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            dot={{ fill: '#8B5CF6', r: 3, strokeWidth: 0 }}
            name="quality"
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#F59E0B"
            strokeWidth={2}
            strokeDasharray="4 2"
            dot={{ fill: '#F59E0B', r: 2.5, strokeWidth: 0 }}
            name="mood"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gray-400 dark:text-neutral-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-violet-500 rounded" />
          Sleep Quality
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-amber-500 rounded border-t border-dashed" />
          Morning Mood
        </div>
      </div>
    </div>
  );
};

export default QualityTrend;
