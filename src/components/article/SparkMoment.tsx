import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SparkMomentProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const SparkMoment: React.FC<SparkMomentProps> = ({
    children,
    title = 'Spark Moment',
    className = '',
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id="spark-moment"
            className={`not-prose border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-950/20 rounded-r-xl p-6 my-10 scroll-mt-32 ${className}`}
        >
            <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                    <Sparkles size={20} className="text-amber-500" />
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-2">
                        {title}
                    </h3>
                    <div className="text-base leading-relaxed text-amber-900/80 dark:text-amber-200/80 font-medium">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SparkMoment;
