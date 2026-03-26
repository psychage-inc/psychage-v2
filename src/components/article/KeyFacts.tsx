import React from 'react';
import { ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Support both simple text facts and structured label/value/context facts
export interface KeyFact {
    text?: string;
    label?: string;
    value?: string;
    context?: string;
    citationIndex?: number;
}

interface KeyFactsProps {
    facts: KeyFact[];
    className?: string;
}

const KeyFacts: React.FC<KeyFactsProps> = ({ facts, className = '' }) => {
    const prefersReducedMotion = useReducedMotion();

    if (!facts || facts.length === 0) return null;

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            id="key-facts"
            className={`not-prose bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 my-8 shadow-sm scroll-mt-32 ${className}`}
        >
            <div className="flex items-center gap-2 mb-4">
                <ListChecks size={20} className="text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                    Key Facts
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facts.map((fact, i) => {
                    // Support both formats: simple text or label/value/context
                    const hasStructuredData = fact.label && fact.value;

                    return hasStructuredData ? (
                        <div key={i} className="flex flex-col gap-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {fact.label}
                            </div>
                            <div className="text-2xl font-bold text-primary">
                                {fact.value}
                            </div>
                            {fact.context && (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {fact.context}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div key={i} className="flex items-start gap-3 sm:col-span-2">
                            <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                                {i + 1}
                            </span>
                            <span className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                {fact.text}
                                {fact.citationIndex != null && (
                                    <sup className="ml-0.5">
                                        <a
                                            href={`#citation-${fact.citationIndex}`}
                                            className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
                                        >
                                            [{fact.citationIndex}]
                                        </a>
                                    </sup>
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default KeyFacts;
