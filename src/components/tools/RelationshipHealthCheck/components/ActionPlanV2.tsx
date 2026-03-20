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
  easy: { label: 'Easy', color: 'bg-emerald-100 text-emerald-700' },
  moderate: { label: 'Moderate', color: 'bg-amber-100 text-amber-700' },
  challenging: { label: 'Challenging', color: 'bg-rose-100 text-rose-700' },
};

export const ActionPlanV2: React.FC<ActionPlanV2Props> = ({ patterns }) => {
  const interventions = getTopInterventions(patterns, 4);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (interventions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={20} className="text-teal-600" />
        <h2 className="font-display font-bold text-xl text-gray-900">
          Evidence-Based Action Plan
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">
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
              className="rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : intervention.id)}
                className="w-full p-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-700 font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-bold text-sm text-gray-900">
                        {intervention.title}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {intervention.description}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-1"
                  >
                    <ChevronDown size={16} className="text-gray-400" />
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
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] text-gray-400">
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
                          <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-teal-500 font-bold shrink-0 mt-px w-4 text-right">
                              {j + 1}.
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Citation */}
                      <p className="text-[10px] text-gray-400 italic leading-relaxed">
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
