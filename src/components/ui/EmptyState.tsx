import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  compact?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-8 px-4' : 'py-20 border border-dashed border-border rounded-xl',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4">
        <Icon size={32} className="text-text-tertiary" />
      </div>
      <h3 className={cn(
        'font-display font-bold text-text-primary mb-2',
        compact ? 'text-base' : 'text-2xl'
      )}>
        {title}
      </h3>
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Link
            to={action.href}
            className="text-sm font-semibold text-primary hover:underline transition-colors"
          >
            {action.label}
          </Link>
        ) : action.onClick ? (
          <button
            onClick={action.onClick}
            className="text-sm font-semibold text-primary hover:underline transition-colors"
          >
            {action.label}
          </button>
        ) : null
      )}
    </div>
  );
};

export default EmptyState;
