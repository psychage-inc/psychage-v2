import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  AlertTriangle,
  Brain,
  HeartPulse,
  BookCheck,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { StepProps } from './types';

const GUIDELINES = [
  {
    icon: AlertTriangle,
    title: 'Crisis Content is Safety-Critical',
    description:
      'The Symptom Navigator tracks 106 symptoms across 45 conditions and automatically flags crisis signals. Content related to suicidal ideation, self-harm, and psychotic episodes must never be modified without clinical review.',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Brain,
    title: 'The Psychosis Packet',
    description:
      'The psychosis & schizophrenia category (/learn/psychosis) contains information about schizophrenia, schizoaffective disorder, and brief psychotic disorder. Changes to this content require careful consideration of how it may be interpreted by someone experiencing psychotic symptoms.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: HeartPulse,
    title: 'Trauma-Informed Language',
    description:
      'All platform content uses trauma-informed language. Avoid pathologizing language, stigmatizing terms, or content that could re-traumatize users. When in doubt, consult clinical guidelines.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: BookCheck,
    title: 'Evidence-Based Only',
    description:
      'Every condition description, coping strategy, and provider question is grounded in clinical evidence (DSM-5-TR, ICD-11). No pseudoscience, unverified treatments, or anecdotal claims.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
];

const ContentGuidelinesStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
          Content Guidelines
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Content on this platform can directly impact people in vulnerable
          mental states. Please read carefully.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        {GUIDELINES.map((guideline, index) => (
          <motion.div
            key={guideline.title}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                guideline.bg
              )}
            >
              <guideline.icon className={cn('w-5 h-5', guideline.color)} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary mb-1">
                {guideline.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {guideline.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Acknowledgment checkbox */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <label
          htmlFor="acknowledge-guidelines"
          className={cn(
            'flex items-start gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all',
            acknowledged
              ? 'border-teal-500 bg-teal-500/5'
              : 'border-amber-500/50 bg-amber-500/5 hover:border-amber-500'
          )}
        >
          <input
            type="checkbox"
            id="acknowledge-guidelines"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              'w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
              acknowledged
                ? 'border-teal-500 bg-teal-500'
                : 'border-gray-400 dark:border-gray-500'
            )}
          >
            {acknowledged && <Check size={14} className="text-white" />}
          </div>
          <span className="text-sm font-medium text-text-primary leading-relaxed">
            I understand that the content on this platform can affect
            people&apos;s decisions about their mental health care, and I commit
            to maintaining evidence-based, trauma-informed standards in all
            administrative actions.
          </span>
        </label>
      </motion.div>

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
          disabled={!acknowledged}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ContentGuidelinesStep;
