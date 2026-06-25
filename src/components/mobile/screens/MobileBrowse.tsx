import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useCategoryData } from '@/hooks/useCategoryData';
import {
    ArticleRowCard,
    ArticleRowCardSkeleton,
} from '@/components/mobile/cards/ArticleRowCard';
import { articleService } from '@/services/articleService';
import { resolveCanonicalSlug } from '@/config/taxonomy';
import type { Article } from '@/types/models';

/**
 * Mobile Browse — the "All Articles" index (route `/learn`). Each populated
 * category is its own section: the category title, then a horizontal rail of
 * that category's articles, repeated down the page and organised under the
 * three top-level groups. A "See all" link on each title opens the full
 * category. Consumes `useCategoryData` (drops empty categories) and the shared
 * `ArticleRowCard`; never re-authors them.
 */

const RAIL_LIMIT = 10;

const MobileBrowse: React.FC = () => {
    const { groups, isLoading: categoriesLoading, error } = useCategoryData();
    const [articles, setArticles] = useState<Article[]>([]);
    const [articlesLoading, setArticlesLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        articleService
            .getAll()
            .then((all) => {
                if (!cancelled) setArticles(all);
            })
            .catch((err) => {
                console.warn('[MobileBrowse] Failed to fetch articles:', err);
            })
            .finally(() => {
                if (!cancelled) setArticlesLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Articles bucketed by category slug, newest order preserved.
    const byCategory = useMemo(() => {
        const map = new Map<string, Article[]>();
        for (const a of articles) {
            // Fold legacy slugs (e.g. 'trauma-ptsd') onto canonical so rows bucket
            // under the canonical category the rail is keyed by.
            const slug = a.category?.slug ? resolveCanonicalSlug(a.category.slug) : undefined;
            if (!slug) continue;
            const bucket = map.get(slug);
            if (bucket) bucket.push(a);
            else map.set(slug, [a]);
        }
        return map;
    }, [articles]);

    const loading = categoriesLoading || articlesLoading;

    return (
        <div className="px-4 py-6">
            <header>
                <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                    Learn
                </p>
                <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">
                    All Articles
                </h1>
                <p className="mt-2 text-sm text-text-secondary">
                    Find any topic across mental health.
                </p>
            </header>

            <Link
                to="/search"
                aria-label="Search topics"
                className="mt-5 flex min-h-[44px] w-full items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-text-tertiary transition-colors hover:border-border-hover active:scale-[0.99]"
            >
                <Search size={18} className="shrink-0" aria-hidden />
                <span>Search topics…</span>
            </Link>

            {loading ? (
                <div className="mt-8 space-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <section key={i}>
                            <div className="h-5 w-44 animate-pulse rounded bg-surface-hover" />
                            <div className="-mx-4 mt-3 flex gap-3 overflow-hidden px-4">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <ArticleRowCardSkeleton key={j} className="w-64 shrink-0" />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : error ? (
                <p className="mt-6 text-sm text-text-secondary">
                    We couldn’t load topics right now. Please try again in a moment.
                </p>
            ) : (
                <div className="mt-8 space-y-10">
                    {groups.map((group) => {
                        // Only categories that actually have articles loaded.
                        const populated = group.categories.filter(
                            (cat) => (byCategory.get(cat.slug)?.length ?? 0) > 0,
                        );
                        if (populated.length === 0) return null;
                        return (
                            <div key={group.id} className="space-y-8">
                                <h2 className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                                    {group.title}
                                </h2>
                                {populated.map((cat) => {
                                    const items = (byCategory.get(cat.slug) ?? []).slice(
                                        0,
                                        RAIL_LIMIT,
                                    );
                                    return (
                                        <section key={cat.slug}>
                                            <div className="flex items-baseline justify-between gap-3">
                                                <Link
                                                    to={`/learn/${cat.slug}`}
                                                    className="font-display text-lg font-semibold leading-tight text-text-primary line-clamp-1"
                                                >
                                                    {cat.name}
                                                </Link>
                                                <Link
                                                    to={`/learn/${cat.slug}`}
                                                    className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-primary"
                                                >
                                                    See all
                                                    <ArrowRight size={12} aria-hidden />
                                                </Link>
                                            </div>
                                            <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                                {items.map((a) => (
                                                    <ArticleRowCard
                                                        key={a.id}
                                                        article={a}
                                                        showCategory={false}
                                                        className="w-64 shrink-0 snap-start"
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MobileBrowse;
