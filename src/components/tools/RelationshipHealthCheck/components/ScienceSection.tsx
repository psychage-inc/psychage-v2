import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ChevronDown, ExternalLink } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full p-6 text-left cursor-pointer hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical size={20} className="text-violet-600" />
            <div>
              <h2 className="font-display font-bold text-lg text-gray-900">
                Understanding the Science
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                The research frameworks behind your assessment
              </p>
            </div>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-gray-400" />
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
                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
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
    <div className="rounded-xl bg-gradient-to-br from-violet-50 to-slate-50 border border-violet-100/50 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold text-sm text-gray-900">{framework.name}</h4>
          <p className="text-[11px] text-gray-400">
            {framework.authors} ({framework.year})
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed mb-2">
        {framework.description}
      </p>
      <div className="bg-white/60 rounded-lg p-2.5">
        <p className="text-[11px] text-violet-700 leading-relaxed">
          <strong>Key insight:</strong> {framework.keyInsight}
        </p>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 italic">{framework.citation}</p>
    </div>
  );
}
