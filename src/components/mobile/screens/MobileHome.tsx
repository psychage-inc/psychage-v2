import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Search } from 'lucide-react';
import { ArticleRowCard, ArticleRowCardSkeleton } from '@/components/mobile/cards/ArticleRowCard';
import { getRecentlyReadIds } from '@/components/articles/recentlyRead';
import { useAuth } from '@/context/AuthContext';
import { articleService } from '@/services/articleService';
import type { Article } from '@/types/models';

/**
 * Mobile Home (route `/`). Directory-first: a warm greeting, then a prominent
 * "Browse all topics" entry above the fold, a search entry, and editorial rails
 * demoted below. Intent before feed.
 *
 * Foundation wraps this screen in the crisis header + bottom nav, so we render
 * only the scroll body and own the `px-4 py-6` padding. Cards + skeletons and
 * the article/recently-read services are consumed, never duplicated.
 */

const CONTINUE_READING_LIMIT = 4;
const RECOMMENDED_LIMIT = 6;

const MobileHome: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pool, setPool] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        articleService
            .getAll()
            .then((articles) => {
                if (!cancelled) setPool(articles);
            })
            .catch((err) => {
                console.warn('[MobileHome] Failed to fetch articles:', err);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const firstName = user?.display_name?.trim().split(/\s+/)[0];
    const greeting = firstName ? `Welcome back, ${firstName}.` : 'Welcome to Psychage.';

    // Continue Reading — resolve recently-read IDs against the pool, newest first.
    const continueReading = useMemo(() => {
        const entries = getRecentlyReadIds();
        if (entries.length === 0 || pool.length === 0) return [];
        const idSet = new Set(entries.map((e) => String(e.id)));
        const orderMap = new Map(entries.map((e, i) => [String(e.id), i]));
        return pool
            .filter((a) => idSet.has(String(a.id)))
            .sort((a, b) => (orderMap.get(String(a.id)) ?? 99) - (orderMap.get(String(b.id)) ?? 99))
            .slice(0, CONTINUE_READING_LIMIT);
    }, [pool]);

    // Recommended — one article per category, preferring those with a poster image.
    const recommended = useMemo(() => {
        if (pool.length === 0) return [];
        const exclude = new Set(continueReading.map((a) => String(a.id)));
        const seenCategories = new Set<string>();
        const picks: Article[] = [];
        for (const article of pool) {
            if (picks.length >= RECOMMENDED_LIMIT) break;
            if (exclude.has(String(article.id))) continue;
            if (!article.image) continue;
            const slug = article.category?.slug;
            if (!slug || seenCategories.has(slug)) continue;
            seenCategories.add(slug);
            picks.push(article);
        }
        return picks;
    }, [pool, continueReading]);

    return (
        <div className="px-4 py-6">
            {/* Greeting */}
            <h1 className="font-display text-2xl font-semibold text-text-primary">{greeting}</h1>
            <p className="mt-1 text-sm text-text-secondary">
                Find calm, clear mental health information.
            </p>

            {/* Primary entry — Browse all topics */}
            <button
                type="button"
                onClick={() => navigate('/learn')}
                className="mt-6 flex min-h-[44px] w-full items-center gap-3 rounded-2xl bg-primary px-4 py-4 text-left text-white transition-colors duration-200 hover:bg-primary-hover active:bg-primary-hover"
            >
                <Compass className="h-6 w-6 shrink-0" aria-hidden />
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-display text-base font-semibold leading-snug">
                        Browse all topics
                    </span>
                    <span className="text-xs text-white/80">Explore the full library</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>

            {/* Search entry */}
            <button
                type="button"
                onClick={() => navigate('/search')}
                className="mt-3 flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left transition-colors duration-200 hover:bg-surface-hover active:bg-surface-hover"
            >
                <Search className="h-5 w-5 shrink-0 text-text-tertiary" aria-hidden />
                <span className="text-sm text-text-tertiary">Search articles…</span>
            </button>

            {/* Editorial rails (loading → skeletons) */}
            {isLoading ? (
                <section className="mt-8">
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ArticleRowCardSkeleton key={i} />
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    {continueReading.length > 0 && (
                        <section className="mt-8">
                            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                                Continue reading
                            </h2>
                            <div className="flex flex-col gap-1">
                                {continueReading.map((article) => (
                                    <ArticleRowCard key={article.id} article={article} />
                                ))}
                            </div>
                        </section>
                    )}

                    {recommended.length > 0 && (
                        <section className="mt-8">
                            <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                                Recommended
                            </h2>
                            <div className="flex flex-col gap-1">
                                {recommended.map((article) => (
                                    <ArticleRowCard key={article.id} article={article} />
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
};

export default MobileHome;
