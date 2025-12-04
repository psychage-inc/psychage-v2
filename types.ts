import React from 'react';

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red';

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: number;
  author?: {
    name: string;
    role: string;
    image: string;
  };
  date?: string;
  reviewedBy?: string;
  tags?: string[];
  content?: React.ReactNode;
}
