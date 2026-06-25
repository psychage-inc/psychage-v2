import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { CategoryWithCount } from '@/config/taxonomy';

/**
 * Shared mobile category card — full-bleed wayfinding poster (the category name
 * is baked into the 16:9 poster, so no separate title/count is rendered).
 * Consumed by Browse, Home, and (Wave 2) Conditions A–Z. Authored once here so
 * branches consume rather than duplicate it. Links to the canonical category
 * route `/learn/<slug>`.
 */
export interface CategoryCardProps {
    category: CategoryWithCount;
    className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, className }) => {
    const { name, slug, image } = category;
    return (
        <Link
            to={`/learn/${slug}`}
            aria-label={name}
            className={cn(
                'group block overflow-hidden rounded-xl border border-border bg-surface',
                'transition-all duration-200 hover:border-border-hover active:scale-[0.98]',
                className,
            )}
        >
            <div className="relative aspect-video w-full overflow-hidden bg-surface-hover">
                {image ? (
                    <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : (
                    // No poster (e.g. family-parenting): keep the card labeled so it
                    // never renders as a blank, unlabeled box.
                    <div className="flex h-full w-full items-center justify-center p-3">
                        <span className="text-center font-display text-sm font-semibold leading-tight text-text-primary line-clamp-3">
                            {name}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export const CategoryCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={cn(
            'overflow-hidden rounded-xl border border-border bg-surface',
            className,
        )}
        aria-hidden
    >
        <div className="aspect-video w-full animate-pulse bg-surface-hover" />
    </div>
);

export default CategoryCard;
