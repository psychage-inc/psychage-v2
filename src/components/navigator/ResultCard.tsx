import React from 'react';
import { ChevronRight } from 'lucide-react';
import { NavigatorResultItem } from '../../lib/navigator/types';
import { RelevanceDots } from './RelevanceDots';
import { cn } from '../../lib/utils';
import InteractiveCard from '../ui/InteractiveCard';

interface ResultCardProps {
    result: NavigatorResultItem;
    onClick?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
    return (
        <InteractiveCard
            onClick={onClick}
            className="w-full text-left bg-white/5 border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-teal-500/50 hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onClick) onClick();
                }
            }}
        >
            <div className="flex-1 space-y-3">
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

                {/* Matched Symptoms Preview */}
                {result.matched_symptoms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-mono font-medium text-charcoal-400 uppercase tracking-wider self-center mr-1">
                            Based on:
                        </span>
                        {result.matched_symptoms.slice(0, 3).map((sym) => (
                            <span key={sym.name} className="inline-block bg-teal-500/10 text-teal-300 text-xs px-2.5 py-1 rounded-md border border-teal-500/20 backdrop-blur-sm">
                                {sym.name.replace(/_/g, ' ')}
                            </span>
                        ))}
                        {result.matched_symptoms.length > 3 && (
                            <span className="inline-block bg-white/5 text-charcoal-300 text-xs px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                                +{result.matched_symptoms.length - 3} more
                            </span>
                        )}
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
