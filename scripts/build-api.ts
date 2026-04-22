/**
 * Pre-bundles each api/**\/*.ts serverless function into a self-contained .js
 * file so Vercel's Node runtime can cold-start under "type": "module" without
 * ESM extensionless-import resolution failures.
 *
 * Why this exists: Vercel's default compilation of api/*.ts leaves imports
 * like `from '../../src/lib/ai/safety'` extensionless in the emitted .js.
 * Under ESM, Node strictly requires `.js` extensions, and the function
 * process exits with ERR_MODULE_NOT_FOUND at cold start. Bundling inlines
 * every dependency so there are no runtime import resolutions at all.
 */

import { build, type BuildOptions } from 'esbuild';
import { readdir, rm, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = resolve(fileURLToPath(import.meta.url), '..');
const root = resolve(scriptDir, '..');
const apiDir = resolve(root, 'api');
const isVercelBuild = process.env.VERCEL === '1';

const MAX_BYTES = 45 * 1024 * 1024; // 45 MB, leaves 10% margin on Vercel's 50 MB limit

async function findEntryPoints(): Promise<string[]> {
  const entries = await readdir(apiDir, { recursive: true, withFileTypes: true });
  const results: string[] = [];
  for (const e of entries) {
    if (!e.isFile()) continue;
    const parent = (e as { parentPath?: string; path?: string }).parentPath ?? e.path ?? apiDir;
    const full = resolve(parent, e.name);
    if (!full.endsWith('.ts')) continue;
    if (full.endsWith('.d.ts')) continue;
    if (/\.(test|spec)\.ts$/.test(full)) continue;
    results.push(full);
  }
  return results.sort();
}

async function bundleOne(entry: string): Promise<{ outPath: string; sizeBytes: number }> {
  const outPath = entry.replace(/\.ts$/, '.js');
  const options: BuildOptions = {
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    outfile: outPath,
    sourcemap: true,
    logLevel: 'warning',
    banner: {
      js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);',
    },
    mainFields: ['module', 'main'],
    conditions: ['node', 'import', 'module', 'default'],
  };
  await build(options);
  const s = await stat(outPath);
  return { outPath, sizeBytes: s.size };
}

async function main() {
  const entries = await findEntryPoints();
  if (entries.length === 0) {
    console.warn('[build-api] no api/**/*.ts entries found; nothing to bundle.');
    return;
  }

  console.log(`[build-api] bundling ${entries.length} function(s)...`);
  console.log(`[build-api] VERCEL=${process.env.VERCEL ?? '(unset)'} — ${isVercelBuild ? 'will remove .ts sources after bundling' : 'keeping .ts sources for local dev'}`);

  for (const entry of entries) {
    const { outPath, sizeBytes } = await bundleOne(entry);
    const rel = relative(root, outPath);
    const kb = (sizeBytes / 1024).toFixed(1);
    console.log(`  ${rel} — ${kb} KB`);
    if (sizeBytes > MAX_BYTES) {
      throw new Error(
        `[build-api] bundle ${rel} is ${kb} KB, exceeds ${MAX_BYTES / 1024 / 1024} MB limit. ` +
          `Consider externalizing heavy deps (anthropic, supabase, openai) and using includeFiles.`,
      );
    }
  }

  if (isVercelBuild) {
    for (const entry of entries) {
      await rm(entry);
    }
    console.log(`[build-api] removed ${entries.length} .ts source(s) so Vercel picks up only .js bundles.`);
  }

  console.log('[build-api] done.');
}

main().catch((err) => {
  console.error('[build-api] failed:', err);
  process.exit(1);
});
