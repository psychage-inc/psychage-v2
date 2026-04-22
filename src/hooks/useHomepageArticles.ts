import { useState, useEffect } from 'react';
import { Article } from '@/types/models';
import { articleService } from '@/services/articleService';

// Cornerstone article slugs — foundational clinical topics that belong in the
// homepage hero rotation. Kept in sync with
// supabase/migrations/20260422000001_mark_cornerstone_articles_featured.sql so
// the mock-data fallback picks the same articles as the seeded Supabase rows.
const CORNERSTONE_SLUGS: ReadonlySet<string> = new Set([
  'what-are-emotions-beginners-guide',
  'what-is-anxiety-complete-guide',
  'four-attachment-styles-how-early-bonds-shape-adult-love',
  'what-is-depression-comprehensive-guide',
  'why-sleep-foundation-mental-health-research',
  'what-is-psychological-trauma-clear-guide',
]);

function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Fetch articles for the homepage.
 *
 * - `hero`: a featured cornerstone article (editorially chosen), rotated
 *   randomly per mount. Falls back to a cornerstone-slug match in the
 *   general pool, then to the first available article if nothing matches.
 * - `rest`: up to `limit` articles diversified across categories, excluding
 *   the hero so it doesn't appear twice.
 */
export function useHomepageArticles(limit = 6) {
  const [hero, setHero] = useState<Article | undefined>();
  const [rest, setRest] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        const [featured, all] = await Promise.all([
          articleService.getFeatured().catch(() => [] as Article[]),
          articleService.getAll(),
        ]);
        if (cancelled) return;

        const cornerstoneFromAll = all.filter((a) => CORNERSTONE_SLUGS.has(a.slug));
        const heroPool =
          featured.length > 0 ? featured : cornerstoneFromAll.length > 0 ? cornerstoneFromAll : all;
        // Prefer articles with a poster image; fall back to the full pool if none have images.
        const posterPool = heroPool.filter((a) => !!a.image);
        const chosenHero = pickRandom(posterPool.length > 0 ? posterPool : heroPool);

        // Diversify the remainder by category, excluding the hero's slug.
        const seen = new Set<string>();
        if (chosenHero?.category?.slug) seen.add(chosenHero.category.slug);
        const diverse: Article[] = [];
        for (const article of all) {
          if (chosenHero && article.slug === chosenHero.slug) continue;
          const slug = article.category?.slug;
          if (!slug || seen.has(slug)) continue;
          seen.add(slug);
          diverse.push(article);
          if (diverse.length >= limit) break;
        }

        setHero(chosenHero);
        setRest(diverse);
      } catch (err) {
        console.warn('[useHomepageArticles] Failed to fetch articles:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { hero, rest, isLoading };
}
