import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SymptomSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const SymptomSearch: React.FC<SymptomSearchProps> = ({
    value,
    onChange,
    placeholder = "Search symptoms (e.g., anxiety, fatigue)...",
    className
}) => {
    return (
        <div className={cn("relative group", className)}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary group-focus-within:text-teal-500 transition-colors">
                <Search className="h-5 w-5" />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 bg-surface/50 border border-border rounded-2xl leading-5 placeholder-text-tertiary focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all duration-300 text-text-primary shadow-xl backdrop-blur-xl hover:bg-surface-hover/50"
                placeholder={placeholder}
                aria-label="Search symptoms"
            />

            <AnimatePresence>
                {value.length > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => onChange("")}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                        aria-label="Clear search"
                    >
                        <div className="bg-surface-hover/50 hover:bg-surface-hover transition-colors rounded-full p-2.5">
                            <X className="h-4 w-4" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
