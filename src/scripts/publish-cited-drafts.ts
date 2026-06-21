/**
 * Publish the article drafts that currently carry real citations.
 *
 * EXPLICIT FOUNDER OVERRIDE of the clinical-review gate. This is the one action the batch
 * pipeline itself never performs. It flips drafts that have >= --min real `article_citations`
 * rows from status='draft' to status='published' (and stamps published_at). It only ever
 * transitions a draft with a body; it never touches a non-draft row.
 *
 * NOTE: the public detail page does not render `article_citations` for Supabase articles yet
 * (articleService.mapSupabaseToArticle hardcodes citations: []), so these publish without
 * visible sources until that serving change ships. Run with eyes open.
 *
 * Usage:
 *   npx tsx src/scripts/publish-cited-drafts.ts --dry-run      # show what would publish
 *   npx tsx src/scripts/publish-cited-drafts.ts --min 5        # publish drafts with >=5 citations
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (const l of fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf-8').split('\n')) {
  const m = l.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const minIdx = argv.indexOf('--min');
const MIN = minIdx >= 0 ? parseInt(argv[minIdx + 1], 10) : 5;
const nowIso = new Date().toISOString();

async function main() {
  // All current drafts with a body.
  const { data: drafts, error } = await sb
    .from('articles')
    .select('id, title')
    .eq('status', 'draft')
    .not('content', 'is', null);
  if (error) throw new Error(error.message);
  const ids = (drafts || []).map((d) => d.id);

  // Count real citation rows per draft.
  const rc = new Map<string, number>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data: cc } = await sb.from('article_citations').select('article_id').in('article_id', ids.slice(i, i + 200));
    for (const r of cc || []) rc.set(r.article_id, (rc.get(r.article_id) || 0) + 1);
  }
  const toPublish = (drafts || []).filter((d) => (rc.get(d.id) || 0) >= MIN);

  console.log(`Drafts with body: ${ids.length}`);
  console.log(`Eligible (>= ${MIN} citations): ${toPublish.length}`);
  console.log(`Staying draft (< ${MIN}): ${ids.length - toPublish.length}`);

  if (DRY) {
    console.log('\nDRY-RUN — no writes. Sample to publish:');
    toPublish.slice(0, 8).forEach((d) => console.log(`  • ${d.title}`));
    return;
  }

  let published = 0;
  const failed: string[] = [];
  const pubIds = toPublish.map((d) => d.id);
  for (let i = 0; i < pubIds.length; i += 100) {
    const chunk = pubIds.slice(i, i + 100);
    const { data, error: upErr } = await sb
      .from('articles')
      .update({ status: 'published', published_at: nowIso })
      .in('id', chunk)
      .eq('status', 'draft') // only flip drafts; never re-touch a published row
      .select('id');
    if (upErr) {
      console.warn(`  chunk ${i} failed: ${upErr.message}`);
      failed.push(...chunk);
      continue;
    }
    published += (data || []).length;
    process.stdout.write(`  published ${published}/${pubIds.length}\r`);
  }
  console.log(`\n✅ Published ${published} article(s) (status='published').`);
  if (failed.length) console.log(`⚠️  ${failed.length} failed to update.`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
