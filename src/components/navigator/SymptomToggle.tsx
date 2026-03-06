import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Symptom } from '../../lib/navigator/types';
import { HighlightedText } from '../ui/HighlightedText';

interface SymptomToggleProps {
    symptom: Symptom;
    isSelected: boolean;
    onToggle: (id: string) => void;
    searchQuery?: string;
}

export const SymptomToggle: React.FC<SymptomToggleProps> = ({ symptom, isSelected, onToggle, searchQuery = '' }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(symptom.id)}
            className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 backdrop-blur-xl",
                isSelected
                    ? "bg-teal-900/30 border-teal-400/50 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                    : "bg-surface/50 border-border hover:border-border-hover hover:bg-surface-hover/50 shadow-lg"
            )}
            aria-pressed={isSelected}
        >
            <div className="flex items-start gap-3">
                <div
                    className={cn(
                        "flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border flex items-center justify-center transition-colors",
                        isSelected
                            ? "bg-teal-500 border-teal-500 text-white shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                            : "border-border-hover group-hover:border-border-hover bg-surface/50"
                    )}
                    aria-hidden="true"
                >
                    {isSelected && <Check className="w-4 h-4" />}
                </div>

                <div className="flex-1">
                    <HighlightedText
                        text={symptom.name}
                        query={searchQuery}
                        className={cn(
                            "font-sans font-medium text-17 leading-snug transition-colors",
                            isSelected ? "text-white" : "text-text-secondary group-hover:text-text-primary"
                        )}
                    />
                    {symptom.description && (
                        <HighlightedText
                            text={symptom.description}
                            query={searchQuery}
                            className={cn(
                                "mt-1 text-sm leading-relaxed transition-colors block",
                                isSelected ? "text-teal-50/80" : "text-text-tertiary group-hover:text-text-secondary"
                            )}
                        />
                    )}
                </div>
            </div>
        </motion.button>
    );
};
