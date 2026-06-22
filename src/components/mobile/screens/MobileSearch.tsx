import React from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Mobile Search (route `/search?q=<query>`). Wave 1 owns this file —
 * placeholder so the route resolves at the phone breakpoint. Read the query
 * from `?q=`; render results with `ArticleRowCard`; filter facets via
 * `useCategoryData`.
 */
const MobileSearch: React.FC = () => {
    const [params] = useSearchParams();
    const q = params.get('q') ?? '';
    return (
        <div className="px-4 py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                Mobile · Wave 1 stub
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">Search</h1>
            <p className="mt-2 text-sm text-text-secondary">
                q: <span className="font-mono">{q || '(empty)'}</span>
            </p>
        </div>
    );
};

export default MobileSearch;
