import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { ClarityDomainScores } from '@/lib/clarity/types';
import { DIMENSION_META, DIMENSION_ORDER } from '../../data/dimensions';

interface DimensionRadarProps {
  domainScores: ClarityDomainScores;
}

/** 5-axis radar chart showing all dimension scores */
const DimensionRadar: React.FC<DimensionRadarProps> = ({ domainScores }) => {
  const data = DIMENSION_ORDER.map((key) => ({
    dimension: DIMENSION_META[key].shortName,
    score: Math.round(domainScores[key] * 10) / 10,
    fullMark: 20,
  }));

  // Text alternative for screen readers
  const textAlt = DIMENSION_ORDER.map(
    (key) =>
      `${DIMENSION_META[key].name}: ${Math.round(domainScores[key])} out of 20`
  ).join(', ');

  return (
    <div
      role="img"
      aria-label={`Dimension radar chart. ${textAlt}`}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />
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
            stroke="#0d9488"
            strokeWidth={2}
            fill="#0d9488"
            fillOpacity={0.2}
            dot={{ r: 4, fill: '#0d9488', strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DimensionRadar;
