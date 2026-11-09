#!/usr/bin/env tsx
/**
 * Public-site QA audit — psychage.com
 * ===================================
 * Standalone, read-only, NON-DESTRUCTIVE Playwright crawler. It visits the
 * public routes on a desktop (1440x900) and a mobile (iPhone 13) viewport and
 * records, per URL per viewport: load status, uncaught page errors, console
 * errors, failed network requests, broken content images, mobile horizontal
 * overflow, and best-effort form-validation checks. It NEVER logs in, NEVER
 * submits valid data, and NEVER lets a mutating request reach the server
 * (form checks abort POST/PUT/PATCH/DELETE). It fixes nothing — it only reports.
 *
 * This file is intentionally NOT a *.spec.ts / *.test.ts, so the Playwright
 * test runner and CI never execute it. Run it by hand:
 *
 *   pnpm exec playwright install chromium   # once, if the browser is missing
 *   pnpm exec tsx scripts/qa-audit.ts        # BASE_URL defaults to https://psychage.com
 *
 * Outputs (all git-ignored): qa/report.md, qa/results.json, qa/screenshots/*.png
 */

import { chromium, devices } from 'playwright';
import type { BrowserContext, Page, Request } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SCRIPT_DIR, '..');
const QA_DIR = join(ROOT, 'qa');
const SHOTS_DIR = join(QA_DIR, 'screenshots');

// ---------------------------------------------------------------------------
// Config — the ONLY two knobs (BASE_URL env + sample count).
// ---------------------------------------------------------------------------
const BASE_URL = (process.env.BASE_URL ?? 'https://psychage.com').replace(/\/+$/, '');
const ARTICLE_SAMPLE = 18;

// Internal pacing / bounds (not user-facing config).
const NAV_TIMEOUT_MS = 35_000;
const NAV_DELAY_MS = 250; // small delay between navigations
const SETTLE_MS = 1_200; // let lazy chunks / images settle after DOM ready
const LINK_CHECK_CAP = 80; // extra internal links resolved beyond audited routes
const URL_HARD_CAP_MS = 90_000; // backstop: skip any single URL that hangs past this

// Text markers rendered by the app (see src/App.tsx RouteErrorBoundary,
// src/pages/core/NotFoundPage, src/pages/conditions/ConditionsIndexPage).
const ERROR_BOUNDARY_MARKERS = [
    'This page encountered an error',
    'Something went wrong loading this page',
];
const NOT_FOUND_MARKER = 'Page not found.';
const CONDITIONS_EMPTY_MARKER = 'load the conditions list';

// Forms where a single empty submit is safe (HTML `required` gates the network;
// a request-abort guard is installed as a hard backstop). Desktop only.
const EMPTY_SUBMIT_PATHS = new Set(['/login', '/signup', '/contact', '/', '/learn']);

type Viewport = 'desktop' | 'mobile';
const VIEWPORTS: Viewport[] = ['desktop', 'mobile'];

type Verdict = 'PASS' | 'WARN' | 'FAIL';

interface NetFailure {
    url: string;
    status: number;
    sameOrigin: boolean;
}

interface FormResult {
    attempted: boolean;
    validationFired: boolean;
    mutatingRequestsBlocked: string[]; // requests we aborted (validation gap if non-empty)
    note: string;
}

interface PageResult {
    path: string;
    finalUrl: string;
    viewport: Viewport;
    status: number | null;
    verdict: Verdict;
    failReasons: string[];
    warnReasons: string[];
    pageErrors: string[];
    consoleErrors: string[];
    networkFailures: NetFailure[];
    brokenImages: string[];
    overflow: { scrollWidth: number; innerWidth: number } | null;
    form: FormResult | null;
    links: string[];
    screenshot: string | null;
}

interface BrokenLink {
    path: string;
    status: number | null;
    reason: string;
}

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadEnv(): Record<string, string> {
    const env: Record<string, string> = {};
    for (const file of ['.env', '.env.local']) {
        const p = join(ROOT, file);
        if (!existsSync(p)) continue;
        for (const line of readFileSync(p, 'utf8').split('\n')) {
            const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
            if (m && env[m[1]] === undefined) env[m[1]] = m[2].trim();
        }
    }
    return env;
}

function canonicalHost(u: string): string {
    try {
        return new URL(u).host.replace(/^www\./, '').toLowerCase();
    } catch {
        return '';
    }
}

const BASE_HOST = canonicalHost(BASE_URL);

function isSameOrigin(u: string): boolean {
    return canonicalHost(u) === BASE_HOST;
}

/** Absolute URL for a site-relative path. */
function abs(path: string): string {
    return path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Normalize an href to a clean site-relative path (or '' if off-site). */
function toPath(href: string): string {
    try {
        const u = new URL(href, BASE_URL);
        if (canonicalHost(u.href) !== BASE_HOST) return '';
        return (u.pathname + u.search).replace(/\/+$/, '') || '/';
    } catch {
        return '';
    }
}

function slugForShot(path: string, viewport: Viewport): string {
    const base = path.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'root';
    return `${base}__${viewport}.png`;
}

// ---------------------------------------------------------------------------
// Static public route seed (from src/App.tsx — auth-gated + admin excluded).
// ---------------------------------------------------------------------------
const STATIC_PUBLIC_ROUTES: string[] = [
    '/',
    '/learn',
    '/learn/topics',
    '/conditions',
    '/providers',
    '/providers/search',
    '/how-we-verify',
    '/for-providers',
    '/for-providers/apply',
    '/for-providers/claim',
    '/tools',
    '/tools/mood-journal',
    '/tools/sleep-architect',
    '/tools/symptom-navigator',
    '/tools/symptom-navigator/crisis',
    '/tools/relationship-health',
    '/tools/medication-tracker',
    '/tools/clarity-journal',
    '/tools/clarity-journal/daily',
    '/tools/clarity-journal/screening',
    '/tools/clarity-journal/thought-record',
    '/tools/clarity-journal/activation',
    '/tools/clarity-journal/triggers',
    '/tools/clarity-journal/toolbox',
    '/tools/clarity-journal/reflection',
    '/tools/clarity-journal/history',
    '/tools/clarity-journal/insights',
    '/tools/clarity-journal/entry',
    '/tools/clarity-journal/report',
    '/toolkits',
    '/search',
    '/clarity-score',
    '/about',
    '/contact',
    '/content-standards',
    '/advisory-board',
    '/legal/privacy',
    '/legal/terms',
    '/legal/accessibility',
    '/crisis',
    '/sitemap',
    // Auth pages: public-reachable, RENDER-ONLY (never submit valid data).
    '/login',
    '/signup',
    '/reset-password',
    '/update-password',
    '/auth/check-email',
];

// Auth-gated / excluded routes, reported under "Not covered".
const NOT_COVERED = [
    '/tools/mindmate (requires auth)',
    '/onboarding (requires auth)',
    '/dashboard/* (requires auth — patient/admin)',
    '/portal/* (requires auth — provider/admin)',
    '/auth/callback (errors without an OAuth token — skipped)',
    'admin.psychage.com/* (separate admin domain — out of scope)',
];

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------
async function fetchSitemapPaths(): Promise<string[]> {
    try {
        const res = await fetch(`${BASE_URL}/sitemap.xml`, { redirect: 'follow' });
        if (!res.ok) return [];
        const xml = await res.text();
        const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => toPath(m[1]));
        return locs.filter((p) => p && !p.endsWith('.xml'));
    } catch {
        return [];
    }
}

/** Collect same-origin <a href> paths currently in the DOM. */
async function collectLinks(page: Page): Promise<string[]> {
    const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]'), (a) => (a as HTMLAnchorElement).href),
    );
    const paths = new Set<string>();
    for (const h of hrefs) {
        const p = toPath(h);
        if (p) paths.add(p);
    }
    return [...paths];
}

async function discoverConditionSlugs(page: Page, env: Record<string, string>): Promise<string[]> {
    // 1) Harvest from the live /conditions index DOM.
    try {
        await page.goto(abs('/conditions'), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
        await sleep(SETTLE_MS);
        const fromDom = (await collectLinks(page))
            .filter((p) => /^\/conditions\/[^/]+$/.test(p))
            .map((p) => p.replace('/conditions/', ''));
        if (fromDom.length > 0) {
            return [...new Set(fromDom)];
        }
    } catch {
        // fall through to REST
    }
    // 2) Fallback: anon PostgREST (the /conditions page failed to yield links).
    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) return [];
    try {
        const res = await fetch(
            `${url}/rest/v1/conditions_reference_public?select=slug&order=slug`,
            { headers: { apikey: key, Authorization: `Bearer ${key}` } },
        );
        if (!res.ok) return [];
        const rows = (await res.json()) as Array<{ slug: string }>;
        return rows.map((r) => r.slug).filter(Boolean);
    } catch {
        return [];
    }
}

async function discoverArticlePaths(page: Page, env: Record<string, string>): Promise<string[]> {
    // The Learn UI navigates to articles via JS cards, not <a href>, so harvesting
    // links yields nothing. Instead sample published article ids from the anon API
    // (spread across categories) and resolve each via the /learn/article/:id
    // redirect to its canonical /learn/:categorySlug/:articleSlug URL.
    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) return [];
    let rows: Array<{ id: string; category: string }> = [];
    try {
        const res = await fetch(
            `${url}/rest/v1/articles?select=id,category&status=eq.published&limit=600`,
            { headers: { apikey: key, Authorization: `Bearer ${key}` } },
        );
        if (res.ok) rows = (await res.json()) as Array<{ id: string; category: string }>;
    } catch {
        return [];
    }
    // One id per category first (breadth), then top up from the remainder.
    const byCategory = new Map<string, string>();
    const remainder: string[] = [];
    for (const r of rows) {
        if (!r.id) continue;
        if (!byCategory.has(r.category)) byCategory.set(r.category, r.id);
        else remainder.push(r.id);
    }
    const idPicks = [...byCategory.values(), ...remainder].slice(0, ARTICLE_SAMPLE);

    const paths = new Set<string>();
    for (const id of idPicks) {
        try {
            await page.goto(abs(`/learn/article/${id}`), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
            await sleep(SETTLE_MS);
            const p = toPath(page.url());
            if (/^\/learn\/[^/]+\/[^/]+$/.test(p)) paths.add(p);
        } catch {
            // skip an unresolvable id
        }
        if (paths.size >= ARTICLE_SAMPLE) break;
    }
    return [...paths];
}

async function discoverMiscDynamic(page: Page, env: Record<string, string>): Promise<string[]> {
    const picks: string[] = [];
    // Provider profile — sample one real id from the anon API (providers has no slug).
    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_ANON_KEY;
    if (url && key) {
        try {
            const res = await fetch(`${url}/rest/v1/providers?select=id&limit=1`, {
                headers: { apikey: key, Authorization: `Bearer ${key}` },
            });
            if (res.ok) {
                const rows = (await res.json()) as Array<{ id: string }>;
                if (rows[0]?.id) picks.push(`/providers/${rows[0].id}`);
            }
        } catch {
            // skip — best-effort single sample
        }
    }
    // Toolkit detail — harvest one from the /toolkits index DOM.
    try {
        await page.goto(abs('/toolkits'), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
        await sleep(SETTLE_MS);
        const hit = (await collectLinks(page)).find((p) => /^\/toolkits\/[^/]+$/.test(p));
        if (hit) picks.push(hit);
    } catch {
        // skip
    }
    return [...new Set(picks)];
}

// ---------------------------------------------------------------------------
// Per-URL audit
// ---------------------------------------------------------------------------
interface DomProbe {
    rootText: number;
    bodyText: string;
    brokenImages: string[];
    scrollWidth: number;
    innerWidth: number;
}

async function probeDom(page: Page): Promise<DomProbe> {
    return page.evaluate(() => {
        const root = document.getElementById('root');
        const imgs = Array.from(document.querySelectorAll('img'));
        const broken: string[] = [];
        for (const img of imgs) {
            const w = img.naturalWidth;
            const drawnW = img.width;
            const drawnH = img.height;
            // Content image (larger than a tracking pixel) that finished loading at 0px.
            if (img.complete && w === 0 && drawnW > 2 && drawnH > 2 && img.currentSrc) {
                broken.push(img.currentSrc);
            }
        }
        return {
            rootText: (root?.innerText ?? '').trim().length,
            bodyText: (document.body?.innerText ?? '').slice(0, 6000),
            brokenImages: broken.slice(0, 20),
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
        };
    });
}

async function auditForm(
    context: BrowserContext,
    page: Page,
    path: string,
): Promise<FormResult | null> {
    if (!EMPTY_SUBMIT_PATHS.has(path)) return null;

    // Pick a target form: has a submit control + at least one required field,
    // is not the site search box. Prefer email/password forms (auth, newsletter).
    const target = await page.evaluate(() => {
        const forms = Array.from(document.querySelectorAll('form'));
        let best = -1;
        let bestScore = -1;
        forms.forEach((form, i) => {
            const hasSubmit = !!form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
            const hasRequired = !!form.querySelector('[required]');
            const hasEmail = !!form.querySelector('input[type="email"]');
            const hasPassword = !!form.querySelector('input[type="password"]');
            const isSearch =
                form.getAttribute('role') === 'search' || !!form.querySelector('input[type="search"]');
            if (!hasSubmit || isSearch) return;
            let score = 0;
            if (hasRequired) score += 2;
            if (hasEmail) score += 1;
            if (hasPassword) score += 2;
            if (score > bestScore) {
                bestScore = score;
                best = i;
            }
        });
        return best;
    });

    if (target < 0) {
        return {
            attempted: false,
            validationFired: false,
            mutatingRequestsBlocked: [],
            note: 'No non-search form with a submit control + required field found.',
        };
    }

    // Hard backstop: abort ANY mutating request during the empty submit so a
    // weakly-validated form can never write to prod. Aborted attempts are a
    // validation gap and get reported.
    const blocked: string[] = [];
    await context.route('**/*', (route) => {
        const req: Request = route.request();
        const method = req.method().toUpperCase();
        const u = req.url();
        const mutating = method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
        if (mutating && (isSameOrigin(u) || u.includes('supabase') || u.includes('/api/'))) {
            blocked.push(`${method} ${u}`);
            return route.abort();
        }
        return route.continue();
    });

    let validationFired = false;
    try {
        const form = page.locator('form').nth(target);
        const submit = form
            .locator('button[type="submit"], input[type="submit"], button:not([type])')
            .first();
        await submit.click({ timeout: 5_000, noWaitAfter: true }).catch(() => undefined);
        await sleep(600);
        // Native constraint validation and/or an ARIA error surfaced?
        validationFired = await page.evaluate(() => {
            const invalid = document.querySelectorAll(':invalid').length > 0;
            const ariaInvalid = document.querySelectorAll('[aria-invalid="true"]').length > 0;
            const alerts = Array.from(document.querySelectorAll('[role="alert"]')).some(
                (el) => (el.textContent ?? '').trim().length > 0,
            );
            return invalid || ariaInvalid || alerts;
        });
    } finally {
        await context.unroute('**/*');
    }

    return {
        attempted: true,
        validationFired,
        mutatingRequestsBlocked: blocked,
        note:
            blocked.length > 0
                ? 'Empty submit tried to send a mutating request (aborted) — validation gap.'
                : validationFired
                  ? 'Empty submit blocked by validation as expected.'
                  : 'Empty submit produced no visible validation and no network write.',
    };
}

function timeoutResult(path: string, viewport: Viewport): PageResult {
    return {
        path,
        finalUrl: '',
        viewport,
        status: null,
        verdict: 'FAIL',
        failReasons: ['Audit exceeded the per-URL hard cap (hung navigation) — skipped'],
        warnReasons: [],
        pageErrors: [],
        consoleErrors: [],
        networkFailures: [],
        brokenImages: [],
        overflow: null,
        form: null,
        links: [],
        screenshot: null,
    };
}

async function auditUrl(context: BrowserContext, path: string, viewport: Viewport): Promise<PageResult> {
    const page = await context.newPage();
    // Hard ceilings on EVERY Playwright op so a wedged page can't stall the run.
    page.setDefaultTimeout(NAV_TIMEOUT_MS);
    page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS);
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    const networkFailures: NetFailure[] = [];

    page.on('pageerror', (err) => pageErrors.push(err.message || String(err)));
    page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (res) => {
        const status = res.status();
        if (status >= 400) {
            const u = res.url();
            networkFailures.push({ url: u, status, sameOrigin: isSameOrigin(u) });
        }
    });

    const result: PageResult = {
        path,
        finalUrl: '',
        viewport,
        status: null,
        verdict: 'PASS',
        failReasons: [],
        warnReasons: [],
        pageErrors,
        consoleErrors,
        networkFailures,
        brokenImages: [],
        overflow: null,
        form: null,
        links: [],
        screenshot: null,
    };

    try {
        const resp = await page.goto(abs(path), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
        result.status = resp ? resp.status() : null;
        await sleep(SETTLE_MS);
        result.finalUrl = page.url();

        const dom = await probeDom(page);
        result.brokenImages = dom.brokenImages;
        // Harvest same-origin links from THIS page (no second load).
        result.links = await collectLinks(page).catch(() => []);
        if (viewport === 'mobile') {
            result.overflow = { scrollWidth: dom.scrollWidth, innerWidth: dom.innerWidth };
        }

        // --- Load classification ---
        if (result.status !== null && result.status >= 400) {
            result.failReasons.push(`HTTP ${result.status}`);
        }
        if (dom.rootText < 40) {
            result.failReasons.push(`App root nearly empty (${dom.rootText} chars)`);
        }
        if (ERROR_BOUNDARY_MARKERS.some((m) => dom.bodyText.includes(m))) {
            result.failReasons.push('Error-boundary fallback rendered ("This page encountered an error")');
        }
        if (dom.bodyText.includes(NOT_FOUND_MARKER)) {
            result.failReasons.push('Rendered 404 "Page not found." for an expected route');
        }
        if (dom.bodyText.includes(CONDITIONS_EMPTY_MARKER)) {
            result.warnReasons.push('Conditions list empty state ("couldn’t load the conditions list")');
        }

        // --- JS health ---
        if (pageErrors.length > 0) {
            result.failReasons.push(`Uncaught page error(s): ${pageErrors.length}`);
        }
        if (consoleErrors.length > 0) {
            result.warnReasons.push(`Console error(s): ${consoleErrors.length}`);
        }

        // --- Network ---
        const sameOriginFails = networkFailures.filter((f) => f.sameOrigin);
        const crossOriginFails = networkFailures.filter((f) => !f.sameOrigin);
        if (sameOriginFails.length > 0) {
            result.failReasons.push(`Same-origin request(s) ≥400: ${sameOriginFails.length}`);
        }
        if (crossOriginFails.length > 0) {
            result.warnReasons.push(`Cross-origin request(s) ≥400: ${crossOriginFails.length}`);
        }

        // --- Images ---
        if (result.brokenImages.length > 0) {
            result.failReasons.push(`Broken content image(s): ${result.brokenImages.length}`);
        }

        // --- Mobile overflow ---
        if (viewport === 'mobile' && result.overflow && result.overflow.scrollWidth > result.overflow.innerWidth + 16) {
            result.warnReasons.push(
                `Horizontal overflow: scrollWidth ${result.overflow.scrollWidth} > innerWidth ${result.overflow.innerWidth} (desktop layout on phone)`,
            );
        }

        // --- Forms (desktop only; abort-guarded) ---
        if (viewport === 'desktop') {
            result.form = await auditForm(context, page, path);
            if (result.form?.mutatingRequestsBlocked.length) {
                result.failReasons.push('Form empty-submit attempted a mutating request (aborted)');
            }
        }
    } catch (err) {
        result.failReasons.push(`Navigation/audit threw: ${err instanceof Error ? err.message : String(err)}`);
    }

    // --- Verdict + screenshots ---
    if (result.failReasons.length > 0) result.verdict = 'FAIL';
    else if (result.warnReasons.length > 0) result.verdict = 'WARN';

    const isOverflowWarn = result.warnReasons.some((r) => r.startsWith('Horizontal overflow'));
    if (result.verdict === 'FAIL' || isOverflowWarn) {
        const file = slugForShot(path, viewport);
        try {
            await page.screenshot({ path: join(SHOTS_DIR, file), fullPage: true });
            result.screenshot = `qa/screenshots/${file}`;
        } catch {
            // screenshot failure shouldn't abort the audit
        }
    }

    await page.close();
    return result;
}

/** Lightweight resolve for internal-link checking (SPA-aware: HTTP is always 200). */
async function resolvePath(page: Page, path: string): Promise<BrokenLink | null> {
    try {
        const resp = await page.goto(abs(path), { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
        const status = resp ? resp.status() : null;
        await sleep(400);
        const body = await page.evaluate(() => (document.body?.innerText ?? '').slice(0, 4000));
        if (status !== null && status >= 400) return { path, status, reason: `HTTP ${status}` };
        if (body.includes(NOT_FOUND_MARKER)) return { path, status, reason: 'SPA 404 "Page not found."' };
        return null;
    } catch (err) {
        return { path, status: null, reason: err instanceof Error ? err.message : String(err) };
    }
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------
function counts(results: PageResult[], viewport: Viewport) {
    const v = results.filter((r) => r.viewport === viewport);
    return {
        total: v.length,
        pass: v.filter((r) => r.verdict === 'PASS').length,
        warn: v.filter((r) => r.verdict === 'WARN').length,
        fail: v.filter((r) => r.verdict === 'FAIL').length,
    };
}

function fmtEvidence(r: PageResult): string {
    const bits: string[] = [];
    for (const e of r.pageErrors) bits.push(`pageerror: ${e}`);
    for (const e of r.consoleErrors.slice(0, 4)) bits.push(`console.error: ${e}`);
    for (const f of r.networkFailures.slice(0, 6)) {
        bits.push(`${f.sameOrigin ? 'same-origin' : 'cross-origin'} ${f.status}: ${f.url}`);
    }
    for (const img of r.brokenImages.slice(0, 4)) bits.push(`broken img: ${img}`);
    if (r.form?.mutatingRequestsBlocked.length) {
        bits.push(`form mutating (aborted): ${r.form.mutatingRequestsBlocked.join('; ')}`);
    }
    return bits.length ? bits.map((b) => `      - ${b.replace(/\n+/g, ' ')}`).join('\n') : '      - (see reasons)';
}

function buildReport(
    results: PageResult[],
    brokenLinks: BrokenLink[],
    meta: {
        totalUrls: number;
        conditionCount: number;
        articleCount: number;
        linksChecked: number;
        linksSkipped: number;
        startedAt: string;
    },
): string {
    const d = counts(results, 'desktop');
    const m = counts(results, 'mobile');
    const lines: string[] = [];

    lines.push('# Psychage public-site QA audit');
    lines.push('');
    lines.push(`- **Target:** ${BASE_URL}`);
    lines.push(`- **Run at:** ${meta.startedAt}`);
    lines.push(`- **Unique URLs audited:** ${meta.totalUrls} (× 2 viewports = ${meta.totalUrls * 2} page loads)`);
    lines.push(`- **Conditions covered:** ${meta.conditionCount} (all) · **Articles sampled:** ${meta.articleCount}`);
    lines.push('');
    lines.push('## Summary');
    lines.push('');
    lines.push('| Viewport | Total | PASS | WARN | FAIL |');
    lines.push('| --- | ---: | ---: | ---: | ---: |');
    lines.push(`| Desktop (1440×900) | ${d.total} | ${d.pass} | ${d.warn} | ${d.fail} |`);
    lines.push(`| Mobile (iPhone 13) | ${m.total} | ${m.pass} | ${m.warn} | ${m.fail} |`);
    lines.push('');

    // Failures
    const fails = results.filter((r) => r.verdict === 'FAIL');
    lines.push(`## Failures (${fails.length})`);
    lines.push('');
    if (fails.length === 0) {
        lines.push('_None._');
    } else {
        for (const r of fails) {
            lines.push(`- **${r.path}** — _${r.viewport}_ — ${r.failReasons.join('; ')}`);
            lines.push(fmtEvidence(r));
            if (r.screenshot) lines.push(`      - screenshot: \`${r.screenshot}\``);
        }
    }
    lines.push('');

    // Warnings
    const warns = results.filter((r) => r.verdict === 'WARN');
    lines.push(`## Warnings (${warns.length})`);
    lines.push('');
    if (warns.length === 0) {
        lines.push('_None._');
    } else {
        for (const r of warns) {
            lines.push(`- **${r.path}** — _${r.viewport}_ — ${r.warnReasons.join('; ')}${r.screenshot ? ` — \`${r.screenshot}\`` : ''}`);
        }
    }
    lines.push('');

    // Broken links
    lines.push(`## Broken internal links (${brokenLinks.length})`);
    lines.push('');
    if (brokenLinks.length === 0) {
        lines.push('_None detected among checked links._');
    } else {
        for (const b of brokenLinks) lines.push(`- \`${b.path}\` — ${b.reason}`);
    }
    lines.push('');
    lines.push(
        `_Internal links checked beyond audited routes: ${meta.linksChecked}${meta.linksSkipped > 0 ? ` (capped; ${meta.linksSkipped} additional unique links not checked)` : ''}._`,
    );
    lines.push('');

    // Coverage
    lines.push('## Coverage / Not covered');
    lines.push('');
    lines.push('**Covered:** all static/functional public routes (from src/App.tsx + sitemap.xml), all ' +
        `${meta.conditionCount} condition detail pages, a ${meta.articleCount}-article sample spread across categories, ` +
        'and best-effort single samples of provider-profile / toolkit-detail where discoverable — each on desktop + mobile.');
    lines.push('');
    lines.push('**Form policy:** empty-submit validation only, desktop only, on `/login`, `/signup`, `/contact`, and the ' +
        'newsletter forms (`/`, `/learn`). Any mutating request during the empty submit was ABORTED (never reached the ' +
        'server). `/reset-password`, `/update-password`, `/for-providers/apply`, `/for-providers/claim` were render-only ' +
        '(no submit).');
    lines.push('');
    lines.push('**Not covered (by design):**');
    for (const n of NOT_COVERED) lines.push(`- ${n}`);
    lines.push(`- Articles: sampled ${meta.articleCount} of ~1993 (full-corpus crawl is out of scope).`);
    lines.push('');
    return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
    const startedAt = new Date().toISOString();
    mkdirSync(QA_DIR, { recursive: true });
    if (existsSync(SHOTS_DIR)) rmSync(SHOTS_DIR, { recursive: true, force: true });
    mkdirSync(SHOTS_DIR, { recursive: true });

    const env = loadEnv();

    const browser = await chromium.launch().catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (/Executable doesn't exist|install/i.test(msg)) {
            console.error('\n[qa-audit] Chromium browser is not installed.');
            console.error('[qa-audit] Run:  pnpm exec playwright install chromium\n');
        } else {
            console.error(`[qa-audit] Failed to launch Chromium: ${msg}`);
        }
        process.exit(1);
    });

    console.log(`[qa-audit] Target: ${BASE_URL}`);

    // ---- Discovery (desktop context) ----
    const discoveryCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const discoveryPage = await discoveryCtx.newPage();

    const sitemapPaths = await fetchSitemapPaths();
    console.log(`[qa-audit] Sitemap URLs: ${sitemapPaths.length}`);

    const conditionSlugs = await discoverConditionSlugs(discoveryPage, env);
    console.log(`[qa-audit] Condition detail pages: ${conditionSlugs.length}`);

    const articlePaths = await discoverArticlePaths(discoveryPage, env);
    console.log(`[qa-audit] Article samples: ${articlePaths.length}`);

    const miscDynamic = await discoverMiscDynamic(discoveryPage, env);
    console.log(`[qa-audit] Misc dynamic samples: ${miscDynamic.length} (${miscDynamic.join(', ') || 'none'})`);

    await discoveryPage.close();
    await discoveryCtx.close();

    // ---- Build the audited URL list (ordered, deduped) ----
    const urlSet = new Set<string>();
    const add = (p: string) => {
        const clean = toPath(abs(p));
        if (clean) urlSet.add(clean);
    };
    STATIC_PUBLIC_ROUTES.forEach(add);
    sitemapPaths.forEach(add);
    conditionSlugs.forEach((s) => add(`/conditions/${s}`));
    if (conditionSlugs[0]) add(`/conditions/${conditionSlugs[0]}/articles`);
    articlePaths.forEach(add);
    miscDynamic.forEach(add);

    const urls = [...urlSet];
    console.log(`[qa-audit] Total unique URLs: ${urls.length} (× 2 viewports = ${urls.length * 2} loads)\n`);

    // ---- Audit both viewports ----
    const results: PageResult[] = [];
    const allLinks = new Set<string>();

    for (const viewport of VIEWPORTS) {
        const context =
            viewport === 'desktop'
                ? await browser.newContext({ viewport: { width: 1440, height: 900 } })
                : await browser.newContext({ ...devices['iPhone 13'] });

        console.log(`[qa-audit] === ${viewport} (${results.length ? 'pass 2' : 'pass 1'}) ===`);
        let i = 0;
        for (const path of urls) {
            i += 1;
            // Backstop: a hung page can never stall the whole run past the hard cap.
            const r = await Promise.race([
                auditUrl(context, path, viewport),
                sleep(URL_HARD_CAP_MS).then(() => timeoutResult(path, viewport)),
            ]);
            results.push(r);
            if (viewport === 'desktop') r.links.forEach((l) => allLinks.add(l));
            const tag = r.verdict === 'FAIL' ? '✗ FAIL' : r.verdict === 'WARN' ? '! WARN' : '✓ pass';
            console.log(`  [${i}/${urls.length}] ${tag}  ${path}`);
            await sleep(NAV_DELAY_MS);
        }
        await context.close();
    }

    // ---- Broken-link sweep (links not already audited) ----
    const audited = new Set(urls);
    const toCheck = [...allLinks].filter((l) => !audited.has(l));
    const linkCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const linkPage = await linkCtx.newPage();
    const brokenLinks: BrokenLink[] = [];
    const checkList = toCheck.slice(0, LINK_CHECK_CAP);
    console.log(`\n[qa-audit] Checking ${checkList.length} extra internal links (of ${toCheck.length})...`);
    for (const path of checkList) {
        const b = await resolvePath(linkPage, path);
        if (b) brokenLinks.push(b);
        await sleep(120);
    }
    await linkPage.close();
    await linkCtx.close();
    await browser.close();

    // ---- Write outputs ----
    const meta = {
        totalUrls: urls.length,
        conditionCount: conditionSlugs.length,
        articleCount: articlePaths.length,
        linksChecked: checkList.length,
        linksSkipped: Math.max(0, toCheck.length - checkList.length),
        startedAt,
    };

    writeFileSync(
        join(QA_DIR, 'results.json'),
        JSON.stringify({ meta: { ...meta, baseUrl: BASE_URL }, results, brokenLinks }, null, 2),
    );
    writeFileSync(join(QA_DIR, 'report.md'), buildReport(results, brokenLinks, meta));

    // ---- Stdout summary ----
    const d = counts(results, 'desktop');
    const m = counts(results, 'mobile');
    console.log('\n========== QA AUDIT SUMMARY ==========');
    console.log(`Target:        ${BASE_URL}`);
    console.log(`Unique URLs:   ${urls.length}  (page loads: ${urls.length * 2})`);
    console.log(`Desktop:       ${d.pass} pass / ${d.warn} warn / ${d.fail} fail  (of ${d.total})`);
    console.log(`Mobile:        ${m.pass} pass / ${m.warn} warn / ${m.fail} fail  (of ${m.total})`);
    console.log(`Broken links:  ${brokenLinks.length}`);
    console.log('Report:        qa/report.md');
    console.log('Raw results:   qa/results.json');
    console.log('Screenshots:   qa/screenshots/');
    console.log('======================================');
}

main().catch((err) => {
    console.error('[qa-audit] Fatal:', err);
    process.exit(1);
});
