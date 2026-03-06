import React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SymptomQuestionCardProps {
    title: string;
    description?: string;
    isActive: boolean;
    isCompleted: boolean;
    children: React.ReactNode;
}

export const SymptomQuestionCard: React.FC<SymptomQuestionCardProps> = ({
    title,
    description,
    isActive,
    isCompleted,
    children
}) => {
    return (
        <div
            className={cn(
                "relative rounded-[2rem] transition-all duration-500 overflow-hidden outline-none backdrop-blur-2xl",
                isActive
                    ? "bg-surface/80 border border-teal-500/40 ring-1 ring-teal-500/20"
                    : isCompleted
                        ? "bg-surface/50 border border-border opacity-70 hover:opacity-100 transition-opacity"
                        : "bg-surface/50 border border-transparent opacity-40 pointer-events-none" // Upcoming
            )}
            aria-current={isActive ? "step" : undefined}
            aria-hidden={!isActive && !isCompleted ? true : undefined}
        >
            <div className={cn("p-6 sm:p-8", !isActive && "pointer-events-none")}>
                <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-text-primary mb-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-text-secondary">
                            {description}
                        </p>
                    )}
                </div>

                <div className="relative">
                    {children}
                </div>

                {/* Semi-transparent disabled overlay for completed steps if we don't want them interactive until clicked */}
                <AnimatePresence>
                    {isCompleted && !isActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-transparent z-10 cursor-pointer"
                            title="Click to edit"
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
