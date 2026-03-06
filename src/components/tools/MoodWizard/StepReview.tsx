import React from 'react';
import { WizardState } from './MoodWizard';
import { getValenceLabel } from './StepValence';

interface StepProps {
    data: WizardState;
    onSave: () => void;
}

export const StepReview: React.FC<StepProps> = ({ data, onSave }) => {
    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8 mt-4">Review your entry</h2>

            <div className="w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 mb-12 shadow-sm">
                <div className="mb-6 pb-6 border-b border-black/5">
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">State of Mind</p>
                    <p className="text-2xl font-semibold text-gray-900">{getValenceLabel(data.valence)}</p>
                </div>

                {data.emotions.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-black/5">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Emotions</p>
                        <div className="flex flex-wrap gap-2">
                            {data.emotions.map((e: string) => <span key={e} className="font-medium text-gray-800 bg-black/5 px-3 py-1 rounded-full">{e}</span>)}
                        </div>
                    </div>
                )}

                {data.impactAreas.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-black/5">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Impacts</p>
                        <div className="flex flex-wrap gap-2">
                            {data.impactAreas.map((a: string) => <span key={a} className="font-medium text-gray-800 bg-black/5 px-3 py-1 rounded-full">{a}</span>)}
                        </div>
                    </div>
                )}

                {data.note && (
                    <div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Context</p>
                        <p className="text-gray-700 italic">"{data.note}"</p>
                    </div>
                )}
            </div>

            <button onClick={onSave} className="w-full max-w-md mx-auto block py-4 bg-teal-600 text-white rounded-full font-semibold text-lg hover:bg-teal-700 transition-colors focus:ring-4 focus:ring-teal-500/20 shadow-xl shadow-teal-600/20">
                Save Entry
            </button>
        </div>
    );
};
