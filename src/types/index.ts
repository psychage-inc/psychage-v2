import React from 'react';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red' | 'outline';

export interface BaseProps {
    className?: string;
    children?: React.ReactNode;
}

export * from './models';
