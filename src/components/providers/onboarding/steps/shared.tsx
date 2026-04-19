import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-3 cursor-pointer select-none group"
  >
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-neutral-700 peer-checked:bg-teal-500 rounded-full transition-colors" />
      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5" />
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-neutral-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
      {label}
    </span>
  </label>
);

interface CheckboxGroupProps {
  title: string;
  items: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, items, selected, onToggle }) => (
  <fieldset className="space-y-3">
    <legend className="text-sm font-bold text-gray-800 dark:text-neutral-100 uppercase tracking-wider">
      {title}
    </legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {items.map(item => {
        const isChecked = selected.includes(item.id);
        return (
          <label
            key={item.id}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm',
              isChecked
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 text-gray-700 dark:text-neutral-300'
            )}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(item.id)}
              className="sr-only"
            />
            <div
              className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                isChecked
                  ? 'border-teal-500 bg-teal-500'
                  : 'border-gray-300 dark:border-neutral-600'
              )}
            >
              {isChecked && <Check size={10} className="text-white" />}
            </div>
            <span className="truncate">{item.label}</span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl p-5 border border-gray-100 dark:border-neutral-700">
    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-3">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

interface ReviewRowProps {
  label: string;
  value: string;
}

export const ReviewRow: React.FC<ReviewRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-sm text-gray-500 dark:text-neutral-400 flex-shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">{value}</span>
  </div>
);
