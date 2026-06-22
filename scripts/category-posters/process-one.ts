#!/usr/bin/env tsx
/**
 * Download → normalize (sips → 1200x675 jpeg) → upload one or more category
 * posters to article-images/category-covers/{slug}.jpeg, then mark the manifest
 * entry `wired` with its public URL.
 *   tsx process-one.ts <slug> <imageUrl> [<slug> <imageUrl> ...]
 * Wiring into the cards is config-driven (src/config/categoryPosters.ts), so
 * there is no DB write here. Idempotent: upsert overwrites, re-runs are safe.
 * Download + upload each retry 3x with exponential backoff; a hard failure marks
 * the entry `failed` and the run continues to the next slug.
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, readFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import {
  getSupabase,
  readManifest,
  writeManifest,
  publicUrlFor,
  BUCKET,
  COVER_PREFIX,
  HERE,
} from './lib.ts';

const TMP = join(HERE, '.tmp');

function sips(args: string[]) {
  execFileSync('sips', args, { stdio: ['ignore', 'ignore', 'pipe'] });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < 3) {
        const backoff = 500 * 2 ** (attempt - 1); // 500ms, 1s
        console.warn(`  retry ${label} (${attempt}/3) after ${backoff}ms: ${(err as Error).message}`);
        await sleep(backoff);
      }
    }
  }
  throw lastErr;
}

async function processOne(sb: ReturnType<typeof getSupabase>, slug: string, url: string) {
  const m = readManifest();
  const e = m.entries[slug];
  if (!e) throw new Error(`no manifest entry for ${slug}`);

  mkdirSync(TMP, { recursive: true });
  const src = join(TMP, `${slug}.src`);
  const mid = join(TMP, `${slug}.mid.jpeg`);
  const out = join(TMP, `${slug}.jpeg`);

  // 1. download bytes (retry transient)
  const buf = await withRetry('download', async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`download ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  });
  writeFileSync(src, buf);

  // 2. normalize: force jpeg, max-dim 1200, then center-crop to exact 1200x675
  sips(['-s', 'format', 'jpeg', '-Z', '1200', src, '--out', mid]);
  sips(['-c', '675', '1200', mid, '--out', out]);
  const finalBuf = readFileSync(out);
  e.state = 'generated';
  writeManifest(m, new Date().toISOString());

  // 3. upload (upsert, retry transient)
  const path = `${COVER_PREFIX}/${slug}.jpeg`;
  await withRetry('upload', async () => {
    const up = await sb.storage.from(BUCKET).upload(path, finalBuf, {
      contentType: 'image/jpeg',
      upsert: true,
    });
    if (up.error) throw new Error(`upload: ${up.error.message}`);
  });

  const publicUrl = publicUrlFor(slug);
  e.state = 'wired';
  e.publicUrl = publicUrl;
  e.error = undefined;
  writeManifest(m, new Date().toISOString());

  for (const f of [src, mid, out]) if (existsSync(f)) rmSync(f);
  console.log(`OK ${slug} -> ${publicUrl}`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 2 || argv.length % 2 !== 0) {
    console.error('usage: tsx process-one.ts <slug> <url> [<slug> <url> ...]');
    process.exit(1);
  }
  const sb = getSupabase();
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < argv.length; i += 2) {
    const slug = argv[i];
    const url = argv[i + 1];
    try {
      await processOne(sb, slug, url);
      ok++;
    } catch (err: any) {
      fail++;
      const m = readManifest();
      const e = m.entries[slug];
      if (e) {
        e.state = 'failed';
        e.error = String(err?.message || err);
        writeManifest(m, new Date().toISOString());
      }
      console.error(`FAIL ${slug}: ${err?.message || err}`);
    }
  }
  console.log(`done: ${ok} ok, ${fail} failed`);
  if (fail > 0) process.exitCode = 2;
}

main();
