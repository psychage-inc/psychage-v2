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
            stroke="var(--color-border)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="domain"
            tick={{ fill: 'var(--color-text-secondary)', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
            tickCount={5}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              padding: '0.5rem 0.75rem',
              boxShadow: 'var(--shadow-md)',
            }}
            formatter={(value: number) => [`${value}/100`, 'Score']}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: 'var(--color-primary)', stroke: 'var(--color-surface)', strokeWidth: 2 }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
