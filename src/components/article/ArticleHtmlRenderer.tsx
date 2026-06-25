import React, { useRef, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';

/**
 * Renders HTML string content safely with chart block hydration
 * and auto-generated heading IDs for TableOfContents integration.
 *
 * Extracted from admin ArticleDetail for shared use between admin and public pages.
 */
function ArticleHtmlRenderer({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sanitize HTML to prevent XSS — allow data attributes for chart hydration
  const sanitizedHtml = useMemo(() => DOMPurify.sanitize(html, {
    ADD_ATTR: ['data-chart-block', 'data-chart', 'loading', 'target'],
    ADD_TAGS: ['iframe'],
  }), [html]);

  // Auto-generate IDs for headings + add lazy loading to images
  useEffect(() => {
    if (!containerRef.current) return;
    const headings = containerRef.current.querySelectorAll('h2:not([id]), h3:not([id])');
    headings.forEach((h) => {
      const text = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
      if (text) h.id = text;
    });
    // Lazy-load inline images
    const images = containerRef.current.querySelectorAll('img:not([loading])');
    images.forEach((img) => img.setAttribute('loading', 'lazy'));

    // Collapse dead chart husks: empty `.recharts-responsive-container` shells left
    // in the stored HTML by older static-render seeding, for which no chart data was
    // ever authored (so they can't be hydrated and would otherwise show a blank box).
    // A hydrated chart's container lives INSIDE a [data-chart-block] mount, so it is
    // excluded — this only hides genuinely-orphaned husks, never a live chart.
    const huskContainers = containerRef.current.querySelectorAll<HTMLElement>('.recharts-responsive-container:empty');
    huskContainers.forEach((el) => {
      if (el.closest('[data-chart-block]')) return; // live chart mount — leave it
      // Hide the fixed-height wrapper so no empty rectangle remains; the chart
      // card's heading + source caption (real text) stay visible.
      (el.parentElement ?? el).style.display = 'none';
    });

    // Reveal scroll-animation wrappers: stored article HTML bakes a Framer-Motion-style
    // reveal INITIAL state (opacity:0 + translateX/Y) into block wrappers. The static reader
    // renders raw HTML with no reveal driver, so these would stay invisible — tables/cards/
    // charts show as blank gaps. Clear the inline opacity/transform so the blocks are visible.
    const revealWrappers = containerRef.current.querySelectorAll<HTMLElement>('[style*="opacity"]');
    revealWrappers.forEach((el) => {
      if (parseFloat(el.style.opacity) === 0) {
        el.style.opacity = '';
        el.style.transform = '';
      }
    });

    // Collapse dead accordion/tab husks: older static-render seeding baked Radix
    // accordion/tab blocks (a `[data-orientation]` root with `role="region"`/
    // `role="tabpanel"` panels) whose panel bodies were unmounted during SSR, leaving
    // them empty. With no content to show, the interactive shell renders as a dead/blank
    // widget. If EVERY panel in a block is empty, hide the whole block so no broken box
    // remains; a block with any surviving panel content is left untouched.
    const accordionRoots = containerRef.current.querySelectorAll<HTMLElement>('[data-orientation]');
    const hiddenHusks = new Set<HTMLElement>();
    accordionRoots.forEach((root) => {
      const wrapper = (root.closest('.not-prose') as HTMLElement | null) ?? root;
      if (hiddenHusks.has(wrapper)) return;
      const panels = wrapper.querySelectorAll('[role="region"], [role="tabpanel"]');
      if (panels.length === 0) return;
      const allEmpty = Array.from(panels).every((p) => p.innerHTML.trim() === '');
      if (allEmpty) {
        wrapper.style.display = 'none';
        hiddenHusks.add(wrapper);
      }
    });

    // Collapse dead stat-card husks: StatCard's count-up animation starts at 0 and never
    // runs under static render, so numeric stats baked to "0" (only the suffix + label
    // survived). A card showing "0%" for a real statistic is misleading — especially on a
    // mental-health page — and the true value is unrecoverable from the stored HTML. If
    // EVERY number in a stat card is a baked zero, hide the card; a card with any real
    // value is left untouched. The big-number node is StatCard-specific (`.tabular-nums`
    // + `text-4xl`); other `tabular-nums` (e.g. audio timecodes) use a smaller size.
    const statNumbers = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('.tabular-nums'),
    ).filter((n) => n.className.includes('text-4xl'));
    const statCards = new Set<HTMLElement>();
    statNumbers.forEach((n) => {
      const card = n.closest('.not-prose') as HTMLElement | null;
      if (card) statCards.add(card);
    });
    statCards.forEach((card) => {
      const nums = Array.from(card.querySelectorAll<HTMLElement>('.tabular-nums')).filter((n) =>
        n.className.includes('text-4xl'),
      );
      if (nums.length === 0) return;
      // A baked zero has `0` as its only digit: "0", "0%", "$0", "0M" — but not "30%"/"100%".
      const allZero = nums.every((n) => /^[^\d]*0[^\d]*$/.test((n.textContent || '').trim()));
      if (allZero) card.style.display = 'none';
    });

    // Guarantee every table can scroll horizontally on narrow screens. Seeded ComparisonTable
    // markup already ships an `.overflow-x-auto` wrapper, but raw/markdown `<table>`s (and any
    // other authoring path) may not — and with `.article-prose td/th { min-width: 80px }` a
    // multi-column table easily exceeds 375px and would clip its rightmost columns. Wrap any
    // table that isn't already inside a scroll container; no-op when one is already present.
    const tables = containerRef.current.querySelectorAll<HTMLTableElement>('table');
    tables.forEach((table) => {
      if (table.closest('.overflow-x-auto')) return; // already scrollable
      const wrapper = document.createElement('div');
      wrapper.className = 'overflow-x-auto';
      table.parentElement?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }, [html]);

  // Hydrate chart blocks embedded as data attributes
  useEffect(() => {
    if (!containerRef.current) return;
    const chartNodes = containerRef.current.querySelectorAll<HTMLElement>('[data-chart-block]');
    if (chartNodes.length === 0) return;

    const roots: Array<{ unmount: () => void }> = [];

    const renderCharts = async () => {
      const { createRoot } = await import('react-dom/client');
      const { default: ReadOnlyChart } = await import('@/components/admin/editor/ReadOnlyChart');

      chartNodes.forEach((node) => {
        const raw = node.getAttribute('data-chart');
        if (!raw) return;
        try {
          const chartData = JSON.parse(raw);
          if (!chartData?.data?.length) return;

          const root = createRoot(node);
          roots.push(root);
          root.render(React.createElement(ReadOnlyChart, { data: chartData }));
        } catch {
          // Malformed chart data — leave the empty div
        }
      });
    };

    renderCharts();

    return () => {
      roots.forEach((root) => root.unmount());
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

export default ArticleHtmlRenderer;
