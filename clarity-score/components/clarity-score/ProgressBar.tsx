'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
    domainColorClass: string;
}

export default function ProgressBar({ current, total, domainColorClass }: ProgressBarProps) {
    const percentage = Math.max(0, Math.min(100, (current / total) * 100));

    return (
        <div className="relative w-full py-4">
            <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-text-muted" aria-hidden="true">
                <span>Psychage</span>
                <span>{current} of {total}</span>
            </div>
            <span className="sr-only">Question {current} of {total}</span>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                    className={`h-full ${domainColorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
}
