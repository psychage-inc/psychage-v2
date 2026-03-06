import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface SeveritySliderProps {
    value?: number;
    onChange: (value: number) => void;
    minLabel?: string;
    maxLabel?: string;
}

const SEVERITY_LABELS: Record<number, string> = {
    1: 'Very Mild',
    2: 'Mild',
    3: 'Mild',
    4: 'Moderate',
    5: 'Moderate',
    6: 'Moderate',
    7: 'Significant',
    8: 'Significant',
    9: 'Severe',
    10: 'Severe',
};

const getSegmentColor = (segmentValue: number, selectedValue: number): string => {
    if (segmentValue > selectedValue) return 'bg-surface-hover/50 border-border';
    if (selectedValue <= 3) return 'bg-teal-500 border-teal-500';
    if (selectedValue <= 6) return 'bg-teal-600 border-teal-600';
    if (selectedValue <= 8) return 'bg-amber-500 border-amber-500';
    return 'bg-red-500 border-red-500';
};

const getValueColor = (val: number): string => {
    if (val <= 3) return 'text-teal-500';
    if (val <= 6) return 'text-teal-600';
    if (val <= 8) return 'text-amber-500';
    return 'text-red-500';
};

const getLabelColor = (val: number): string => {
    if (val <= 3) return 'text-teal-400';
    if (val <= 6) return 'text-teal-500';
    if (val <= 8) return 'text-amber-400';
    return 'text-red-400';
};

export const SeveritySlider: React.FC<SeveritySliderProps> = ({
    value = 5,
    onChange,
    minLabel = 'Mild',
    maxLabel = 'Severe',
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSelect = useCallback(
        (val: number) => {
            setLocalValue(val);
            onChange(val);
        },
        [onChange]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            let newVal = localValue;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                newVal = Math.min(10, localValue + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                newVal = Math.max(1, localValue - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                newVal = 1;
            } else if (e.key === 'End') {
                e.preventDefault();
                newVal = 10;
            }
            if (newVal !== localValue) {
                handleSelect(newVal);
            }
        },
        [localValue, handleSelect]
    );

    return (
        <div className="w-full space-y-5">
            {/* Value display */}
            <div className="text-center">
                <div
                    className={cn(
                        'text-5xl font-bold font-display tabular-nums transition-colors duration-200',
                        getValueColor(localValue)
                    )}
                >
                    {localValue}
                </div>
                <div
                    className={cn(
                        'text-sm font-medium mt-1 transition-colors duration-200',
                        getLabelColor(localValue)
                    )}
                >
                    {SEVERITY_LABELS[localValue]}
                </div>
            </div>

            {/* Segmented buttons */}
            <div
                role="radiogroup"
                aria-label="Severity scale from 1 to 10"
                className="flex gap-1.5 sm:gap-2"
                onKeyDown={handleKeyDown}
            >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                    const isSelected = num === localValue;
                    const isFilled = num <= localValue;

                    return (
                        <button
                            key={num}
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={`${num} - ${SEVERITY_LABELS[num]}`}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => handleSelect(num)}
                            className={cn(
                                'flex-1 aspect-square max-w-[44px] rounded-lg border text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1',
                                isFilled
                                    ? cn(
                                          getSegmentColor(num, localValue),
                                          'text-white'
                                      )
                                    : 'bg-surface-hover/50 border-border text-text-tertiary hover:border-border-hover hover:text-text-secondary',
                                isSelected && 'ring-2 ring-offset-1 ring-offset-background ring-white/50 scale-110'
                            )}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>

            {/* Min/Max labels */}
            <div className="flex justify-between items-center text-sm font-medium text-text-tertiary px-1">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </div>
    );
};
