import React from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { Clock, TrendingUp, Award, Calendar, Layers } from 'lucide-react';
import type {
  ClarityScoreResult,
  ClarityHistoryItem,
} from '@/lib/clarity/types';
import { DIMENSION_META, DIMENSION_ORDER } from '../data/dimensions';
import TierBadge from './components/TierBadge';
import { getScoreLabel } from '@/lib/clarity/scoring';

interface HistoryTabProps {
  history: ClarityHistoryItem[];
  currentResult: ClarityScoreResult;
}

interface Milestone {
  label: string;
  icon: React.ElementType;
  earned: boolean;
  description: string;
}

function computeInsights(history: ClarityHistoryItem[]) {
  if (history.length < 2) return null;

  const latest = history[0];
  const oldest = history[history.length - 1];
  const previous = history[1];

  const totalChange = latest.score - oldest.score;
  const recentChange = latest.score - previous.score;

  // Find strongest improving dimension
  let bestImproving: string | null = null;
  let bestDelta = -Infinity;
  if (latest.domainScores && oldest.domainScores) {
    for (const key of DIMENSION_ORDER) {
      const delta =
        (latest.domainScores[key] ?? 0) - (oldest.domainScores[key] ?? 0);
      if (delta > bestDelta) {
        bestDelta = delta;
        bestImproving = DIMENSION_META[key].name;
      }
    }
  }

  return { totalChange, recentChange, bestImproving, bestDelta };
}

function computeMilestones(
  history: ClarityHistoryItem[],
  currentResult: ClarityScoreResult
): Milestone[] {
  const hasHistory = history.length > 0;
  const oldest = history[history.length - 1];
  const latest = history[0];

  // Time span
  let spanMonths = 0;
  if (hasHistory && oldest && latest) {
    const oldDate = new Date(oldest.date);
    const newDate = new Date(latest.date);
    spanMonths = Math.floor(
      (newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
  }

  // Score improvement
  const improvement =
    hasHistory && oldest && latest ? latest.score - oldest.score : 0;

  // All balanced
  const allBalanced = DIMENSION_ORDER.every(
    (key) => currentResult.domainScores[key] >= 12
  );

  return [
    {
      label: 'First Assessment',
      icon: Award,
      earned: hasHistory,
      description: 'Completed your first Clarity Score',
    },
    {
      label: '+10 Points',
      icon: TrendingUp,
      earned: improvement >= 10,
      description: 'Improved 10+ points from first assessment',
    },
    {
      label: '3-Month Streak',
      icon: Calendar,
      earned: spanMonths >= 3,
      description: 'Tracking wellness for 3+ months',
    },
    {
      label: 'All Balanced',
      icon: Award,
      earned: allBalanced,
      description: 'All dimensions scoring 12 or above',
    },
  ];
}

const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  currentResult,
}) => {
  // Reverse to chronological order for charts
  const chronological = [...history].reverse();

  const hasDomainData = chronological.some((h) => h.domainScores);
  const insights = computeInsights(history);
  const milestones = computeMilestones(history, currentResult);

  // Composite trend data
  const trendData = chronological.map((h) => ({
    label: h.date,
    score: h.score,
  }));

  // Domain trend data
  const domainTrendData = hasDomainData
    ? chronological
        .filter((h) => h.domainScores)
        .map((h) => ({
          label: h.date,
          ...DIMENSION_ORDER.reduce(
            (acc, key) => ({
              ...acc,
              [key]: h.domainScores?.[key] ?? 0,
            }),
            {} as Record<string, number>
          ),
        }))
    : [];

  // ─── Empty State ───
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-6 text-teal-600 dark:text-teal-400">
          <Clock size={28} />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">
          Track Your Clarity Over Time
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-2">
          Your first result has been saved. Retake in 2 weeks to start seeing
          trends in your wellness journey.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Your data stays on your device.
        </p>
      </motion.div>
    );
  }

  // ─── Single Entry State ───
  if (history.length === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400">
            <Clock size={28} />
          </div>
          <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
            Your First Assessment is Recorded
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Score: <strong>{history[0].score}</strong> —{' '}
            {history[0].label || getScoreLabel(history[0].score).label}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Retake in 2 weeks to see how your wellness changes over time. Trend
            charts appear after 2 or more assessments.
          </p>
        </div>

        {/* Milestones */}
        <MilestoneRow milestones={milestones} />
      </motion.div>
    );
  }

  // ─── Full History View (2+ entries) ───
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* ─── Composite Trend ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-teal-500" />
          Score Trend
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={trendData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1A9B8C" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1A9B8C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '13px',
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#1A9B8C"
              strokeWidth={2}
              fill="url(#trendGradient)"
              dot={{ r: 4, fill: '#1A9B8C', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ─── Change Summary ─── */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Overall Change</p>
            <p
              className={`text-2xl font-display font-bold ${
                insights.totalChange > 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : insights.totalChange < 0
                    ? 'text-red-500'
                    : 'text-gray-500'
              }`}
            >
              {insights.totalChange > 0 ? '+' : ''}
              {insights.totalChange} pts
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Assessments Taken</p>
            <p className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              {history.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Since Last</p>
            <p
              className={`text-2xl font-display font-bold ${
                insights.recentChange > 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : insights.recentChange < 0
                    ? 'text-red-500'
                    : 'text-gray-500'
              }`}
            >
              {insights.recentChange > 0 ? '+' : ''}
              {insights.recentChange} pts
            </p>
          </div>
        </div>
      )}

      {/* ─── Domain Trends ─── */}
      {hasDomainData && domainTrendData.length >= 2 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Layers size={18} className="text-teal-500" />
            Dimension Trends
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={domainTrendData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <YAxis
                domain={[0, 20]}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '13px',
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />
              {DIMENSION_ORDER.map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={DIMENSION_META[key].shortName}
                  stroke={DIMENSION_META[key].hexColor}
                  strokeWidth={2}
                  dot={{ r: 3, fill: DIMENSION_META[key].hexColor }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ─── Pattern Insights ─── */}
      {insights && insights.bestImproving && (
        <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-800 p-6">
          <h4 className="font-semibold text-teal-900 dark:text-teal-200 text-sm mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Pattern Insights
          </h4>
          <ul className="space-y-2 text-sm text-teal-800 dark:text-teal-300">
            {insights.totalChange > 0 && (
              <li>
                Your overall score has improved {insights.totalChange} points
                since your first assessment.
              </li>
            )}
            {insights.totalChange === 0 && (
              <li>Your overall score has remained stable across assessments.</li>
            )}
            {insights.totalChange < 0 && (
              <li>
                Your score has decreased {Math.abs(insights.totalChange)} points.
                Consider exploring what may have changed.
              </li>
            )}
            {insights.bestDelta > 0 && (
              <li>
                <strong>{insights.bestImproving}</strong> is your most improved
                dimension (+{Math.round(insights.bestDelta)} points).
              </li>
            )}
            <li>
              Recommended: Retake in 2 weeks for the most meaningful comparison.
            </li>
          </ul>
        </div>
      )}

      {/* ─── History List ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">
          Assessment History
        </h3>
        <div className="space-y-3">
          {history.map((entry, i) => {
            const { tier } = getScoreLabel(entry.score);
            return (
              <div
                key={entry.id || i}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                  {entry.score}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {entry.date}
                  </p>
                  <TierBadge tier={tier} size="sm" />
                </div>
                {i === 0 && (
                  <span className="text-xs text-teal-500 font-medium">
                    Latest
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Milestones ─── */}
      <MilestoneRow milestones={milestones} />
    </motion.div>
  );
};

// ─── Milestone Row Component ────────────────────────────────────────

function MilestoneRow({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm flex items-center gap-2">
        <Award size={16} className="text-teal-500" />
        Milestones
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {milestones.map((m) => {
          const MIcon = m.icon;
          return (
            <div
              key={m.label}
              className={`rounded-xl p-4 text-center border transition-all ${
                m.earned
                  ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  m.earned
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                <MIcon size={18} />
              </div>
              <p
                className={`text-xs font-semibold ${
                  m.earned
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {m.label}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                {m.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryTab;
