import React, { useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Citation } from '../../types';
import { SOURCE_TIERS } from '@/lib/article-framework/constants';
import type { SourceTier } from '@/lib/article-framework/types';

const TIER_BADGE_COLORS: Record<SourceTier, string> = {
    1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    3: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    4: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    5: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-400',
};

interface ReferenceListProps {
    citations: Citation[];
}

const BackLink: React.FC<{ citationId: string; index: number }> = ({ citationId, index }) => {
    const scrollBack = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById(`citation-ref-${citationId}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.remove('citation-highlight');
            void target.offsetWidth;
            target.classList.add('citation-highlight');
            setTimeout(() => target.classList.remove('citation-highlight'), 2500);
        }
    }, [citationId]);

    return (
        <a
            href={`#citation-ref-${citationId}`}
            onClick={scrollBack}
            className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs text-teal-500 hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded transition-colors"
            aria-label={`Jump back to citation ${index} in text`}
            title="Jump back to citation in text"
        >
            ↩
        </a>
    );
};

const ReferenceList: React.FC<ReferenceListProps> = ({ citations }) => {
    if (!citations || citations.length === 0) return null;

    return (
        <ol className="space-y-6">
            {citations.map((citation, idx) => {
                const sourceUrl = citation.doi
                    ? `https://doi.org/${citation.doi}`
                    : citation.link;

                return (
                    <li
                        key={citation.id}
                        id={`citation-${citation.id}`}
                        className="relative pl-8 py-3 rounded-lg transition-colors"
                    >
                        {/* Reference number */}
                        <span className="absolute left-0 top-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500 dark:text-gray-400">
                            {idx + 1}
                        </span>

                        <div className="space-y-2">
                            {/* Top row: tier badge + back-link */}
                            <div className="flex items-center gap-2">
                                {citation.tier && (
                                    <span
                                        className={`inline-block text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full ${TIER_BADGE_COLORS[citation.tier]}`}
                                        title={SOURCE_TIERS[citation.tier]?.label}
                                    >
                                        T{citation.tier}
                                    </span>
                                )}
                                <BackLink citationId={citation.id} index={idx + 1} />
                            </div>

                            {/* APA 7th edition format */}
                            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {/* Authors or source */}
                                {citation.authors && citation.authors.length > 0 ? (
                                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                                        {citation.authors.join(', ')}
                                    </span>
                                ) : (
                                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                                        {citation.source}
                                    </span>
                                )}

                                {/* Year */}
                                {citation.year && (
                                    <span className="text-gray-500 dark:text-gray-500">
                                        {' '}({citation.year}).{' '}
                                    </span>
                                )}

                                {/* Title */}
                                <span className="italic text-gray-700 dark:text-gray-300">
                                    {citation.text}
                                </span>

                                {/* Journal */}
                                {citation.journalName && (
                                    <span className="text-gray-600 dark:text-gray-400">
                                        . <em>{citation.journalName}</em>
                                    </span>
                                )}
                            </div>

                            {/* Source link — prominent pill button */}
                            {sourceUrl ? (
                                <a
                                    href={sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                        bg-teal-50 dark:bg-teal-900/20
                                        text-teal-700 dark:text-teal-300
                                        text-xs font-medium
                                        hover:bg-teal-100 dark:hover:bg-teal-900/40
                                        transition-colors
                                    "
                                >
                                    <ExternalLink size={13} />
                                    {citation.doi ? `doi:${citation.doi}` : 'View Source'}
                                </a>
                            ) : (
                                <span className="inline-block text-xs text-gray-400 dark:text-gray-600 italic">
                                    Source not available online
                                </span>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};

export default ReferenceList;
