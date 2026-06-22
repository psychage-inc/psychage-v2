import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import SEO from '@/components/SEO';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getConditionBySlug } from '@/services/conditionsService';
import { articleService } from '@/services/articleService';
import ArticleCard from '@/components/article/ArticleCard';
import { getArticleUrl } from '@/lib/articleUrl';
import type { Condition } from '@/types/condition';
import type { Article } from '@/types/models';

/**
 * Condition-filtered article list — the "See all" target from a condition page's
 * Related articles section. Lists every PUBLISHED article linked to this condition
 * via linked_condition_ids, cornerstone-first (ordering comes from the service).
 */
const ConditionArticlesPage: React.FC = () => {
    const { slug = '' } = useParams();
    const navigate = useNavigate();

    const { data, loading } = useAsyncData<{ condition: Condition | null; articles: Article[] }>(
        async () => {
            const condition = await getConditionBySlug(slug);
            if (!condition?.id) return { condition, articles: [] };
            const articles = await articleService.getByConditionId(condition.id);
            return { condition, articles };
        },
        [slug],
    );

    if (loading) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </main>
        );
    }

    const condition = data?.condition ?? null;
    const articles = data?.articles ?? [];

    if (!condition) {
        return (
            <main className="min-h-screen bg-background">
                <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
                    <h1 className="font-display text-2xl font-bold text-text-primary">
                        This condition isn’t available
                    </h1>
                    <Link
                        to="/conditions"
                        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        Back to all conditions
                    </Link>
                </div>
            </main>
        );
    }

    const conditionHref = `/conditions/${condition.slug}`;

    return (
        <>
            <SEO
                title={`Articles about ${condition.name} | Conditions | Psychage`}
                description={`Published articles related to ${condition.name}.`}
                robots={condition.verification_status !== 'verified' ? 'noindex, nofollow' : undefined}
            />

            <main className="min-h-screen bg-background pb-24">
                <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6 sm:pt-14">
                    <Link
                        to={conditionHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md motion-reduce:transition-none"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        {condition.name}
                    </Link>

                    <header className="mt-6">
                        <span className="text-sm font-medium uppercase tracking-wide text-brand-accessible dark:text-teal-400">
                            {condition.icd11_grouping}
                        </span>
                        <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                            Articles about {condition.name}
                        </h1>
                        <div className="mt-4 flex items-center gap-2 text-text-secondary">
                            <BookOpen size={18} aria-hidden="true" />
                            <span>{articles.length} {articles.length === 1 ? 'article' : 'articles'}</span>
                        </div>
                    </header>

                    {articles.length > 0 ? (
                        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    onClick={() => navigate(getArticleUrl(article))}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
                            <h2 className="font-display text-xl font-semibold text-text-primary">
                                No related articles yet
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-text-secondary">
                                We haven’t linked any published articles to this condition yet. Check back soon.
                            </p>
                            <Link
                                to={conditionHref}
                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                            >
                                <ArrowLeft size={14} aria-hidden="true" />
                                Back to {condition.name}
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default ConditionArticlesPage;
