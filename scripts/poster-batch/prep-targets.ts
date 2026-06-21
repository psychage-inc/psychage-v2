#!/usr/bin/env tsx
/**
 * Slice 1a — pull the 288 placeholder rows and seed the manifest skeleton.
 *   tsx prep-targets.ts
 * Idempotent: preserves any already-authored lines / states for existing prodids.
 */
import { getSupabase, readManifest, writeManifest, type Entry, type Manifest } from './lib.ts';

const EXPECTED = 288;
const CODES = ['CAT08', 'CAT15', 'CAT16', 'CAT17', 'CAT18', 'CAT29', 'CAT30', 'CAT31'];

function deriveHeadlineSubtitle(title: string): { headline: string; subtitle: string } {
  const idx = title.indexOf(':');
  if (idx >= 0) {
    const headline = title.slice(0, idx).trim();
    let subtitle = title.slice(idx + 1).trim();
    // sentence case, drop trailing period
    subtitle = subtitle.replace(/\.$/, '');
    return { headline, subtitle };
  }
  return { headline: title.trim(), subtitle: '' }; // subtitle authored as descriptor
}

async function main() {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('articles')
    .select('id, slug, title, subtitle, category, article_production_id, hero_image_url')
    .eq('status', 'published')
    .like('hero_image_url', '/images/%')
    .order('article_production_id', { ascending: true });

  if (error) { console.error('❌ query failed:', error.message); process.exit(1); }
  const rows = data ?? [];
  console.log(`Pulled ${rows.length} placeholder rows (expected ${EXPECTED}).`);

  const counts: Record<string, number> = {};
  const m: Manifest = readManifest();
  const prev = m.entries;
  const entries: Record<string, Entry> = {};

  for (const r of rows as any[]) {
    const prodid: string = r.article_production_id;
    const code = (prodid?.split('-')[0] || '').toUpperCase();
    counts[code] = (counts[code] || 0) + 1;
    const { headline, subtitle } = deriveHeadlineSubtitle(r.title);
    const existing = prev[prodid];
    entries[prodid] = {
      id: r.id,
      slug: r.slug,
      title: r.title,
      code,
      prodid,
      // keep authored lines/state if already present (resumable)
      headline: existing?.headline || headline,
      subtitle: existing?.subtitle || subtitle,
      figureLine: existing?.figureLine || '',
      sceneLine: existing?.sceneLine || '',
      sensitive: existing?.sensitive ?? false,
      state: existing?.state && existing.state !== 'pending' ? existing.state : 'pending',
      heroBefore: r.hero_image_url,
      jobId: existing?.jobId,
      error: existing?.error,
      publicUrl: existing?.publicUrl,
    };
  }

  m.entries = entries;
  writeManifest(m, new Date().toISOString());

  console.log('Per-code counts:');
  for (const c of CODES) console.log(`  ${c}: ${counts[c] || 0}`);
  const unexpected = Object.keys(counts).filter((c) => !CODES.includes(c));
  if (unexpected.length) console.log(`  ⚠️ unexpected codes: ${unexpected.join(', ')}`);
  console.log(`Total: ${rows.length}`);
  if (rows.length !== EXPECTED) {
    console.log(`⚠️ count diverges from ${EXPECTED} — STOP and review before generating.`);
  }
}

main();
