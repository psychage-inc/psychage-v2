import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryLabelProps {
    name: string;
    className?: string;
}

/**
 * The category name shown above or beside an article title. One size, title case
 * as stored (no text-transform), so every card renders category names the same way.
 */
const CategoryLabel: React.FC<CategoryLabelProps> = ({ name, className }) => (
    <span className={cn('text-xs font-semibold text-text-tertiary', className)}>{name}</span>
);

export default CategoryLabel;
