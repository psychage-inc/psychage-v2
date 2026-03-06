import React from 'react';
import { UserFrequency } from '../../lib/navigator/types';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const FREQUENCY_OPTIONS: { value: UserFrequency; label: string; description: string }[] = [
    { value: 'rarely', label: 'Rarely', description: 'Less than once a week' },
    { value: 'sometimes', label: 'Sometimes', description: 'A few times a week' },
    { value: 'often', label: 'Often', description: 'Almost every day' },
    { value: 'always', label: 'Constant', description: 'Persistent throughout the day' }
];

interface FrequencyPickerProps {
    value?: UserFrequency;
    onChange: (value: UserFrequency) => void;
}

export const FrequencyPicker: React.FC<FrequencyPickerProps> = ({ value, onChange }) => {
    return (
        <div className="flex flex-col gap-3" role="radiogroup" aria-label="Frequency options">
            {FREQUENCY_OPTIONS.map((option) => {
                const isSelected = value === option.value;
                return (
                    <motion.button
                        key={option.value}
                        role="radio"
                        aria-checked={isSelected}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "p-4 rounded-2xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 group flex items-start gap-4 backdrop-blur-xl",
                            isSelected
                                ? "border-teal-400/50 bg-teal-900/40 shadow-[0_0_25px_rgba(20,184,166,0.25)]"
                                : "border-border bg-surface/50 hover:border-border-hover hover:bg-surface-hover/50 shadow-lg"
                        )}
                    >
                        <div
                            className={cn(
                                "flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors",
                                isSelected
                                    ? "border-teal-500"
                                    : "border-border-hover group-hover:border-border-hover"
                            )}
                        >
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />}
                        </div>

                        <div>
                            <p className={cn(
                                "font-medium text-base transition-colors",
                                isSelected ? "text-white" : "text-text-secondary group-hover:text-text-primary"
                            )}>
                                {option.label}
                            </p>
                            <p className="text-sm mt-0.5 text-text-tertiary group-hover:text-text-secondary transition-colors">
                                {option.description}
                            </p>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
};
