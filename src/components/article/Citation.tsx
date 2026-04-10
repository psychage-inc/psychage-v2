import React, { useCallback } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ExternalLink } from 'lucide-react';
import { SOURCE_TIERS } from '@/lib/article-framework/constants';
import type { SourceTier } from '@/lib/article-framework/types';

const TIER_BADGE_COLORS: Record<SourceTier, string> = {
    1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400',
    2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400',
    3: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-400',
    4: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400',
    5: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-400',
};

interface CitationProps {
    id?: string;
    /** Articles often pass multiple citation ids at once */
    ids?: string[];
    index?: number;
    source?: string;
    year?: string;
    tier?: SourceTier;
    journalName?: string;
    doi?: string;
    link?: string;
    /** Alternative prop names used by some articles */
    article?: string;
    children?: React.ReactNode;
}

const SingleCitation: React.FC<{ id: string; index: number; source?: string; year?: string; tier?: SourceTier; journalName?: string; doi?: string; link?: string }> = ({
    id, index, source, year, tier, journalName, doi, link,
}) => {
    const sourceUrl = doi ? `https://doi.org/${doi}` : link;

    const scrollToReference = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const target = document.getElementById(`citation-${id}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.remove('citation-highlight');
            void target.offsetWidth;
            target.classList.add('citation-highlight');
            setTimeout(() => target.classList.remove('citation-highlight'), 2500);
        }
    }, [id]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            scrollToReference(e);
        }
    }, [scrollToReference]);

    return (
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
                <button
                    type="button"
                    id={`citation-ref-${id}`}
                    onClick={scrollToReference}
                    onKeyDown={handleKeyDown}
                    className="
                        inline-flex items-center justify-center
                        w-[18px] h-[18px] ml-0.5 -mt-2
                        text-[10px] font-bold text-primary
                        bg-primary/10
                        rounded-full cursor-pointer
                        hover:bg-teal-100 dark:hover:bg-teal-900/50
                        hover:scale-110
                        active:scale-95
                        transition-all duration-150
                        align-super
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                    "
                    aria-label={`Citation ${index} — click to view reference`}
                >
                    {index}
                </button>
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                    side="top"
                    sideOffset={8}
                    className="
                        z-[200] w-72 p-3 rounded-xl shadow-2xl
                        bg-surface
                        border border-border
                        pointer-events-auto
                        data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95
                        data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                    "
                >
                    <div className="space-y-2">
                        {source && (
                            <p className="text-sm font-semibold text-text-primary leading-snug">
                                {source}
                            </p>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                            {journalName && (
                                <span className="text-xs italic text-text-tertiary">
                                    {journalName}
                                </span>
                            )}
                            {year && (
                                <span className="text-xs text-text-tertiary">
                                    ({year})
                                </span>
                            )}
                        </div>
                        {tier && (
                            <span
                                className={`inline-block text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${TIER_BADGE_COLORS[tier]}`}
                            >
                                T{tier}: {SOURCE_TIERS[tier]?.label ?? ''}
                            </span>
                        )}
                        {sourceUrl && (
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex items-center gap-1.5 w-full mt-1 px-3 py-1.5 rounded-lg
                                    bg-primary/10
                                    text-teal-700 dark:text-teal-300
                                    text-xs font-medium
                                    hover:bg-teal-100 dark:hover:bg-teal-900/40
                                    transition-colors
                                "
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink size={12} />
                                {doi ? `doi:${doi}` : 'View Source'}
                            </a>
                        )}
                    </div>
                    <TooltipPrimitive.Arrow className="fill-surface" />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
};

const Citation: React.FC<CitationProps> = ({ id, ids, index, source, year, tier, journalName, doi, link }) => {
    // Support both single `id` and multi `ids` patterns
    const resolvedIds = ids ?? (id ? [id] : []);
    const baseIndex = index ?? 1;

    if (resolvedIds.length === 0) return null;

    return (
        <TooltipPrimitive.Provider delayDuration={200}>
            {resolvedIds.map((citeId, i) => (
                <SingleCitation
                    key={citeId}
                    id={citeId}
                    index={baseIndex + i}
                    source={source}
                    year={year}
                    tier={tier}
                    journalName={journalName}
                    doi={doi}
                    link={link}
                />
            ))}
        </TooltipPrimitive.Provider>
    );
};

export default Citation;
