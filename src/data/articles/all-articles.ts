/**
 * All Articles Aggregator — lazy, per-category chunks.
 *
 * Each category becomes its own Rollup chunk via import.meta.glob. Consumers
 * call loadAllArticles() which fetches every category in parallel and caches
 * the flattened result. This avoids the single 36 MB bundle that resulted
 * from static `import * as catNN` declarations.
 */

import type { Article } from '@/types/models';

const categoryLoaders = import.meta.glob<Record<string, unknown>>(
  './category-*/index.ts',
);
const eatingBodyLoader = import.meta.glob<Record<string, unknown>>(
  './eating-body/index.ts',
);

function flattenCategoryModule(categoryModule: Record<string, unknown>): Article[] {
  const articles: Article[] = [];
  for (const value of Object.values(categoryModule)) {
    if (Array.isArray(value)) {
      articles.push(...(value as Article[]));
    }
  }
  return articles;
}

let _cached: Article[] | null = null;

export async function loadAllArticles(): Promise<Article[]> {
  if (_cached) return _cached;

  const loaders = [
    ...Object.values(categoryLoaders),
    ...Object.values(eatingBodyLoader),
  ];

  const modules = await Promise.all(loaders.map((load) => load()));
  const articles: Article[] = [];
  for (const mod of modules) {
    articles.push(...flattenCategoryModule(mod));
  }

  _cached = articles;
  return articles;
}
