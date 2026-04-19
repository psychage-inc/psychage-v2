import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressDots } from './ProgressDots';
import { StepValence } from './StepValence';
import { StepEmotions } from './StepEmotions';
import { StepImpact } from './StepImpact';
import { StepReview } from './StepReview';
import { ArrowLeft, X } from 'lucide-react';
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
            {/* Header */}
            <div className="flex justify-between items-center p-6">
                {step > 0 ? (
                    <button onClick={handleBack} className="p-2 text-text-tertiary hover:bg-black/5 rounded-full transition-colors" aria-label="Go back">
                        <ArrowLeft size={24} />
                    </button>
                ) : (
                    <div className="w-10" />
                )}
                <button onClick={handleCancel} className="p-2 text-text-tertiary hover:bg-black/5 rounded-full transition-colors" aria-label="Cancel">
                    <X size={24} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col">
                <div className="max-w-xl w-full mx-auto my-auto flex flex-col">
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

            {/* Footer */}
            <div className="pb-8 pt-4 flex justify-center bg-transparent">
                <ProgressDots total={4} current={step} />
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
