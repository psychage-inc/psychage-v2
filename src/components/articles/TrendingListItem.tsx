import React from 'react';
import { Article } from '../../types/models';

// ─── Trending List Item ─────────────────────────────────────────────
// Numbered, text-only list item for the right column of the Editor's Picks
// hero. No image — just a 2-digit ranked label, title, and category/read-time
// meta row. Renders a hairline divider between items via `border-b` so
// consumers can drop them into a flex column without extra wiring.
interface TrendingListItemProps {
    article: Article;
    index: number;
    onClick: () => void;
}

const TrendingListItem: React.FC<TrendingListItemProps> = ({ article, index, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group flex items-start gap-5 w-full py-5 text-left border-b border-border last:border-b-0"
        >
            <span className="text-3xl font-bold text-border font-display leading-none shrink-0 w-8">
                {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-base text-text-primary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                    <span>{article.category.name}</span>
                    <span className="w-1 h-1 rounded-full bg-text-tertiary inline-block" />
                    <span>{article.readTime ?? 5} min read</span>
                </div>
            </div>
        </button>
    );
};

export default TrendingListItem;
