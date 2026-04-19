import React from 'react';

interface ProgressDotsProps {
    total: number;
    current: number; // 0-indexed
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
    return (
        <div className="flex justify-center gap-2 mb-8" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-text-primary' : 'w-2 bg-text-tertiary/40'
                        }`}
                />
            ))}
        </div>
    );
};
