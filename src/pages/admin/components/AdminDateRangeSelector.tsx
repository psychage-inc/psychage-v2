import React from 'react';
import { cn } from '@/lib/utils';
import type { DateRange } from '@/types/admin';

interface AdminDateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const options: { label: string; value: DateRange }[] = [
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: 'All', value: 'all' },
];

const AdminDateRangeSelector: React.FC<AdminDateRangeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('inline-flex gap-0.5 p-1 rounded-lg bg-surface-hover border border-border', className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200',
            value === opt.value
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default AdminDateRangeSelector;
