import { useState, useEffect } from 'react';
import { Article } from '@/types/models';
import { articleService } from '@/services/articleService';

/**
 * Fetch articles for the homepage, diversified across categories.
 * Returns one article per category, up to `limit` articles.
 */
export function useHomepageArticles(limit = 6) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        const all = await articleService.getAll();
        if (cancelled) return;

        // Group by category slug, pick the first (most recent) from each
        const seen = new Set<string>();
        const diverse: Article[] = [];
        for (const article of all) {
          const slug = article.category?.slug;
          if (!slug || seen.has(slug)) continue;
          seen.add(slug);
          diverse.push(article);
          if (diverse.length >= limit) break;
        }

        setArticles(diverse);
      } catch (err) {
        console.warn('[useHomepageArticles] Failed to fetch articles:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [limit]);

  return { articles, isLoading };
}
