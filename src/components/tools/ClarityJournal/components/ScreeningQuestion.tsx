import React from 'react';

interface Option {
  value: number;
  label: string;
}

interface ScreeningQuestionProps {
  question: string;
  options: readonly Option[];
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ScreeningQuestion: React.FC<ScreeningQuestionProps> = ({
  question,
  options,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <fieldset className="mb-6" disabled={disabled}>
      <legend className="text-sm font-medium text-slate-700 dark:text-neutral-300 mb-3 leading-relaxed">
        {question}
      </legend>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`
                px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150
                ${isSelected
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default ScreeningQuestion;
