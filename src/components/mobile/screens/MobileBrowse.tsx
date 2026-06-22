import React from 'react';

/**
 * Mobile Browse — topic index (route `/learn`). Wave 1 owns this file — it is a
 * placeholder so the route resolves at the phone breakpoint. Consume
 * `useCategoryData` + `CategoryCard` from the foundation; do not duplicate.
 */
const MobileBrowse: React.FC = () => (
    <div className="px-4 py-6">
        <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
            Mobile · Wave 1 stub
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">Browse</h1>
        <p className="mt-2 text-sm text-text-secondary">
            Placeholder — Wave 1 fills this screen.
        </p>
    </div>
);

export default MobileBrowse;
