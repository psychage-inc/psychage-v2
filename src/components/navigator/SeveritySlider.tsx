import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

interface SeveritySliderProps {
    value?: number;
    onChange: (value: number) => void;
    minLabel?: string;
    maxLabel?: string;
}

export const SeveritySlider: React.FC<SeveritySliderProps> = ({
    value = 5,
    onChange,
    minLabel = "Mild",
    maxLabel = "Severe"
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        setLocalValue(val);
        onChange(val);
    };

    // Convert value to 0-100 format for the gradient track
    const percentage = ((localValue - 1) / 9) * 100;

    return (
        <div className="w-full space-y-6">
            <div className="relative pt-6 pb-2">
                {/* Value tooltip */}
                <motion.div
                    className="absolute top-0 -translate-x-1/2 w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)] z-10 before:content-[''] before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-teal-500"
                    style={{ left: `${percentage}%` }}
                    initial={false}
                    animate={{ left: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <span className="text-text-primary font-bold text-sm">{localValue}</span>
                </motion.div>

                <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={localValue}
                    onChange={handleChange}
                    className="w-full appearance-none bg-transparent cursor-pointer relative z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-full touch-none"
                    aria-label="Severity scale from 1 to 10"
                />

                {/* Custom Track */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-surface-hover/50 rounded-full overflow-hidden pointer-events-none z-0">
                    <div
                        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center text-sm font-medium text-text-tertiary">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        /* Hide default thumb but keep accessible */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: white;
          border: 2px solid #6366f1;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
          cursor: pointer;
          margin-top: -10px;
        }
        input[type=range]::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: white;
          border: 2px solid #6366f1;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.6);
          cursor: pointer;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: transparent;
        }
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: transparent;
        }
      `}} />
        </div>
    );
};
