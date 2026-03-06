import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import type { ThoughtRecord, ReframerMode } from './types';
import { DEFAULT_THOUGHT_RECORD } from './types';
import { ProgressBar } from './components/ProgressBar';
import { CrisisOverlay } from './components/CrisisOverlay';
import { DistortionLibrary } from './components/DistortionLibrary';
import { IntroScreen } from './steps/IntroScreen';
import { StepSituation } from './steps/StepSituation';
import { StepEmotions } from './steps/StepEmotions';
import { StepAutomaticThought } from './steps/StepAutomaticThought';
import { StepDistortionPicker } from './steps/StepDistortionPicker';
import { StepEvidenceFor } from './steps/StepEvidenceFor';
import { StepEvidenceAgainst } from './steps/StepEvidenceAgainst';
import { StepBalancedThought } from './steps/StepBalancedThought';
import { CompletionScreen } from './steps/CompletionScreen';

// Step indices:
// 0 = Intro, 1 = Situation, 2 = Emotions, 3 = AutomaticThought,
// 4 = Distortions, 5 = EvidenceFor, 6 = EvidenceAgainst,
// 7 = BalancedThought, 8 = Completion
const GUIDED_STEPS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const QUICK_STEPS = [0, 1, 2, 3, 4, 7, 8]; // skip evidence steps

interface ThoughtReframerWizardProps {
  onComplete: (record: ThoughtRecord) => void;
  onCancel: () => void;
  ruminationCount: number;
}

export const ThoughtReframerWizard: React.FC<ThoughtReframerWizardProps> = ({
  onComplete,
  onCancel,
  ruminationCount,
}) => {
  const [stepIndex, setStepIndex] = useState(0); // index into activeSteps
  const [mode, setMode] = useState<ReframerMode>('guided');
  const [data, setData] = useState<ThoughtRecord>({
    ...DEFAULT_THOUGHT_RECORD,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    mode: 'guided',
  });
  const [showCrisis, setShowCrisis] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeSteps = mode === 'guided' ? GUIDED_STEPS : QUICK_STEPS;
  const currentStep = activeSteps[stepIndex];

  const updateData = (updates: Partial<ThoughtRecord>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (stepIndex < activeSteps.length - 1) {
      setStepIndex(s => s + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(s => s - 1);
    }
  };

  const handleSelectMode = (selectedMode: ReframerMode) => {
    setMode(selectedMode);
    updateData({ mode: selectedMode });
    handleNext();
  };

  const handleSave = () => {
    const completed = { ...data, completed: true };
    setData(completed);
    setSaved(true);
    onComplete(completed);
  };

  const handleStartAnother = () => {
    setStepIndex(0);
    setSaved(false);
    setData({
      ...DEFAULT_THOUGHT_RECORD,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      mode,
    });
  };

  // Progress bar: steps 1-7 (indices 1-7 in GUIDED_STEPS)
  // We show progress only for content steps, not intro/completion
  const isContentStep = currentStep >= 1 && currentStep <= 7;
  const progressCurrent = currentStep - 1; // 0-indexed for progress bar (0-6)

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IntroScreen
            onSelectMode={handleSelectMode}
            ruminationCount={ruminationCount}
            onOpenLibrary={() => setShowLibrary(true)}
          />
        );
      case 1:
        return <StepSituation data={data} updateData={updateData} onNext={handleNext} />;
      case 2:
        return <StepEmotions data={data} updateData={updateData} onNext={handleNext} />;
      case 3:
        return (
          <StepAutomaticThought
            data={data}
            updateData={updateData}
            onNext={handleNext}
            onCrisisDetected={() => setShowCrisis(true)}
          />
        );
      case 4:
        return (
          <StepDistortionPicker
            data={data}
            updateData={updateData}
            onNext={handleNext}
            onOpenLibrary={() => setShowLibrary(true)}
          />
        );
      case 5:
        return <StepEvidenceFor data={data} updateData={updateData} onNext={handleNext} />;
      case 6:
        return <StepEvidenceAgainst data={data} updateData={updateData} onNext={handleNext} />;
      case 7:
        return <StepBalancedThought data={data} updateData={updateData} onNext={handleNext} />;
      case 8:
        return (
          <CompletionScreen
            data={data}
            onSave={handleSave}
            onStartAnother={handleStartAnother}
            saved={saved}
          />
        );
      default:
        return null;
    }
  };

  // Dynamic background based on step
  const getBgClass = () => {
    if (currentStep === 0) return 'from-amber-50 to-orange-50/30';
    if (currentStep === 8) return 'from-teal-50 to-emerald-50/30';
    return 'from-slate-50 to-white';
  };

  return (
    <>
      <div className={`fixed inset-0 z-[200] flex flex-col bg-gradient-to-b ${getBgClass()} transition-colors duration-1000 overflow-hidden`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          {stepIndex > 0 && currentStep !== 8 ? (
            <button
              onClick={handleBack}
              className="p-2 text-gray-500 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col">
          <div className="max-w-2xl w-full mx-auto my-auto flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="w-full flex flex-col items-center"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer: Progress Bar */}
        {isContentStep && (
          <div className="pb-6 pt-4 bg-transparent">
            <ProgressBar current={progressCurrent} />
          </div>
        )}
      </div>

      {/* Overlays */}
      <CrisisOverlay isOpen={showCrisis} onClose={() => setShowCrisis(false)} />
      <DistortionLibrary isOpen={showLibrary} onClose={() => setShowLibrary(false)} />
    </>
  );
};
