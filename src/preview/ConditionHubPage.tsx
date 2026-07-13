// Preview-only condition HUB. Thin and composed: poster, name, one-line promise (from Part 1's
// thesis.claim), three inherited StatCards, the five-part rail, one onward path, and the full
// credit line. It holds NO prose of its own. The rail communicates SHAPE, not completion, five
// different promises, no progress/checkmarks/streaks (a long-form editorial series index, not a
// course syllabus). noindex. Mascot absent.
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { PreviewStatGrid } from './PreviewStatGrid';
import { PARTS, CONDITION, partPath } from './previewContent';
import './preview.css';

export default function ConditionHubPage() {
    return (
        <div className="preview-surface min-h-screen bg-background transition-colors duration-300">
            <SEO
                title="Schizophrenia (preview) | Psychage"
                description={CONDITION.promise}
                robots="noindex, nofollow"
            />

            {/* Poster hero, CSS gradient, no external image (CSP), no mascot */}
            <header className="relative overflow-hidden">
                <div
                    className="absolute inset-0 -z-10 opacity-90"
                    style={{
                        background:
                            'radial-gradient(120% 100% at 15% 0%, rgba(26,155,140,0.16), transparent 60%), radial-gradient(120% 100% at 100% 100%, rgba(21,127,115,0.14), transparent 55%)',
                    }}
                    aria-hidden
                />
                <div className="container mx-auto max-w-content px-6 pt-20 pb-12">
                    <p className="font-display text-sm uppercase tracking-[0.2em] text-primary mb-4">
                        Conditions · An in-depth guide
                    </p>
                    <h1 className="font-display font-bold text-4xl md:text-6xl text-text-primary leading-[1.05] mb-6 max-w-3xl">
                        {CONDITION.name}
                    </h1>
                    {/* one-line promise, pulled from Part 1's thesis.claim */}
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                        {CONDITION.promise}
                    </p>
                </div>
            </header>

            <main className="container mx-auto max-w-content px-6 pb-24">
                {/* Three inherited StatCards */}
                <div className="mb-16">
                    <PreviewStatGrid stats={CONDITION.hubStats as never} />
                </div>

                {/* Guide sections, presented as an editorial index, order implies sequence, no enumeration */}
                <h2 className="font-display text-2xl text-text-primary mb-8">What this guide covers</h2>
                <ol className="grid gap-4 md:grid-cols-2">
                    {PARTS.map((p) => (
                        <li key={p.slug}>
                            <Link
                                to={partPath(p.slug)}
                                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
                            >
                                <span className="font-display text-xl text-text-primary group-hover:text-primary transition-colors mb-3">
                                    {p.title}
                                </span>
                                {/* one-line promise for the section */}
                                <p className="text-[0.95rem] text-text-secondary leading-relaxed">
                                    {p.meta.thesis_claim}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read <ArrowRight size={14} />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>

                {/* Begin reading */}
                <div className="mt-12">
                    <Link
                        to={partPath(PARTS[0].slug)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                    >
                        Start reading <ArrowRight size={16} />
                    </Link>
                </div>
            </main>
        </div>
    );
}
