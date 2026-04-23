/**
 * Pre-bundles each api/**\/*.ts serverless function into a self-contained ESM
 * file so Vercel's Node runtime can cold-start under "type": "module" without
 * ESM extensionless-import resolution failures.
 *
 * Why this exists: Vercel's default compilation of api/*.ts leaves imports
 * like `from '../../src/lib/ai/safety'` extensionless in the emitted .js.
 * Under ESM, Node strictly requires `.js` extensions, and the function
 * process exits with ERR_MODULE_NOT_FOUND at cold start. Bundling inlines
 * every dependency so there are no runtime import resolutions at all.
 *
 * Output strategy:
 * - Local (VERCEL unset): writes side-by-side `.js` for inspection, leaves
 *   `.ts` source untouched so dev tooling and editors continue to work.
 * - Vercel build (VERCEL=1): overwrites the `.ts` source in place with the
 *   bundled ESM content. The file remains named `.ts` so vercel.json's
 *   `functions` pattern matches both pre-build (validation) and post-build
 *   (deployment). The file content is plain ESM JS, which is valid TS by
 *   superset, so Vercel's TS-to-JS step is effectively a no-op.
 *
 * Why not separate `.js` files in Vercel: Vercel validates the `functions`
 * pattern against source-tree paths BOTH before any user command runs AND
 * after the build finishes. A `.js` pattern fails pre-build (no `.js` source
 * exists). A `.ts` pattern with deletion-after-build fails post-build
 * ("File not found"). In-place overwrite is the only approach that satisfies
 * both validation passes.
 */

import { build, type BuildOptions } from 'esbuild';
import { readdir, rename, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = resolve(fileURLToPath(import.meta.url), '..');
const root = resolve(scriptDir, '..');
const apiDir = resolve(root, 'api');
const isVercelBuild = process.env.VERCEL === '1';

const MAX_BYTES = 45 * 1024 * 1024; // 45 MB, leaves 10% margin on Vercel's 50 MB limit

// @ts-nocheck on the bundled output so Vercel's post-build TS check doesn't
// barf on esbuild's emitted internal property access (e.g. __privateGet on
// Supabase Realtime / Postgrest internals). The bundle is a self-contained
// artifact that esbuild already validated; re-checking it adds nothing.
const ESM_BANNER = '// @ts-nocheck\nimport { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);';

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
  // In Vercel: bundle to a temp file, then atomically replace the .ts source.
  // esbuild can read+write the same path with allowOverwrite, but a temp+rename
  // is safer (no risk of a half-written file if esbuild crashes mid-write).
  // Locally: side-by-side .js for inspection, leave .ts alone.
  const outPath = isVercelBuild ? entry : entry.replace(/\.ts$/, '.js');
  const tempPath = isVercelBuild ? `${entry}.bundled.tmp` : outPath;

  const options: BuildOptions = {
    entryPoints: [entry],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    outfile: tempPath,
    // Sourcemaps in Vercel mode would land at .ts.map (confusing) and inflate
    // the function bundle. Skip in Vercel; keep locally for debugging.
    sourcemap: !isVercelBuild,
    logLevel: 'warning',
    banner: { js: ESM_BANNER },
    mainFields: ['module', 'main'],
    conditions: ['node', 'import', 'module', 'default'],
  };
  await build(options);

  if (isVercelBuild) {
    await rename(tempPath, outPath);
  }

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
  console.log(
    `[build-api] VERCEL=${process.env.VERCEL ?? '(unset)'} — ${
      isVercelBuild
        ? 'overwriting .ts sources in place with self-contained ESM bundles'
        : 'writing side-by-side .js for local inspection (.ts left untouched)'
    }`,
  );

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

  console.log('[build-api] done.');
}

main().catch((err) => {
  console.error('[build-api] failed:', err);
  process.exit(1);
});
