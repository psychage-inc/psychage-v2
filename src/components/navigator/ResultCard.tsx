import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigatorResultItem } from '../../lib/navigator/types';
import { RelevanceDots } from './RelevanceDots';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';

interface ResultCardProps {
    result: NavigatorResultItem;
    onClick?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };
    return (
        <Card
            variant="glass"
            hoverEffect={true}
            onClick={onClick}
            className={cn(
                "w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-teal-500/40 rounded-2xl relative overflow-hidden",
                onClick && "cursor-pointer"
            )}
            {...(onClick ? {
                role: "button" as const,
                tabIndex: 0,
                onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick();
                    }
                }
            } : {})}
        >
            <div className="flex-1 space-y-3 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-teal-300 transition-colors">
                        {result.name}
                    </h3>

                    <div className="bg-surface/50 rounded-full px-3 py-1.5 w-fit border border-border backdrop-blur-sm">
                        <RelevanceDots level={result.relevance_level} />
                    </div>
                </div>

                {/* Confidence bar */}
                <div className="flex items-center gap-2.5 mt-1">
                    <div className="flex-1 h-1.5 bg-surface-hover/50 rounded-full overflow-hidden max-w-[7.5rem]">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((result.relevance_score / 0.75) * 100)}%` }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        />
                    </div>
                    <span className="text-xs font-mono text-text-tertiary tabular-nums">
                        {Math.round((result.relevance_score / 0.75) * 100)}%
                    </span>
                </div>

                <p className="text-text-secondary leading-relaxed font-sans pb-1 max-w-3xl">
                    {result.description_for_user}
                </p>

                {/* Matched Symptoms Preview/List */}
                {result.matched_symptoms.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-medium text-text-tertiary uppercase tracking-wider">
                                Based on:
                            </span>
                            {result.matched_symptoms.length > 3 && (
                                <button
                                    type="button"
                                    onClick={handleToggleExpand}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleToggleExpand(e);
                                        }
                                    }}
                                    className="flex items-center gap-1.5 text-sm text-teal-400 hover:text-teal-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-3 py-2 min-h-[36px]"
                                    aria-expanded={isExpanded}
                                    aria-controls={`symptoms-list-${result.condition_id}`}
                                >
                                    {isExpanded ? (
                                        <>
                                            Show less <ChevronDown className="w-3 h-3 rotate-180" />
                                        </>
                                    ) : (
                                        <>
                                            Show all {result.matched_symptoms.length} <ChevronDown className="w-3 h-3" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div
                            id={`symptoms-list-${result.condition_id}`}
                            className="flex flex-wrap gap-2"
                        >
                            {(isExpanded
                                ? result.matched_symptoms
                                : result.matched_symptoms.slice(0, 3)
                            ).map((sym) => (
                                <motion.span
                                    key={sym.name}
                                    initial={isExpanded ? { opacity: 0, scale: 0.9 } : false}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="inline-block bg-teal-500/10 text-teal-300 text-xs sm:text-sm px-3 py-1.5 rounded-md border border-teal-500/20 backdrop-blur-sm"
                                >
                                    {sym.name.replace(/_/g, ' ')}
                                </motion.span>
                            ))}
                            {!isExpanded && result.matched_symptoms.length > 3 && (
                                <span className="inline-block bg-surface-hover/50 text-text-secondary text-xs sm:text-sm px-3 py-1.5 rounded-md border border-border backdrop-blur-sm">
                                    +{result.matched_symptoms.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {onClick && (
                <div className="flex-shrink-0 flex items-center justify-end">
                    <div className="w-11 h-11 rounded-full bg-surface-hover/50 flex items-center justify-center text-text-tertiary group-hover:bg-teal-500/20 group-hover:text-teal-400 border border-border group-hover:border-teal-500/30 transition-all duration-300">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </div>
            )}
        </Card>
    );
};
