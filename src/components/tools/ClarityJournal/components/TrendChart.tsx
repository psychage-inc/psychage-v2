import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface DataPoint {
  label: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  color?: string;
  yDomain?: [number, number];
  height?: number;
  label?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  color = '#1A9B8C',
  yDomain = [0, 10],
  height = 200,
  label,
}) => {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-slate-400 bg-slate-50 rounded-xl">
        Need at least 2 entries to show trends
      </div>
    );
  }

  return (
    <div>
      {label && <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis domain={yDomain} tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '13px',
              backdropFilter: 'blur(8px)',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
