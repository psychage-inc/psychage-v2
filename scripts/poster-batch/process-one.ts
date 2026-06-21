#!/usr/bin/env tsx
/**
 * Download → normalize (sips → 1200x675 jpeg) → upload → wire one or more posters.
 *   tsx process-one.ts <prodid> <imageUrl> [<prodid> <imageUrl> ...]
 * Single process handles all pairs sequentially (no manifest write-race).
 * Idempotent: the DB UPDATE carries the mandatory `hero_image_url LIKE '/images/%'`
 * guard, so it never overwrites a real cover and re-runs are safe.
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { getSupabase, readManifest, writeManifest, publicUrlFor, BUCKET, HERE } from './lib.ts';

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

  // 3. upload (upsert)
  const path = `covers/${prodid}.jpeg`;
  const up = await sb.storage.from(BUCKET).upload(path, finalBuf, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (up.error) throw new Error(`upload: ${up.error.message}`);
  e.state = 'uploaded';
  writeManifest(m, new Date().toISOString());

  // 4. wire hero_image_url with the mandatory LIKE guard
  const publicUrl = publicUrlFor(prodid);
  const upd = await sb
    .from('articles')
    .update({ hero_image_url: publicUrl })
    .eq('id', e.id)
    .like('hero_image_url', '/images/%')
    .select('id');
  if (upd.error) throw new Error(`wire: ${upd.error.message}`);

  e.state = 'wired';
  e.publicUrl = publicUrl;
  e.error = undefined;
  writeManifest(m, new Date().toISOString());

  // tidy temp files for this prodid
  for (const f of [src, mid, out]) if (existsSync(f)) rmSync(f);
  const matched = (upd.data?.length ?? 0);
  console.log(`OK ${prodid} wired (db rows matched: ${matched}) ${publicUrl}`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length % 2 !== 0) {
    console.error('usage: tsx process-one.ts <prodid> <url> [<prodid> <url> ...]');
    process.exit(1);
  }
  const sb = getSupabase();
  let ok = 0, fail = 0;
  for (let i = 0; i < argv.length; i += 2) {
    const prodid = argv[i];
    const url = argv[i + 1];
    try {
      await processOne(sb, prodid, url);
      ok++;
    } catch (err: any) {
      fail++;
      // record failure on the entry, keep going
      const m = readManifest();
      const e = m.entries[prodid];
      if (e) { e.state = 'failed'; e.error = String(err?.message || err); writeManifest(m, new Date().toISOString()); }
      console.error(`FAIL ${prodid}: ${err?.message || err}`);
    }
  }
  console.log(`done: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exitCode = 2;
}

main();
