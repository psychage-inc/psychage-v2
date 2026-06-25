#!/usr/bin/env tsx
/**
 * Stateless single-poster processor for parallel worker agents.
 *   tsx wire-one.ts <prodid> <imageUrl>
 * Downloads the generated image → normalizes to 1200x675 jpeg (sips) → uploads to
 * covers/{prodid}.jpeg (upsert) → wires articles.hero_image_url (plain id match,
 * cache-busted URL, NO LIKE guard). Prints ONE JSON line with the result.
 *
 * Does NOT read or write the manifest — safe to run many in parallel. The manifest is
 * reconciled from the DB afterward by reconcile.ts, so the run stays resumable.
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { getSupabase, cacheBustedUrl, BUCKET, HERE } from './lib.ts';

const TMP = join(HERE, '.tmp');

function sips(args: string[]) {
  execFileSync('sips', args, { stdio: ['ignore', 'ignore', 'pipe'] });
}

async function main() {
  const [prodid, url] = process.argv.slice(2);
  if (!prodid || !url) {
    console.log(JSON.stringify({ prodid: prodid ?? null, state: 'failed', error: 'usage: wire-one.ts <prodid> <url>' }));
    process.exit(1);
  }
  const sb = getSupabase();
  try {
    // resolve the article id from prodid
    const { data: rows, error: selErr } = await sb
      .from('articles')
      .select('id')
      .eq('article_production_id', prodid)
      .limit(1);
    if (selErr) throw new Error(`select id: ${selErr.message}`);
    const id = rows?.[0]?.id;
    if (!id) throw new Error(`no article for prodid ${prodid}`);

    mkdirSync(TMP, { recursive: true });
    const src = join(TMP, `${prodid}.src`);
    const mid = join(TMP, `${prodid}.mid.jpeg`);
    const out = join(TMP, `${prodid}.jpeg`);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`download ${res.status}`);
    writeFileSync(src, Buffer.from(await res.arrayBuffer()));

    sips(['-s', 'format', 'jpeg', '-Z', '1200', src, '--out', mid]);
    sips(['-c', '675', '1200', mid, '--out', out]);
    const finalBuf = readFileSync(out);

    const path = `covers/${prodid}.jpeg`;
    const up = await sb.storage.from(BUCKET).upload(path, finalBuf, {
      contentType: 'image/jpeg',
      upsert: true,
    });
    if (up.error) throw new Error(`upload: ${up.error.message}`);

    const wiredUrl = cacheBustedUrl(prodid, Date.now());
    const upd = await sb.from('articles').update({ hero_image_url: wiredUrl }).eq('id', id).select('id');
    if (upd.error) throw new Error(`wire: ${upd.error.message}`);
    if ((upd.data?.length ?? 0) === 0) throw new Error(`wire matched 0 rows`);

    for (const f of [src, mid, out]) if (existsSync(f)) rmSync(f);
    console.log(JSON.stringify({ prodid, state: 'wired', publicUrl: wiredUrl }));
  } catch (err: any) {
    console.log(JSON.stringify({ prodid, state: 'failed', error: String(err?.message || err) }));
    process.exit(2);
  }
}

main();
