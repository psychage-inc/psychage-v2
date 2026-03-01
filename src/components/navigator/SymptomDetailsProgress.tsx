import React from 'react';
import { cn } from '../../lib/utils';

interface SymptomDetailsProgressProps {
    current: number;
    total: number;
    className?: string;
}

export const SymptomDetailsProgress: React.FC<SymptomDetailsProgressProps> = ({
    current,
    total,
    className
}) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-200 font-medium">
                    Progress
                </span>
                <span className="text-teal-400 font-semibold">
                    {current} of {total}
                </span>
            </div>
            <div
                className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner"
                role="progressbar"
                aria-valuenow={current}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-label={`Symptom details progress: ${current} of ${total} completed`}
            >
                <div
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
