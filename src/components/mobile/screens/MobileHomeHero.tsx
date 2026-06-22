import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/models';

/**
 * Co-located Featured hero for MobileHome (route `/`) — the screen's primary
 * richness element. One curated article shown large, with its poster image and a
 * Fraunces (`font-display`) title overlay. Screen-prefixed and NOT shared: lives
 * only with MobileHome. Tapping invokes `onClick` (the screen navigates to the
 * canonical reader). Degrades calmly to a paper card when no poster exists.
 */
export interface MobileHomeHeroProps {
    article: Article;
    onClick: () => void;
    className?: string;
}

export const MobileHomeHero: React.FC<MobileHomeHeroProps> = ({ article, onClick, className }) => {
    const poster = article.image ?? article.hero_image_url;
    const category = article.category?.name;
    const hasReadTime = typeof article.readTime === 'number';

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Read: ${article.title}`}
            className={cn(
                'group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left',
                'transition-transform duration-200 active:scale-[0.98]',
                className,
            )}
        >
            {poster ? (
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-hover">
                    <img src={poster} alt="" className="h-full w-full object-cover" />
                    {/* Bottom scrim so the title stays legible over any poster. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4">
                        {category ? (
                            <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                                {category}
                            </span>
                        ) : null}
                        <h2 className="font-display text-2xl font-semibold leading-tight text-white line-clamp-3">
                            {article.title}
                        </h2>
                        {hasReadTime ? (
                            <span className="flex items-center gap-1.5 text-xs text-white/80">
                                <Clock className="h-3.5 w-3.5" aria-hidden />
                                {article.readTime} min read
                            </span>
                        ) : null}
                    </div>
                </div>
            ) : (
                // Calm degradation — paper/surface card, no broken <img>.
                <div className="flex flex-col gap-2 p-5">
                    {category ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                            {category}
                        </span>
                    ) : null}
                    <h2 className="font-display text-2xl font-semibold leading-tight text-text-primary line-clamp-3">
                        {article.title}
                    </h2>
                    {article.description ? (
                        <p className="text-sm text-text-secondary line-clamp-2">
                            {article.description}
                        </p>
                    ) : null}
                    {hasReadTime ? (
                        <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
                            <Clock className="h-3.5 w-3.5" aria-hidden />
                            {article.readTime} min read
                        </span>
                    ) : null}
                </div>
            )}
        </button>
    );
};

export const MobileHomeHeroSkeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={cn('overflow-hidden rounded-2xl border border-border bg-surface', className)}
        aria-hidden
    >
        <div className="aspect-[3/2] w-full animate-pulse bg-surface-hover" />
    </div>
);

export default MobileHomeHero;
