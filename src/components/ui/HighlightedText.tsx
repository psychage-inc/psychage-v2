import React from 'react';
import { getHighlightSegments } from '../../lib/highlightText';

interface HighlightedTextProps {
    text: string;
    query: string;
    className?: string;
}

/**
 * Renders text with search query matches highlighted.
 * WCAG 2.4.7 & 1.4.1: Uses semantic <mark> with sufficient contrast and underline (not color alone).
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, query, className }) => {
    const segments = getHighlightSegments(text, query);

    if (segments.length === 1 && !segments[0].isMatch) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className}>
            {segments.map((segment, i) => {
                if (segment.isMatch) {
                    return (
                        <mark
                            key={i}
                            className="bg-teal-400/30 text-white font-semibold underline decoration-teal-400/50 decoration-1 underline-offset-2"
                        >
                            {segment.text}
                        </mark>
                    );
                }
                return <React.Fragment key={i}>{segment.text}</React.Fragment>;
            })}
        </span>
    );
};
