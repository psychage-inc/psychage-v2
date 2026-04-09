import React from 'react';
import { Clock, User } from 'lucide-react';
import { Article } from '../../types/models';
import { getCategoryTheme } from '../../config/categoryThemes';

// ─── Featured Hero Card ─────────────────────────────────────────────
// The large "Editor's Pick" card. Big aspect-video image with a reading-time
// badge overlay, then a display-font headline, lede, and a meta row.
//
// Used as the left column of the 3:2 hero split on the Learn page (and on the
// homepage's article showcase).
interface FeaturedHeroCardProps {
    article: Article;
    onClick: () => void;
}

const FeaturedHeroCard: React.FC<FeaturedHeroCardProps> = ({ article, onClick }) => {
    const theme = getCategoryTheme(article.category.slug);
    const FallbackIcon = theme.icon;
    const [imgError, setImgError] = React.useState(false);

    return (
        <button onClick={onClick} className="group text-left w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
                {article.image && !imgError ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface">
                        <FallbackIcon size={64} className="text-text-tertiary opacity-30" />
                    </div>
                )}
                {/* Reading time badge */}
                <span className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-text-primary border border-border">
                    {article.readTime ?? 5} min read
                </span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight leading-tight mt-5 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
            </h2>

            {article.description && (
                <p className="text-lg text-text-secondary leading-relaxed mt-3 line-clamp-2">
                    {article.description}
                </p>
            )}

            <div className="flex items-center gap-4 mt-4">
                {article.author && (
                    <span className="flex items-center gap-1.5 text-xs text-text-tertiary font-semibold uppercase tracking-wider">
                        <User size={14} />
                        {typeof article.author === 'string' ? article.author : article.author.name}
                    </span>
                )}
                <span className="flex items-center gap-1.5 text-xs text-text-tertiary font-semibold uppercase tracking-wider">
                    <Clock size={14} />
                    {article.readTime ?? 5} min read
                </span>
                <span className="text-xs text-text-tertiary font-semibold uppercase tracking-wider">
                    {article.category.name}
                </span>
            </div>
        </button>
    );
};

export default FeaturedHeroCard;
