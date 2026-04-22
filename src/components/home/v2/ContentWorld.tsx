import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useHomepageArticles } from '@/hooks/useHomepageArticles';
import { ease } from '@/lib/animations';
import { useBookmarks } from '@/context/BookmarkContext';
import { getArticleUrl } from '@/lib/articleUrl';
import { Article } from '@/types/models';
import FeaturedHeroCard from '@/components/articles/FeaturedHeroCard';
import TrendingListItem from '@/components/articles/TrendingListItem';
import FlatArticleCard from '@/components/articles/FlatArticleCard';
import { saveRecentlyRead } from '@/components/articles/recentlyRead';
import AuthModal from '@/components/auth/AuthModal';

// ─── Featured reads section ─────────────────────────────────────────
// Mirrors the Learn page's editorial treatment on the homepage:
//   1. Editor's Picks hero — one large featured card + four numbered
//      "Trending" list items in a 3:2 split.
//   2. A 6-card flat grid built from FlatArticleCard, with bookmark and
//      recently-read wiring so the homepage feeds Learn's rails.
//
// Container width (max-w-7xl) and section spacing (py-20/28/32) stay aligned
// with the rest of the homepage so the editorial cards drop in without
// disrupting the page rhythm.
const ContentWorld: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Hero is editorially chosen from the featured-article pool (cornerstone
  // clinical topics); rest is 10 category-diversified articles for the
  // trending list (4) and the grid (6).
  const { hero: heroArticle, rest, isLoading } = useHomepageArticles(10);
  const trendingArticles = rest.slice(0, 4);
  const gridArticles = rest.slice(4, 10);

  const handleArticleClick = useCallback(
    (article: Article) => {
      saveRecentlyRead(article.id);
      navigate(getArticleUrl(article));
    },
    [navigate]
  );

  const handleToggleBookmark = useCallback(
    (articleId: string | number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      const toggled = toggleBookmark(articleId);
      if (!toggled) {
        setShowAuthModal(true);
      }
    },
    [toggleBookmark]
  );

  const sectionAnim = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, delay, ease: ease.decelerate },
        };

  const cardAnim = (i: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, delay: 0.08 + i * 0.08, ease: ease.decelerate },
        };

  return (
    <section aria-label="Featured reads" className="py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {isLoading ? (
          <ContentWorldSkeleton />
        ) : (
          <>
            {/* ── Block 1: Editor's Picks hero ── */}
            {heroArticle && (
              <>
                <motion.div {...sectionAnim(0)}>
                  <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mb-2">
                    Editor's Picks
                  </p>
                  <p className="text-sm text-text-tertiary mb-10">
                    2,000+ articles · 15 topics · ~5 min avg read
                  </p>
                </motion.div>

                <motion.div
                  {...sectionAnim(0.05)}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16"
                >
                  <div className="lg:col-span-3">
                    <FeaturedHeroCard
                      article={heroArticle}
                      onClick={() => handleArticleClick(heroArticle)}
                    />
                  </div>

                  {trendingArticles.length > 0 && (
                    <div className="lg:col-span-2 flex flex-col">
                      <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mb-4">
                        Trending
                      </p>
                      {trendingArticles.map((article, i) => (
                        <TrendingListItem
                          key={article.id}
                          article={article}
                          index={i}
                          onClick={() => handleArticleClick(article)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {/* ── Divider ── */}
            {gridArticles.length > 0 && heroArticle && (
              <div className="border-t border-border mt-20 pt-16" />
            )}

            {/* ── Block 2: Featured Reads grid ── */}
            {gridArticles.length > 0 && (
              <>
                <motion.div
                  {...sectionAnim(0)}
                  className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6 mb-10"
                >
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary tracking-tight">
                      Start with something that speaks to you
                    </h2>
                    <p className="text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                      Evidence-based, peer-reviewed, written at an accessible reading level.
                    </p>
                  </div>
                  <Link
                    to="/learn"
                    className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-2 shrink-0"
                  >
                    Explore all articles <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridArticles.map((article, i) => (
                    <motion.div key={article.id} {...cardAnim(i)}>
                      <FlatArticleCard
                        article={article}
                        onNavigate={() => handleArticleClick(article)}
                        isBookmarked={isBookmarked(article.id)}
                        onToggleBookmark={handleToggleBookmark(article.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </section>
  );
};

// ─── Skeleton ───────────────────────────────────────────────────────
// Mirrors the new layout: hero on the left, four stacked text rows on the
// right, then a 6-card grid below the divider. Uses the same surface-hover
// pulse tokens as the original ContentWorld for a consistent homepage feel.
const SkeletonPulse: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-[var(--color-surface-hover)] rounded-md ${className}`} />
);

const ContentWorldSkeleton: React.FC = () => (
  <div role="status" aria-label="Loading featured articles">
    {/* Editor's Picks header */}
    <SkeletonPulse className="h-3 w-24 mb-3" />
    <SkeletonPulse className="h-3 w-56 mb-10" />

    {/* Hero + trending */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
      <div className="lg:col-span-3">
        <SkeletonPulse className="aspect-video w-full rounded-xl" />
        <SkeletonPulse className="h-10 w-3/4 mt-5" />
        <SkeletonPulse className="h-6 w-full mt-3" />
        <SkeletonPulse className="h-6 w-2/3 mt-2" />
        <div className="flex gap-4 mt-4">
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-24" />
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col">
        <SkeletonPulse className="h-3 w-16 mb-4" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start gap-5 py-5 border-b border-border last:border-b-0"
          >
            <SkeletonPulse className="h-8 w-8 shrink-0" />
            <div className="flex-1">
              <SkeletonPulse className="h-5 w-full" />
              <SkeletonPulse className="h-5 w-2/3 mt-1" />
              <SkeletonPulse className="h-3 w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-border mt-20 pt-16" />

    {/* Grid header */}
    <SkeletonPulse className="h-8 w-80 mb-3" />
    <SkeletonPulse className="h-4 w-96 mb-10" />

    {/* 6-card grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i}>
          <SkeletonPulse className="aspect-[16/9] w-full rounded-lg" />
          <SkeletonPulse className="h-3 w-20 mt-4" />
          <SkeletonPulse className="h-6 w-full mt-2" />
          <SkeletonPulse className="h-6 w-2/3 mt-1" />
          <SkeletonPulse className="h-4 w-full mt-2" />
          <SkeletonPulse className="h-3 w-1/3 mt-3" />
        </div>
      ))}
    </div>

    <span className="sr-only">Loading featured articles, please wait...</span>
  </div>
);

export default ContentWorld;
