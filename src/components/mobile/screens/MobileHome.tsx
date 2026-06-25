import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Search, Sparkles, Stethoscope, Wrench } from 'lucide-react';
import { ArticleRowCard, ArticleRowCardSkeleton } from '@/components/mobile/cards/ArticleRowCard';
import { CategoryCard, CategoryCardSkeleton } from '@/components/mobile/cards/CategoryCard';
import { MobileHomeHero, MobileHomeHeroSkeleton } from '@/components/mobile/screens/MobileHomeHero';
import { MobileHomeStartHere } from '@/components/mobile/screens/MobileHomeStartHere';
import { getRecentlyReadIds } from '@/components/articles/recentlyRead';
import { useAuth } from '@/context/AuthContext';
import { useCategoryData } from '@/hooks/useCategoryData';
import { useHomepageArticles } from '@/hooks/useHomepageArticles';
import { articleService } from '@/services/articleService';
import { toolService } from '@/services/toolService';
import { MobileToolCard } from '@/components/mobile/cards/MobileToolCard';
import { isComingSoon } from '@/components/mobile/cards/toolLinks';
import type { Article, Tool } from '@/types/models';

/**
 * Mobile Home (route `/`). The navigational center of the site: scroll it
 * top-to-bottom and you can reach every major area. A first-run "Start here"
 * orientation (which subsumes the old welcome band) leads, then a curated
 * Featured hero (the richness element), the primary hub entries — Browse the
 * library, Search, Symptom Navigator, Tools, Find Care — and finally
 * poster-backed topic collections and editorial rails.
 *
 * Foundation wraps this screen in the crisis header + bottom nav, so we render
 * only the scroll body and own the `px-4 py-6` padding. Cards + skeletons, the
 * homepage/category hooks, and the article/recently-read services are consumed,
 * never duplicated.
 */

const COLLECTIONS_LIMIT = 4;
const CONTINUE_READING_LIMIT = 4;
const EDITORS_PICK_LIMIT = 6;

const MobileHome: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Curated hero + category-diversified rail (shared with desktop ContentWorld).
    const { hero, rest, isLoading: articlesLoading } = useHomepageArticles(EDITORS_PICK_LIMIT);
    // Poster-backed topic collections.
    const { categories, isLoading: categoriesLoading } = useCategoryData();

    // Tools preview (#85) — first few launchable tools; full hub one tap away.
    const [toolsPreview, setToolsPreview] = useState<Tool[]>([]);
    const [toolsLoading, setToolsLoading] = useState(true);
    useEffect(() => {
        let cancelled = false;
        toolService
            .getAll()
            .then((data) => {
                if (!cancelled) setToolsPreview(data.filter((t) => !isComingSoon(t.id)).slice(0, 4));
            })
            .catch((err) => {
                console.warn('[MobileHome] Failed to fetch tools:', err);
            })
            .finally(() => {
                if (!cancelled) setToolsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Separate pool for Continue Reading — resolve recently-read IDs locally.
    const [pool, setPool] = useState<Article[]>([]);
    useEffect(() => {
        let cancelled = false;
        articleService
            .getAll()
            .then((articles) => {
                if (!cancelled) setPool(articles);
            })
            .catch((err) => {
                console.warn('[MobileHome] Failed to fetch articles:', err);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const firstName = user?.display_name?.trim().split(/\s+/)[0];
    const greeting = firstName ? `Welcome back, ${firstName}.` : 'Welcome to Psychage.';

    // Collections — categories that carry a poster image, capped for a tidy grid.
    const collections = useMemo(
        () => categories.filter((c) => !!c.image).slice(0, COLLECTIONS_LIMIT),
        [categories],
    );

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

    const openHero = () => {
        if (!hero) return;
        const categorySlug = hero.category?.slug;
        navigate(categorySlug ? `/learn/${categorySlug}/${hero.slug}` : '/learn');
    };

    return (
        <div className="px-4 py-6">
            {/* First-run "Start here" — the single welcome element (subsumes the
                old greeting band). Collapses to a slim entry once seen. */}
            <MobileHomeStartHere greeting={greeting} />

            {/* Featured hero — the primary richness element */}
            {articlesLoading ? (
                <MobileHomeHeroSkeleton className="mt-6" />
            ) : hero ? (
                <MobileHomeHero className="mt-6" article={hero} onClick={openHero} />
            ) : null}

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

            {/* Symptom Navigator CTA — calm, non-diagnostic, no mascot */}
            <button
                type="button"
                onClick={() => navigate('/tools/symptom-navigator')}
                className="mt-3 flex min-h-[44px] w-full items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4 text-left transition-colors duration-200 hover:bg-surface-hover active:bg-surface-hover"
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                    <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-display text-base font-semibold leading-snug text-text-primary">
                        Not sure where to start?
                    </span>
                    <span className="text-xs text-text-secondary">
                        Explore what you&rsquo;re feeling with the Symptom Navigator.
                    </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-text-tertiary" aria-hidden />
            </button>

            {/* Tools — 2-col preview grid (#85); full hub one tap away via "See all" */}
            <section className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                        <Wrench className="h-4 w-4" aria-hidden />
                        Tools
                    </h2>
                    <button
                        type="button"
                        onClick={() => navigate('/tools')}
                        className="inline-flex min-h-touch items-center gap-1 text-sm font-semibold text-primary"
                    >
                        See all
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                </div>
                {toolsLoading ? (
                    <div className="grid grid-cols-2 gap-3" aria-hidden>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-40 animate-pulse rounded-3xl bg-surface-hover" />
                        ))}
                    </div>
                ) : toolsPreview.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                        {toolsPreview.map((tool) => (
                            <MobileToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : null}
            </section>

            {/* Find Care — make the provider directory reachable by scrolling Home */}
            <button
                type="button"
                onClick={() => navigate('/providers')}
                className="mt-3 flex min-h-[44px] w-full items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4 text-left transition-colors duration-200 hover:bg-surface-hover active:bg-surface-hover"
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hover text-text-secondary">
                    <Stethoscope className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-display text-base font-semibold leading-snug text-text-primary">
                        Find Care
                    </span>
                    <span className="text-xs text-text-secondary">
                        Browse mental health providers.
                    </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-text-tertiary" aria-hidden />
            </button>

            {/* Topic collections — poster-backed category cards */}
            {categoriesLoading ? (
                <section className="mt-8">
                    <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                        Topic collections
                    </h2>
                    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {Array.from({ length: COLLECTIONS_LIMIT }).map((_, i) => (
                            <CategoryCardSkeleton key={i} className="w-40 shrink-0" />
                        ))}
                    </div>
                </section>
            ) : collections.length > 0 ? (
                <section className="mt-8">
                    <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                        Topic collections
                    </h2>
                    <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {collections.map((category) => (
                            <CategoryCard
                                key={category.slug}
                                category={category}
                                className="w-40 shrink-0 snap-start"
                            />
                        ))}
                    </div>
                </section>
            ) : null}

            {/* Continue Reading — personalized, shown only when there's history */}
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

            {/* Editor's Pick — category-diversified rail */}
            {articlesLoading ? (
                <section className="mt-8">
                    <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                        Editor&rsquo;s Pick
                    </h2>
                    <div className="flex flex-col gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ArticleRowCardSkeleton key={i} />
                        ))}
                    </div>
                </section>
            ) : rest.length > 0 ? (
                <section className="mt-8">
                    <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                        Editor&rsquo;s Pick
                    </h2>
                    <div className="flex flex-col gap-1">
                        {rest.map((article) => (
                            <ArticleRowCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    );
};

export default MobileHome;
