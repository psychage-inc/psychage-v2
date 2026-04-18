/**
 * CBT-I Educational Cards — Scrollable card carousel with expand/collapse.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CBTI_EDUCATION_CARDS } from '@/lib/sleep/constants';

const CBTICards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-[2rem] p-6 shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-neutral-700">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen size={20} className="text-teal-500" />
        <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
          Sleep Science
        </h3>
      </div>

      <div className="space-y-3">
        {CBTI_EDUCATION_CARDS.map((card) => {
          const isExpanded = expandedId === card.id;
          return (
            <div
              key={card.id}
              className="border border-gray-100 dark:border-neutral-700 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : card.id)}
                className="w-full p-4 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="pr-3">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {card.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                    {card.summary}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp size={16} className="text-gray-400 dark:text-neutral-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 dark:text-neutral-500 flex-shrink-0 mt-0.5" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 border border-teal-100 dark:border-teal-800">
                        <div className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                          Technique
                        </div>
                        <p className="text-xs text-gray-700 dark:text-neutral-300 leading-relaxed">
                          {card.technique}
                        </p>
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-neutral-500">
                        Source: {card.source}
                      </div>
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

export default CBTICards;
