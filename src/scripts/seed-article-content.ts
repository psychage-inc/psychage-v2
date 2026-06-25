/**
 * Seed Article Content into Supabase
 *
 * Converts JSX article content to HTML via renderToStaticMarkup and
 * updates the `content` column in the Supabase `articles` table.
 *
 * Usage:
 *   npx tsx src/scripts/seed-article-content.ts                    # All articles
 *   npx tsx src/scripts/seed-article-content.ts --category 8       # Single category
 *   npx tsx src/scripts/seed-article-content.ts --force             # Overwrite existing
 *   npx tsx src/scripts/seed-article-content.ts --slugs a,b,c       # Only these slugs
 *   npx tsx src/scripts/seed-article-content.ts --slugs @file.txt   # Slugs from file (one per line, or comma-separated)
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { UNSAFE_LocationContext, UNSAFE_NavigationContext } from 'react-router-dom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

// ---------------------------------------------------------------------------
// Supabase client (uses service role for direct DB access)
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY environment variables');
  console.error('   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const catFlagIdx = args.indexOf('--category');
const targetCategory = catFlagIdx >= 0 ? parseInt(args[catFlagIdx + 1], 10) : null;
const forceOverwrite = args.includes('--force');

// --slugs <comma-separated | @file>: restrict seeding to an explicit allowlist of
// slugs. Used to re-seed ONLY a known set of articles (e.g. the broken-HTML targets)
// without touching unrelated rows. When omitted, all matched articles are processed.
const slugsFlagIdx = args.indexOf('--slugs');
const slugFilter: Set<string> | null = (() => {
  if (slugsFlagIdx < 0) return null;
  const raw = args[slugsFlagIdx + 1];
  if (!raw) {
    console.error('❌ --slugs requires a value (comma-separated list or @file)');
    process.exit(1);
  }
  let text = raw;
  if (raw.startsWith('@')) {
    const filePath = path.resolve(process.cwd(), raw.slice(1));
    if (!fs.existsSync(filePath)) {
      console.error(`❌ --slugs file not found: ${filePath}`);
      process.exit(1);
    }
    text = fs.readFileSync(filePath, 'utf-8');
  }
  const set = new Set(
    text
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
  );
  if (set.size === 0) {
    console.error('❌ --slugs resolved to an empty list');
    process.exit(1);
  }
  return set;
})();

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------
// Discover every category-NN directory that exists on disk, so an explicit
// --slugs allowlist can reach targets in higher-numbered categories. Falls back
// to the historical 1..22 window if discovery turns up nothing.
function discoverCategories(): number[] {
  const dir = path.join(__dirname, '..', 'data', 'articles');
  try {
    const nums = fs
      .readdirSync(dir)
      .map((name) => name.match(/^category-(\d+)$/)?.[1])
      .filter((n): n is string => Boolean(n))
      .map((n) => parseInt(n, 10))
      .sort((a, b) => a - b);
    if (nums.length) return nums;
  } catch {
    /* fall through */
  }
  return Array.from({ length: 22 }, (_, i) => i + 1);
}

const ALL_CATEGORIES = discoverCategories();
const categoriesToProcess = targetCategory ? [targetCategory] : ALL_CATEGORIES;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🚀 Article Content Seeder');
  console.log(`   Categories: ${categoriesToProcess.join(', ')}`);
  console.log(`   Force overwrite: ${forceOverwrite}`);
  if (slugFilter) console.log(`   Slug allowlist: ${slugFilter.size} slug(s)`);
  console.log('');

  let totalProcessed = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  // Track which allowlisted slugs we actually matched against a JSX article, so we
  // can warn about any requested slug that has no JSX source in the processed categories.
  const matchedSlugs = new Set<string>();

  for (const catNum of categoriesToProcess) {
    const catPad = String(catNum).padStart(2, '0');
    const catDir = path.join(__dirname, '..', 'data', 'articles', `category-${catPad}`);

    console.log(`\n📦 Category ${catNum}`);

    // Import the category module
    let catModule: Record<string, unknown>;
    try {
      catModule = await import(path.join(catDir, 'index.ts'));
    } catch (err) {
      console.warn(`  ⚠️  Failed to import category ${catNum}:`, (err as Error).message);
      continue;
    }

    // Flatten articles
    const articles: any[] = [];
    for (const value of Object.values(catModule)) {
      if (Array.isArray(value)) {
        articles.push(...value);
      }
    }

    console.log(`  📄 ${articles.length} articles found`);

    for (const article of articles) {
      totalProcessed++;
      const slug = article.slug;

      if (!slug) {
        console.warn(`  ⚠️  Article missing slug, skipping`);
        totalSkipped++;
        continue;
      }

      // When a --slugs allowlist is provided, only process those exact slugs.
      if (slugFilter && !slugFilter.has(slug)) {
        totalSkipped++;
        continue;
      }
      if (slugFilter) matchedSlugs.add(slug);

      // Check if article exists in DB and whether content is already set
      const { data: existing, error: fetchErr } = await supabase
        .from('articles')
        .select('id, content, slug, article_production_id')
        .or(`slug.eq.${slug},article_production_id.eq.${(article.id || '').toString().toUpperCase()}`)
        .maybeSingle();

      if (fetchErr) {
        console.warn(`  ⚠️  DB lookup failed for "${slug}":`, fetchErr.message);
        totalFailed++;
        continue;
      }

      if (!existing) {
        console.warn(`  ⚠️  Article "${slug}" not found in DB (not seeded yet)`);
        totalSkipped++;
        continue;
      }

      if (existing.content && !forceOverwrite) {
        totalSkipped++;
        continue;
      }

      // Convert JSX content to HTML
      let html: string;
      try {
        if (!article.content) {
          html = `<p>${escapeHtml(article.description || '')}</p>`;
        } else if (typeof article.content === 'string') {
          html = article.content;
        } else {
          // JSX content — render to static markup with mock Router context
          const mockLocation = {
            pathname: `/articles/${slug}`,
            search: '',
            hash: '',
            state: null,
            key: 'default',
          };

          const mockNavigator = {
            createHref: (to: any) => typeof to === 'string' ? to : to.pathname || '/',
            push: () => {},
            replace: () => {},
            go: () => {},
            back: () => {},
            forward: () => {},
          };

          const content = React.createElement('div', null, article.content);
          const wrappedElement = React.createElement(
            UNSAFE_LocationContext.Provider,
            { value: { location: mockLocation, navigationType: 'POP' } },
            React.createElement(
              UNSAFE_NavigationContext.Provider,
              { value: { basename: '', navigator: mockNavigator as any, static: true } },
              content
            )
          );
          html = renderToStaticMarkup(wrappedElement);
        }
      } catch (renderErr) {
        console.warn(
          `  ⚠️  Render failed for "${slug}": ${(renderErr as Error).message}`
        );
        // Fallback to description
        html = `<p>${escapeHtml(article.description || '')}</p>`;
        totalFailed++;
      }

      // Estimate word count from HTML
      const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const wordCount = textContent.split(' ').filter(Boolean).length;

      // Update in Supabase
      const { error: updateErr } = await supabase
        .from('articles')
        .update({
          content: html,
          content_format: 'html',
          word_count: wordCount,
        })
        .eq('id', existing.id);

      if (updateErr) {
        console.warn(`  ❌  Update failed for "${slug}":`, updateErr.message);
        totalFailed++;
        continue;
      }

      totalUpdated++;
      if (totalUpdated % 25 === 0) {
        process.stdout.write(`  ✅ ${totalUpdated} articles updated...\r`);
      }
    }

    console.log(`  ✅ Category ${catNum} done`);
  }

  console.log(`\n🎉 Content seeding complete!`);
  console.log(`   Processed: ${totalProcessed}`);
  console.log(`   Updated:   ${totalUpdated}`);
  console.log(`   Skipped:   ${totalSkipped}`);
  console.log(`   Failed:    ${totalFailed}`);

  if (slugFilter) {
    const unmatched = [...slugFilter].filter((s) => !matchedSlugs.has(s));
    console.log(`   Slug allowlist matched: ${matchedSlugs.size}/${slugFilter.size}`);
    if (unmatched.length) {
      console.warn(`   ⚠️  ${unmatched.length} requested slug(s) had no JSX source in processed categories:`);
      for (const s of unmatched.slice(0, 20)) console.warn(`        - ${s}`);
      if (unmatched.length > 20) console.warn(`        … and ${unmatched.length - 20} more`);
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
