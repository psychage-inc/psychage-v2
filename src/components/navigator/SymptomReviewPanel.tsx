import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ReviewSymptom {
    id: string;
    name: string;
    isComplete: boolean;
}

interface SymptomReviewPanelProps {
    symptoms: ReviewSymptom[];
    currentIndex: number;
    onJumpTo: (index: number) => void;
    className?: string;
}

export const SymptomReviewPanel: React.FC<SymptomReviewPanelProps> = ({
    symptoms,
    currentIndex,
    onJumpTo,
    className
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const completedCount = symptoms.filter(s => s.isComplete).length;

    return (
        <div className={cn("bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg overflow-hidden", className)}>
            {/* Header - Always visible */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
                aria-expanded={isExpanded}
                aria-controls="symptom-review-list"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-medium text-white">
                            Review Your Symptoms
                        </div>
                        <div className="text-xs text-charcoal-300">
                            {completedCount} of {symptoms.length} completed
                        </div>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-charcoal-300" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-charcoal-300" />
                )}
            </button>

            {/* Expandable list */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        id="symptom-review-list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10"
                    >
                        <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                            {symptoms.map((symptom, index) => (
                                <button
                                    key={symptom.id}
                                    type="button"
                                    onClick={() => {
                                        onJumpTo(index);
                                        setIsExpanded(false);
                                    }}
                                    className={cn(
                                        "w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-colors text-left",
                                        "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset",
                                        currentIndex === index && "bg-teal-500/20 border border-teal-500/30"
                                    )}
                                    aria-label={`Jump to ${symptom.name}. ${symptom.isComplete ? 'Completed' : 'Incomplete'}.${currentIndex === index ? ' Currently viewing.' : ''}`}
                                >
                                    {symptom.isComplete ? (
                                        <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-4 h-4 text-charcoal-400 flex-shrink-0" />
                                    )}
                                    <span className={cn(
                                        "text-sm flex-1 line-clamp-1",
                                        symptom.isComplete ? "text-white" : "text-charcoal-300"
                                    )}>
                                        {symptom.name}
                                    </span>
                                    {currentIndex === index && (
                                        <span className="text-xs text-teal-400 font-medium">
                                            Current
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
