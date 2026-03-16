import React from 'react';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, active, disabled, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      'p-1.5 rounded transition-colors',
      active
        ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
        : 'text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800',
      disabled && 'opacity-40 cursor-not-allowed'
    )}
  >
    {children}
  </button>
);

export default ToolbarButton;
