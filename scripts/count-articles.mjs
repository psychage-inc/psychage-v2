import { allArticles } from '../src/data/articles/all-articles.ts';

console.log(`📚 Total articles loaded: ${allArticles.length}`);

// Group by category
const byCategory = {};
allArticles.forEach(article => {
  const catSlug = article.category?.slug || 'uncategorized';
  if (!byCategory[catSlug]) {
    byCategory[catSlug] = [];
  }
  byCategory[catSlug].push(article);
});

console.log('\nArticles by category:');
Object.keys(byCategory).sort().forEach(cat => {
  console.log(`  ${cat}: ${byCategory[cat].length} articles`);
});

// Check for issues
const noCategory = allArticles.filter(a => !a.category);
const noSlug = allArticles.filter(a => !a.slug);
const noTitle = allArticles.filter(a => !a.title);

if (noCategory.length > 0) console.log(`\n⚠️ ${noCategory.length} articles missing category`);
if (noSlug.length > 0) console.log(`⚠️ ${noSlug.length} articles missing slug`);
if (noTitle.length > 0) console.log(`⚠️ ${noTitle.length} articles missing title`);

if (noCategory.length === 0 && noSlug.length === 0 && noTitle.length === 0) {
  console.log('\n✅ All articles have required fields (category, slug, title)');
}
