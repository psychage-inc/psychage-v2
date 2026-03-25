import React, {} from 'react';
import { VisuallyHidden } from './VisuallyHidden';

interface LiveRegionProps {
    politeMessage: string;
    assertiveMessage: string;
    // To ensure React re-renders when the same message is sent again, we might need a key or id.
    // In our implementation we'll assume the context always updates the string or we can rely on TextNode updates. 
    // To be safe we will append a non-breaking space or similar if the string is identical, or assume the parent handles deduplication.
}

export const LiveRegion: React.FC<LiveRegionProps> = ({ politeMessage, assertiveMessage }) => {
    return (
        <div aria-live="off" className="sr-only">
            {/* Polite region for routine updates (e.g., step transitions) */}
            <VisuallyHidden aria-live="polite" aria-atomic="true">
                {politeMessage}
            </VisuallyHidden>

            {/* Assertive region for critical updates (e.g., errors, crisis alerts) */}
            <VisuallyHidden aria-live="assertive" aria-atomic="true">
                {assertiveMessage}
            </VisuallyHidden>
        </div>
    );
};
