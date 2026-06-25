#!/usr/bin/env tsx
/**
 * Download → normalize (sips → 1200x675 jpeg) → upload → wire one or more posters.
 *   tsx process-one.ts <prodid> <imageUrl> [<prodid> <imageUrl> ...]
 * Single process handles all pairs sequentially (no manifest write-race).
 *
 * Delta vs scripts/poster-batch/process-one.ts:
 *   - NO `hero_image_url LIKE '/images/%'` guard — the old hero here is a real .jpeg,
 *     so that guard would match 0 rows. Wire is a plain `.eq('id', id)`.
 *   - The wired URL is cache-busted (?v={epoch}) because the cover path is reused.
 * Idempotent: re-running overwrites the cover (upsert) and re-wires with a fresh ?v=.
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import {
  getSupabase,
  readManifest,
  writeManifest,
  publicUrlFor,
  cacheBustedUrl,
  BUCKET,
  HERE,
} from './lib.ts';

const TMP = join(HERE, '.tmp');

function sips(args: string[]) {
  execFileSync('sips', args, { stdio: ['ignore', 'ignore', 'pipe'] });
}

async function processOne(sb: ReturnType<typeof getSupabase>, prodid: string, url: string) {
  const m = readManifest();
  const e = m.entries[prodid];
  if (!e) throw new Error(`no manifest entry for ${prodid}`);

  mkdirSync(TMP, { recursive: true });
  const src = join(TMP, `${prodid}.src`);
  const mid = join(TMP, `${prodid}.mid.jpeg`);
  const out = join(TMP, `${prodid}.jpeg`);

  // 1. download bytes
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(src, buf);

  // 2. normalize: force jpeg, max-dim 1200, then center-crop to exact 1200x675
  sips(['-s', 'format', 'jpeg', '-Z', '1200', src, '--out', mid]);
  sips(['-c', '675', '1200', mid, '--out', out]);
  const finalBuf = readFileSync(out);

  // 3. upload (upsert) to the canonical cover path
  const path = `covers/${prodid}.jpeg`;
  const up = await sb.storage.from(BUCKET).upload(path, finalBuf, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (up.error) throw new Error(`upload: ${up.error.message}`);
  e.state = 'uploaded';
  writeManifest(m, new Date().toISOString());

  // 4. wire hero_image_url — plain id match, cache-busted URL (no LIKE guard)
  const wiredUrl = cacheBustedUrl(prodid, Date.now());
  const upd = await sb
    .from('articles')
    .update({ hero_image_url: wiredUrl })
    .eq('id', e.id)
    .select('id');
  if (upd.error) throw new Error(`wire: ${upd.error.message}`);
  const matched = upd.data?.length ?? 0;
  if (matched === 0) throw new Error(`wire matched 0 rows for id ${e.id}`);

  e.state = 'wired';
  e.publicUrl = wiredUrl;
  e.error = undefined;
  writeManifest(m, new Date().toISOString());

  for (const f of [src, mid, out]) if (existsSync(f)) rmSync(f);
  console.log(`OK ${prodid} wired (db rows matched: ${matched}) ${publicUrlFor(prodid)}`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length % 2 !== 0) {
    console.error('usage: tsx process-one.ts <prodid> <url> [<prodid> <url> ...]');
    process.exit(1);
  }
  const sb = getSupabase();
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < argv.length; i += 2) {
    const prodid = argv[i];
    const url = argv[i + 1];
    try {
      await processOne(sb, prodid, url);
      ok++;
    } catch (err: any) {
      fail++;
      const m = readManifest();
      const e = m.entries[prodid];
      if (e) {
        e.state = 'failed';
        e.error = String(err?.message || err);
        writeManifest(m, new Date().toISOString());
      }
      console.error(`FAIL ${prodid}: ${err?.message || err}`);
    }
  }
  console.log(`done: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exitCode = 2;
}

main();
