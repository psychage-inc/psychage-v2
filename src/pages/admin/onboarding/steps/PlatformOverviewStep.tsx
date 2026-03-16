import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Wrench,
  Bot,
  Users,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import InteractiveCard from '@/components/ui/InteractiveCard';
import type { StepProps } from './types';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: '45 mental health conditions across mood, anxiety, trauma, personality, OCD, and psychosis categories.',
    color: 'from-blue-500 to-indigo-600',
    spotlight: 'rgba(99, 102, 241, 0.1)',
  },
  {
    icon: Wrench,
    title: 'Tools',
    description: 'Mood Journal, Sleep Architect, Clarity Score, Symptom Navigator, Relationship Health Check, and Clarity Journal.',
    color: 'from-teal-500 to-emerald-600',
    spotlight: 'rgba(20, 184, 166, 0.1)',
  },
  {
    icon: Bot,
    title: 'MindMate AI',
    description: 'AI-powered chatbot providing evidence-based mental health guidance and coping strategies.',
    color: 'from-purple-500 to-violet-600',
    spotlight: 'rgba(139, 92, 246, 0.1)',
  },
  {
    icon: Users,
    title: 'Provider Directory',
    description: 'Verified mental health providers with NPI verification, specialty matching, and telehealth options.',
    color: 'from-amber-500 to-orange-600',
    spotlight: 'rgba(245, 158, 11, 0.1)',
  },
  {
    icon: AlertTriangle,
    title: 'Crisis Resources',
    description: '29 crisis resources for immediate safety including hotlines, text lines, and emergency services.',
    color: 'from-rose-500 to-red-600',
    spotlight: 'rgba(244, 63, 94, 0.1)',
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const PlatformOverviewStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
          What You&apos;re Managing
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Psychage offers free, evidence-based tools and resources. Here&apos;s
          everything on the platform.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
      >
        {FEATURES.map((feature) => (
          <motion.div key={feature.title} variants={item}>
            <InteractiveCard
              spotlightColor={feature.spotlight}
              className="p-6 h-full"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-sm`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </InteractiveCard>
          </motion.div>
        ))}
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
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PlatformOverviewStep;
