import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Clock, BarChart3, BookOpen } from 'lucide-react';
import type { DetectedPattern, Intervention } from '../types';
import { getTopInterventions } from '../interventions';
import { FRAMEWORKS } from '../frameworks';

interface ActionPlanV2Props {
  patterns: DetectedPattern[];
}

const DIFFICULTY_CONFIG: Record<
  Intervention['difficulty'],
  { label: string; color: string }
> = {
  easy: { label: 'Easy', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
  moderate: { label: 'Moderate', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  challenging: { label: 'Challenging', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
};

export const ActionPlanV2: React.FC<ActionPlanV2Props> = ({ patterns }) => {
  const interventions = getTopInterventions(patterns, 4);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (interventions.length === 0) return null;

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={20} className="text-text-tertiary" />
        <h2 className="font-display font-bold text-xl text-text-primary">
          Evidence-Based Action Plan
        </h2>
      </div>
      <p className="text-sm text-text-tertiary mb-6">
        Specific exercises from validated clinical frameworks, matched to your results
      </p>

      <div className="space-y-3">
        {interventions.map((intervention, i) => {
          const isExpanded = expandedId === intervention.id;
          const difficulty = DIFFICULTY_CONFIG[intervention.difficulty];
          const framework = FRAMEWORKS[intervention.frameworkRef];

          return (
            <div
              key={intervention.id}
              className="rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : intervention.id)}
                className="w-full p-4 text-left cursor-pointer hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-sm text-text-primary">
                        {intervention.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-tertiary leading-relaxed line-clamp-2">
                      {intervention.description}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-1"
                  >
                    <ChevronDown size={16} className="text-text-tertiary" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 ml-10">
                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-text-tertiary">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} />
                          {intervention.timeEstimate}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BarChart3 size={11} />
                          {difficulty.label} difficulty
                        </span>
                        {framework && (
                          <span className="inline-flex items-center gap-1">
                            <BookOpen size={11} />
                            {framework.shortName}
                          </span>
                        )}
                      </div>

                      {/* Steps */}
                      <ol className="space-y-2 mb-3">
                        {intervention.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-text-secondary">
                            <span className="text-primary font-bold shrink-0 mt-px w-4 text-right">
                              {j + 1}.
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Citation */}
                      <p className="text-[10px] text-text-tertiary italic leading-relaxed">
                        {intervention.citation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
