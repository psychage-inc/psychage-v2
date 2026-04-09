import React from 'react';
import { Clock, Bookmark } from 'lucide-react';
import { Article } from '../../types/models';
import { getCategoryTheme } from '../../config/categoryThemes';
import { formatDate } from './formatDate';

// ─── Flat Article Card ──────────────────────────────────────────────
// The editorial workhorse card used by the Learn page's "Recommended for You"
// and "Featured Reads" grids. 16:9 image, eyebrow + title + lede + tags +
// meta row, with a bookmark toggle in the top-right.
//
// Hover behavior is title-color only (no image scale, no card lift) to keep
// the page calm and editorial.
interface FlatArticleCardProps {
    article: Article;
    onNavigate: () => void;
    isBookmarked: boolean;
    onToggleBookmark: (e: React.MouseEvent) => void;
}

const FlatArticleCard: React.FC<FlatArticleCardProps> = ({
    article,
    onNavigate,
    isBookmarked: bookmarked,
    onToggleBookmark,
}) => {
    const theme = getCategoryTheme(article.category.slug);
    const FallbackIcon = theme.icon;
    const [imgError, setImgError] = React.useState(false);
    const dateStr = formatDate(article.publishedAt || article.published_at);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNavigate();
        }
    };

    return (
        <article
            className="group cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={onNavigate}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Read article: ${article.title}`}
        >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/50 bg-surface">
                {article.image && !imgError ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FallbackIcon size={40} className="text-text-tertiary opacity-25" />
                    </div>
                )}
            </div>

            <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-tertiary font-semibold uppercase tracking-wider">
                        {article.category.name}
                    </span>
                    <button
                        onClick={onToggleBookmark}
                        className="p-1.5 rounded-full hover:bg-surface-hover transition-colors"
                        aria-label={bookmarked ? 'Remove bookmark' : 'Save for later'}
                    >
                        <Bookmark
                            size={16}
                            className={bookmarked ? 'text-primary fill-primary' : 'text-text-tertiary'}
                            fill={bookmarked ? 'currentColor' : 'none'}
                        />
                    </button>
                </div>

                <h3 className="font-display font-bold text-lg text-text-primary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                </h3>

                {article.description && (
                    <p className="text-sm text-text-secondary leading-relaxed mt-1.5 line-clamp-2">
                        {article.description}
                    </p>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <p className="text-xs text-text-tertiary mt-2 line-clamp-1">
                        {article.tags.slice(0, 2).join(' · ')}
                    </p>
                )}

                <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary">
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime ?? 5} min read
                    </span>
                    {dateStr && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-text-tertiary inline-block" />
                            <span>{dateStr}</span>
                        </>
                    )}
                    {article.author && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-text-tertiary inline-block" />
                            <span>
                                {typeof article.author === 'string' ? article.author : article.author.name}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
};

export default FlatArticleCard;
