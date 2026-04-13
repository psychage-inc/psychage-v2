import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';

interface RelationshipBlueprintProps {
  blueprint: string;
}

export const RelationshipBlueprint: React.FC<RelationshipBlueprintProps> = ({
  blueprint,
}) => {
  const [expanded, setExpanded] = useState(true);
  const paragraphs = blueprint.split('\n\n').filter(Boolean);

  if (!blueprint) return null;

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full p-6 pb-0 text-left cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-text-tertiary" />
            <h2 className="font-display font-bold text-xl text-text-primary">
              Your Relationship Blueprint
            </h2>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-text-tertiary" />
          </motion.div>
        </div>
        <p className="text-sm text-text-tertiary mb-4">
          A personalized narrative synthesizing your assessment results
        </p>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="bg-surface-hover rounded-xl p-6 border border-border">
                <div className="space-y-4">
                  {paragraphs.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-text-secondary leading-relaxed"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-text-tertiary mt-3 text-center">
                Generated from your responses using evidence-based relationship science frameworks
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
