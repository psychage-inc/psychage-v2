import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckSquare, XSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SymptomCategory as SymptomCategoryType } from '../../lib/navigator/types';

interface SymptomCategoryProps {
    category: SymptomCategoryType;
    title: string;
    count: number;
    initiallyExpanded?: boolean;
    children: React.ReactNode;
    onSelectAll?: () => void;
    onClearAll?: () => void;
    selectedCount?: number;
}

export const SymptomCategory: React.FC<SymptomCategoryProps> = ({
    category,
    title,
    count,
    initiallyExpanded = false,
    children,
    onSelectAll,
    onClearAll,
    selectedCount = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

    return (
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-500">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-5 focus-visible:outline-none focus-visible:bg-white/10 hover:bg-white/5 transition-all duration-300"
                aria-expanded={isExpanded}
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg font-medium text-white transition-colors">
                        {title}
                    </h3>
                    <span className="bg-white/10 text-charcoal-200 border border-white/5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {count}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-charcoal-400 group-hover:text-teal-400 transition-colors"
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
                        <div className="p-5 pt-0 border-t border-white/5">
                            {/* Category Actions */}
                            {(onSelectAll || onClearAll) && (
                                <div className="flex gap-2 mt-4 mb-3">
                                    {onSelectAll && (
                                        <button
                                            type="button"
                                            onClick={onSelectAll}
                                            className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 px-3 py-1.5 rounded-md border border-teal-500/30 hover:border-teal-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
                                            disabled={selectedCount === count}
                                        >
                                            <CheckSquare className="w-3.5 h-3.5" />
                                            Select all
                                        </button>
                                    )}
                                    {onClearAll && selectedCount > 0 && (
                                        <button
                                            type="button"
                                            onClick={onClearAll}
                                            className="flex items-center gap-1.5 text-xs text-charcoal-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
                                        >
                                            <XSquare className="w-3.5 h-3.5" />
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
