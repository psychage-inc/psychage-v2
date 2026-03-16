import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  BookOpen,
  Brain,
  AlertTriangle,
  Compass,
  Check,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { StepProps } from './types';

const CHECKLIST_ITEMS = [
  {
    id: 'review-providers',
    icon: Users,
    label: 'Review pending provider applications',
    path: '/admin/providers',
  },
  {
    id: 'check-reports',
    icon: FileText,
    label: 'Check open user reports',
    path: '/admin/reports',
  },
  {
    id: 'browse-learn',
    icon: BookOpen,
    label: 'Browse the Learn section to familiarize yourself',
    path: '/learn',
  },
  {
    id: 'try-clarity',
    icon: Brain,
    label: 'Try the Clarity Score assessment',
    path: '/clarity-score',
  },
  {
    id: 'review-crisis',
    icon: AlertTriangle,
    label: 'Review the crisis resources page',
    path: '/crisis',
  },
  {
    id: 'explore-navigator',
    icon: Compass,
    label: 'Explore the Symptom Navigator',
    path: '/navigator',
  },
] as const;

const QuickStartStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
          Quick Start Checklist
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Suggested first steps to get oriented. You can tackle these anytime
          after setup.
        </p>
      </motion.div>

      <div className="space-y-3 mb-6">
        {CHECKLIST_ITEMS.map((item, index) => {
          const isChecked = !!checked[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className={cn(
                'flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all',
                isChecked
                  ? 'border-teal-500/50 bg-teal-500/5'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              )}
              onClick={() => toggleItem(item.id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
            >
              <div
                className={cn(
                  'w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                  isChecked
                    ? 'border-primary bg-primary'
                    : 'border-border-hover'
                )}
              >
                {isChecked && <Check size={14} className="text-white" />}
              </div>
              <item.icon
                className={cn(
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  isChecked ? 'text-teal-500' : 'text-text-tertiary'
                )}
              />
              <span
                className={cn(
                  'flex-1 text-sm font-medium transition-colors',
                  isChecked
                    ? 'text-teal-600 dark:text-teal-400 line-through'
                    : 'text-text-primary'
                )}
              >
                {item.label}
              </span>
              <ExternalLink className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-text-tertiary mb-8"
      >
        {checkedCount} of {CHECKLIST_ITEMS.length} checked &mdash; this is just
        for your reference, not required.
      </motion.p>

      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default QuickStartStep;
