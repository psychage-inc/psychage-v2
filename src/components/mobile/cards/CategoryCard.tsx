import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { CategoryWithCount } from '@/config/taxonomy';

/**
 * Shared mobile category card — wayfinding poster + title + article count.
 * Consumed by Browse, Home, and (Wave 2) Conditions A–Z. Authored once here so
 * branches consume rather than duplicate it. Links to the canonical category
 * route `/learn/<slug>`.
 */
export interface CategoryCardProps {
    category: CategoryWithCount;
    className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
    const { name, slug, image, articleCount } = category;
    return (
        <Link
            to={`/learn/${slug}`}
            className={cn(
                'group flex flex-col overflow-hidden rounded-xl border border-border bg-surface',
                'transition-all duration-200 hover:border-border-hover active:scale-[0.98]',
                className,
            )}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-hover">
                {image ? (
                    <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : null}
            </div>
            <div className="flex flex-col gap-1 p-3">
                <h3 className="font-display text-base font-semibold leading-tight text-text-primary line-clamp-2">
                    {name}
                </h3>
                <p className="text-xs text-text-tertiary">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </p>
            </div>
        </Link>
    );
};

export const CategoryCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-xl border border-border bg-surface',
            className,
        )}
        aria-hidden
    >
        <div className="aspect-[4/3] w-full animate-pulse bg-surface-hover" />
        <div className="flex flex-col gap-2 p-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-hover" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-surface-hover" />
        </div>
    </div>
);

export default CategoryCard;
