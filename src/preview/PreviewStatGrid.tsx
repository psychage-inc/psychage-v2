// Preview-only stat grid. Renders value+suffix VERBATIM (no count-up), so decimals and ranges
// like "0.13-0.18" or "15 / 100,000" display correctly instead of collapsing to "0" or
// overflowing the card (the shared StatCard's count-up rounds decimals to int and its big-font
// value has no wrap/measure). Responsive, no horizontal overflow.
import React from 'react';

interface PStat {
    value?: string | number;
    prefix?: string;
    suffix?: string;
    label?: string;
    source?: string;
    citation?: string;
}

function citNode(citation?: string) {
    if (!citation) return null;
    const m = String(citation).match(/\[(\d+)\]/);
    if (!m) return null;
    return (
        <sup className="text-primary font-semibold ml-0.5">
            <a href={`#ref-${m[1]}`} className="no-underline hover:underline">{m[1]}</a>
        </sup>
    );
}

export function PreviewStatGrid({ title, stats, source }: { title?: string; stats: PStat[]; source?: string }) {
    if (!stats?.length) return null;
    const cols = stats.length <= 2 ? 'sm:grid-cols-2' : stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4';
    return (
        <div className="not-prose my-9 rounded-2xl border border-border bg-surface p-6">
            {title && <p className="font-display text-base font-semibold text-text-primary mb-5">{title}</p>}
            <div className={`grid grid-cols-1 ${cols} gap-x-6 gap-y-8`}>
                {stats.map((s, i) => (
                    <div key={i} className="min-w-0 text-center sm:text-left">
                        <div className="font-display font-bold text-text-primary leading-[1.05] tabular-nums break-words text-3xl md:text-[2.1rem]">
                            {s.prefix}
                            {s.value}
                            {s.suffix ? <span className="text-[0.62em] font-semibold text-text-secondary">{s.suffix}</span> : null}
                        </div>
                        <p className="mt-2 text-[0.95rem] leading-snug text-text-secondary">
                            {s.label}
                            {citNode(s.citation)}
                        </p>
                        {s.source && <p className="mt-1 text-xs italic text-text-tertiary">{s.source}</p>}
                    </div>
                ))}
            </div>
            {source && <p className="mt-5 text-xs italic text-text-tertiary">Source: {source}</p>}
        </div>
    );
}
