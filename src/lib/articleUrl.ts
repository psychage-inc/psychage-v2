/**
 * Article URL Helper
 *
 * Single source of truth for generating public article URLs.
 * All components should use this instead of inline template strings.
 */

export function getArticleUrl(article: {
  slug: string;
  category: { slug: string };
}): string {
  return `/learn/${article.category.slug}/${article.slug}`;
}

export function getCategoryUrl(categorySlug: string): string {
  return `/learn/${categorySlug}`;
}
