import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ONBOARDING_STEPS } from './steps/types';
import { cn } from '@/lib/utils';

interface OnboardingProgressBarProps {
  currentStep: number;
}

const OnboardingProgressBar: React.FC<OnboardingProgressBarProps> = ({
  currentStep,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {ONBOARDING_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.label}>
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? 'rgb(20 184 166)'
                      : isCurrent
                        ? 'rgb(20 184 166 / 0.15)'
                        : 'rgb(255 255 255 / 0.05)',
                  }}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                    isCompleted
                      ? 'border-teal-500'
                      : isCurrent
                        ? 'border-teal-500'
                        : 'border-white/10'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        isCurrent ? 'text-teal-500' : 'text-text-tertiary'
                      )}
                    />
                  )}
                </motion.div>
                <span
                  className={cn(
                    'text-xs font-medium hidden sm:block',
                    isCurrent
                      ? 'text-teal-500'
                      : isCompleted
                        ? 'text-text-secondary'
                        : 'text-text-tertiary'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < ONBOARDING_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 rounded-full bg-white/10 relative overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-teal-500 origin-left"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingProgressBar;
