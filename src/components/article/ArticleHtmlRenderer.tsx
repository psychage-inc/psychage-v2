import React, { useRef, useEffect } from 'react';

/**
 * Renders HTML string content safely with chart block hydration
 * and auto-generated heading IDs for TableOfContents integration.
 *
 * Extracted from admin ArticleDetail for shared use between admin and public pages.
 */
function ArticleHtmlRenderer({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-generate IDs for headings that lack them (for TableOfContents)
  useEffect(() => {
    if (!containerRef.current) return;
    const headings = containerRef.current.querySelectorAll('h2:not([id]), h3:not([id])');
    headings.forEach((h) => {
      const text = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
      if (text) h.id = text;
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
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default ArticleHtmlRenderer;
