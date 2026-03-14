import React from 'react';
import type { Citation } from '../../types';
import { SOURCE_TIERS } from '@/lib/article-framework/constants';
import type { SourceTier } from '@/lib/article-framework/types';

interface ReferenceListProps {
    citations: Citation[];
}

const TIER_BADGE_COLORS: Record<SourceTier, string> = {
    1: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    3: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    4: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    5: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-400',
};

const ReferenceList: React.FC<ReferenceListProps> = ({ citations }) => {
    if (!citations || citations.length === 0) return null;

    return (
        <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                References
                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 font-medium">
                    {citations.length}
                </span>
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-sm text-gray-500 dark:text-gray-400">
                {citations.map((citation) => (
                    <li key={citation.id} id={`citation-${citation.id}`} className="pl-2">
                        {/* Tier badge */}
                        {citation.tier && (
                            <span
                                className={`inline-block text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded mr-2 align-middle ${TIER_BADGE_COLORS[citation.tier]}`}
                                title={SOURCE_TIERS[citation.tier]?.label}
                            >
                                T{citation.tier}
                            </span>
                        )}

                        {/* APA 7th edition format: Authors (Year). Title. Journal. DOI/URL */}
                        {citation.authors && citation.authors.length > 0 ? (
                            <span className="text-gray-700 dark:text-gray-300">
                                {citation.authors.join(', ')}
                            </span>
                        ) : (
                            <span className="text-gray-700 dark:text-gray-300">
                                {citation.source}
                            </span>
                        )}
                        {citation.year && (
                            <span className="text-gray-500 dark:text-gray-500"> ({citation.year}). </span>
                        )}
                        <span className="italic text-gray-600 dark:text-gray-400">{citation.text}</span>
                        {citation.journalName && (
                            <span className="text-gray-600 dark:text-gray-400">
                                . <em>{citation.journalName}</em>
                            </span>
                        )}
                        {citation.doi && (
                            <a
                                href={`https://doi.org/${citation.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-teal-600 hover:underline text-xs font-medium"
                            >
                                doi:{citation.doi}
                            </a>
                        )}
                        {!citation.doi && citation.link && (
                            <a
                                href={citation.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-teal-600 hover:underline text-xs font-medium"
                            >
                                View Source
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ReferenceList;
