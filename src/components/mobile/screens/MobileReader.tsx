import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { useArticleService } from '@/services/articleService';
import { useCategoryData } from '@/hooks/useCategoryData';
import { ArticleRowCard, ArticleRowCardSkeleton } from '@/components/mobile/cards/ArticleRowCard';
import ArticleAudioPlayer from '@/components/article/ArticleAudioPlayer';
import ArticleHtmlRenderer from '@/components/article/ArticleHtmlRenderer';
import DisclaimerFooter from '@/components/conditions/DisclaimerFooter';
import type { Article } from '@/types/models';
import '@/styles/article-prose.css';

/**
 * Mobile article Reader (route `/learn/:categorySlug/:articleSlug`). The phone
 * foundation hides the bottom nav here and keeps the crisis header.
 *
 * The breadcrumb "Group › Category" doubles as a reliable, context-preserving
 * back affordance: tapping the category returns to its landing even on a cold
 * deep-link load where browser history has no category entry. Consumes the
 * shared service/hook/cards and the existing `ArticleAudioPlayer` — no new
 * audio engine, no data-model change.
 */
const MobileReader: React.FC = () => {
    const { categorySlug, articleSlug } = useParams<{
        categorySlug: string;
        articleSlug: string;
    }>();
    const articleService = useArticleService();
    const { bySlug, groups } = useCategoryData();

    const [article, setArticle] = useState<Article | undefined>();
    const [related, setRelated] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    // Body ref → plain text for TTS (mirrors ArticlePage's rAF extraction).
    const bodyRef = useRef<HTMLDivElement>(null);
    const [plainText, setPlainText] = useState('');

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            if (!articleSlug) return;
            setLoading(true);
            try {
                const found = await articleService.getBySlug(articleSlug);
                if (cancelled) return;
                setArticle(found);
                if (found && categorySlug) {
                    const all = await articleService.getByCategory(categorySlug);
                    if (cancelled) return;
                    // Cap to a tidy "related" list — a full category can hold dozens.
                    setRelated(all.filter((a) => a.slug !== found.slug).slice(0, 6));
                } else {
                    setRelated([]);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Failed to load article', error);
                    setArticle(undefined);
                    setRelated([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [articleSlug, categorySlug, articleService]);

    // Reset scroll when moving to a fresh article.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleSlug]);

    // Extract plain text once the body is rendered (content is set before
    // `loading` flips false, so this depends on both).
    useEffect(() => {
        if (loading || !article?.content) return;
        const raf = requestAnimationFrame(() => {
            const el = bodyRef.current;
            if (el) setPlainText(el.textContent || '');
        });
        return () => cancelAnimationFrame(raf);
    }, [article?.content, loading]);

    // Resolve the category (canonical slug + name) and its top-level group title.
    const category = categorySlug ? bySlug(categorySlug) : undefined;
    const groupTitle = useMemo(() => {
        if (!category) return undefined;
        return groups.find((g) => g.categories.some((c) => c.slug === category.slug))?.title;
    }, [groups, category]);

    if (loading) {
        return (
            <div className="px-4 py-6" aria-busy="true">
                <div className="h-3 w-40 animate-pulse rounded bg-surface-hover" />
                <div className="mt-4 h-8 w-11/12 animate-pulse rounded bg-surface-hover" />
                <div className="mt-2 h-8 w-3/4 animate-pulse rounded bg-surface-hover" />
                <div className="mt-6 h-10 w-full animate-pulse rounded-full bg-surface-hover" />
                <div className="mt-8 space-y-4">
                    <div className="h-4 w-full animate-pulse rounded bg-surface-hover" />
                    <div className="h-4 w-full animate-pulse rounded bg-surface-hover" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-surface-hover" />
                </div>
                <div className="mt-10 space-y-3">
                    <ArticleRowCardSkeleton />
                    <ArticleRowCardSkeleton />
                    <ArticleRowCardSkeleton />
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
                <h1 className="font-display text-xl font-semibold text-text-primary">
                    We couldn&apos;t find that article
                </h1>
                <p className="mt-2 max-w-prose text-sm text-text-secondary">
                    It may have moved. Browse the rest of this topic, or head back to all topics.
                </p>
                <div className="mt-6 flex flex-col items-stretch gap-3">
                    {categorySlug && (
                        <Link
                            to={`/learn/${categorySlug}`}
                            className="flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white"
                        >
                            {category ? `Back to ${category.name}` : 'Back to this topic'}
                        </Link>
                    )}
                    <Link
                        to="/learn"
                        className="flex min-h-[44px] items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-text-secondary"
                    >
                        Browse all topics
                    </Link>
                </div>
            </div>
        );
    }

    const hasReadTime = typeof article.readTime === 'number';

    return (
        <div className="px-4 py-6">
            {/* Breadcrumb — the reliable, context-preserving back affordance. */}
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-sm text-text-tertiary"
            >
                {groupTitle && (
                    <>
                        <span>{groupTitle}</span>
                        <ChevronRight size={14} className="shrink-0" aria-hidden="true" />
                    </>
                )}
                {category ? (
                    <Link
                        to={`/learn/${category.slug}`}
                        className="flex min-h-[44px] items-center font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        {category.name}
                    </Link>
                ) : (
                    categorySlug && (
                        <Link
                            to={`/learn/${categorySlug}`}
                            className="flex min-h-[44px] items-center font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            Back to topic
                        </Link>
                    )
                )}
            </nav>

            {/* Title + meta. */}
            <header className="mt-1">
                <h1 className="font-display text-2xl font-semibold leading-tight text-text-primary">
                    {article.title}
                </h1>
                {hasReadTime && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-text-tertiary">
                        <Clock size={14} className="text-primary" aria-hidden="true" />
                        <span>{article.readTime} min read</span>
                    </div>
                )}
            </header>

            {/* Hero image, if present. */}
            {article.image && (
                <div className="mt-5 overflow-hidden rounded-2xl bg-surface-hover">
                    <img
                        src={article.image}
                        alt=""
                        loading="lazy"
                        className="h-auto w-full object-cover"
                    />
                </div>
            )}

            {/* Persistent listen control — existing audio engine, not a new one. */}
            <div className="mt-5">
                <ArticleAudioPlayer
                    audioUrl={article.audioUrl}
                    articleText={plainText}
                    articleTitle={article.title}
                />
            </div>

            {/* Article body — canonical prose styling, same string/JSX branch as desktop. */}
            <div ref={bodyRef} className="article-prose prose prose-lg mt-8 max-w-none">
                {!article.content ? (
                    <p className="text-text-secondary">{article.description}</p>
                ) : typeof article.content === 'string' ? (
                    <ArticleHtmlRenderer html={article.content} />
                ) : (
                    article.content
                )}
            </div>

            {/* Related articles in this category. */}
            {related.length > 0 && (
                <section className="mt-10">
                    <h2 className="font-display text-lg font-semibold text-text-primary">
                        {category ? `More in ${category.name}` : 'More in this topic'}
                    </h2>
                    <div className="mt-3 space-y-1">
                        {related.map((a) => (
                            <ArticleRowCard key={a.id} article={a} showCategory={false} />
                        ))}
                    </div>
                </section>
            )}

            {/* Non-diagnostic educational disclaimer (SR-3). */}
            <DisclaimerFooter />
        </div>
    );
};

export default MobileReader;
