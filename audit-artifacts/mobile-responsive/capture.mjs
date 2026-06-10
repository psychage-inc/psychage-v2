// Mobile-responsive audit capture — READ-ONLY instrument.
// Writes only into audit-artifacts/mobile-responsive/. No source files touched.
import { chromium } from '/Users/raiyanabdullah/Desktop/psychage-v2/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = '/Users/raiyanabdullah/Desktop/psychage-v2/audit-artifacts/mobile-responsive';
const RAW = path.join(OUT, 'raw');
fs.mkdirSync(RAW, { recursive: true });

const WIDTHS = [
  { w: 320, h: 568 },
  { w: 360, h: 640 },
  { w: 390, h: 844 },
  { w: 414, h: 896 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
];
const THEMES = ['light', 'dark'];

const STATIC_ROUTES = [
  '/', '/learn', '/providers', '/providers/search', '/how-we-verify',
  '/for-providers', '/for-providers/apply', '/for-providers/claim',
  '/tools', '/tools/mood-journal', '/tools/sleep-architect', '/tools/mindmate',
  '/tools/symptom-navigator', '/tools/symptom-navigator/crisis',
  '/tools/relationship-health', '/tools/medication-tracker',
  '/tools/clarity-journal', '/tools/clarity-journal/daily',
  '/tools/clarity-journal/screening', '/tools/clarity-journal/thought-record',
  '/tools/clarity-journal/activation', '/tools/clarity-journal/triggers',
  '/tools/clarity-journal/toolbox', '/tools/clarity-journal/reflection',
  '/tools/clarity-journal/history', '/tools/clarity-journal/insights',
  '/tools/clarity-journal/entry', '/tools/clarity-journal/report',
  '/search', '/clarity-score', '/about', '/contact', '/content-standards',
  '/advisory-board', '/legal/privacy', '/legal/terms', '/legal/accessibility',
  '/crisis', '/sitemap', '/login', '/signup', '/reset-password', '/update-password',
];
// Always-screenshot routes (core flows) at these widths even with no finding:
const KEY_ROUTES = new Set(['/', '/learn', '/crisis', '/providers/search', '/tools', '/clarity-score', '/tools/symptom-navigator/crisis', '/login', '@article']);
const KEY_WIDTHS = new Set([320, 390, 768]);

const sanitize = (r) => (r === '/' ? 'root' : r.replace(/^\//, '').replace(/[/?:&=]+/g, '_'));

const METRICS_FN = `(() => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const seen = new WeakSet();
  const vis = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const sel = (el) => {
    let p = el.tagName.toLowerCase();
    if (el.id) return p + '#' + el.id;
    const c = (el.className && typeof el.className === 'string') ? el.className.trim().split(/\\s+/).slice(0, 4).join('.') : '';
    return c ? p + '.' + c : p;
  };
  const doc = document.scrollingElement || document.documentElement;
  const overflowPx = Math.max(0, doc.scrollWidth - vw);

  // Offenders: elements extending past viewport horizontally
  const offenders = [];
  if (overflowPx > 1) {
    for (const el of document.body.querySelectorAll('*')) {
      if (offenders.length >= 12) break;
      if (!vis(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 || r.left < -2) {
        // skip if a child of an intentional horizontal scroller
        let a = el, scroller = false;
        while (a && a !== document.body) {
          const s = getComputedStyle(a);
          if ((s.overflowX === 'auto' || s.overflowX === 'scroll') && a.scrollWidth > a.clientWidth + 2) { scroller = true; break; }
          a = a.parentElement;
        }
        if (scroller) continue;
        offenders.push({ sel: sel(el), w: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right), text: (el.textContent || '').trim().slice(0, 40) });
      }
    }
  }

  // Tap targets < 44px (visible, in-flow interactive; skip inline text links per WCAG inline exception)
  const taps = [];
  const ia = document.querySelectorAll('a,button,input,select,textarea,[role="button"],[role="tab"],[role="menuitem"],[role="switch"],[role="checkbox"]');
  for (const el of ia) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (el.tagName === 'A' && s.display === 'inline') continue;
    const minH = parseFloat(s.minHeight) || 0, minW = parseFloat(s.minWidth) || 0;
    const effH = Math.max(r.height, minH), effW = Math.max(r.width, minW);
    if ((effH < 43 || effW < 43) && taps.length < 25) {
      if (el.type === 'hidden' || el.tagName === 'INPUT' && ['checkbox','radio'].includes(el.type) && el.closest('label')) continue;
      taps.push({ sel: sel(el), w: Math.round(r.width), h: Math.round(r.height), text: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 36) });
    }
  }

  // Inputs with font-size < 16px (iOS zoom)
  const smallInputs = [];
  for (const el of document.querySelectorAll('input,select,textarea')) {
    if (!vis(el)) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 16 && smallInputs.length < 15) smallInputs.push({ sel: sel(el), fontSize: fs, type: el.type || el.tagName.toLowerCase(), placeholder: (el.placeholder||'').slice(0,30) });
  }

  // Fixed/sticky elements
  const fixed = [];
  for (const el of document.body.querySelectorAll('*')) {
    const s = getComputedStyle(el);
    if ((s.position === 'fixed' || s.position === 'sticky') && vis(el)) {
      const r = el.getBoundingClientRect();
      if (r.height > 8 && fixed.length < 12) fixed.push({ sel: sel(el), pos: s.position, top: Math.round(r.top), h: Math.round(r.height), z: s.zIndex });
    }
  }

  // Headings: family + size (Fraunces ramp check)
  const headings = [];
  for (const el of document.querySelectorAll('h1,h2')) {
    if (!vis(el) || headings.length >= 10) continue;
    const s = getComputedStyle(el);
    headings.push({ tag: el.tagName, family: s.fontFamily.split(',')[0].replace(/"/g, ''), size: parseFloat(s.fontSize), lh: s.lineHeight, text: (el.textContent||'').trim().slice(0, 40) });
  }

  // Longest paragraph measure (ch estimate)
  let maxCh = 0, maxChSel = '';
  for (const p of document.querySelectorAll('p')) {
    if (!vis(p)) continue;
    const s = getComputedStyle(p);
    const fs = parseFloat(s.fontSize);
    const est = p.clientWidth / (fs * 0.5);
    if (est > maxCh && (p.textContent||'').length > 120) { maxCh = Math.round(est); maxChSel = sel(p); }
  }

  // Images
  const imgs = [];
  for (const img of document.querySelectorAll('img')) {
    if (!vis(img) || imgs.length >= 20) continue;
    const r = img.getBoundingClientRect();
    imgs.push({
      src: (img.currentSrc || img.src || '').split('/').slice(-1)[0].slice(0, 50),
      natW: img.naturalWidth, dispW: Math.round(r.width),
      loading: img.getAttribute('loading'), hasWH: !!(img.getAttribute('width') && img.getAttribute('height')),
      srcset: !!(img.srcset || img.closest('picture')),
    });
  }

  // Crisis reachability: visible element linking to /crisis or 988 anywhere on the page
  let crisis = false, crisisHow = [];
  for (const el of document.querySelectorAll('a[href*="crisis" i],a[href^="tel:988"],a[href^="sms:988"],a[href*="988"]')) {
    if (vis(el)) { crisis = true; crisisHow.push(sel(el) + '|' + (el.getAttribute('href')||'')); if (crisisHow.length>3) break; }
  }
  // also nav button that opens menu containing crisis — checked separately

  // Targeted contrast (opaque-on-opaque only, skip gradients/images)
  const parseC = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const a = m[1].split(',').map(parseFloat); return { r: a[0], g: a[1], b: a[2], a: a.length > 3 ? a[3] : 1 }; };
  const lum = ({r,g,b}) => { const f = (v) => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
  const ratio = (c1, c2) => { const l1 = lum(c1), l2 = lum(c2); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
  const contrast = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n, count = 0;
  while ((n = walker.nextNode()) && count < 4000) {
    count++;
    const el = n.parentElement;
    if (!el || !n.textContent.trim() || n.textContent.trim().length < 3) continue;
    if (!vis(el)) continue;
    const s = getComputedStyle(el);
    const fg = parseC(s.color);
    if (!fg || fg.a < 0.99) continue;
    // walk up for opaque bg; bail on gradient/image
    let a = el, bg = null, bail = false;
    while (a) {
      const as = getComputedStyle(a);
      if (as.backgroundImage && as.backgroundImage !== 'none') { bail = true; break; }
      const c = parseC(as.backgroundColor);
      if (c && c.a >= 0.99) { bg = c; break; }
      if (c && c.a > 0.05) { bail = true; break; } // translucent — unreliable
      a = a.parentElement;
    }
    if (bail || !bg) continue;
    const rt = ratio(fg, bg);
    const fsz = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight) >= 700;
    const large = fsz >= 24 || (fsz >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (rt < need - 0.05 && contrast.length < 15) {
      contrast.push({ sel: sel(el), color: s.color, bg: 'rgb(' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + ')', ratio: Math.round(rt*100)/100, fontSize: fsz, need, text: n.textContent.trim().slice(0, 36) });
    }
  }

  return { overflowPx, offenders, taps, smallInputs, fixed, headings, maxCh, maxChSel, imgs, crisis, crisisHow, contrast,
    bodyFont: getComputedStyle(document.body).fontFamily.split(',')[0].replace(/"/g,'') };
})()`;

async function run() {
  const routesArg = process.argv[2]; // optional comma-separated subset
  const widthsArg = process.argv[3]; // optional comma-separated widths
  const browser = await chromium.launch();
  const results = [];

  // resolve one real article + category route from /learn
  let articleRoute = null, categoryRoute = null;
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    try {
      await p.goto(BASE + '/learn', { waitUntil: 'load', timeout: 30000 });
      await p.waitForTimeout(2500);
      const links = await p.evaluate(() => Array.from(document.querySelectorAll('a[href^="/learn/"]')).map(a => a.getAttribute('href')));
      categoryRoute = links.find(h => h && h.split('/').filter(Boolean).length === 2) || null;
      articleRoute = links.find(h => h && h.split('/').filter(Boolean).length === 3) || null;
      if (!articleRoute && categoryRoute) {
        await p.goto(BASE + categoryRoute, { waitUntil: 'load', timeout: 30000 });
        await p.waitForTimeout(2500);
        const l2 = await p.evaluate(() => Array.from(document.querySelectorAll('a[href^="/learn/"]')).map(a => a.getAttribute('href')));
        articleRoute = l2.find(h => h && h.split('/').filter(Boolean).length === 3) || null;
      }
    } catch (e) { console.error('resolve article failed:', e.message); }
    await ctx.close();
  }
  console.log('resolved category:', categoryRoute, 'article:', articleRoute);

  let ROUTES = [...STATIC_ROUTES];
  if (categoryRoute) ROUTES.push(categoryRoute);
  if (articleRoute) { ROUTES.push(articleRoute); KEY_ROUTES.add(articleRoute); }
  if (routesArg) ROUTES = routesArg.split(',');
  const widths = widthsArg ? WIDTHS.filter(x => widthsArg.split(',').includes(String(x.w))) : WIDTHS;

  for (const route of ROUTES) {
    for (const { w, h } of widths) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: 2,
        isMobile: w < 768,
        hasTouch: w < 1024,
        reducedMotion: 'no-preference',
      });
      for (const theme of THEMES) {
        const page = await ctx.newPage();
        const consoleErrors = [];
        page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });
        await page.addInitScript((t) => { try { localStorage.setItem('psychage_theme', t); localStorage.setItem('psychage_cookie_consent', JSON.stringify({necessary:true,analytics:false,timestamp:1})); localStorage.setItem('psychage-crisis-banner-dismissed', ''); } catch {} }, theme);
        const rec = { route, width: w, theme, ok: false };
        try {
          await page.goto(BASE + route, { waitUntil: 'load', timeout: 30000 });
          await page.waitForTimeout(1200);
          // step-scroll to mount lazy sections
          await page.evaluate(async () => {
            const d = document.scrollingElement;
            for (let y = 0; y < d.scrollHeight; y += window.innerHeight) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
            window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 300));
          });
          const m = await page.evaluate(METRICS_FN);
          Object.assign(rec, m, { ok: true, consoleErrors: consoleErrors.slice(0, 5) });
          const hasFinding = m.overflowPx > 4 || (m.offenders && m.offenders.length) || !m.crisis;
          const isKey = (KEY_ROUTES.has(route) && KEY_WIDTHS.has(w));
          if (hasFinding || isKey) {
            const dir = path.join(OUT, sanitize(route));
            fs.mkdirSync(dir, { recursive: true });
            await page.screenshot({ path: path.join(dir, `${w}-${theme}.png`), fullPage: true }).catch(() => {});
            rec.shot = `${sanitize(route)}/${w}-${theme}.png`;
          }
        } catch (e) {
          rec.error = e.message.slice(0, 200);
        }
        results.push(rec);
        fs.appendFileSync(path.join(RAW, 'results.jsonl'), JSON.stringify(rec) + '\n');
        await page.close();
        process.stdout.write(`${route} ${w} ${theme} ${rec.ok ? 'ok' : 'ERR'} ovf=${rec.overflowPx ?? '-'} taps=${rec.taps ? rec.taps.length : '-'} crisis=${rec.crisis}\n`);
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log('DONE', results.length, 'combos');
}
run().catch((e) => { console.error(e); process.exit(1); });
