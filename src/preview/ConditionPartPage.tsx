// Preview-only renderer for ONE condition part. Reuses the live app's prose styling
// (.article-prose) + the real PEAF block components. noindex. Mascot absent.
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import ArticleAudioPlayer from '@/components/article/ArticleAudioPlayer';
import { PreviewBlockRenderer } from './PreviewBlockRenderer';
import { getPart, PARTS, PREVIEW_BASE, CONDITION, type PreviewPart } from './previewContent';

function plainText(part: PreviewPart): string {
    return part.body
        .filter((b) => b.type === 'prose')
        .map((b) => ((b.text as string) || '').replace(/\[\d+\]/g, ''))
        .join('\n\n');
}

function pubmedUrl(pmid?: string | null) {
    return pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : undefined;
}

export default function ConditionPartPage() {
    const { slug } = useParams();
    const part = slug ? getPart(slug) : undefined;
    const index = useMemo(() => PARTS.findIndex((p) => p.slug === slug), [slug]);

    if (!part) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-text-secondary mb-4">This preview part was not found.</p>
                    <Link to={PREVIEW_BASE} className="text-primary hover:underline">
                        Back to the guide
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <SEO
                title={`${part.title} · Schizophrenia (preview) | Psychage`}
                description={part.meta.thesis_claim}
                robots="noindex, nofollow"
            />

            <div className="container mx-auto max-w-content px-6 pt-10 pb-20">
                {/* Breadcrumb / part indicator */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 text-sm text-text-tertiary mb-8"
                >
                    <Link to={PREVIEW_BASE} className="hover:text-primary transition-colors">
                        Schizophrenia
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-text-secondary font-medium">
                        Part {part.part_id} of {PARTS.length}
                    </span>
                </nav>

                <article className="mx-auto min-w-0 max-w-[720px]">
                    <p className="font-display text-sm uppercase tracking-wide text-primary mb-3">
                        Part {part.part_id} · Schizophrenia
                    </p>
                    <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary leading-[1.15] mb-6">
                        {part.title}
                    </h1>

                    {/* Audio player at the top */}
                    <ArticleAudioPlayer
                        articleText={plainText(part)}
                        articleTitle={part.title}
                        className="mb-8"
                    />

                    {/* Summary, rendered in-article on Part 1 only */}
                    {part.enrich.summary && (
                        <p className="text-lg leading-relaxed text-text-secondary border-l-2 border-primary/40 pl-4 mb-8">
                            {part.enrich.summary}
                        </p>
                    )}

                    {/* Key facts */}
                    {part.enrich.keyFacts?.length > 0 && (
                        <div className="not-prose rounded-2xl bg-surface border border-border p-6 mb-10">
                            <p className="font-display text-sm uppercase tracking-wide text-text-tertiary mb-4">
                                Key facts
                            </p>
                            <ul className="space-y-3">
                                {part.enrich.keyFacts.map((kf, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-text-secondary">
                                        <span className="text-primary mt-1" aria-hidden>
                                            ◇
                                        </span>
                                        <span>
                                            {kf.text}
                                            {kf.citationIndex ? (
                                                <sup className="text-primary font-semibold ml-0.5">
                                                    <a href={`#ref-${kf.citationIndex}`}>{kf.citationIndex}</a>
                                                </sup>
                                            ) : null}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Body, real prose styling + real PEAF blocks */}
                    <div className="article-prose prose prose-lg max-w-none">
                        {part.body.map((block, i) => (
                            <PreviewBlockRenderer key={i} block={block} />
                        ))}
                    </div>

                    {/* Spark moment */}
                    {part.enrich.sparkMoment && (
                        <p className="font-display text-xl md:text-2xl text-text-primary leading-snug my-12 border-t border-b border-border py-8">
                            {part.enrich.sparkMoment}
                        </p>
                    )}

                    {/* References */}
                    <section aria-label="References" className="not-prose mt-12">
                        <h2 className="font-display text-lg text-text-primary mb-4">References</h2>
                        <ol className="space-y-2 text-sm text-text-tertiary">
                            {part.citations.map((c) => (
                                <li key={c.n} id={`ref-${c.n}`} className="scroll-mt-32">
                                    <span className="text-text-secondary">{c.n}.</span>{' '}
                                    <span className="uppercase text-[10px] font-semibold text-primary mr-1">
                                        {c.tier}
                                    </span>
                                    {c.citation_text}{' '}
                                    {c.pmid && (
                                        <a
                                            href={pubmedUrl(c.pmid)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            PMID {c.pmid}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Reviewer credit line */}
                    <p className="mt-10 text-sm italic text-text-tertiary">{part.meta.reviewer_credit}</p>

                    {/* Prev / hub nav */}
                    <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                        {index > 0 ? (
                            <Link
                                to={`${PREVIEW_BASE}/${PARTS[index - 1].slug}`}
                                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                            >
                                <ArrowLeft size={16} /> {PARTS[index - 1].title}
                            </Link>
                        ) : (
                            <Link
                                to={PREVIEW_BASE}
                                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                            >
                                <ArrowLeft size={16} /> The guide
                            </Link>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
