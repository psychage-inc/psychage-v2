import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryData } from '@/hooks/useCategoryData';
import { useAsyncData } from '@/hooks/useAsyncData';
import { articleService } from '@/services/articleService';
import {
    ArticleRowCard,
    ArticleRowCardSkeleton,
} from '@/components/mobile/cards/ArticleRowCard';
import type { Article } from '@/types/models';

/**
 * Mobile Category landing (route `/learn/:categorySlug`). Resolves the category
 * via the shared `useCategoryData().bySlug` (which also maps legacy aliases),
 * then lists that category's articles as a clean vertical list of
 * `ArticleRowCard` — no horizontal rail, no buried "See all". The user is
 * already inside the category, so the per-row category badge is suppressed.
 */

const SKELETON_ROWS = 6;

const MobileCategory: React.FC = () => {
    const { categorySlug = '' } = useParams<{ categorySlug: string }>();
    const { bySlug, isLoading: categoryLoading } = useCategoryData();
    const category = bySlug(categorySlug);

    // Fetch by the canonical `category.slug` so legacy-alias slugs load the
    // right list. No category yet → resolve empty (the branches below cover the
    // loading / not-found cases).
    const { data: articles, loading: articlesLoading } = useAsyncData<Article[]>(
        () => (category ? articleService.getByCategory(category.slug) : Promise.resolve([])),
        [category?.slug],
    );

    // Grouped taxonomy still loading — `bySlug` returns undefined until it
    // resolves, so show a calm skeleton rather than a premature not-found.
    if (categoryLoading) {
        return <CategoryLoading />;
    }

    // Unknown/legacy slug that doesn't resolve — calm not-found, never a crash.
    if (!category) {
        return <CategoryNotFound />;
    }

    const articleCount = category.articleCount;

    return (
        <div className="px-4 py-6">
            <header className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-text-primary">
                    {category.name}
                </h1>
                {category.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {category.description}
                    </p>
                ) : null}
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                </p>
            </header>

            {articlesLoading ? (
                <ul className="flex flex-col" aria-hidden>
                    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                        <li key={i}>
                            <ArticleRowCardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : articles && articles.length > 0 ? (
                <ul className="flex flex-col">
                    {articles.map((article) => (
                        <li key={article.id}>
                            <ArticleRowCard article={article} showCategory={false} />
                        </li>
                    ))}
                </ul>
            ) : (
                <CategoryEmpty />
            )}
        </div>
    );
};

/** Skeleton header + rows while the grouped taxonomy resolves. */
const CategoryLoading: React.FC = () => (
    <div className="px-4 py-6" aria-hidden>
        <div className="mb-6">
            <div className="h-7 w-2/3 animate-pulse rounded bg-surface-hover" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-surface-hover" />
            <div className="mt-2 h-3 w-1/4 animate-pulse rounded bg-surface-hover" />
        </div>
        <ul className="flex flex-col">
            {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <li key={i}>
                    <ArticleRowCardSkeleton />
                </li>
            ))}
        </ul>
    </div>
);

/** Calm not-found for an unknown slug — a way back, not an error wall. */
const CategoryNotFound: React.FC = () => (
    <div className="px-4 py-6">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
            Topic not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            We couldn't find that topic. It may have moved or been renamed.
        </p>
        <Link
            to="/learn"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-brand-accessible dark:text-teal-400"
        >
            Back to all topics
        </Link>
    </div>
);

/** Calm empty state — the category resolved but has no articles yet. */
const CategoryEmpty: React.FC = () => (
    <p className="text-sm leading-relaxed text-text-secondary">
        No articles here yet. Check back soon.
    </p>
);

export default MobileCategory;
