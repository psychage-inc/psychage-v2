import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface StepItem {
    title: string;
    description?: React.ReactNode;
    /** Alias for description used by some articles */
    content?: React.ReactNode;
    id?: string;
    icon?: React.ReactNode;
}

interface ProgressStepsProps {
    steps: StepItem[];
    variant?: 'vertical' | 'horizontal' | 'default';
    className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
    steps,
    variant = 'vertical',
    className = '',
}) => {
    const { ref, isInView, shouldAnimate } = useScrollAnimation({ amount: 0.15 });
    const resolvedVariant = variant === 'default' ? 'vertical' : variant;

    if (resolvedVariant === 'horizontal') {
        return (
            <div ref={ref} className={`not-prose my-8 ${className}`}>
                <div className="flex overflow-x-auto gap-4 pb-2">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id ?? i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.4,
                                delay: shouldAnimate ? i * 0.1 : 0,
                                ease: 'easeOut',
                            }}
                            className="flex-1 min-w-[180px] relative"
                        >
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div className="absolute top-5 left-[calc(50%+16px)] right-0 h-0.5 bg-border" />
                            )}

                            <div className="flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-3 relative z-10">
                                    {step.icon || (
                                        <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                                            {i + 1}
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-sm font-semibold text-text-primary mb-1">
                                    {step.title}
                                </h4>
                                <div className="text-xs text-text-tertiary leading-relaxed">
                                    {step.description ?? step.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    // Vertical timeline (default)
    return (
        <div ref={ref} className={`not-prose my-8 ${className}`}>
            <div className="relative pl-8">
                {/* Vertical connector line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

                <div className="space-y-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id ?? i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                            transition={{
                                duration: 0.4,
                                delay: shouldAnimate ? i * 0.12 : 0,
                                ease: 'easeOut',
                            }}
                            className="relative"
                        >
                            {/* Step dot/icon */}
                            <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 border-2 border-white dark:border-gray-900 flex items-center justify-center z-10">
                                {step.icon || (
                                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                                        {i + 1}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="pl-4">
                                <h4 className="text-base font-semibold text-text-primary mb-1">
                                    {step.title}
                                </h4>
                                <div className="text-sm text-text-secondary leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
                                    {step.description ?? step.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { ProgressSteps };
export type { StepItem, ProgressStepsProps };
