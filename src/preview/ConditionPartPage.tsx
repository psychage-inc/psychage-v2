// Preview-only renderer for ONE condition part. Reuses the live app's prose styling
// (.article-prose) + the real PEAF block components, plus preview.css (bigger/higher-contrast
// reading, deeper-red callouts). noindex. Mascot absent. No reviewer credit line (removed per
// iteration 2). Prev / Next / Hub nav at the bottom of every part.
import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';
import SEO from '@/components/SEO';
import ArticleAudioPlayer from '@/components/article/ArticleAudioPlayer';
import { PreviewBlockRenderer } from './PreviewBlockRenderer';
import { getPart, PARTS, PREVIEW_BASE, type PreviewPart } from './previewContent';
import './preview.css';

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [slug]);

    if (!part) {
        return (
            <div className="preview-surface min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-text-secondary mb-4">This preview part was not found.</p>
                    <Link to={PREVIEW_BASE} className="text-primary hover:underline">
                        Back to the guide
                    </Link>
                </div>
            </div>
        );
    }

    const prev = index > 0 ? PARTS[index - 1] : null;
    const next = index < PARTS.length - 1 ? PARTS[index + 1] : null;

    return (
        <div className="preview-surface min-h-screen bg-background transition-colors duration-300">
            <SEO
                title={`${part.title} · Schizophrenia (preview) | Psychage`}
                description={part.meta.thesis_claim}
                robots="noindex, nofollow"
            />

            <div className="container mx-auto max-w-content px-6 pt-10 pb-20">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-tertiary mb-8">
                    <Link to={PREVIEW_BASE} className="hover:text-primary transition-colors">Schizophrenia</Link>
                    <ChevronRight size={14} />
                    <span className="text-text-secondary font-medium">{part.title}</span>
                </nav>

                <article className="mx-auto min-w-0 max-w-[720px]">
                    <p className="font-display text-sm uppercase tracking-wide text-primary mb-3">
                        Schizophrenia · A guide
                    </p>
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary leading-[1.12] mb-6">
                        {part.title}
                    </h1>

                    <ArticleAudioPlayer articleText={plainText(part)} articleTitle={part.title} className="mb-8" />

                    {part.enrich.summary && (
                        <p className="text-xl leading-relaxed text-text-secondary border-l-2 border-primary/40 pl-4 mb-8">
                            {part.enrich.summary}
                        </p>
                    )}

                    {part.enrich.keyFacts?.length > 0 && (
                        <div className="not-prose rounded-2xl bg-surface border border-border p-6 mb-10">
                            <p className="font-display text-sm uppercase tracking-wide text-text-tertiary mb-4">Key facts</p>
                            <ul className="space-y-3">
                                {part.enrich.keyFacts.map((kf, i) => (
                                    <li key={i} className="flex gap-3 text-[1.02rem] text-text-secondary">
                                        <span className="text-primary mt-1" aria-hidden>◇</span>
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

                    <div className="article-prose prose prose-lg max-w-none">
                        {part.body.map((block, i) => (
                            <PreviewBlockRenderer key={i} block={block} />
                        ))}
                    </div>

                    {part.enrich.sparkMoment && (
                        <p className="font-display text-2xl md:text-3xl text-text-primary leading-snug my-12 border-t border-b border-border py-8">
                            {part.enrich.sparkMoment}
                        </p>
                    )}

                    <section aria-label="References" className="not-prose mt-12">
                        <h2 className="font-display text-lg text-text-primary mb-4">References</h2>
                        <ol className="space-y-2 text-sm text-text-tertiary">
                            {part.citations.map((c) => (
                                <li key={c.n} id={`ref-${c.n}`} className="scroll-mt-32">
                                    <span className="text-text-secondary">{c.n}.</span>{' '}
                                    <span className="uppercase text-[10px] font-semibold text-primary mr-1">{c.tier}</span>
                                    {c.citation_text}{' '}
                                    {c.pmid && (
                                        <a href={pubmedUrl(c.pmid)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            PMID {c.pmid}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Prev / Next / Hub nav */}
                    <nav aria-label="Article navigation" className="mt-14 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {prev ? (
                            <Link
                                to={`${PREVIEW_BASE}/${prev.slug}`}
                                className="group flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
                            >
                                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-text-tertiary mb-1">
                                    <ChevronLeft size={14} /> Previous
                                </span>
                                <span className="font-display text-lg text-text-primary group-hover:text-primary transition-colors">{prev.title}</span>
                            </Link>
                        ) : (
                            <span aria-hidden className="hidden sm:block" />
                        )}
                        {next ? (
                            <Link
                                to={`${PREVIEW_BASE}/${next.slug}`}
                                className="group flex flex-col items-end text-right rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
                            >
                                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-text-tertiary mb-1">
                                    Next <ChevronRight size={14} />
                                </span>
                                <span className="font-display text-lg text-text-primary group-hover:text-primary transition-colors">{next.title}</span>
                            </Link>
                        ) : (
                            <Link
                                to={PREVIEW_BASE}
                                className="group flex flex-col items-end text-right rounded-2xl border border-primary/40 bg-primary/5 p-5 transition-colors hover:border-primary"
                            >
                                <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wide text-text-tertiary mb-1">
                                    Finish <ChevronRight size={14} />
                                </span>
                                <span className="font-display text-lg text-primary">Back to the guide</span>
                            </Link>
                        )}
                    </nav>

                    <div className="mt-6 text-center">
                        <Link to={PREVIEW_BASE} className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-primary transition-colors">
                            <LayoutGrid size={14} /> The full guide
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}
