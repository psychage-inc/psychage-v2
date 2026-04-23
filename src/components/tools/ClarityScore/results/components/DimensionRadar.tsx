import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { ClarityDomainScores, DomainKey } from '@/lib/clarity/types';
import { DIMENSION_META, DIMENSION_ORDER, getDimensionTier } from '../../data/dimensions';
import { getTierHexColor } from '@/lib/clarity/scoring';

interface DimensionRadarProps {
  domainScores: ClarityDomainScores;
  onDimensionClick?: (key: DomainKey) => void;
}

/** Custom tooltip showing dimension name, score, and tier color */
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;
  const tier = getDimensionTier(data.score);
  const tierColor = getTierHexColor(tier);

  return (
    <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl px-4 py-3 border border-gray-200 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: tierColor }}
        />
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {data.fullName}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-neutral-300">
        <span className="font-bold">{data.score}</span> / 20
      </p>
    </div>
  );
};

/** 5-axis radar chart showing all dimension scores with interactivity */
const DimensionRadar: React.FC<DimensionRadarProps> = ({
  domainScores,
  onDimensionClick,
}) => {
  const data = DIMENSION_ORDER.map((key) => ({
    dimension: DIMENSION_META[key].shortName,
    fullName: DIMENSION_META[key].name,
    key,
    score: Math.round(domainScores[key] * 10) / 10,
    fullMark: 20,
  }));

  // Text alternative for screen readers
  const textAlt = DIMENSION_ORDER.map(
    (key) =>
      `${DIMENSION_META[key].name}: ${Math.round(domainScores[key])} out of 20`
  ).join(', ');

  const handleDotClick = (_e: any, data: any) => {
    if (onDimensionClick && data?.payload?.key) {
      onDimensionClick(data.payload.key);
    }
  };

  return (
    <div
      role="img"
      aria-label={`Dimension radar chart. ${textAlt}`}
      className="w-full max-w-sm mx-auto"
    >
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 20]}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            tickCount={5}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#1A9B8C"
            strokeWidth={2}
            fill="#1A9B8C"
            fillOpacity={0.2}
            dot={{ r: 4, fill: '#1A9B8C', strokeWidth: 0 }}
            activeDot={{
              r: 6,
              fill: '#1A9B8C',
              stroke: '#fff',
              strokeWidth: 2,
              cursor: onDimensionClick ? 'pointer' : 'default',
              onClick: handleDotClick,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      {onDimensionClick && (
        <p className="text-center text-xs text-gray-400 dark:text-neutral-500 mt-1 md:hidden">
          Tap a point to explore that dimension
        </p>
      )}
    </div>
  );
};

export default DimensionRadar;
