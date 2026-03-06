import React from 'react';
import { MOOD_EMOJIS } from '../constants';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

const MoodSlider: React.FC<MoodSliderProps> = ({
  value,
  onChange,
  label = 'Mood',
  min = 1,
  max = 10,
}) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-3">{label}</label>
      )}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {numbers.map(n => {
          const isSelected = n === value;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${label} ${n} out of ${max}`}
              className={`
                relative flex flex-col items-center justify-center
                w-9 h-12 sm:w-10 sm:h-14 rounded-xl text-sm font-medium
                transition-all duration-150
                ${isSelected
                  ? 'bg-teal-600 text-white shadow-md scale-110 ring-2 ring-teal-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
              `}
            >
              <span className="text-xs leading-none mb-0.5">
                {(n === min || n === max || n === Math.ceil((min + max) / 2)) ? MOOD_EMOJIS[n] || '' : ''}
              </span>
              <span>{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSlider;
