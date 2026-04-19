import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const options = showDistance ? SORT_OPTIONS : SORT_OPTIONS.filter(o => o.value !== 'distance');
  const currentLabel = options.find(o => o.value === value)?.label || 'Relevance';

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback((optionValue: 'relevance' | 'distance' | 'name') => {
    onChange(optionValue);
    close();
  }, [onChange, close]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      const currentIndex = options.findIndex(o => o.value === value);
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((index + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((index - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectOption(options[index].value);
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        onClick={() => {
          if (isOpen) {
            close();
          } else {
            setIsOpen(true);
            const currentIndex = options.findIndex(o => o.value === value);
            setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        Sort: {currentLabel}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-20" role="listbox">
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={el => { optionRefs.current[index] = el; }}
              onClick={() => selectOption(option.value)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === option.value
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-secondary hover:bg-surface-hover'
              } ${
                focusedIndex === index
                  ? 'ring-2 ring-inset ring-primary'
                  : ''
              }`}
              role="option"
              aria-selected={value === option.value}
              tabIndex={focusedIndex === index ? 0 : -1}
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
