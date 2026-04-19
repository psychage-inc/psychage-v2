/**
 * Duration Chart — Bar chart showing sleep duration with time-in-bed overlay.
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { SleepEntry } from '@/lib/sleep/types';
import { calculateMetrics } from '@/lib/sleep/calculations';

interface DurationChartProps {
  entries: SleepEntry[];
  targetMinutes?: number;
}

const DurationChart: React.FC<DurationChartProps> = ({
  entries,
  targetMinutes = 480,
}) => {
  const data = entries.map((entry) => {
    const metrics = calculateMetrics(entry);
    const dateObj = new Date(entry.date + 'T12:00:00');
    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: entry.date,
      timeInBed: +(metrics.time_in_bed_minutes / 60).toFixed(1),
      totalSleep: +(metrics.total_sleep_minutes / 60).toFixed(1),
    };
  });

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
      <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-4">
        Sleep Duration
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={-20}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            className="text-xs"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 12]}
            label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF', fontSize: 10 } }}
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
              `${value}h`,
              name === 'timeInBed' ? 'Time in Bed' : 'Actual Sleep',
            ]}
          />
          <ReferenceLine
            y={targetMinutes / 60}
            stroke="#1A9B8C"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: 'Target',
              position: 'right',
              fill: '#1A9B8C',
              fontSize: 10,
            }}
          />
          <Bar
            dataKey="timeInBed"
            fill="#E0E7FF"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            dataKey="totalSleep"
            fill="#6366F1"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gray-400 dark:text-neutral-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-indigo-200" />
          Time in Bed
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-indigo-500" />
          Actual Sleep
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 border-t border-dashed border-teal-500" />
          Target
        </div>
      </div>
    </div>
  );
};

export default DurationChart;
