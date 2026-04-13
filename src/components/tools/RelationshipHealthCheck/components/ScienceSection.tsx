import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ChevronDown } from 'lucide-react';
import type { DetectedPattern, FrameworkKey } from '../types';
import { FRAMEWORKS, getRelevantFrameworks } from '../frameworks';
import type { FrameworkInfo } from '../frameworks';

interface ScienceSectionProps {
  patterns: DetectedPattern[];
}

function collectFrameworkRefs(patterns: DetectedPattern[]): FrameworkKey[] {
  const refs: FrameworkKey[] = [];
  for (const p of patterns) {
    refs.push(p.frameworkRef);
  }
  // Always include these core frameworks
  if (!refs.includes('gottman_srh')) refs.push('gottman_srh');
  if (!refs.includes('eft_are')) refs.push('eft_are');
  if (!refs.includes('general_social')) refs.push('general_social');
  return refs;
}

export const ScienceSection: React.FC<ScienceSectionProps> = ({ patterns }) => {
  const [expanded, setExpanded] = useState(false);
  const refs = collectFrameworkRefs(patterns);
  const frameworks = getRelevantFrameworks(refs, 4);

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full p-6 text-left cursor-pointer hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical size={20} className="text-text-tertiary" />
            <div>
              <h2 className="font-display font-bold text-lg text-text-primary">
                Understanding the Science
              </h2>
              <p className="text-xs text-text-tertiary mt-0.5">
                The research frameworks behind your assessment
              </p>
            </div>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-text-tertiary" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3">
              {frameworks.map((fw) => (
                <FrameworkCard key={fw.key} framework={fw} />
              ))}

              <div className="pt-2">
                <p className="text-[11px] text-text-tertiary text-center leading-relaxed">
                  This assessment draws on {Object.keys(FRAMEWORKS).length} validated clinical
                  frameworks spanning 40+ years of longitudinal research and data from 11,000+
                  couples. It is designed for educational insight, not clinical diagnosis.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function FrameworkCard({ framework }: { framework: FrameworkInfo }) {
  return (
    <div className="rounded-xl bg-surface-hover border border-border p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-sm text-text-primary">{framework.name}</h4>
          <p className="text-[11px] text-text-tertiary">
            {framework.authors} ({framework.year})
          </p>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed mb-2">
        {framework.description}
      </p>
      <div className="bg-surface rounded-lg p-2.5 border border-border">
        <p className="text-[11px] text-text-secondary leading-relaxed">
          <strong>Key insight:</strong> {framework.keyInsight}
        </p>
      </div>
      <p className="text-[10px] text-text-tertiary mt-2 italic">{framework.citation}</p>
    </div>
  );
}
