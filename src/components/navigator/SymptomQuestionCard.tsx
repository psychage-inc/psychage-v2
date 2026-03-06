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
                "relative rounded-3xl transition-all duration-700 overflow-hidden outline-none backdrop-blur-2xl",
                isActive
                    ? "bg-white/10 border border-teal-400/50 shadow-[0_0_40px_rgba(20,184,166,0.2)]"
                    : isCompleted
                        ? "bg-white/5 border border-white/10 opacity-70 hover:opacity-100 transition-opacity"
                        : "bg-white/5 border border-transparent opacity-40 pointer-events-none" // Upcoming
            )}
            aria-current={isActive ? "step" : undefined}
            aria-hidden={!isActive && !isCompleted ? true : undefined}
        >
            <div className={cn("p-6 sm:p-8", !isActive && "pointer-events-none")}>
                <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-charcoal-300">
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
