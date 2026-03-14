import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Plus, TrendingUp, Calendar } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { TIER_META, DOMAIN_META } from '../types';
import type { RelationshipHistoryItem, RelationshipDomain } from '../types';

interface HistoryViewProps {
  history: RelationshipHistoryItem[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onStartNew: () => void;
}

const DOMAINS: RelationshipDomain[] = ['partner', 'family', 'friends', 'community'];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-teal-600';
  if (score >= 40) return 'text-amber-600';
  return 'text-rose-600';
}

/** Simple SVG sparkline for trend */
const TrendLine: React.FC<{ history: RelationshipHistoryItem[] }> = ({ history }) => {
  if (history.length < 2) return null;

  // Use the last 10 entries, oldest first
  const entries = [...history].reverse().slice(-10);
  const scores = entries.map((h) => h.compositeScore);
  const min = Math.min(...scores) - 5;
  const max = Math.max(...scores) + 5;
  const range = max - min || 1;

  const width = 280;
  const height = 60;
  const padding = 4;

  const points = scores.map((score, i) => {
    const x = padding + (i / (scores.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((score - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  // Area fill path
  const firstX = padding;
  const lastX = padding + ((scores.length - 1) / (scores.length - 1)) * (width - 2 * padding);
  const areaPath = `M ${firstX},${height - padding} L ${polyline.replace(/,/g, ' ').split(' ').reduce((acc, val, idx) => {
    if (idx % 2 === 0) return [...acc, val];
    return [...acc.slice(0, -1), `${acc[acc.length - 1]},${val}`];
  }, [] as string[]).join(' L ')} L ${lastX},${height - padding} Z`;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={16} className="text-gray-400" />
        <span className="text-sm font-bold text-gray-700">Score Trend</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-hidden="true">
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={padding}
            y1={height - padding - pct * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - pct * (height - 2 * padding)}
            stroke="#f3f4f6"
            strokeWidth={1}
          />
        ))}
        {/* Trend line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="#14b8a6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dots */}
        {scores.map((score, i) => {
          const x = padding + (i / (scores.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((score - min) / range) * (height - 2 * padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              fill="white"
              stroke="#14b8a6"
              strokeWidth={2}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onBack,
  onDelete,
  onStartNew,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO
        title="Assessment History | Relationship Health Check | Psychage"
        description="View your past relationship health assessment results."
      />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<ArrowLeft size={16} />}>
              Back
            </Button>
            <h1 className="font-display font-bold text-2xl text-gray-900">
              Assessment History
            </h1>
          </div>
          <Button size="sm" leftIcon={<Plus size={16} />} onClick={onStartNew}>
            New
          </Button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Calendar size={32} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No saved assessments yet</p>
            <p className="text-sm text-gray-400">
              Complete your first relationship health check to start tracking over time.
            </p>
          </div>
        ) : (
          <>
            <TrendLine history={history} />

            <div className="space-y-3">
              {history.map((item) => {
                const tierMeta = TIER_META[item.tier];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-2xl font-bold ${getScoreColor(item.compositeScore)}`}>
                            {item.compositeScore}
                          </span>
                          <span className="text-xs text-gray-400">/ 100</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        aria-label="Delete this assessment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Mini domain scores */}
                    <div className="flex gap-2 flex-wrap">
                      {DOMAINS.map((domain) => {
                        if (domain === 'partner' && item.skipPartner) return null;
                        const score = item.domainScores[domain];
                        const meta = DOMAIN_META[domain];
                        return (
                          <span
                            key={domain}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${meta.bgColor} ${meta.textColor}`}
                          >
                            {meta.name}: {score}
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
