import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import type {
  ClarityScoreResult,
  Recommendation,
  DomainKey,
} from '@/lib/clarity/types';
import { getStrengthsAndGrowthDetailed } from '@/lib/clarity/scoring';
import Button from '@/components/ui/Button';
import ScoreGauge from './components/ScoreGauge';
import DimensionRadar from './components/DimensionRadar';
import DimensionBar from './components/DimensionBar';
import ConsultationGuidance from './components/ConsultationGuidance';
import { DIMENSION_ORDER } from '../data/dimensions';
import { DIMENSION_META } from '../data/dimensions';
import { TIER_DESCRIPTIONS } from '../data/results-content';

interface OverviewTabProps {
  results: ClarityScoreResult;
  recommendations: Recommendation[];
  onNavigateToDimension: (key: DomainKey) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  results,
  recommendations,
  onNavigateToDimension,
}) => {
  const detailedInsights = getStrengthsAndGrowthDetailed(results.domainScores);
  const tierDesc = TIER_DESCRIPTIONS[results.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* ─── Score Gauge + Radar ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-8 flex flex-col items-center justify-center">
          <ScoreGauge
            score={results.totalScore}
            tier={results.tier}
            label={results.label}
          />
          {/* Supplementary info */}
          <div className="mt-6 w-full grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-neutral-800 pt-5">
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-0.5">
                Score Range
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {tierDesc.range}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-0.5">
                Strongest Area
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {detailedInsights.strengths[0]?.name}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-0.5">
                Needs Attention
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {detailedInsights.growthAreas[0]?.name}
              </p>
            </div>
            {results.structuredFlags && results.structuredFlags.length > 0 && (
              <div className="text-center">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-0.5">
                  Clinical Flags
                </p>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {results.structuredFlags.length} flagged
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Dimension Profile
          </h3>
          <DimensionRadar
            domainScores={results.domainScores}
            onDimensionClick={onNavigateToDimension}
          />
        </div>
      </div>

      {/* ─── Dimension Bars ─── */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 md:p-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
          Dimension Breakdown
        </h3>
        <div className="space-y-4">
          {DIMENSION_ORDER.map((key, i) => (
            <DimensionBar
              key={key}
              dimensionKey={key}
              score={results.domainScores[key]}
              delay={i * 0.1}
              showTier
              onClick={() => onNavigateToDimension(key)}
            />
          ))}
        </div>
      </div>

      {/* ─── Strengths & Growth Areas ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={15} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Core Strengths
            </h3>
          </div>
          <div className="space-y-3">
            {detailedInsights.strengths.map((s) => {
              const DimIcon = DIMENSION_META[s.key].icon;
              return (
                <div
                  key={s.key}
                  className="rounded-xl p-4 border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DimIcon
                      size={14}
                      className={DIMENSION_META[s.key].tailwindText}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {s.name}
                    </span>
                    <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-neutral-400">
                      {Math.round(s.score)}/20
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                    {s.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <TrendingUp size={15} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Growth Opportunities
            </h3>
          </div>
          <div className="space-y-3">
            {detailedInsights.growthAreas.map((g) => {
              const DimIcon = DIMENSION_META[g.key].icon;
              return (
                <div
                  key={g.key}
                  className="rounded-xl p-4 border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DimIcon
                      size={14}
                      className={DIMENSION_META[g.key].tailwindText}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {g.name}
                    </span>
                    <span className="ml-auto text-xs font-semibold text-gray-500 dark:text-neutral-400">
                      {Math.round(g.score)}/20
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
                    {g.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Next Steps ─── */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 md:p-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
          Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700 p-5 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors">
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-2">
              Monitor
            </p>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
              Track Over Time
            </h4>
            <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
              Retake in 2 weeks to see how your wellness changes
            </p>
          </div>

          <Link
            to="/learn"
            className="rounded-xl border border-gray-200 dark:border-neutral-700 p-5 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors group"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-2">
              Learn
            </p>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200">
              Explore Articles
            </h4>
            <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
              Content matched to your growth areas
            </p>
          </Link>

          <Link
            to="/providers"
            className="rounded-xl border border-gray-200 dark:border-neutral-700 p-5 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors group"
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-neutral-500 mb-2">
              Connect
            </p>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200">
              Find a Provider
            </h4>
            <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
              Directory by location and specialty
            </p>
          </Link>
        </div>
      </div>

      {/* ─── Recommendations ─── */}
      {recommendations.length > 0 && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-neutral-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
            Recommended Actions
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-xl p-5 border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400 flex items-center justify-center text-xs font-medium">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">
                    {rec.text}
                  </p>
                </div>
                <Link to={rec.link} className="flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 border-none text-xs"
                  >
                    {rec.linkLabel}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Clinical Indicators ─── */}
      {results.structuredFlags && results.structuredFlags.length > 0 && (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={16}
                className="text-amber-500 dark:text-amber-400"
              />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Clinical Indicators
              </h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
            {results.structuredFlags.map((flag, i) => (
              <div
                key={i}
                className="px-6 py-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      flag.severity === 'significant'
                        ? 'bg-orange-500'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-sm text-gray-600 dark:text-neutral-300">
                    {flag.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {flag.result}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-neutral-800/50">
            <p className="text-xs text-gray-400 dark:text-neutral-500">
              Derived from validated screening instruments. These are indicators, not diagnoses.
            </p>
          </div>
        </div>
      )}

      {/* ─── Consultation Guidance ─── */}
      <ConsultationGuidance
        tier={results.tier}
        score={results.totalScore}
        flags={results.flags}
      />
    </motion.div>
  );
};

export default OverviewTab;
