import React from 'react';
import { cn } from '@/lib/utils';
import { BadgeVariant } from '../../types';

interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children
}) => {
  const variants = {
    neutral: "bg-gray-100 text-gray-700 dark:bg-neutral-800/50 dark:text-neutral-300",
    success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    teal: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    sky: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400",
    rose: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
    red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    outline: "bg-transparent border border-border text-text-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;