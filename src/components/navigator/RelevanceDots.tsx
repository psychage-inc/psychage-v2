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
        colorClass: 'text-relevance-high',
        bgColorClass: 'bg-relevance-high',
        label: 'Higher relevance'
    },
    moderate: {
        filledDots: 2,
        totalDots: 4,
        colorClass: 'text-relevance-moderate',
        bgColorClass: 'bg-relevance-moderate',
        label: 'Moderate relevance'
    },
    low: {
        filledDots: 1,
        totalDots: 4,
        colorClass: 'text-relevance-explore',
        bgColorClass: 'bg-relevance-explore',
        label: 'Worth exploring'
    },
    minimal: {
        filledDots: 1,
        totalDots: 4,
        colorClass: 'text-amber-500',
        bgColorClass: 'bg-amber-500',
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
