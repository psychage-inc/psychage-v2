import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DOMAIN_META } from '../types';
import type { DomainScores, RelationshipDomain } from '../types';

interface RadarChartProps {
  domainScores: DomainScores;
  skipPartner: boolean;
}

const DOMAIN_ORDER: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

export const RadarChart: React.FC<RadarChartProps> = ({ domainScores, skipPartner }) => {
  const domains = skipPartner
    ? DOMAIN_ORDER.filter((d) => d !== 'partner')
    : DOMAIN_ORDER;

  const data = domains.map((domain) => ({
    domain: DOMAIN_META[domain].name,
    score: domainScores[domain],
    fullMark: 100,
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="domain"
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={5}
          />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.5rem 0.75rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value}/100`, 'Score']}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#20B8A6"
            fill="#20B8A6"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ r: 4, fill: '#20B8A6', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#20B8A6', stroke: '#fff', strokeWidth: 2 }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
