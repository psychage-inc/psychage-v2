import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useHomepageArticles } from '@/hooks/useHomepageArticles';
import { ease } from '@/lib/animations';
import { cn } from '@/lib/utils';

const ContentWorld: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { articles, isLoading } = useHomepageArticles(8);

  // Only show articles that have a real category — keeps the grid clean.
  const displayArticles = articles
    .filter((a) => a.image && a.category?.name && a.category?.slug)
    .slice(0, 8);

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
    <section
      aria-label="Featured articles"
      className="py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ── Heading Area ── */}
        <motion.div
          {...sectionAnim(0)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6"
        >
          <div>
            <h2
              className={cn(
                'font-display font-bold leading-[1.15] tracking-tight',
                'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                'text-[var(--color-text-primary)]'
              )}
            >
              Start with something that speaks to you
            </h2>
            <p className="text-[13px] sm:text-sm text-[var(--color-text-tertiary)] mt-2.5 max-w-lg">
              All articles are evidence-based, peer-reviewed, and written at an
              accessible reading level.
            </p>
          </div>
          <Link
            to="/learn"
            className="text-[13px] sm:text-sm font-medium text-[var(--color-primary)] hover:[&>span]:translate-x-1 shrink-0 mt-1 md:mt-0"
          >
            Explore all articles{' '}
            <span className="inline-block transition-transform duration-200">→</span>
          </Link>
        </motion.div>

        {/* ── Article Grid ── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-[4/3] bg-[var(--color-surface-hover)] animate-pulse rounded-xl" />
                  <div className="pt-5">
                    <div className="h-3 bg-[var(--color-surface-active)] animate-pulse rounded w-[35%] mb-3" />
                    <div className="h-5 bg-[var(--color-surface-hover)] animate-pulse rounded w-[90%] mb-2" />
                    <div className="h-5 bg-[var(--color-surface-hover)] animate-pulse rounded w-[70%] mb-3" />
                    <div className="h-3 bg-[var(--color-surface-active)] animate-pulse rounded w-[50%]" />
                  </div>
                </div>
              ))
            : displayArticles.map((article, i) => (
                <motion.article key={article.slug} {...cardAnim(i)} className="flex flex-col">
                  <Link
                    to={`/learn/${article.category.slug}/${article.slug}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-surface-hover)]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[600ms] ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="pt-5 flex flex-col flex-1">
                      <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--color-primary)] font-sans">
                        {article.category.name}
                      </p>
                      <h3
                        className={cn(
                          'mt-2 font-display font-bold leading-snug tracking-tight',
                          'text-[1.05rem] sm:text-[1.1rem]',
                          'text-[var(--color-text-primary)] line-clamp-2',
                          'group-hover:text-[var(--color-primary)] transition-colors duration-200'
                        )}
                      >
                        {article.title}
                      </h3>
                      {(article.subtitle || article.summary || article.description) && (
                        <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-tertiary)] line-clamp-2 font-sans">
                          {article.subtitle || article.summary || article.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[11px] text-[var(--color-text-tertiary)] font-sans">
                        {article.author?.name && (
                          <>
                            <span className="font-medium text-[var(--color-text-secondary)]">
                              {article.author.name}
                            </span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span>{article.readTime ?? 5} min read</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
        </div>

      </div>
    </section>
  );
};

export default ContentWorld;
