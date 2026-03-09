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
import Button from '@/components/ui/Button';
import ScoreGauge from './components/ScoreGauge';
import DimensionRadar from './components/DimensionRadar';
import DimensionBar from './components/DimensionBar';
import ConsultationGuidance from './components/ConsultationGuidance';
import { DIMENSION_ORDER } from '../data/dimensions';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* ─── Score Gauge + Radar ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 flex items-center justify-center relative">
          <ScoreGauge
            score={results.totalScore}
            tier={results.tier}
            label={results.label}
          />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm flex items-center gap-2">
            <BarChart2 size={16} className="text-teal-500" />
            Dimension Profile
          </h3>
          <DimensionRadar domainScores={results.domainScores} />
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Core Strengths
            </h3>
          </div>
          {results.strengths.length > 0 ? (
            <ul className="space-y-3">
              {results.strengths.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>
                    Your <strong>{s}</strong> is a source of strength
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep going — strengths will emerge as you build habits.
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <TrendingUp size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Growth Opportunities
            </h3>
          </div>
          {results.growthAreas.length > 0 ? (
            <ul className="space-y-3">
              {results.growthAreas.map((g, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>
                    Your <strong>{g}</strong> could use some attention
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Great — no major areas of concern right now.
            </p>
          )}
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
            to="/find-care"
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

      {/* ─── Clinical Flags ─── */}
      {results.flags.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle
              size={18}
              className="text-amber-600 dark:text-amber-400"
            />
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
              Clinical Indicators
            </h3>
          </div>
          <ul className="space-y-1.5">
            {results.flags.map((flag, i) => (
              <li
                key={i}
                className="text-sm text-amber-800 dark:text-amber-300"
              >
                {flag}
              </li>
            ))}
          </ul>
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
