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
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ---------------------------------------------------------------------------
// Category metadata
// ---------------------------------------------------------------------------
const ALL_CATEGORIES = Array.from({ length: 15 }, (_, i) => i + 1);
const categoriesToProcess = targetCategory ? [targetCategory] : ALL_CATEGORIES;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🚀 Article Content Seeder');
  console.log(`   Categories: ${categoriesToProcess.join(', ')}`);
  console.log(`   Force overwrite: ${forceOverwrite}`);
  console.log('');

  let totalProcessed = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

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
          // JSX content — render to static markup
          const element = React.createElement('div', null, article.content);
          html = renderToStaticMarkup(element);
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
