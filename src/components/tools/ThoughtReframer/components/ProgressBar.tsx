import React from 'react';

const STEP_LABELS = [
  'Situation',
  'Emotions',
  'Thought',
  'Pattern',
  'Evidence For',
  'Evidence Against',
  'Reframe',
];

interface ProgressBarProps {
  current: number; // 0-indexed (0-6 for steps 1-7)
  total?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total = 7 }) => {
  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 px-4"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current + 1} of ${total}: ${STEP_LABELS[current] || ''}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              i < current
                ? 'bg-teal-500'
                : i === current
                  ? 'bg-teal-600'
                  : 'bg-gray-200'
            }`}
          />
          <span
            className={`hidden sm:block text-[10px] font-medium transition-colors ${
              i <= current ? 'text-teal-700' : 'text-gray-400'
            }`}
          >
            {STEP_LABELS[i]}
          </span>
        </div>
      ))}
    </div>
  );
};
