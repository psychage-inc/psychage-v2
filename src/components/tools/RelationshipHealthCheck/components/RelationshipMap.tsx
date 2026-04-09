import React from 'react';
import { motion } from 'framer-motion';
import { DOMAIN_META } from '../types';
import type { DomainScores, RelationshipDomain } from '../types';

interface RelationshipMapProps {
  domainScores: DomainScores;
  skipPartner: boolean;
}

const CX = 200;
const CY = 200;
const RADIUS = 130;

interface DomainNode {
  domain: RelationshipDomain;
  angle: number; // radians
  x: number;
  y: number;
}

const DOMAIN_COLORS: Record<RelationshipDomain, string> = {
  partner: '#f43f5e', // rose-500
  family: '#6366f1', // indigo-500
  friends: '#f59e0b', // amber-500
  community: '#20B8A6', // teal-500
};

const DOMAIN_COLORS_LIGHT: Record<RelationshipDomain, string> = {
  partner: '#ffe4e6', // rose-100
  family: '#e0e7ff', // indigo-100
  friends: '#fef3c7', // amber-100
  community: '#ccfbf1', // teal-100
};

function getNodes(skipPartner: boolean): DomainNode[] {
  const domains: RelationshipDomain[] = skipPartner
    ? ['family', 'friends', 'community']
    : ['partner', 'family', 'friends', 'community'];

  const angleStep = (2 * Math.PI) / domains.length;
  // Start from top (-PI/2) so first node is at the top
  const startAngle = -Math.PI / 2;

  return domains.map((domain, i) => {
    const angle = startAngle + i * angleStep;
    return {
      domain,
      angle,
      x: CX + RADIUS * Math.cos(angle),
      y: CY + RADIUS * Math.sin(angle),
    };
  });
}

function getNodeRadius(score: number): number {
  // Min 20px, max 36px based on score 0-100
  return 20 + (score / 100) * 16;
}

function getLineWidth(score: number): number {
  // Min 1.5, max 5 based on score 0-100
  return 1.5 + (score / 100) * 3.5;
}

export const RelationshipMap: React.FC<RelationshipMapProps> = ({
  domainScores,
  skipPartner,
}) => {
  const nodes = getNodes(skipPartner);

  // Build aria-label
  const ariaLabel = nodes
    .map((n) => `${DOMAIN_META[n.domain].name}: ${domainScores[n.domain]} out of 100`)
    .join(', ');

  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[320px]"
        role="img"
        aria-label={`Relationship Health Map. ${ariaLabel}`}
      >
        {/* Connection lines */}
        {nodes.map((node, i) => {
          const score = domainScores[node.domain];
          const width = getLineWidth(score);
          return (
            <motion.line
              key={`line-${node.domain}`}
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              stroke={DOMAIN_COLORS[node.domain]}
              strokeWidth={width}
              strokeLinecap="round"
              strokeOpacity={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            />
          );
        })}

        {/* Center node (You) */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={18}
          fill="#374151"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, type: 'spring' }}
        />
        <text
          x={CX}
          y={CY + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="10"
          fontWeight="700"
        >
          You
        </text>

        {/* Domain nodes */}
        {nodes.map((node, i) => {
          const score = domainScores[node.domain];
          const r = getNodeRadius(score);
          const meta = DOMAIN_META[node.domain];

          return (
            <motion.g
              key={node.domain}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15, type: 'spring' }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={DOMAIN_COLORS_LIGHT[node.domain]}
                stroke={DOMAIN_COLORS[node.domain]}
                strokeWidth={2}
              />

              {/* Score text */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill={DOMAIN_COLORS[node.domain]}
                fontSize="12"
                fontWeight="700"
              >
                {score}
              </text>

              {/* Label below node */}
              <text
                x={node.x}
                y={node.y + r + 14}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="11"
                fontWeight="600"
              >
                {meta.name}
              </text>
            </motion.g>
          );
        })}

        {/* Skipped partner indicator */}
        {skipPartner && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
          >
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - RADIUS}
              stroke="#d1d5db"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <circle
              cx={CX}
              cy={CY - RADIUS}
              r={20}
              fill="#f9fafb"
              stroke="#d1d5db"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <text
              x={CX}
              y={CY - RADIUS + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#d1d5db"
              fontSize="8"
              fontWeight="600"
            >
              N/A
            </text>
            <text
              x={CX}
              y={CY - RADIUS + 34}
              textAnchor="middle"
              fill="#d1d5db"
              fontSize="11"
              fontWeight="600"
            >
              Partner
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
};
