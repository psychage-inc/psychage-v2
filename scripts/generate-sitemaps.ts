#!/usr/bin/env tsx
/**
 * Generates XML sitemaps for 423K+ provider profiles and static pages.
 *
 * Run locally or in CI:
 *   SUPABASE_SERVICE_ROLE_KEY=... VITE_SUPABASE_URL=... npx tsx scripts/generate-sitemaps.ts
 *
 * Output:
 *   public/sitemap-index.xml
 *   public/sitemap-providers-0.xml ... sitemap-providers-N.xml (50K URLs each)
 *   public/sitemap-pages.xml
 *
 * Recommended cadence: weekly CI cron job. Sitemap files are generated
 * and deployed as static assets from public/.
 *
 * CI setup (to be configured separately):
 *   - Add a GitHub Actions workflow (or Vercel cron) that runs this script weekly,
 *     commits the output, and triggers a redeploy.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';

// --- Config ---
const BATCH_SIZE = 50_000; // Google sitemap URL cap per file
const OUTPUT_DIR = path.resolve(process.cwd(), 'public');
const BASE_URL = 'https://psychage.com';
const ELIGIBLE_STATUSES = ['active', 'seeded', 'claimed', 'verified'];

// --- Supabase client ---
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env vars: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// --- Priority & frequency mapping ---
function getPriority(status: string): string {
  switch (status) {
    case 'active':
    case 'verified':
      return '0.7';
    case 'claimed':
      return '0.6';
    case 'seeded':
      return '0.5';
    default:
      return '0.5';
  }
}

function getChangeFreq(status: string): string {
  switch (status) {
    case 'seeded':
      return 'yearly';
    default:
      return 'monthly';
  }
}

function formatDate(dateStr: string): string {
  return dateStr.split('T')[0]; // YYYY-MM-DD
}

// --- XML generation ---
function xmlEscape(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildUrlEntry(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function wrapUrlSet(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;
}

function buildSitemapIndex(children: { loc: string; lastmod: string }[]): string {
  const entries = children.map(
    (c) => `  <sitemap>\n    <loc>${xmlEscape(c.loc)}</loc>\n    <lastmod>${c.lastmod}</lastmod>\n  </sitemap>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>`;
}

// --- Static pages ---
function buildStaticPagesSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  const pages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/providers', priority: '0.8', changefreq: 'weekly' },
    { path: '/providers/search', priority: '0.8', changefreq: 'weekly' },
    { path: '/how-we-verify', priority: '0.8', changefreq: 'monthly' },
    { path: '/for-providers', priority: '0.7', changefreq: 'monthly' },
    { path: '/learn', priority: '0.8', changefreq: 'weekly' },
    { path: '/tools', priority: '0.7', changefreq: 'monthly' },
    { path: '/clarity-score', priority: '0.7', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact', priority: '0.5', changefreq: 'monthly' },
    { path: '/crisis', priority: '0.8', changefreq: 'monthly' },
    { path: '/content-standards', priority: '0.4', changefreq: 'yearly' },
    { path: '/advisory-board', priority: '0.4', changefreq: 'yearly' },
  ];

  const entries = pages.map((p) =>
    buildUrlEntry(`${BASE_URL}${p.path}`, today, p.changefreq, p.priority)
  );
  return wrapUrlSet(entries);
}

// --- Main ---
async function main() {
  console.log('Fetching provider count...');

  const { count, error: countError } = await supabase
    .from('providers')
    .select('id', { count: 'exact', head: true })
    .in('status', ELIGIBLE_STATUSES);

  if (countError) {
    console.error('Count query failed:', countError.message);
    process.exit(1);
  }

  const totalProviders = count ?? 0;
  const totalFiles = Math.ceil(totalProviders / BATCH_SIZE);
  console.log(`Total eligible providers: ${totalProviders} → ${totalFiles} sitemap file(s)`);

  const today = new Date().toISOString().split('T')[0];
  const childSitemaps: { loc: string; lastmod: string }[] = [];

  // Generate provider sitemaps
  for (let fileIndex = 0; fileIndex < totalFiles; fileIndex++) {
    const offset = fileIndex * BATCH_SIZE;
    console.log(`Fetching batch ${fileIndex + 1}/${totalFiles} (offset ${offset})...`);

    const { data: providers, error } = await supabase
      .from('providers')
      .select('id, status, updated_at')
      .in('status', ELIGIBLE_STATUSES)
      .order('id')
      .range(offset, offset + BATCH_SIZE - 1);

    if (error) {
      console.error(`Batch ${fileIndex} failed:`, error.message);
      process.exit(1);
    }

    const entries = (providers ?? []).map((p) =>
      buildUrlEntry(
        `${BASE_URL}/providers/${p.id}`,
        formatDate(p.updated_at),
        getChangeFreq(p.status),
        getPriority(p.status)
      )
    );

    const filename = `sitemap-providers-${fileIndex}.xml`;
    const filePath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filePath, wrapUrlSet(entries), 'utf-8');
    console.log(`  Written ${filename} (${entries.length} URLs)`);

    childSitemaps.push({ loc: `${BASE_URL}/${filename}`, lastmod: today });
  }

  // Generate static pages sitemap
  const staticFilename = 'sitemap-pages.xml';
  await fs.writeFile(
    path.join(OUTPUT_DIR, staticFilename),
    buildStaticPagesSitemap(),
    'utf-8'
  );
  console.log(`Written ${staticFilename}`);
  childSitemaps.unshift({ loc: `${BASE_URL}/${staticFilename}`, lastmod: today });

  // Generate sitemap index
  const indexPath = path.join(OUTPUT_DIR, 'sitemap-index.xml');
  await fs.writeFile(indexPath, buildSitemapIndex(childSitemaps), 'utf-8');
  console.log(`Written sitemap-index.xml (${childSitemaps.length} child sitemaps)`);

  console.log('Done.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
