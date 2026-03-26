import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SummaryBoxProps {
    summary?: string;
    keyPoints?: string[];
    className?: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({ summary, keyPoints, className = '' }) => {
    const prefersReducedMotion = useReducedMotion();

    // Support both summary string and keyPoints array
    const content = summary || keyPoints;
    if (!content) return null;

    const isArray = Array.isArray(content);

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id="summary"
            className={`not-prose border-l-4 border-primary bg-teal-50 dark:bg-teal-950/20 rounded-r-xl p-6 my-8 scroll-mt-32 ${className}`}
        >
            <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                    <FileText size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
                        At a Glance
                    </h2>
                    {isArray ? (
                        <ul className="space-y-2">
                            {(content as string[]).map((point, index) => (
                                <li key={index} className="text-base leading-relaxed text-gray-700 dark:text-gray-300 flex items-start">
                                    <span className="text-primary mr-2 mt-1">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                            {content as string}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SummaryBox;
