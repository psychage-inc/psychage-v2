import React from 'react';
import { Chip } from './Chip';
import { WizardState } from './MoodWizard';

interface StepProps {
    data: WizardState;
    updateData: (updates: Partial<WizardState>) => void;
    onNext: () => void;
}

const EMOTIONS = [
    "Happy", "Calm", "Grateful", "Excited", "Proud", "Relaxed",
    "Anxious", "Stressed", "Tired", "Sad", "Angry", "Lonely"
];

export const StepEmotions: React.FC<StepProps> = ({ data, updateData, onNext }) => {
    const toggleEmotion = (emotion: string) => {
        const isSelected = data.emotions.includes(emotion);
        const newEmotions = isSelected
            ? data.emotions.filter((e: string) => e !== emotion)
            : [...data.emotions, emotion];
        updateData({ emotions: newEmotions });
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary text-center mb-8 mt-4">What best describes this feeling?</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {EMOTIONS.map(emotion => (
                    <Chip
                        key={emotion}
                        label={emotion}
                        selected={data.emotions.includes(emotion)}
                        onClick={() => toggleEmotion(emotion)}
                    />
                ))}
            </div>

            <button
                onClick={onNext}
                disabled={data.emotions.length === 0}
                className="w-full max-w-md mx-auto block py-4 bg-teal-600 text-white rounded-full font-semibold text-lg hover:bg-teal-700 transition-colors focus:ring-4 focus:ring-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-teal-600/20"
            >
                Next
            </button>
        </div>
    );
};
