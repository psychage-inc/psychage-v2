import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingProgressBar from './OnboardingProgressBar';
import WelcomeStep from './steps/WelcomeStep';
import PlatformOverviewStep from './steps/PlatformOverviewStep';
import ContentGuidelinesStep from './steps/ContentGuidelinesStep';
import AdminToolsStep from './steps/AdminToolsStep';
import QuickStartStep from './steps/QuickStartStep';
import CompletionStep from './steps/CompletionStep';
import { ONBOARDING_STEPS } from './steps/types';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    const props = { onNext: goNext, onBack: goBack };
    switch (currentStep) {
      case 0:
        return <WelcomeStep {...props} />;
      case 1:
        return <PlatformOverviewStep {...props} />;
      case 2:
        return <ContentGuidelinesStep {...props} />;
      case 3:
        return <AdminToolsStep {...props} />;
      case 4:
        return <QuickStartStep {...props} />;
      case 5:
        return <CompletionStep {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Progress bar - fixed top */}
      <div className="pt-8 pb-6">
        <OnboardingProgressBar currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center pb-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
