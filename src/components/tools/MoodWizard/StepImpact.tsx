import React from 'react';
import { Chip } from './Chip';
import { WizardState } from './MoodWizard';

interface StepProps {
    data: WizardState;
    updateData: (updates: Partial<WizardState>) => void;
    onNext: () => void;
}

const IMPACT_AREAS = [
    "Work", "Family", "Relationships", "Health", "Sleep", "Hobbies", "Weather", "Finances", "News"
];

export const StepImpact: React.FC<StepProps> = ({ data, updateData, onNext }) => {
    const toggleImpact = (area: string) => {
        const isSelected = data.impactAreas.includes(area);
        const newImpacts = isSelected
            ? data.impactAreas.filter((a: string) => a !== area)
            : [...data.impactAreas, area];
        updateData({ impactAreas: newImpacts });
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8 mt-4">What's having the biggest impact on you?</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {IMPACT_AREAS.map(area => (
                    <Chip
                        key={area}
                        label={area}
                        selected={data.impactAreas.includes(area)}
                        onClick={() => toggleImpact(area)}
                    />
                ))}
            </div>

            <div className="mb-12">
                <label htmlFor="context" className="sr-only">Additional Context</label>
                <textarea
                    id="context"
                    value={data.note}
                    onChange={(e) => updateData({ note: e.target.value })}
                    placeholder="Add additional context (optional)..."
                    className="w-full p-5 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-none min-h-[120px] text-gray-800 placeholder:text-gray-400"
                />
            </div>

            <button
                onClick={onNext}
                disabled={data.impactAreas.length === 0}
                className="w-full max-w-md mx-auto block py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
                Next
            </button>
        </div>
    );
};
