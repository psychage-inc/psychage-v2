import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ExerciseStep {
    title?: string;
    description?: string;
    /** Alternative prop names used by some articles */
    content?: string;
    instruction?: string;
    details?: string;
}

interface PracticalExerciseProps {
    title: string;
    steps: (ExerciseStep | string)[];
    toolLink?: string; // Can be either internal path or external URL
    toolLabel?: string;
    /** Additional props used by some articles */
    description?: string;
    duration?: string;
    frequency?: string;
    warning?: string;
    timeEstimate?: string;
    className?: string;
}

const PracticalExercise: React.FC<PracticalExerciseProps> = ({
    title,
    steps,
    toolLink,
    toolLabel,
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id="practical-exercise"
            className={`not-prose bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-950/20 dark:via-neutral-900/50 dark:to-teal-950/20 border border-indigo-200/60 dark:border-indigo-800/30 rounded-2xl p-6 md:p-8 my-10 scroll-mt-32 ${className}`}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                    <Activity size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                        Try This
                    </p>
                    <h3 className="text-lg font-bold text-text-primary">
                        {title}
                    </h3>
                </div>
            </div>

            <ol className="space-y-4 mb-6">
                {steps.map((step, i) => {
                    const isString = typeof step === 'string';
                    const title = isString ? step : (step.title || step.instruction);
                    const desc = isString ? undefined : (step.description || step.content || step.details);
                    return (
                        <li key={i} className="flex items-start gap-4">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center mt-0.5 shadow-sm">
                                {i + 1}
                            </span>
                            <div>
                                <p className="font-semibold text-text-primary mb-1">
                                    {title}
                                </p>
                                {desc && (
                                    <p className="text-sm leading-relaxed text-text-secondary">
                                        {desc}
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ol>

            {toolLink && (() => {
                const isExternal = toolLink.startsWith('http://') || toolLink.startsWith('https://');

                return isExternal ? (
                    <a
                        href={toolLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        {toolLabel || 'Try This Tool'}
                        <ArrowRight size={16} />
                    </a>
                ) : (
                    <Link
                        to={toolLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        {toolLabel || 'Try This Tool'}
                        <ArrowRight size={16} />
                    </Link>
                );
            })()}
        </motion.div>
    );
};

/**
 * Default fallback CTA when no specific exercise is defined for the article.
 */
export const DefaultToolkitCTA: React.FC = () => (
    <div
        id="practical-exercise"
        className="not-prose bg-gradient-to-r from-primary/5 to-indigo-500/5 border border-primary/20 rounded-2xl p-6 md:p-8 my-10 text-center scroll-mt-32"
    >
        <Activity size={28} className="mx-auto text-primary mb-3" />
        <h3 className="text-lg font-bold text-text-primary mb-2">
            Explore Our Free Mental Health Tools
        </h3>
        <p className="text-sm text-text-secondary mb-4 max-w-md mx-auto">
            From mood tracking to breathing exercises, Psychage offers evidence-informed tools to support your mental wellness journey.
        </p>
        <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
            Browse All Tools
            <ArrowRight size={16} />
        </Link>
    </div>
);

export default PracticalExercise;
