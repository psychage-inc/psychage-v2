import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useAdminOnboarding } from '../useAdminOnboarding';
import type { StepProps } from './types';

const CompletionStep: React.FC<StepProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { completeOnboarding, isCompleting } = useAdminOnboarding();

  const handleComplete = async () => {
    const success = await completeOnboarding();
    if (success) {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-8 shadow-lg shadow-teal-500/25"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4"
      >
        You&apos;re All Set
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-text-secondary mb-3 leading-relaxed"
      >
        You&apos;ve reviewed the platform, understood the content guidelines,
        and know your way around the admin tools.
      </motion.p>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-base text-text-tertiary mb-10 max-w-lg"
      >
        Your admin dashboard is ready. If you ever need to review platform
        policies, you can find them in the admin documentation.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={handleComplete}
          isLoading={isCompleting}
        >
          Go to Admin Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default CompletionStep;
