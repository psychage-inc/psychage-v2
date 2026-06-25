import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArticleHtmlRenderer from './ArticleHtmlRenderer';

/**
 * Regression guard for the recurring "embeds render as blank gaps" bug.
 *
 * Stored article HTML bakes a Framer-Motion scroll-reveal INITIAL state
 * (style="opacity:0;transform:translateY(16px)") into block wrappers. The static
 * reader has no reveal driver, so without intervention those wrappers stay at
 * opacity:0 and tables/charts/cards are invisible. The renderer neutralizes the
 * baked state. These tests assert (a) the embed markup survives sanitization,
 * (b) the reveal wrappers are revealed, and (c) XSS is still stripped.
 */

// Reveal-wrapped table + svg + chart block, plus XSS payloads.
const html = `
  <p>Surface vs. Deep Connection:</p>
  <div class="not-prose my-8 reveal-table" style="opacity:0;transform:translateY(16px)">
    <h4>Comparison</h4>
    <table>
      <thead><tr><th>Feature</th><th>Surface</th></tr></thead>
      <tbody><tr><td>Depth</td><td>Low</td></tr></tbody>
    </table>
  </div>
  <div class="not-prose reveal-svg" style="opacity:0;transform:translateX(-16px)">
    <svg viewBox="0 0 10 10"><path d="M0 0 L10 10"></path></svg>
  </div>
  <div data-chart-block data-chart="{}"></div>
  <img src="broken.png" onerror="alert('xss')" />
  <script>alert('xss')</script>
`;

describe('ArticleHtmlRenderer — embed visibility regression guard', () => {
  it('keeps table / svg / chart-block markup through sanitization', () => {
    const { container } = render(<ArticleHtmlRenderer html={html} />);

    expect(container.querySelector('table')).not.toBeNull();
    expect(container.querySelector('th')).not.toBeNull();
    expect(container.querySelector('td')).not.toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('svg path')).not.toBeNull();
    expect(container.querySelector('[data-chart-block]')).not.toBeNull();
  });

  it('neutralizes the baked opacity:0 reveal state so embeds are visible', () => {
    const { container } = render(<ArticleHtmlRenderer html={html} />);

    const wrappers = container.querySelectorAll<HTMLElement>('.not-prose');
    expect(wrappers.length).toBe(2); // wrappers preserved, not stripped
    wrappers.forEach((el) => {
      expect(el.style.opacity).not.toBe('0');
    });
    // No element is left hidden by the baked reveal state.
    expect(container.innerHTML).not.toContain('opacity:0');
  });

  it('still strips XSS (script + inline event handlers)', () => {
    const { container } = render(<ArticleHtmlRenderer html={html} />);

    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('img')?.getAttribute('onerror')).toBeNull();
    expect(container.innerHTML).not.toContain('onerror');
  });
});

/**
 * Dead accordion/tab husks: lossy SSR seeding baked Radix accordion/tab blocks
 * whose panel bodies were unmounted, leaving empty `role="region"` panels. A
 * block whose panels are ALL empty is hidden so no broken interactive box shows;
 * a block with any surviving panel content is kept.
 */
const huskHtml = `
  <p>intro</p>
  <div class="not-prose my-8" style="opacity:0;transform:translateY(16px)">
    <div dir="ltr" data-orientation="horizontal">
      <div role="tablist"><h3>Section A</h3><h3>Section B</h3></div>
      <div role="region" aria-labelledby="a"></div>
      <div role="region" aria-labelledby="b"></div>
    </div>
  </div>
  <div class="not-prose live-tabs" style="opacity:0">
    <div data-orientation="horizontal">
      <div role="tablist"><h3>Live</h3></div>
      <div role="region"><p>real content</p></div>
    </div>
  </div>
`;

describe('ArticleHtmlRenderer — dead accordion/tab husk collapse', () => {
  it('hides a block whose panels are all empty, keeps one with content', () => {
    const { container } = render(<ArticleHtmlRenderer html={huskHtml} />);

    const wrappers = container.querySelectorAll<HTMLElement>('.not-prose');
    expect(wrappers.length).toBe(2); // both wrappers preserved in the DOM
    expect(wrappers[0].style.display).toBe('none'); // all-empty husk hidden
    expect(wrappers[1].style.display).not.toBe('none'); // surviving content kept
  });

  it('does not drop surviving panel content', () => {
    const { container } = render(<ArticleHtmlRenderer html={huskHtml} />);
    expect(container.textContent).toContain('real content');
  });
});

/**
 * Dead stat-card husks: StatCard's count-up starts at 0 and never animates under
 * static render, so numeric stats bake to "0". A card whose numbers are ALL baked
 * zeros is hidden (a false "0%" is misleading); a card with any real value, and a
 * non-StatCard `tabular-nums` (e.g. a table), are left untouched.
 */
const statNumber = (v: string) =>
  `<div class="text-4xl md:text-5xl font-bold text-text-primary tabular-nums">${v}</div><p class="mt-2 text-sm text-text-tertiary max-w-[200px]">A real statistic</p>`;
const statHtml = `
  <div class="not-prose my-8 rounded-2xl stat-zero">
    <div class="grid grid-cols-2 divide-x divide-border">
      <div class="flex flex-col items-center p-6">${statNumber('0%')}</div>
      <div class="flex flex-col items-center p-6">${statNumber('0M')}</div>
    </div>
  </div>
  <div class="not-prose my-8 rounded-2xl stat-real">
    <div class="grid grid-cols-1">
      <div class="flex flex-col items-center p-6">${statNumber('30%')}</div>
    </div>
  </div>
  <table><thead><tr><th class="tabular-nums">0</th></tr></thead><tbody><tr><td>row</td></tr></tbody></table>
`;

describe('ArticleHtmlRenderer — dead stat-card husk collapse', () => {
  it('hides a stat card whose numbers are all baked zeros', () => {
    const { container } = render(<ArticleHtmlRenderer html={statHtml} />);
    const zeroCard = container.querySelector<HTMLElement>('.stat-zero');
    expect(zeroCard?.style.display).toBe('none');
  });

  it('keeps a stat card that has a real value', () => {
    const { container } = render(<ArticleHtmlRenderer html={statHtml} />);
    const realCard = container.querySelector<HTMLElement>('.stat-real');
    expect(realCard?.style.display).not.toBe('none');
    expect(container.textContent).toContain('30%');
  });

  it('leaves a non-StatCard table untouched (selector guard)', () => {
    const { container } = render(<ArticleHtmlRenderer html={statHtml} />);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect((table as HTMLElement).style.display).not.toBe('none');
  });
});
