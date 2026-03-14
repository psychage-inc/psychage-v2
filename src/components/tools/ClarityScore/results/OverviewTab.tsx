import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  BarChart2,
  BookOpen,
  HeartHandshake,
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
      className="space-y-6"
    >
      {/* ─── Score Gauge + Radar ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 flex flex-col items-center justify-center relative">
          <ScoreGauge
            score={results.totalScore}
            tier={results.tier}
            label={results.label}
          />
          {/* Supplementary info */}
          <div className="mt-5 w-full grid grid-cols-2 gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Score Range
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {tierDesc.range}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Strongest
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {detailedInsights.strengths[0]?.name}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Needs Attention
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {detailedInsights.growthAreas[0]?.name}
              </p>
            </div>
            {results.structuredFlags && results.structuredFlags.length > 0 && (
              <div className="text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Clinical Flags
                </p>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {results.structuredFlags.length} flagged
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm flex items-center gap-2">
            <BarChart2 size={16} className="text-teal-500" />
            Dimension Profile
          </h3>
          <DimensionRadar
            domainScores={results.domainScores}
            onDimensionClick={onNavigateToDimension}
          />
        </div>
      </div>

      {/* ─── Dimension Bars ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart2 size={20} className="text-teal-500" />
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Core Strengths
            </h3>
          </div>
          <div className="space-y-3">
            {detailedInsights.strengths.map((s) => {
              const DimIcon = DIMENSION_META[s.key].icon;
              return (
                <div
                  key={s.key}
                  className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DimIcon
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {s.name}
                    </span>
                    <span className="ml-auto text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {Math.round(s.score)}/20
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {s.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Areas */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <TrendingUp size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Growth Opportunities
            </h3>
          </div>
          <div className="space-y-3">
            {detailedInsights.growthAreas.map((g) => {
              const DimIcon = DIMENSION_META[g.key].icon;
              return (
                <div
                  key={g.key}
                  className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-800"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <DimIcon
                      size={16}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {g.name}
                    </span>
                    <span className="ml-auto text-sm font-bold text-amber-600 dark:text-amber-400">
                      {Math.round(g.score)}/20
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {g.insight}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── What Happens Next ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ArrowRight size={20} className="text-teal-500" />
          What Happens Next
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-teal-100 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10 p-5 text-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-3 text-teal-600 dark:text-teal-400">
              <BarChart2 size={20} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
              Track Over Time
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Retake in 2 weeks to see how your wellness changes
            </p>
          </div>

          <Link
            to="/learn"
            className="rounded-xl border border-indigo-100 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 p-5 text-center hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-3 text-indigo-600 dark:text-indigo-400">
              <BookOpen size={20} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
              Explore Content
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Articles matched to your growth areas
            </p>
          </Link>

          <Link
            to="/providers"
            className="rounded-xl border border-pink-100 dark:border-pink-800 bg-pink-50/50 dark:bg-pink-900/10 p-5 text-center hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-3 text-pink-600 dark:text-pink-400">
              <HeartHandshake size={20} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
              Find Support
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Provider directory by location and specialty
            </p>
          </Link>
        </div>
      </div>

      {/* ─── Recommendations ─── */}
      {recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <ArrowRight size={20} className="text-teal-500" />
            What You Can Do
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-5 border border-teal-100 dark:border-teal-800"
              >
                <p className="text-sm font-medium text-teal-900 dark:text-teal-200 mb-3">
                  {rec.text}
                </p>
                <Link to={rec.link}>
                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700 text-white border-none"
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <AlertTriangle
                size={18}
                className="text-amber-600 dark:text-amber-400"
              />
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                Clinical Indicators
              </h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {results.structuredFlags.map((flag, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      flag.severity === 'significant'
                        ? 'bg-orange-500'
                        : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {flag.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {flag.result}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              These indicators are derived from validated screening instruments.
              They are not diagnoses.
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
