import React from 'react';
import { cn } from '../../lib/utils';
import { RelevanceLevel } from '../../lib/navigator/types';

interface RelevanceDotsProps {
    level: RelevanceLevel;
    className?: string;
}

// Map levels to visual configurations based on prompt specs.
// Locked palette: teal for the highest level, descending stone greys below
// (darker stone = more relevant, so the scale still reads as a gradient).
// ●●●○ Higher relevance — relevance-high (teal #1A9B8C)
// ●●○○ Moderate relevance — stone-700
// ●○○○ Worth exploring — stone-600
// ●○○○ Worth exploring — stone-500

const RELEVANCE_CONFIG = {
    high: {
        filledDots: 3,
        totalDots: 4,
        colorClass: 'text-relevance-high',
        bgColorClass: 'bg-relevance-high',
        label: 'Higher relevance'
    },
    moderate: {
        filledDots: 2,
        totalDots: 4,
        colorClass: 'text-stone-700',
        bgColorClass: 'bg-stone-700',
        label: 'Moderate relevance'
    },
    low: {
        filledDots: 1,
        totalDots: 4,
        colorClass: 'text-stone-600',
        bgColorClass: 'bg-stone-600',
        label: 'Worth exploring'
    },
    minimal: {
        filledDots: 1,
        totalDots: 4,
        colorClass: 'text-stone-500',
        bgColorClass: 'bg-stone-500',
        label: 'Worth exploring'
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
                                : "bg-gray-300 dark:bg-neutral-600"
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
