import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface MythVsFactBlockProps {
  myth: string;
  fact: string;
  source?: string;
  className?: string;
}

/**
 * MythVsFactBlock — Split card showing myth (red) vs. fact (green)
 * Used in myth-buster articles and educational content to clarify misconceptions
 */
export const MythVsFactBlock: React.FC<MythVsFactBlockProps> = ({
  myth,
  fact,
  source,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`not-prose my-8 scroll-mt-32 ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Myth Side */}
        <div className="relative bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/30 rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-200 dark:bg-red-900/40 flex items-center justify-center">
                <X size={18} className="text-red-600 dark:text-red-400" strokeWidth={3} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                Myth
              </span>
            </div>
            <p className="text-base leading-relaxed text-red-900/90 dark:text-red-100/90 font-medium">
              {myth}
            </p>
          </div>
        </div>

        {/* Fact Side */}
        <div className="relative bg-teal-50 dark:bg-teal-950/20 border-2 border-teal-200 dark:border-teal-900/30 rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 dark:bg-teal-900/20 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-teal-200 dark:bg-teal-900/40 flex items-center justify-center">
                <CheckCircle size={18} className="text-teal-600 dark:text-teal-400" strokeWidth={3} />
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Fact
              </span>
            </div>
            <p className="text-base leading-relaxed text-teal-900/90 dark:text-teal-100/90 font-medium">
              {fact}
            </p>
          </div>
        </div>
      </div>

      {/* Source Citation */}
      {source && (
        <p className="text-sm text-text-tertiary mt-3 text-center italic">
          Source: {source}
        </p>
      )}
    </motion.div>
  );
};

export default MythVsFactBlock;
