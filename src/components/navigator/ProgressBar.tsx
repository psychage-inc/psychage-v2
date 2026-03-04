import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    // Ensure we don't exceed 100% and provide a minimum width
    const progressPercent = Math.min(100, Math.max(5, (currentStep / totalSteps) * 100));

    return (
        <div
            className="fixed top-0 left-0 right-0 h-1.5 bg-teal-900/30 backdrop-blur-md z-50 overflow-hidden"
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-label={`Step ${currentStep} of ${totalSteps}`}
        >
            <motion.div
                className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </div>
    );
};
