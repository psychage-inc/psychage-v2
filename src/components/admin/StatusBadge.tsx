import React from 'react';
import { cn } from '@/lib/utils';

type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'urgent' | 'default';

const statusMap: Record<string, StatusVariant> = {
  published: 'success',
  active: 'success',
  approved: 'success',
  success: 'success',
  psychage_verified: 'success',
  featured: 'success',
  draft: 'warning',
  pending: 'warning',
  in_review: 'warning',
  more_info_requested: 'warning',
  npi_verified: 'info',
  WATCH: 'info',
  viewer: 'info',
  rejected: 'danger',
  suspended: 'danger',
  error: 'danger',
  failed: 'danger',
  CRISIS: 'danger',
  super_admin: 'danger',
  URGENT: 'urgent',
  clinical_admin: 'urgent',
  unverified: 'default',
  // Article Command Center
  paused: 'urgent',
  archived: 'default',
  suggestion: 'info',
  needs_fix: 'warning',
  critical: 'danger',
  // Article Production System — review stages
  planned: 'default',
  researched: 'info',
  drafted: 'warning',
  // in_review already mapped above
  // approved already mapped above
  // published already mapped above
  // Derivative statuses
  reviewed: 'info',
};

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  urgent: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  default: 'bg-surface-hover text-text-secondary',
};

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

const AdminStatusBadge: React.FC<StatusBadgeProps> = ({ status, variant, className }) => {
  const resolvedVariant = variant || statusMap[status] || 'default';
  const displayLabel = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[resolvedVariant],
        className
      )}
    >
      {displayLabel}
    </span>
  );
};

export default AdminStatusBadge;
