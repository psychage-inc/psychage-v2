/**
 * Sleep Hygiene Audit — Interactive accordion checklist with scoring.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Clock,
  Coffee,
  Moon,
  Sun,
  Brain,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HYGIENE_CATEGORIES } from '@/lib/sleep/constants';

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home size={18} />,
  Clock: <Clock size={18} />,
  Coffee: <Coffee size={18} />,
  Moon: <Moon size={18} />,
  Sun: <Sun size={18} />,
  Brain: <Brain size={18} />,
};

const STORAGE_KEY = 'psychage_sleep_hygiene';

const HygieneAudit: React.FC = () => {
  const [checked, setChecked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch { /* ignore */ }
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const totalItems = HYGIENE_CATEGORIES.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const totalChecked = checked.length;
  const overallScore =
    totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Sleep Hygiene Audit
          </h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">
            Evidence-based habits for better sleep
          </p>
        </div>
        <div className="text-center">
          <div
            className={cn(
              'text-2xl font-display font-bold',
              overallScore >= 80
                ? 'text-emerald-600 dark:text-emerald-400'
                : overallScore >= 50
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-red-600 dark:text-red-400'
            )}
          >
            {overallScore}%
          </div>
          <div className="text-[10px] text-gray-400 dark:text-neutral-500">
            {totalChecked}/{totalItems}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {HYGIENE_CATEGORIES.map((cat) => {
          const catChecked = cat.items.filter((item) =>
            checked.includes(item.id)
          ).length;
          const isExpanded = expanded === cat.id;

          return (
            <div
              key={cat.id}
              className="border border-gray-100 dark:border-neutral-700 rounded-xl overflow-hidden"
            >
              {/* Category header */}
              <button
                type="button"
                onClick={() =>
                  setExpanded(isExpanded ? null : cat.id)
                }
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-2.5">
                  <div className="text-indigo-500 dark:text-indigo-400">
                    {ICON_MAP[cat.icon] || <Home size={18} />}
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {cat.title}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 dark:text-neutral-500">
                    {catChecked}/{cat.items.length}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-gray-400 transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              </button>

              {/* Items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-2 pt-0 space-y-1">
                      {cat.items.map((item) => {
                        const isChecked = checked.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggle(item.id)}
                            className={cn(
                              'w-full flex items-start gap-2.5 p-2.5 rounded-lg transition-all text-left text-xs',
                              isChecked
                                ? 'bg-emerald-50 dark:bg-emerald-900/20'
                                : 'hover:bg-gray-50 dark:hover:bg-neutral-700/30'
                            )}
                            role="checkbox"
                            aria-checked={isChecked}
                          >
                            <div
                              className={cn(
                                'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                                isChecked
                                  ? 'border-emerald-500 bg-emerald-500'
                                  : 'border-gray-300 dark:border-neutral-500'
                              )}
                            >
                              {isChecked && (
                                <CheckCircle2 size={10} className="text-white" />
                              )}
                            </div>
                            <span
                              className={cn(
                                'leading-relaxed',
                                isChecked
                                  ? 'text-gray-700 dark:text-neutral-300'
                                  : 'text-gray-500 dark:text-neutral-400'
                              )}
                            >
                              {item.label}
                            </span>
                            {item.priority === 'high' && !isChecked && (
                              <AlertCircle
                                size={12}
                                className="text-amber-400 flex-shrink-0 mt-0.5 ml-auto"
                                aria-label="High priority"
                              />
                            )}
                          </button>
                        );
                      })}
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

export default HygieneAudit;
