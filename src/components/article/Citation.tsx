import React from 'react';
import Tooltip from '../ui/Tooltip';
import { SOURCE_TIERS } from '@/lib/article-framework/constants';
import type { SourceTier } from '@/lib/article-framework/types';

interface CitationProps {
    id: string;
    index: number;
    source?: string;
    year?: string;
    tier?: SourceTier;
    journalName?: string;
    doi?: string;
}

const Citation: React.FC<CitationProps> = ({ id, index, source, year, tier, journalName, doi }) => {
    const parts: string[] = [];
    if (source) parts.push(source);
    if (journalName) parts.push(journalName);
    if (year) parts.push(`(${year})`);
    if (tier) parts.push(`[Tier ${tier}: ${SOURCE_TIERS[tier]?.label ?? ''}]`);
    if (doi) parts.push(`DOI: ${doi}`);

    const tooltipContent = parts.length > 0 ? parts.join(' · ') : 'Citation source';

    return (
        <Tooltip content={tooltipContent} position="top">
            <sup
                id={`citation-ref-${id}`}
                className="
          inline-flex items-center justify-center
          w-4 h-4 ml-0.5 -mt-2
          text-[10px] font-bold text-teal-600 dark:text-teal-400
          bg-teal-50 dark:bg-teal-900/30
          rounded-full cursor-help
          hover:bg-teal-100 dark:hover:bg-teal-900/50
          transition-colors
        "
                aria-label={`Citation ${index}`}
            >
                {index}
            </sup>
        </Tooltip>
    );
};

export default Citation;
