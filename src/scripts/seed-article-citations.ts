/**
 * Seed Article Citations into Supabase
 *
 * Extracts citations from TSX article data and inserts them into the
 * `article_citations` table, then updates citation counts on each article.
 *
 * Usage:
 *   npx tsx src/scripts/seed-article-citations.ts                  # All articles
 *   npx tsx src/scripts/seed-article-citations.ts --category 8     # Single category
 *   npx tsx src/scripts/seed-article-citations.ts --force          # Delete + re-insert
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

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
// Supabase client
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
// Source type inference
// ---------------------------------------------------------------------------
function inferSourceType(tier: number, source?: string): string {
  // Try to infer more specific type from source name
  const s = (source || '').toLowerCase();

  if (tier === 2) {
    if (s.includes('nimh') || s.includes('nih')) return 'nimh';
    if (s.includes('who')) return 'who';
    if (s.includes('cdc')) return 'cdc';
    if (s.includes('samhsa')) return 'samhsa';
    return 'government';
  }
  if (tier === 3) {
    if (s.includes('apa')) return 'apa_psychological';
    if (s.includes('nami')) return 'nami';
    return 'professional_org';
  }
  if (tier === 4) {
    if (s.includes('dsm')) return 'dsm';
    if (s.includes('icd')) return 'icd';
    if (s.includes('cochrane')) return 'cochrane';
    return 'clinical_guideline';
  }
  if (tier === 5) return 'reference';
  // Default: tier 1
  return 'peer_reviewed';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const ALL_CATEGORIES = Array.from({ length: 22 }, (_, i) => i + 1);
  const categoriesToProcess = targetCategory ? [targetCategory] : ALL_CATEGORIES;

  console.log('🚀 Article Citation Seeder');
  console.log(`   Categories: ${categoriesToProcess.join(', ')}`);
  console.log(`   Force overwrite: ${forceOverwrite}`);
  console.log('');

  // First, build a lookup of article slug/id → DB UUID
  console.log('📋 Loading article IDs from Supabase...');
  const { data: dbArticles, error: fetchErr } = await supabase
    .from('articles')
    .select('id, slug, article_production_id');

  if (fetchErr) {
    console.error('❌ Failed to fetch articles:', fetchErr.message);
    process.exit(1);
  }

  const slugToUUID = new Map<string, string>();
  const prodIdToUUID = new Map<string, string>();

  for (const art of dbArticles || []) {
    if (art.slug) slugToUUID.set(art.slug, art.id);
    if (art.article_production_id) prodIdToUUID.set(art.article_production_id, art.id);
  }

  console.log(`   ${slugToUUID.size} articles found in DB\n`);

  let totalCitations = 0;
  let totalInserted = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  let articlesUpdated = 0;

  for (const catNum of categoriesToProcess) {
    const catPad = String(catNum).padStart(2, '0');
    const catDir = path.join(__dirname, '..', 'data', 'articles', `category-${catPad}`);

    console.log(`📦 Category ${catNum}`);

    let catModule: Record<string, unknown>;
    try {
      catModule = await import(path.join(catDir, 'index.ts'));
    } catch (err) {
      console.warn(`  ⚠️  Failed to import category ${catNum}:`, (err as Error).message);
      continue;
    }

    const articles: any[] = [];
    for (const value of Object.values(catModule)) {
      if (Array.isArray(value)) {
        articles.push(...value);
      }
    }

    for (const article of articles) {
      const citations = article.citations;
      if (!citations || citations.length === 0) continue;

      totalCitations += citations.length;

      // Resolve DB UUID
      const prodId = (article.id || '').toString().toUpperCase();
      const dbId = slugToUUID.get(article.slug) || prodIdToUUID.get(prodId);

      if (!dbId) {
        totalSkipped += citations.length;
        continue;
      }

      // If force, delete existing citations for this article first
      if (forceOverwrite) {
        await supabase.from('article_citations').delete().eq('article_id', dbId);
      }

      // Check if citations already exist
      if (!forceOverwrite) {
        const { count } = await supabase
          .from('article_citations')
          .select('id', { count: 'exact', head: true })
          .eq('article_id', dbId);

        if (count && count > 0) {
          totalSkipped += citations.length;
          continue;
        }
      }

      // Build citation rows
      const citationRows = citations.map((cit: any, idx: number) => {
        const doi = cit.doi || extractDoi(cit.link);
        return {
          article_id: dbId,
          source_type: inferSourceType(cit.tier || 5, cit.source),
          tier: cit.tier || 5,
          title: cit.text || cit.title || '',
          authors: cit.authors || [],
          year: cit.year ? parseInt(String(cit.year), 10) : null,
          url: cit.link || null,
          doi: doi || null,
          journal_name: cit.journalName || cit.source || null,
          publisher: cit.publisher || null,
          access_date: cit.accessDate || null,
          sort_order: parseInt(cit.id, 10) || idx + 1,
        };
      });

      // Insert in batches of 50
      for (let i = 0; i < citationRows.length; i += 50) {
        const batch = citationRows.slice(i, i + 50);
        const { error: insertErr } = await supabase
          .from('article_citations')
          .insert(batch);

        if (insertErr) {
          console.warn(
            `  ❌  Insert failed for "${article.slug}" batch ${i}:`,
            insertErr.message
          );
          totalFailed += batch.length;
        } else {
          totalInserted += batch.length;
        }
      }

      // Update citation count on the article
      const tier1Count = citations.filter((c: any) => c.tier === 1).length;
      const tier1Pct =
        citations.length > 0
          ? Math.round((100 * tier1Count) / citations.length * 10) / 10
          : 0;

      const { error: updateErr } = await supabase
        .from('articles')
        .update({
          citation_count: citations.length,
          tier1_citation_pct: tier1Pct,
        })
        .eq('id', dbId);

      if (!updateErr) articlesUpdated++;
    }

    console.log(`  ✅ Category ${catNum} done`);
  }

  console.log(`\n🎉 Citation seeding complete!`);
  console.log(`   Total citations: ${totalCitations}`);
  console.log(`   Inserted:        ${totalInserted}`);
  console.log(`   Skipped:         ${totalSkipped}`);
  console.log(`   Failed:          ${totalFailed}`);
  console.log(`   Articles updated: ${articlesUpdated}`);
}

function extractDoi(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/doi\.org\/(.+)$/);
  return match ? match[1] : null;
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
