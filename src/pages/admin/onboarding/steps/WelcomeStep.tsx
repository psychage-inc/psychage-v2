import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import type { StepProps } from './types';

const WelcomeStep: React.FC<StepProps> = ({ onNext }) => {
  const { user } = useAuth();
  const displayName = user?.display_name || 'Admin';

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-8 shadow-lg shadow-teal-500/20"
      >
        <Shield className="w-10 h-10 text-white" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4"
      >
        Welcome, {displayName}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg text-text-secondary mb-4 leading-relaxed"
      >
        You&apos;re joining the team behind{' '}
        <span className="text-primary font-semibold">Psychage</span> &mdash; the
        first adaptive operating system for mental health.
      </motion.p>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-base text-text-tertiary mb-10 leading-relaxed max-w-lg"
      >
        Before you dive in, we&apos;ll walk you through what the platform offers,
        the sensitive content you&apos;ll oversee, and the tools at your
        disposal.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={onNext}
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
