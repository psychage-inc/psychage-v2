import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckSquare, XSquare } from 'lucide-react';
import { SymptomCategory as SymptomCategoryType } from '../../lib/navigator/types';

interface SymptomCategoryProps {
    category: SymptomCategoryType;
    title: string;
    count: number;
    initiallyExpanded?: boolean;
    expanded?: boolean;
    onToggle?: () => void;
    children: React.ReactNode;
    onSelectAll?: () => void;
    onClearAll?: () => void;
    selectedCount?: number;
}

export const SymptomCategory: React.FC<SymptomCategoryProps> = ({
    title,
    count,
    initiallyExpanded = false,
    expanded,
    onToggle,
    children,
    onSelectAll,
    onClearAll,
    selectedCount = 0
}) => {
    const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
    const isControlled = expanded !== undefined;
    const isExpanded = isControlled ? expanded : internalExpanded;

    return (
        <div className="border border-border rounded-2xl overflow-hidden bg-surface/50 backdrop-blur-xl transition-all duration-500">
            <button
                onClick={() => isControlled ? onToggle?.() : setInternalExpanded(!internalExpanded)}
                className="w-full flex items-center justify-between p-5 focus-visible:outline-none focus-visible:bg-surface-hover hover:bg-surface-hover/50 transition-all duration-300"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-medium text-text-primary transition-colors">
                        {title}
                    </h3>
                    <span className="bg-surface-hover/50 text-text-secondary border border-border text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {count}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-text-tertiary group-hover:text-teal-400 transition-colors"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-5 pt-0 border-t border-border">
                            {/* Category Actions */}
                            {(onSelectAll || onClearAll) && (
                                <div className="flex gap-3 mt-4 mb-3">
                                    {onSelectAll && (
                                        <button
                                            type="button"
                                            onClick={onSelectAll}
                                            className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 px-4 py-2.5 rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={selectedCount === count}
                                        >
                                            <CheckSquare className="w-4 h-4" />
                                            Select all
                                        </button>
                                    )}
                                    {onClearAll && selectedCount > 0 && (
                                        <button
                                            type="button"
                                            onClick={onClearAll}
                                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary bg-surface-hover/50 hover:bg-surface-hover px-4 py-2.5 rounded-lg border border-border hover:border-border-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[44px]"
                                        >
                                            <XSquare className="w-4 h-4" />
                                            Clear selected
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-3" role="group" aria-label={`${title} symptoms`}>
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
