import React from 'react';
import { cn } from '../../lib/utils';
import { RelevanceLevel } from '../../lib/navigator/types';

interface RelevanceDotsProps {
    level: RelevanceLevel;
    className?: string;
}

// Map levels to visual configurations based on prompt specs
// ●●●○ Higher relevance — --relevance-high (teal)
// ●●○○ Moderate relevance — --relevance-moderate (indigo)
// ●○○○ Worth exploring — --relevance-explore (purple)

const RELEVANCE_CONFIG = {
    high: {
        filledDots: 3,
        totalDots: 4,
        colorClass: 'text-teal-600',
        bgColorClass: 'bg-teal-600',
        label: 'Higher relevance'
    },
    moderate: {
        filledDots: 2,
        totalDots: 4,
        colorClass: 'text-indigo-500',
        bgColorClass: 'bg-indigo-500',
        label: 'Moderate relevance'
    },
    low: {
        filledDots: 1,
        totalDots: 4,
        colorClass: 'text-purple-500',
        bgColorClass: 'bg-purple-500',
        label: 'Worth exploring'
    },
    minimal: {
        filledDots: 0,
        totalDots: 4,
        colorClass: 'text-gray-400',
        bgColorClass: 'bg-gray-400',
        label: 'Less likely'
    }
};

export const RelevanceDots: React.FC<RelevanceDotsProps> = ({ level, className }) => {
    const config = RELEVANCE_CONFIG[level] || RELEVANCE_CONFIG.minimal;

    return (
        <div className={cn("flex items-center gap-2", className)} aria-label={`Relevance: ${config.label}`}>
            <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: config.totalDots }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-2 h-2 rounded-full",
                            i < config.filledDots
                                ? config.bgColorClass
                                : "bg-charcoal-300 dark:bg-charcoal-700"
                        )}
                    />
                ))}
            </div>
            <span className={cn("text-xs font-mono font-medium tracking-wide uppercase", config.colorClass)}>
                {config.label}
            </span>
        </div>
    );
};
