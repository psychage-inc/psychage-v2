import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Mobile article Reader (route `/learn/:categorySlug/:articleSlug`). Wave 1
 * owns this file — placeholder so the route resolves at the phone breakpoint.
 * The bottom nav hides here; the crisis header stays. Load the article via
 * `articleService.getBySlug(articleSlug)`.
 */
const MobileReader: React.FC = () => {
    const { categorySlug, articleSlug } = useParams<{
        categorySlug: string;
        articleSlug: string;
    }>();
    return (
        <div className="px-4 py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                Mobile · Wave 1 stub
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">Reader</h1>
            <p className="mt-2 text-sm text-text-secondary">
                categorySlug: <span className="font-mono">{categorySlug}</span>
                <br />
                articleSlug: <span className="font-mono">{articleSlug}</span>
            </p>
        </div>
    );
};

export default MobileReader;
