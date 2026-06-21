#!/usr/bin/env tsx
/**
 * Parallel-safe variant of process-one: download → normalize → upload → wire.
 * Reads the manifest ONLY (for the row id); never writes it, so multiple workers
 * can run concurrently without racing the manifest JSON. Manifest state is
 * reconciled afterward from the DB by reconcile.ts.
 *   tsx upload-wire.ts <prodid> <url> [<prodid> <url> ...]
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { getSupabase, readManifest, publicUrlFor, BUCKET, HERE } from './lib.ts';

const TMP = join(HERE, '.tmp');
function sips(args: string[]) { execFileSync('sips', args, { stdio: ['ignore', 'ignore', 'pipe'] }); }

async function one(sb: ReturnType<typeof getSupabase>, m: ReturnType<typeof readManifest>, prodid: string, url: string) {
  const e = m.entries[prodid];
  if (!e) throw new Error(`no manifest entry for ${prodid}`);
  mkdirSync(TMP, { recursive: true });
  const src = join(TMP, `${prodid}.src`), mid = join(TMP, `${prodid}.mid.jpeg`), out = join(TMP, `${prodid}.jpeg`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  writeFileSync(src, Buffer.from(await res.arrayBuffer()));
  sips(['-s', 'format', 'jpeg', '-Z', '1200', src, '--out', mid]);
  sips(['-c', '675', '1200', mid, '--out', out]);
  const buf = readFileSync(out);
  const up = await sb.storage.from(BUCKET).upload(`covers/${prodid}.jpeg`, buf, { contentType: 'image/jpeg', upsert: true });
  if (up.error) throw new Error(`upload: ${up.error.message}`);
  const upd = await sb.from('articles').update({ hero_image_url: publicUrlFor(prodid) })
    .eq('id', e.id).like('hero_image_url', '/images/%').select('id');
  if (upd.error) throw new Error(`wire: ${upd.error.message}`);
  for (const f of [src, mid, out]) if (existsSync(f)) rmSync(f);
  console.log(`OK ${prodid} (matched ${upd.data?.length ?? 0})`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length % 2 !== 0) { console.error('usage: <prodid> <url> ...'); process.exit(1); }
  const sb = getSupabase();
  const m = readManifest();
  let ok = 0, fail = 0;
  for (let i = 0; i < argv.length; i += 2) {
    try { await one(sb, m, argv[i], argv[i + 1]); ok++; }
    catch (err: any) { fail++; console.error(`FAIL ${argv[i]}: ${err?.message || err}`); }
  }
  console.log(`done: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exitCode = 2;
}
main();
