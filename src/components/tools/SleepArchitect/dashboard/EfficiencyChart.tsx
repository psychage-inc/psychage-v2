/**
 * Efficiency Chart — Line chart with 85% target line.
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
  ReferenceLine,
} from 'recharts';
import type { SleepEntry } from '@/lib/sleep/types';
import { calculateMetrics } from '@/lib/sleep/calculations';

interface EfficiencyChartProps {
  entries: SleepEntry[];
}

const EfficiencyChart: React.FC<EfficiencyChartProps> = ({ entries }) => {
  const data = entries.map((entry) => {
    const metrics = calculateMetrics(entry);
    const dateObj = new Date(entry.date + 'T12:00:00');
    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      efficiency: Math.round(metrics.sleep_efficiency),
    };
  });

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-gray-100 dark:border-neutral-700">
      <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-4">
        Sleep Efficiency
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
            domain={[50, 100]}
            label={{ value: '%', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF', fontSize: 10 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgb(31, 41, 55)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value}%`, 'Efficiency']}
          />
          <ReferenceLine
            y={85}
            stroke="#1A9B8C"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: '85% target',
              position: 'right',
              fill: '#1A9B8C',
              fontSize: 10,
            }}
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ fill: '#3B82F6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyChart;
