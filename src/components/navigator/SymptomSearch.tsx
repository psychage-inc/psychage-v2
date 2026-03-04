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
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal-400 group-focus-within:text-teal-500 transition-colors">
                <Search className="h-5 w-5" />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl leading-5 placeholder-charcoal-400 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all duration-500 text-white shadow-xl backdrop-blur-xl hover:bg-white/10"
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
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-charcoal-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 rounded"
                        aria-label="Clear search"
                    >
                        <div className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-1">
                            <X className="h-4 w-4" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
