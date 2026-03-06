import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import type { NavigatorStep } from '../../lib/navigator/stepConfig';
import { STEP_CONFIGS, getStepNumber, getTotalSteps, isStepBefore, wouldJumpInvalidateData } from '../../lib/navigator/stepConfig';

interface EnhancedProgressBarProps {
    currentStep: NavigatorStep;
    completedSteps: Set<NavigatorStep>;
    onStepClick: (step: NavigatorStep) => void;
}

export const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
    currentStep,
    completedSteps,
    onStepClick
}) => {
    const [showJumpConfirm, setShowJumpConfirm] = useState(false);
    const [targetStep, setTargetStep] = useState<NavigatorStep | null>(null);
    const [newlyCompleted, setNewlyCompleted] = useState<Set<NavigatorStep>>(new Set());
    const prevCompletedRef = useRef<Set<NavigatorStep>>(new Set());

    // Detect newly completed steps for pulse animation
    useEffect(() => {
        const fresh = new Set<NavigatorStep>();
        completedSteps.forEach(step => {
            if (!prevCompletedRef.current.has(step)) fresh.add(step);
        });
        if (fresh.size > 0) {
            setNewlyCompleted(fresh);
            const timer = setTimeout(() => setNewlyCompleted(new Set()), 700);
            return () => clearTimeout(timer);
        }
        prevCompletedRef.current = new Set(completedSteps);
    }, [completedSteps]);

    const currentStepNum = getStepNumber(currentStep);
    const totalSteps = getTotalSteps();
    const progressPercent = Math.min(100, Math.max(5, ((currentStepNum - 1) / (totalSteps - 1)) * 100));

    // Get visible steps (exclude welcome and processing)
    const visibleSteps = Object.values(STEP_CONFIGS)
        .filter(step => step.order > 0 && step.id !== 'processing')
        .sort((a, b) => a.order - b.order);

    const handleStepClick = (stepId: NavigatorStep) => {
        // Don't allow navigation to current step
        if (stepId === currentStep) return;

        // Only allow navigation to completed or earlier steps
        const isCompleted = completedSteps.has(stepId);
        const isBefore = isStepBefore(stepId, currentStep);

        if (!isCompleted && !isBefore) {
            return; // Can't jump ahead
        }

        // Check if jump would invalidate data
        if (wouldJumpInvalidateData(currentStep, stepId)) {
            setTargetStep(stepId);
            setShowJumpConfirm(true);
        } else {
            onStepClick(stepId);
        }
    };

    const handleJumpConfirm = () => {
        if (targetStep) {
            onStepClick(targetStep);
        }
        setShowJumpConfirm(false);
        setTargetStep(null);
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bg-charcoal-950/90 backdrop-blur-md border-b border-white/5 z-50"
                role="navigation"
                aria-label="Navigator progress"
            >
                {/* Progress bar */}
                <div className="h-2.5 bg-teal-900/30 relative overflow-hidden">
                    <motion.div
                        className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>

                {/* Step labels */}
                <div className="max-w-5xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                        {visibleSteps.map((step, index) => {
                            const stepNum = step.order;
                            const isCompleted = completedSteps.has(step.id);
                            const isCurrent = currentStep === step.id;
                            const isClickable = (isCompleted || isStepBefore(step.id, currentStep)) && !isCurrent;

                            return (
                                <React.Fragment key={step.id}>
                                    <button
                                        type="button"
                                        onClick={() => isClickable && handleStepClick(step.id)}
                                        disabled={!isClickable}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 group",
                                            isClickable && "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer",
                                            !isClickable && "cursor-default"
                                        )}
                                        aria-label={`${step.label}. ${isCurrent ? 'Current step' : isCompleted ? 'Completed' : 'Not started'}`}
                                        aria-current={isCurrent ? 'step' : undefined}
                                    >
                                        {/* Step indicator */}
                                        <motion.div
                                            className={cn(
                                                "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                                                isCompleted && !isCurrent && "bg-teal-500/20 border-teal-500 text-teal-400",
                                                isCurrent && "bg-teal-500 border-teal-500 text-white shadow-[0_0_10px_rgba(20,184,166,0.5)]",
                                                !isCompleted && !isCurrent && "bg-charcoal-800 border-white/20 text-charcoal-400"
                                            )}
                                            animate={newlyCompleted.has(step.id) ? {
                                                boxShadow: [
                                                    '0 0 0 0 rgba(20,184,166,0)',
                                                    '0 0 0 8px rgba(20,184,166,0.3)',
                                                    '0 0 0 0 rgba(20,184,166,0)',
                                                ],
                                            } : undefined}
                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                        >
                                            {isCompleted && !isCurrent ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                stepNum
                                            )}
                                        </motion.div>

                                        {/* Step label */}
                                        <span
                                            className={cn(
                                                "hidden sm:inline text-sm font-medium transition-colors whitespace-nowrap",
                                                isCurrent && "text-white font-semibold",
                                                isCompleted && !isCurrent && "text-teal-300",
                                                !isCompleted && !isCurrent && "text-charcoal-400",
                                                isClickable && "group-hover:text-white"
                                            )}
                                        >
                                            {step.shortLabel}
                                        </span>
                                    </button>

                                    {/* Connector line */}
                                    {index < visibleSteps.length - 1 && (
                                        <div className="hidden md:block flex-1 h-0.5 bg-white/10 relative overflow-hidden">
                                            <motion.div
                                                className="absolute inset-y-0 left-0 bg-teal-500/50"
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: isCompleted ? '100%' : '0%'
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Screen reader progress announcement */}
                    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                        {STEP_CONFIGS[currentStep].label}. Step {currentStepNum} of {totalSteps}.
                    </div>
                </div>
            </div>

            {/* Jump confirmation dialog */}
            <ConfirmDialog
                isOpen={showJumpConfirm}
                onClose={() => {
                    setShowJumpConfirm(false);
                    setTargetStep(null);
                }}
                onConfirm={handleJumpConfirm}
                title="Change Your Selections?"
                message="Going back to this step may clear some of your details and results. Your symptom selections will be preserved."
                confirmText="Continue"
                cancelText="Cancel"
                variant="default"
            />
        </>
    );
};
