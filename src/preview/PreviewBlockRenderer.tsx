// Preview-only JSON -> PEAF-block renderer. Maps each block {type, ...props} onto the
// EXISTING article block components (reuse; nothing reimplemented). Preview surface only.
import React from 'react';
import {
    ArticleCallout,
    ComparisonTable,
    ArticleAccordion,
    ArticleTabs,
    QuoteBlock,
    HighlightBox,
    ProgressSteps,
    BeforeAfter,
    MythVsFactBlock,
    ArticleChart,
    DiagramBlock,
} from '@/components/article/blocks';
import { PreviewStatGrid } from './PreviewStatGrid';
import { MermaidBlock } from './MermaidBlock';
import type { PreviewBlock } from './previewContent';

/** Render inline [n] citation markers as superscript links to the reference list. */
export function withCitations(text: string): React.ReactNode {
    if (!text) return text;
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((seg, i) => {
        const m = seg.match(/^\[(\d+)\]$/);
        if (m) {
            const n = m[1];
            return (
                <sup key={i} className="text-primary font-semibold">
                    <a href={`#ref-${n}`} className="no-underline hover:underline">
                        {n}
                    </a>
                </sup>
            );
        }
        return <React.Fragment key={i}>{seg}</React.Fragment>;
    });
}

/** Prose block: optional heading + paragraphs split on blank lines, with inline citations. */
function Prose({ block }: { block: PreviewBlock }) {
    const heading = block.heading as string | undefined;
    const id = block.id as string | undefined;
    const text = (block.text as string) || '';
    const paras = text.split(/\n\n+/).filter(Boolean);
    return (
        <>
            {heading && (
                <h2 id={id} className="scroll-mt-32">
                    {heading}
                </h2>
            )}
            {paras.map((p, i) => (
                <p key={i}>{withCitations(p)}</p>
            ))}
        </>
    );
}

export function PreviewBlockRenderer({ block }: { block: PreviewBlock }) {
    switch (block.type) {
        case 'prose':
            return <Prose block={block} />;

        case 'ComparisonTable':
            return (
                <ComparisonTable
                    title={block.title as string}
                    headers={block.columns as string[]}
                    rows={block.rows as (string | boolean)[][]}
                    caption={block.caption as string}
                />
            );

        case 'ArticleCallout':
            return (
                <ArticleCallout
                    variant={block.variant as never}
                    title={block.title as string}
                    content={withCitations((block.content as string) || '')}
                />
            );

        case 'StatCard':
        case 'Stats':
            return (
                <PreviewStatGrid
                    title={block.title as string}
                    stats={block.stats as never}
                    source={block.source as string}
                />
            );

        case 'MythVsFactBlock':
            return (
                <MythVsFactBlock
                    myth={block.myth as string}
                    fact={block.fact as string}
                    source={block.source as string}
                />
            );

        case 'ArticleAccordion':
            return (
                <ArticleAccordion
                    type={(block.accordionType as 'single' | 'multiple') || 'multiple'}
                    items={block.items as never}
                />
            );

        case 'QuoteBlock':
            return (
                <QuoteBlock
                    quote={block.quote as string}
                    attribution={block.attribution as string}
                    source={block.source as string}
                />
            );

        case 'ArticleTabs':
            return <ArticleTabs tabs={block.tabs as never} />;

        case 'HighlightBox': {
            // Coerce to a valid HighlightBox variant; anything else (e.g. "default") would crash it.
            const hv = ['stat', 'quote', 'emphasis'].includes(block.variant as string)
                ? (block.variant as never)
                : ('emphasis' as never);
            return <HighlightBox variant={hv}>{withCitations((block.children as string) || '')}</HighlightBox>;
        }

        case 'ProgressSteps':
            return <ProgressSteps steps={block.steps as never} />;

        case 'BeforeAfter':
            return <BeforeAfter before={block.before as never} after={block.after as never} />;

        case 'DiagramBlock':
            return (
                <figure className="not-prose my-8">
                    <DiagramBlock
                        type={block.diagramType as never}
                        title={block.title as string}
                        items={block.items as never}
                        source={block.source as string}
                    />
                    {block.a11y_summary && (
                        <figcaption className="sr-only">{block.a11y_summary as string}</figcaption>
                    )}
                    {block.caption && (
                        <figcaption className="mt-2 text-sm italic text-text-tertiary text-center">
                            {block.caption as string}
                        </figcaption>
                    )}
                </figure>
            );

        case 'Chart':
        case 'ArticleChart':
            return (
                <figure className="not-prose my-9">
                    <ArticleChart
                        type={(block.chartType as never) || 'bar'}
                        title={block.title as string}
                        description={block.description as string}
                        data={block.data as never}
                        source={block.source as string}
                    />
                    {block.a11y_summary ? (
                        <figcaption className="sr-only">{block.a11y_summary as string}</figcaption>
                    ) : null}
                    {block.caption ? (
                        <figcaption className="mt-2 text-sm italic text-text-tertiary text-center">
                            {block.caption as string}
                        </figcaption>
                    ) : null}
                </figure>
            );

        case 'Mermaid':
            return (
                <MermaidBlock
                    diagram={block.diagram as string}
                    a11y_summary={block.a11y_summary as string}
                    caption={block.caption as string}
                    title={block.title as string}
                />
            );

        // RelatedToolsBlock intentionally dropped in iteration 2 (replaced by Prev/Next page nav).
        default:
            // Unknown block type, render nothing rather than crash.
            return null;
    }
}
