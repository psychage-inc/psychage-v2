import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/models';

/**
 * Shared mobile article-row card — horizontal thumbnail + title + meta.
 * Consumed by Browse, Category, Search, and Home. Authored once here so
 * branches consume rather than duplicate it. Links to the canonical reader
 * route `/learn/<categorySlug>/<articleSlug>`.
 */
export interface ArticleRowCardProps {
    article: Article;
    className?: string;
    /** Show the category name in the meta line. Default true. */
    showCategory?: boolean;
}

export const ArticleRowCard: React.FC<ArticleRowCardProps> = ({
    article,
    className,
    showCategory = true,
}) => {
    const href = `/learn/${article.category.slug}/${article.slug}`;
    const hasReadTime = typeof article.readTime === 'number';
    const categoryName = showCategory ? article.category?.name : undefined;
    const meta = [hasReadTime ? `${article.readTime} min read` : null, categoryName]
        .filter(Boolean)
        .join(' · ');

    return (
        <Link
            to={href}
            className={cn(
                'group flex min-h-[44px] items-center gap-3 rounded-xl p-2',
                'transition-colors duration-200 hover:bg-surface-hover active:bg-surface-hover',
                className,
            )}
        >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-hover">
                {article.image ? (
                    <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : null}
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="font-display text-sm font-semibold leading-snug text-text-primary line-clamp-2">
                    {article.title}
                </h3>
                {meta ? <p className="truncate text-xs text-text-tertiary">{meta}</p> : null}
            </div>
        </Link>
    );
};

export const ArticleRowCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('flex items-center gap-3 rounded-xl p-2', className)} aria-hidden>
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-surface-hover" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-4 w-5/6 animate-pulse rounded bg-surface-hover" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-surface-hover" />
        </div>
    </div>
);

export default ArticleRowCard;
