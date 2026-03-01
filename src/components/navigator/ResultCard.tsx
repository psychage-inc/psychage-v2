import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigatorResultItem } from '../../lib/navigator/types';
import { RelevanceDots } from './RelevanceDots';
import { cn } from '../../lib/utils';
import InteractiveCard from '../ui/InteractiveCard';

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
        <InteractiveCard
            onClick={onClick}
            className="w-full text-left bg-white/5 border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-teal-500/40 hover:bg-white/10 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 cursor-pointer rounded-2xl relative overflow-hidden"
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onClick) onClick();
                }
            }}
        >
            {/* Ambient Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-teal-400/30 transition-all duration-500 pointer-events-none -z-10" />

            <div className="flex-1 space-y-3 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-teal-300 transition-colors">
                        {result.name}
                    </h3>

                    <div className="bg-charcoal-900/50 rounded-full px-3 py-1.5 w-fit border border-white/10 backdrop-blur-sm">
                        <RelevanceDots level={result.relevance_level} />
                    </div>
                </div>

                <p className="text-charcoal-300 leading-relaxed font-sans pb-1 max-w-3xl">
                    {result.description_for_user}
                </p>

                {/* Matched Symptoms Preview/List */}
                {result.matched_symptoms.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-medium text-charcoal-400 uppercase tracking-wider">
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
                                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 rounded px-2 py-1"
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
                                    className="inline-block bg-teal-500/10 text-teal-300 text-xs px-2.5 py-1 rounded-md border border-teal-500/20 backdrop-blur-sm"
                                >
                                    {sym.name.replace(/_/g, ' ')}
                                </motion.span>
                            ))}
                            {!isExpanded && result.matched_symptoms.length > 3 && (
                                <span className="inline-block bg-white/5 text-charcoal-300 text-xs px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                                    +{result.matched_symptoms.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 flex items-center justify-end">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-charcoal-400 group-hover:bg-teal-500/20 group-hover:text-teal-400 border border-white/5 group-hover:border-teal-500/30 transition-all duration-300">
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
        </InteractiveCard>
    );
};
