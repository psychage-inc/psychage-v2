import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StepValence } from './StepValence';
import { StepEmotions } from './StepEmotions';
import { StepImpact } from './StepImpact';
import { StepReview } from './StepReview';
import { ArrowLeft, X, LifeBuoy } from 'lucide-react';
import { saveMoodEntry } from './storage';

export type WizardState = {
    valence: number;
    emotions: string[];
    impactAreas: string[];
    note: string;
};

interface MoodWizardProps {
    onComplete: (data: WizardState) => void;
    onCancel: () => void;
}

export const MoodWizard: React.FC<MoodWizardProps> = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(0);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [data, setData] = useState<WizardState>({
        valence: 5,
        emotions: [],
        impactAreas: [],
        note: ''
    });

    const updateData = (updates: Partial<WizardState>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => setStep(s => Math.min(s + 1, 3));
    const handleBack = () => setStep(s => Math.max(s - 1, 0));

    const hasData = data.emotions.length > 0 || data.impactAreas.length > 0 || data.note.trim().length > 0;

    const handleCancel = () => {
        if (hasData) {
            setShowCancelConfirm(true);
        } else {
            onCancel();
        }
    };

    const handleSave = () => {
        saveMoodEntry(data);
        onComplete(data);
    };

    // Determine dynamic background
    const getBgClass = () => {
        if (data.valence <= 3) return 'from-slate-200 to-indigo-100';
        if (data.valence <= 7) return 'from-sky-100 to-teal-50';
        return 'from-orange-100 to-amber-50';
    };

    const steps = [
        <StepValence key="step1" data={data} updateData={updateData} onNext={handleNext} />,
        <StepEmotions key="step2" data={data} updateData={updateData} onNext={handleNext} />,
        <StepImpact key="step3" data={data} updateData={updateData} onNext={handleNext} />,
        <StepReview key="step4" data={data} onSave={handleSave} />
    ];

    return (
        <div className={`fixed inset-0 z-[200] flex flex-col bg-gradient-to-b ${getBgClass()} transition-colors duration-1000 overflow-hidden`}>
            {/* Header: [back/spacer] · step indicator · [crisis][close] */}
            <div
                className="flex items-center justify-between gap-2 px-6 pb-4"
                style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top))' }}
            >
                {step > 0 ? (
                    <button onClick={handleBack} className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-tertiary hover:bg-black/5 rounded-full transition-colors" aria-label="Go back">
                        <ArrowLeft size={24} />
                    </button>
                ) : (
                    <div className="min-w-[44px]" aria-hidden />
                )}

                {/* Quiet step indicator */}
                <p className="text-sm font-medium text-text-tertiary tabular-nums" aria-live="polite">
                    Step {step + 1} of {steps.length}
                </p>

                <div className="flex items-center gap-1">
                    {/* SR-2: crisis stays one tap away while the wizard covers the app chrome */}
                    <Link
                        to="/crisis"
                        aria-label="Crisis support — get immediate help"
                        className="flex h-11 items-center gap-1.5 rounded-full bg-crisis-red px-3.5 text-sm font-semibold text-white transition-opacity active:opacity-90"
                    >
                        <LifeBuoy size={16} aria-hidden />
                        <span>Crisis</span>
                    </Link>
                    <button onClick={handleCancel} className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-tertiary hover:bg-black/5 rounded-full transition-colors" aria-label="Cancel">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Content Area — min-h-full + justify-center centers when there is room
                and keeps the top scroll-reachable when content overflows (no clipped heading). */}
            <div
                className="flex-1 overflow-y-auto px-6"
                style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
            >
                <div className="min-h-full max-w-xl w-full mx-auto flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.15 }}
                            className="w-full flex flex-col items-center"
                        >
                            {steps[step]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Cancel confirmation */}
            {showCancelConfirm && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 mx-4 max-w-sm shadow-xl">
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Discard entry?</h3>
                        <p className="text-text-secondary text-sm mb-4">You have unsaved mood data. Are you sure you want to close?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary bg-surface-hover rounded-lg hover:bg-surface-active transition-colors"
                            >
                                Keep editing
                            </button>
                            <button
                                onClick={onCancel}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
