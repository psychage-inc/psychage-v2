import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MedicationTrackerData } from '../types';
import { getAdherenceStats } from '../storage';

interface Props {
  data: MedicationTrackerData;
}

export const AdherenceChart: React.FC<Props> = ({ data }) => {
  const activeMeds = data.medications.filter((m) => m.isActive);

  const chartData = useMemo(() => {
    return activeMeds.map((med) => {
      const stats = getAdherenceStats(data, med.id, 7);
      return {
        name: med.name.length > 12 ? med.name.slice(0, 12) + '...' : med.name,
        adherence: stats.percentage,
        color: med.color,
        taken: stats.taken,
        total: stats.total,
      };
    });
  }, [activeMeds, data]);

  if (activeMeds.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-neutral-400 text-sm">
        Add medications to see adherence data.
      </div>
    );
  }

  if (chartData.every((d) => d.total === 0)) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-neutral-400 text-sm">
        Log some doses to see your adherence chart.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-neutral-300 mb-3">
        7-Day Adherence by Medication
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(160, activeMeds.length * 50)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, _name: string, props: { payload: { taken: number; total: number } }) => [
              `${value}% (${props.payload.taken}/${props.payload.total} doses)`,
              'Adherence',
            ]}
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '13px',
            }}
          />
          <Bar dataKey="adherence" radius={[0, 4, 4, 0]} barSize={20}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
