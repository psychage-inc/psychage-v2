import React from 'react';
import { Citation } from '../../types';

interface ReferenceListProps {
    citations: Citation[];
}

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
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-500 dark:text-gray-400">
                {citations.map((citation) => (
                    <li key={citation.id} id={`citation-${citation.id}`} className="pl-2">
                        <span className="text-gray-700 dark:text-gray-300">
                            {citation.source}
                        </span>
                        {citation.year && (
                            <span className="text-gray-500 dark:text-gray-500"> ({citation.year}). </span>
                        )}
                        <span className="italic text-gray-600 dark:text-gray-400"> {citation.text}</span>
                        {citation.link && (
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
