import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import type { ClarityScoreResult, DomainKey } from '@/lib/clarity/types';
import {
  DIMENSION_META,
  DIMENSION_ORDER,
  getDimensionTier,
} from '../data/dimensions';
import { DIMENSION_CONTENT } from '../data/results-content';
import TierBadge from './components/TierBadge';
import ScorePositionBar from './components/ScorePositionBar';

interface DimensionsTabProps {
  results: ClarityScoreResult;
  initialDimension?: DomainKey;
}

const DimensionsTab: React.FC<DimensionsTabProps> = ({
  results,
  initialDimension,
}) => {
  const [selected, setSelected] = useState<DomainKey>(
    initialDimension || 'emotional'
  );

  const meta = DIMENSION_META[selected];
  const Icon = meta.icon;
  const score = results.domainScores[selected];
  const tier = getDimensionTier(score);
  const content = DIMENSION_CONTENT[selected][tier];

  // Consultation guidance for individual dimension
  const getConsultationLevel = (s: number) => {
    if (s >= 12) return 'self-guided' as const;
    if (s >= 8) return 'guided' as const;
    return 'professional' as const;
  };
  const consultLevel = getConsultationLevel(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* ─── Dimension Selector ─── */}
      <div className="flex flex-wrap gap-2">
        {DIMENSION_ORDER.map((key) => {
          const m = DIMENSION_META[key];
          const DimIcon = m.icon;
          const isActive = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                isActive
                  ? `${m.tailwindBgLight} ${m.tailwindText} border-2 border-current`
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              aria-pressed={isActive}
            >
              <DimIcon size={16} />
              <span className="hidden sm:inline">{m.shortName}</span>
              <span className="sm:hidden">{m.shortName.substring(0, 4)}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Detail Panel ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 md:p-8 ${meta.tailwindBgLight}`}>
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.tailwindText} bg-white/70 dark:bg-gray-900/50`}
              >
                <Icon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  {meta.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {meta.instrument} — {meta.instrumentFull}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                  {Math.round(score)}
                  <span className="text-base text-gray-400 dark:text-gray-500">
                    /20
                  </span>
                </div>
                <TierBadge tier={tier} size="sm" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* What this measures */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                What This Measures
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {meta.description}
              </p>
            </div>

            {/* Score position */}
            <ScorePositionBar score={score} maxScore={20} tier={tier} />

            {/* Strengths */}
            {content.strengths && content.strengths.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    What's Going Well
                  </h4>
                </div>
                <div className="space-y-2">
                  {content.strengths.map((s, i) => (
                    <div
                      key={i}
                      className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-3 text-sm text-emerald-800 dark:text-emerald-300 border-l-3 border-emerald-400"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Concerns */}
            {content.concerns && content.concerns.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-amber-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Areas to Watch
                  </h4>
                </div>
                <div className="space-y-2">
                  {content.concerns.map((c, i) => (
                    <div
                      key={i}
                      className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300 border-l-3 border-amber-400"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-teal-500" />
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Recommended Next Steps
                </h4>
              </div>
              <div className="space-y-2">
                {content.actions.map((a, i) => (
                  <div
                    key={i}
                    className="bg-teal-50 dark:bg-teal-900/10 rounded-lg p-3 text-sm text-teal-800 dark:text-teal-300 border-l-3 border-teal-400"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Tool link */}
            {content.toolLink && (
              <Link
                to={content.toolLink.path}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${meta.tailwindBgLight} ${meta.tailwindText}`}>
                  <Icon size={16} />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {content.toolLink.label}
                </span>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors"
                />
              </Link>
            )}

            {/* Consultation guidance per dimension */}
            <div
              className={`rounded-xl p-5 border ${
                consultLevel === 'self-guided'
                  ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                  : consultLevel === 'guided'
                    ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
                    : 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
              }`}
            >
              <h4
                className={`font-semibold text-sm mb-1 ${
                  consultLevel === 'self-guided'
                    ? 'text-emerald-800 dark:text-emerald-300'
                    : consultLevel === 'guided'
                      ? 'text-amber-800 dark:text-amber-300'
                      : 'text-orange-800 dark:text-orange-300'
                }`}
              >
                {consultLevel === 'self-guided'
                  ? 'Keep Building on This Foundation'
                  : consultLevel === 'guided'
                    ? 'Consider Guided Support'
                    : 'Professional Consultation Recommended'}
              </h4>
              <p
                className={`text-sm ${
                  consultLevel === 'self-guided'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : consultLevel === 'guided'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-orange-700 dark:text-orange-400'
                }`}
              >
                {consultLevel === 'self-guided'
                  ? 'Your score suggests self-guided tools and habits are working well for this dimension. Keep it up.'
                  : consultLevel === 'guided'
                    ? 'Psychage tools can help, and speaking with a mental health professional is a smart next step if this area does not improve.'
                    : 'This is not a failure — reaching out for professional support is the most effective path to improvement in this area.'}
              </p>
              {consultLevel === 'professional' && (
                <Link
                  to="/find-care"
                  className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-orange-700 dark:text-orange-300 underline hover:no-underline"
                >
                  Find a Provider <ChevronRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DimensionsTab;
