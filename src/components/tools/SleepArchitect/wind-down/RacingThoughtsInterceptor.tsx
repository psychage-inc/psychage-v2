/**
 * Racing Thoughts Interceptor — Capture, process, and release pre-sleep worries.
 * Includes crisis detection for free-text input (NON-NEGOTIABLE).
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Plus,
  Check,
  X,
  ChevronRight,
  Briefcase,
  Heart,
  Activity,
  DollarSign,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { detectCrisisContent } from '@/lib/sleep/calculations';
import { THOUGHT_CATEGORIES } from '@/lib/sleep/constants';
import type { CapturedThought, ThoughtCategory } from '@/lib/sleep/types';
import CrisisAlert from '../shared/CrisisAlert';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={14} />,
  Heart: <Heart size={14} />,
  Activity: <Activity size={14} />,
  DollarSign: <DollarSign size={14} />,
  Calendar: <Calendar size={14} />,
  MoreHorizontal: <MoreHorizontal size={14} />,
};

type Phase = 'capture' | 'process' | 'release';

const RacingThoughtsInterceptor: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('capture');
  const [thoughts, setThoughts] = useState<CapturedThought[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentCategory, setCurrentCategory] = useState<ThoughtCategory>('other');
  const [processingIdx, setProcessingIdx] = useState(0);
  const [showCrisis, setShowCrisis] = useState(false);

  // Crisis detection
  useEffect(() => {
    if (currentText.length > 10) {
      setShowCrisis(detectCrisisContent(currentText));
    } else {
      setShowCrisis(false);
    }
  }, [currentText]);

  const addThought = useCallback(() => {
    if (currentText.trim().length === 0) return;
    const thought: CapturedThought = {
      id: crypto.randomUUID(),
      text: currentText.trim(),
      category: currentCategory,
      actionable: false,
      created_at: new Date().toISOString(),
    };
    setThoughts((prev) => [...prev, thought]);
    setCurrentText('');
    setCurrentCategory('other');
  }, [currentText, currentCategory]);

  const updateThought = useCallback(
    (id: string, updates: Partial<CapturedThought>) => {
      setThoughts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    []
  );

  const currentThought = thoughts[processingIdx];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-5">
        <Brain size={20} className="text-purple-500" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
          Racing Thoughts
        </h3>
      </div>

      {/* Phase: Capture */}
      {phase === 'capture' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-neutral-400">
            What's keeping you up right now? Capture each thought, then we'll
            process them one by one.
          </p>

          {showCrisis && (
            <CrisisAlert onDismiss={() => setShowCrisis(false)} />
          )}

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {THOUGHT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCurrentCategory(cat.id)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border',
                  currentCategory === cat.id
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-neutral-600 text-gray-400 dark:text-neutral-500 hover:border-gray-300'
                )}
              >
                {CATEGORY_ICONS[cat.icon]}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addThought();
              }}
              placeholder="Type a thought..."
              className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              type="button"
              onClick={addThought}
              disabled={currentText.trim().length === 0}
              className="p-3 bg-purple-600 dark:bg-purple-500 text-white rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Captured thoughts list */}
          {thoughts.length > 0 && (
            <div className="space-y-1.5">
              {thoughts.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-700/50 rounded-lg p-2.5 text-xs"
                >
                  <span className="text-gray-400">
                    {CATEGORY_ICONS[
                      THOUGHT_CATEGORIES.find((c) => c.id === t.category)
                        ?.icon || 'MoreHorizontal'
                    ]}
                  </span>
                  <span className="text-gray-700 dark:text-neutral-300 flex-1">
                    {t.text}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setThoughts((prev) =>
                        prev.filter((th) => th.id !== t.id)
                      )
                    }
                    className="text-gray-300 dark:text-neutral-600 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {thoughts.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setPhase('process');
                setProcessingIdx(0);
              }}
              className="w-full py-2.5 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Process Thoughts
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* Phase: Process */}
      {phase === 'process' && currentThought && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentThought.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                Thought {processingIdx + 1} of {thoughts.length}
              </div>
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                "{currentThought.text}"
              </p>
            </div>

            <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
              Can you do anything about this right now?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  updateThought(currentThought.id, { actionable: false });
                  if (processingIdx + 1 >= thoughts.length) {
                    setPhase('release');
                  } else {
                    setProcessingIdx((prev) => prev + 1);
                  }
                }}
                className="p-3 rounded-xl border border-gray-200 dark:border-neutral-600 text-sm font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                No — let it go for tonight
              </button>
              <button
                type="button"
                onClick={() => {
                  updateThought(currentThought.id, { actionable: true });
                }}
                className="p-3 rounded-xl border border-purple-200 dark:border-purple-700 text-sm font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                Yes — write a next step
              </button>
            </div>

            {currentThought.actionable && (
              <div>
                <input
                  type="text"
                  value={currentThought.next_step || ''}
                  onChange={(e) =>
                    updateThought(currentThought.id, {
                      next_step: e.target.value,
                    })
                  }
                  placeholder="One next step for tomorrow..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (processingIdx + 1 >= thoughts.length) {
                      setPhase('release');
                    } else {
                      setProcessingIdx((prev) => prev + 1);
                    }
                  }}
                  className="mt-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Next thought →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Phase: Release */}
      {phase === 'release' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-3xl mb-3">🌙</div>
          <h4 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
            Thoughts acknowledged
          </h4>
          <p className="text-sm text-gray-500 dark:text-neutral-400 max-w-sm mx-auto mb-4">
            You've acknowledged {thoughts.length} thought
            {thoughts.length !== 1 ? 's' : ''}. They're safe and waiting for
            you tomorrow. Now breathe.
          </p>
          <button
            type="button"
            onClick={() => {
              setPhase('capture');
              setThoughts([]);
              setProcessingIdx(0);
            }}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Start over
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RacingThoughtsInterceptor;
