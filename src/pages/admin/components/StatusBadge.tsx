import React from 'react';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    suspended: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    rejected: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    investigating: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-500',
};

interface StatusBadgeProps {
    status: string;
    label?: string;
    className?: string;
    children?: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className, children }) => {
    const normalized = status.toLowerCase();
    const style = statusStyles[normalized] || statusStyles.inactive;

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide',
                style,
                className
            )}
        >
            {children || label || status}
        </span>
    );
};

export default StatusBadge;
