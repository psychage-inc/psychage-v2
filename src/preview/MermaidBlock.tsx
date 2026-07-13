// Preview-only Mermaid diagram block. Dynamic-imports `mermaid` (so it is tree-shaken out of the
// production bundle along with the rest of the preview tree). Auto-layout fixes the cramped,
// text-overflowing fixed-size SVG DiagramBlock. CSP-safe: mermaid runs inline JS/CSS, no external
// fetch. a11y_summary rendered sr-only; caption visible. Falls back to the a11y text on error.
import React, { useEffect, useRef, useState } from 'react';

let mermaidReady: Promise<typeof import('mermaid').default> | null = null;
function loadMermaid() {
    if (!mermaidReady) {
        mermaidReady = import('mermaid').then((m) => {
            const mermaid = m.default;
            mermaid.initialize({
                startOnLoad: false,
                securityLevel: 'strict',
                theme: 'base',
                // Satoshi (the brand body font) is safe here because we await document.fonts.ready
                // before rendering, so node-width measurement uses the real, loaded font. Labels
                // are kept short (single line) so boxes always contain their text.
                fontFamily: 'Satoshi, system-ui, -apple-system, sans-serif',
                themeVariables: {
                    primaryColor: '#EAF6F3',
                    primaryBorderColor: '#0E7C6F',
                    primaryTextColor: '#141018',
                    secondaryColor: '#F4F1EA',
                    tertiaryColor: '#EAF6F3',
                    lineColor: '#9A948C',
                    fontSize: '15px',
                    fontFamily: 'Satoshi, system-ui, sans-serif',
                },
                flowchart: {
                    htmlLabels: true,
                    curve: 'basis',
                    useMaxWidth: true,
                    padding: 18,
                    nodeSpacing: 62,
                    rankSpacing: 62,
                },
            });
            return mermaid;
        });
    }
    return mermaidReady;
}

let idCounter = 0;

export function MermaidBlock({
    diagram,
    a11y_summary,
    caption,
    title,
}: {
    diagram: string;
    a11y_summary?: string;
    caption?: string;
    title?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            const mermaid = await loadMermaid();
            // Wait for fonts so text-width measurement (which sizes the node boxes) is correct.
            try {
                if (document.fonts?.ready) await document.fonts.ready;
            } catch {
                /* no-op */
            }
            if (cancelled) return;
            idCounter += 1;
            try {
                const { svg } = await mermaid.render(`pv-mermaid-${idCounter}`, diagram);
                if (!cancelled && ref.current) ref.current.innerHTML = svg;
            } catch {
                if (!cancelled) setError(true);
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, [diagram]);

    return (
        <figure className="not-prose my-9 rounded-2xl border border-border bg-surface p-6">
            {title && <figcaption className="font-display text-base font-semibold text-text-primary mb-4">{title}</figcaption>}
            <div className="pv-scroll-x flex justify-center">
                {error ? (
                    <p className="text-sm text-text-secondary">{a11y_summary || 'Diagram unavailable.'}</p>
                ) : (
                    <div ref={ref} className="mermaid-mount w-full" role="img" aria-label={a11y_summary || title || 'diagram'} />
                )}
            </div>
            {a11y_summary && <figcaption className="sr-only">{a11y_summary}</figcaption>}
            {caption && <figcaption className="mt-3 text-sm italic text-text-tertiary text-center">{caption}</figcaption>}
        </figure>
    );
}
