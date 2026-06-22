import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Mobile Category landing (route `/learn/:categorySlug`). Wave 1 owns this file
 * — placeholder so the route resolves at the phone breakpoint. Resolve the
 * category via `useCategoryData().bySlug(categorySlug)`; list articles via
 * `articleService.getByCategory(categorySlug)`; render with `ArticleRowCard`.
 */
const MobileCategory: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    return (
        <div className="px-4 py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                Mobile · Wave 1 stub
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-text-primary">Category</h1>
            <p className="mt-2 text-sm text-text-secondary">
                categorySlug: <span className="font-mono">{categorySlug}</span>
            </p>
        </div>
    );
};

export default MobileCategory;
