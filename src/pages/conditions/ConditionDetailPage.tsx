import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import { useAsyncData } from '@/hooks/useAsyncData';
import CrisisResourceBanner from '@/components/article/CrisisResourceBanner';
import { getConditionBySlug } from '@/services/conditionsService';
import { articleService } from '@/services/articleService';
import type { Condition, ConditionSource, DeepSection, DefinitionField } from '@/types/condition';
import { hasDefinition } from '@/types/condition';
import { TOP_GROUPS } from '@/config/taxonomy';
import type { Article } from '@/types/models';
import { getArticleUrl, getCategoryUrl } from '@/lib/articleUrl';
import ConditionListenControl from '@/components/conditions/ConditionListenControl';
import DisclaimerFooter from '@/components/conditions/DisclaimerFooter';

const SECTIONS: { key: DefinitionField; label: string }[] = [
    { key: 'short_definition', label: 'In short' },
    { key: 'what_it_feels_like', label: 'What it feels like' },
    { key: 'how_it_differs', label: 'How it differs' },
    { key: 'when_more_than_everyday', label: "When it's more than everyday" },
];

const TOP_GROUP_TITLES: Record<string, string> = Object.fromEntries(
    TOP_GROUPS.map((g) => [g.id, g.title]),
);

/** Assemble plain-text narration from the filled sections + depth layer, in reading order. */
function buildReadingText(condition: Condition): string {
    const parts = [condition.name];
    for (const { key, label } of SECTIONS) {
        const value = condition[key];
        if (value && value.trim()) parts.push(`${label}. ${value}`);
    }
    for (const section of condition.deep_sections ?? []) {
        if (section.body?.trim()) parts.push(`${section.heading}. ${section.body}`);
    }
    return parts.join('. ');
}

/** Split a section body into paragraphs (blank-line separated). */
function toParagraphs(body: string): string[] {
    return body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

const ConditionDetailPage: React.FC = () => {
    const { slug = '' } = useParams();
    const [searchParams] = useSearchParams();
    const preview = searchParams.get('preview') === '1';

    const { data: condition, loading } = useAsyncData<Condition | null>(
        () => getConditionBySlug(slug, { includeUnverified: preview }),
        [slug, preview],
    );

    const backHref = `/conditions${preview ? '?preview=1' : ''}`;
    const readingText = useMemo(
        () => (condition ? buildReadingText(condition) : ''),
        [condition],
    );

    // "Everything on X" hub link — renders only once a content editor has set
    // related_category_slug. Empty by default, so nothing shows yet.
    const relatedCategorySlug = condition?.related_category_slug ?? null;
    const { data: relatedArticles } = useAsyncData<Article[]>(
        () => (relatedCategorySlug ? articleService.getByCategory(relatedCategorySlug) : Promise.resolve([])),
        [relatedCategorySlug],
    );

    if (loading) return <DetailSkeleton backHref={backHref} />;
    if (!condition) return <NotAvailableState backHref={backHref} />;

    const hasAnyDefinition = hasDefinition(condition);

    return (
        <>
            <SEO
                title={`${condition.name} | Conditions | Psychage`}
                description={condition.short_definition ?? `${condition.name} — an ICD-11 ${condition.icd11_grouping} condition.`}
                canonical={`https://psychage.com/conditions/${condition.slug}`}
                robots={preview || condition.verification_status !== 'verified' ? 'noindex, nofollow' : undefined}
            />

            <main className="min-h-screen bg-background pb-24">
                <article className="mx-auto max-w-2xl px-5 pt-10 sm:px-6 sm:pt-14">
                    <Link
                        to={backHref}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md motion-reduce:transition-none"
                    >
                        <ArrowLeft size={16} aria-hidden="true" />
                        All conditions
                    </Link>

                    {preview && condition.verification_status !== 'verified' && (
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                            Preview — unverified draft, not yet clinically reviewed
                        </p>
                    )}

                    {/* Header */}
                    <header className="mt-6">
                        <div className="mb-4 flex flex-wrap items-center gap-2.5">
                            <span className="rounded-md bg-teal-50 px-2.5 py-1 font-mono text-sm font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                                {condition.icd11_code}
                            </span>
                            <span className="text-sm font-medium uppercase tracking-wide text-brand-accessible dark:text-teal-400">
                                {condition.icd11_grouping}
                            </span>
                            {condition.taxonomy_group && (
                                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-text-tertiary">
                                    {TOP_GROUP_TITLES[condition.taxonomy_group]}
                                </span>
                            )}
                        </div>
                        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                            {condition.name}
                        </h1>
                    </header>

                    {/* Crisis support — surfaced prominently where flagged */}
                    {condition.crisis_flag && (
                        <div className="mt-8">
                            <CrisisResourceBanner />
                        </div>
                    )}

                    {/* Listen — only when a definition exists */}
                    {hasAnyDefinition && (
                        <div className="mt-8 border-y border-border py-5">
                            <ConditionListenControl title={condition.name} text={readingText} />
                        </div>
                    )}

                    {/* Body */}
                    {hasAnyDefinition ? (
                        <div className="mt-10 space-y-10">
                            {SECTIONS.map(({ key, label }) => (
                                <Section key={key} label={label} value={condition[key]} />
                            ))}
                        </div>
                    ) : (
                        <InReviewState />
                    )}

                    {/* Depth tier — the "in depth" layer, shown when authored */}
                    {condition.deep_sections && condition.deep_sections.length > 0 && (
                        <DeepSections name={condition.name} sections={condition.deep_sections} />
                    )}

                    {/* Sources — reputable references backing the deeper content */}
                    {condition.sources && condition.sources.length > 0 && (
                        <SourcesList sources={condition.sources} />
                    )}

                    {/* Provenance */}
                    {condition.provenance && (
                        <p className="mt-12 text-sm text-text-tertiary">
                            Classification: {condition.provenance}
                        </p>
                    )}

                    {/* "Everything on X" hub — real article links, shown only when wired */}
                    {relatedCategorySlug && relatedArticles && relatedArticles.length > 0 && (
                        <RelatedReading categorySlug={relatedCategorySlug} articles={relatedArticles} />
                    )}

                    <DisclaimerFooter />
                </article>
            </main>
        </>
    );
};

/**
 * The "in depth" layer — fuller, titled sections (signs & symptoms, causes, treatment, …)
 * below the four core fields. Each body may carry multiple blank-line-separated paragraphs.
 */
const DeepSections: React.FC<{ name: string; sections: DeepSection[] }> = ({ name, sections }) => (
    <section className="mt-14 border-t border-border pt-10" aria-labelledby="cond-depth-heading">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-accessible dark:text-teal-400">
            In depth
        </p>
        <h2
            id="cond-depth-heading"
            className="mt-2 font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
        >
            Understanding {name}
        </h2>
        <div className="mt-8 space-y-10">
            {sections.map((section, i) => (
                <section key={`${section.heading}-${i}`}>
                    <h3 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                        {section.heading}
                    </h3>
                    <div className="mt-3 space-y-4">
                        {toParagraphs(section.body).map((para, j) => (
                            <p key={j} className="text-lg leading-relaxed text-text-secondary">
                                {para}
                            </p>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </section>
);

/** Reputable references backing the deeper content, rendered as outbound links. */
const SourcesList: React.FC<{ sources: ConditionSource[] }> = ({ sources }) => (
    <section className="mt-14 border-t border-border pt-8" aria-labelledby="cond-sources-heading">
        <h2
            id="cond-sources-heading"
            className="font-display text-lg font-semibold text-text-primary"
        >
            Sources
        </h2>
        <ul className="mt-4 space-y-2.5">
            {sources.map((source, i) => (
                <li key={`${source.url}-${i}`}>
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-1.5 text-sm text-text-secondary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                        <span className="underline decoration-border underline-offset-2 group-hover:decoration-primary">
                            {source.label}
                        </span>
                        <ExternalLink size={13} aria-hidden="true" className="mt-0.5 shrink-0 opacity-60" />
                    </a>
                </li>
            ))}
        </ul>
    </section>
);

/** One labelled definition section — or a calm per-field in-review note when null. */
const Section: React.FC<{ label: string; value: string | null }> = ({ label, value }) => (
    <section>
        <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
            {label}
        </h2>
        {value && value.trim() ? (
            <p className="mt-3 text-lg leading-relaxed text-text-secondary">{value}</p>
        ) : (
            <p className="mt-3 text-base italic leading-relaxed text-text-tertiary">
                This part of the definition is in review.
            </p>
        )}
    </section>
);

/** "Everything on X" — links to the related Learn article category and its top reads. */
const RelatedReading: React.FC<{ categorySlug: string; articles: Article[] }> = ({
    categorySlug,
    articles,
}) => (
    <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-xl font-semibold text-text-primary">
            Related reading
        </h2>
        <ul className="mt-4 space-y-3">
            {articles.slice(0, 4).map((article) => (
                <li key={article.id}>
                    <Link
                        to={getArticleUrl(article)}
                        className="text-base font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                        {article.title}
                    </Link>
                </li>
            ))}
        </ul>
        <Link
            to={getCategoryUrl(categorySlug)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
            See all articles in this topic
            <ArrowLeft size={14} aria-hidden="true" className="rotate-180" />
        </Link>
    </section>
);

/** Whole-page graceful state when no definition fields are present yet. */
const InReviewState: React.FC = () => (
    <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center">
        <h2 className="font-display text-xl font-semibold text-text-primary">
            Definition in review
        </h2>
        <p className="mx-auto mt-2 max-w-md text-text-secondary">
            A plain-language explanation of this condition is being prepared and clinically
            reviewed. Please check back soon.
        </p>
    </div>
);

const NotAvailableState: React.FC<{ backHref: string }> = ({ backHref }) => (
    <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6">
            <h1 className="font-display text-2xl font-bold text-text-primary">
                This condition isn’t available
            </h1>
            <p className="mx-auto mt-3 max-w-md text-text-secondary">
                It may not exist, or its entry is still in clinical review and not yet
                published.
            </p>
            <Link
                to={backHref}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to all conditions
            </Link>
        </div>
    </main>
);

const DetailSkeleton: React.FC<{ backHref: string }> = ({ backHref }) => (
    <main className="min-h-screen bg-background pb-24">
        <div className="mx-auto max-w-2xl px-5 pt-10 sm:px-6 sm:pt-14" aria-hidden="true">
            <Link to={backHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-text-tertiary">
                <ArrowLeft size={16} />
                All conditions
            </Link>
            <div className="mt-6 space-y-4">
                <div className="h-6 w-40 animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none" />
                <div className="h-10 w-3/4 animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none" />
            </div>
            <div className="mt-10 space-y-10">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="h-7 w-48 animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none" />
                        <div className="h-4 w-full animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none" />
                        <div className="h-4 w-5/6 animate-pulse rounded-md bg-surface-hover motion-reduce:animate-none" />
                    </div>
                ))}
            </div>
        </div>
    </main>
);

export default ConditionDetailPage;
