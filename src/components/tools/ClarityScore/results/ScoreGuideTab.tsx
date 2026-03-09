import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Layers,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { ScoreTier } from '@/lib/clarity/types';
import { TIER_DESCRIPTIONS } from '../data/results-content';
import { DIMENSION_META, DIMENSION_ORDER } from '../data/dimensions';
import TierBadge from './components/TierBadge';

interface ScoreGuideTabProps {
  currentTier?: ScoreTier;
}

const TIER_ORDER: ScoreTier[] = [
  'thriving',
  'balanced',
  'struggling',
  'distressed',
  'crisis',
];

const INSTRUMENTS = [
  {
    badge: 'PHQ-4',
    name: 'Patient Health Questionnaire-4',
    measures: 'Screens for depression and anxiety symptoms. Four items covering feeling down, loss of interest, nervousness, and uncontrollable worry.',
    dimension: 'Emotional Wellness',
    dimensionKey: 'emotional' as const,
  },
  {
    badge: 'WHO-5',
    name: 'World Health Organization Well-Being Index',
    measures: 'Measures general subjective well-being across five items: cheerfulness, calm, energy, rest quality, and daily interest.',
    dimension: 'Cognitive Clarity',
    dimensionKey: 'vitality' as const,
  },
  {
    badge: 'UCLA-3',
    name: 'UCLA 3-Item Loneliness Scale',
    measures: 'Assesses perceived loneliness through three items about companionship, feeling left out, and isolation.',
    dimension: 'Social Connection',
    dimensionKey: 'social' as const,
  },
  {
    badge: 'PSS-4',
    name: 'Perceived Stress Scale (4-Item)',
    measures: 'Evaluates perceived stress levels, sense of control, confidence in problem-solving, and whether difficulties feel manageable.',
    dimension: 'Physical Vitality',
    dimensionKey: 'cognitive' as const,
  },
];

const ScoreGuideTab: React.FC<ScoreGuideTabProps> = ({ currentTier }) => {
  const [expandedTier, setExpandedTier] = useState<ScoreTier | null>(
    currentTier || null
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* ─── Understanding Your Clarity Score ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BookOpen size={20} className="text-teal-500" />
          Understanding Your Clarity Score
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: ClipboardList,
              title: '20 Questions',
              desc: 'Covering five wellness dimensions',
            },
            {
              icon: Layers,
              title: '0–100 Scale',
              desc: 'Sum of five dimension sub-scores',
            },
            {
              icon: Award,
              title: '5 Dimensions',
              desc: 'Emotional, cognitive, social, physical, functioning',
            },
            {
              icon: BookOpen,
              title: '4 Instruments',
              desc: 'PHQ-4, WHO-5, UCLA-3, PSS-4',
            },
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-3 text-teal-600 dark:text-teal-400">
                  <ItemIcon size={18} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── How Scoring Works ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-4">
          How Scoring Works
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Each of the 20 questions uses a validated scale appropriate to its
          instrument. Your responses map to five wellness dimensions, each
          producing a sub-score from 0 to 20. The composite Clarity Score is the
          sum of all five dimension scores, giving a range of 0 to 100. Higher
          scores indicate greater overall wellness.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {DIMENSION_ORDER.map((key, i) => {
            const m = DIMENSION_META[key];
            const DimIcon = m.icon;
            return (
              <React.Fragment key={key}>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${m.tailwindBgLight}`}>
                  <DimIcon size={14} className={m.tailwindText} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {m.shortName}
                  </span>
                  <span className="text-xs text-gray-400">0–20</span>
                </div>
                {i < DIMENSION_ORDER.length - 1 && (
                  <span className="text-gray-300 dark:text-gray-600 text-lg font-light">
                    +
                  </span>
                )}
              </React.Fragment>
            );
          })}
          <span className="text-gray-300 dark:text-gray-600 text-lg font-light">
            =
          </span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900">
            <span className="text-xs font-bold">Clarity Score 0–100</span>
          </div>
        </div>
      </div>

      {/* ─── Score Tiers Explained ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6">
          Score Tiers Explained
        </h3>

        <div className="space-y-3">
          {TIER_ORDER.map((tierKey) => {
            const td = TIER_DESCRIPTIONS[tierKey];
            const isExpanded = expandedTier === tierKey;
            const isCurrent = tierKey === currentTier;

            return (
              <div
                key={tierKey}
                className={`rounded-xl border overflow-hidden transition-colors ${
                  isCurrent
                    ? 'border-teal-300 dark:border-teal-700 ring-1 ring-teal-200 dark:ring-teal-800'
                    : 'border-gray-100 dark:border-gray-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedTier(isExpanded ? null : tierKey)
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <TierBadge tier={tierKey} size="md" />
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {td.range}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-full">
                        Your tier
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={18} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {td.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-3">
                          <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                            What's Working
                          </h5>
                          <p className="text-xs text-emerald-600 dark:text-emerald-300">
                            {td.whatsWorking}
                          </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3">
                          <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                            Watch For
                          </h5>
                          <p className="text-xs text-amber-600 dark:text-amber-300">
                            {td.watchFor}
                          </p>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-900/10 rounded-lg p-3">
                          <h5 className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">
                            Professional Guidance
                          </h5>
                          <p className="text-xs text-teal-600 dark:text-teal-300">
                            {td.professionalGuidance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Validated Instruments ─── */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6">
          Validated Instruments
        </h3>

        <div className="space-y-4">
          {INSTRUMENTS.map((inst) => {
            const m = DIMENSION_META[inst.dimensionKey];
            const DimIcon = m.icon;
            return (
              <div
                key={inst.badge}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${m.tailwindBgLight} ${m.tailwindText}`}>
                  <DimIcon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {inst.badge}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {inst.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {inst.measures}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Maps to: <strong>{inst.dimension}</strong>
                  </p>
                </div>
              </div>
            );
          })}

          {/* Custom domain note */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
              <DIMENSION_META.functioning.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  Custom
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  WHODAS-adapted Daily Functioning Items
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Four items adapted from the WHO Disability Assessment Schedule measuring symptom interference, relationship difficulty, responsibility management, and mental-physical health connection.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Maps to: <strong>Daily Functioning</strong>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 leading-relaxed">
          All instrument selection and scoring methodology reviewed and approved
          by Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology.
        </p>
      </div>

    </motion.div>
  );
};

export default ScoreGuideTab;
