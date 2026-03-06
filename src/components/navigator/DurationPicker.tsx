import React from 'react';
import { UserDuration } from '../../lib/navigator/types';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const DURATION_OPTIONS: { value: UserDuration; label: string }[] = [
    { value: 'less_than_1_week', label: 'Less than 1 week' },
    { value: '1_to_2_weeks', label: '1 - 2 weeks' },
    { value: '2_to_4_weeks', label: '2 - 4 weeks' },
    { value: '1_to_3_months', label: '1 - 3 months' },
    { value: '3_to_6_months', label: '3 - 6 months' },
    { value: '6_months_to_1_year', label: '6 months - 1 year' },
    { value: 'more_than_1_year', label: 'More than 1 year' }
];

interface DurationPickerProps {
    value?: UserDuration;
    onChange: (value: UserDuration) => void;
}

export const DurationPicker: React.FC<DurationPickerProps> = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="radiogroup" aria-label="Duration options">
            {DURATION_OPTIONS.map((option) => {
                const isSelected = value === option.value;
                return (
                    <motion.button
                        key={option.value}
                        role="radio"
                        aria-checked={isSelected}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "p-4 rounded-2xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-xl",
                            isSelected
                                ? "border-teal-400/50 bg-teal-900/40 text-teal-100 font-medium shadow-[0_0_25px_rgba(20,184,166,0.25)]"
                                : "border-border bg-surface/50 text-text-secondary hover:border-border-hover hover:text-text-primary hover:bg-surface-hover/50 shadow-lg"
                        )}
                    >
                        {option.label}
                    </motion.button>
                );
            })}
        </div>
    );
};
