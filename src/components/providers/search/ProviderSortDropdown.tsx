import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProviderSortDropdownProps {
  value: string;
  onChange: (value: 'relevance' | 'distance' | 'name') => void;
  showDistance?: boolean;
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'distance', label: 'Distance' },
  { value: 'name', label: 'Name A-Z' },
] as const;

export const ProviderSortDropdown: React.FC<ProviderSortDropdownProps> = ({
  value,
  onChange,
  showDistance = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const options = showDistance ? SORT_OPTIONS : SORT_OPTIONS.filter(o => o.value !== 'distance');
  const currentLabel = options.find(o => o.value === value)?.label || 'Relevance';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-surface-hover transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        Sort: {currentLabel}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-20" role="listbox">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === option.value
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover'
              }`}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderSortDropdown;
