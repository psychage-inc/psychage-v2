/**
 * Plausible Analytics provider.
 * Privacy-respecting: no cookies, no personal data, GDPR-compliant by default.
 *
 * To activate:
 * 1. Add your Plausible domain to PLAUSIBLE_DOMAIN below
 * 2. Call analytics.setProvider(plausibleProvider) + analytics.init() in App.tsx
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || '';
const PLAUSIBLE_SCRIPT = 'https://plausible.io/js/script.js';

export const plausibleProvider = {
  init() {
    if (!PLAUSIBLE_DOMAIN || typeof document === 'undefined') return;

    const existing = document.querySelector(`script[src="${PLAUSIBLE_SCRIPT}"]`);
    if (existing) return;

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = PLAUSIBLE_DOMAIN;
    script.src = PLAUSIBLE_SCRIPT;
    document.head.appendChild(script);

    // Plausible auto-tracks page views, but we also define the global for custom events
    window.plausible =
      window.plausible ||
      function (...args: Parameters<NonNullable<typeof window.plausible>>) {
        (window.plausible as unknown as { q: unknown[] }).q =
          (window.plausible as unknown as { q: unknown[] }).q || [];
        (window.plausible as unknown as { q: unknown[] }).q.push(args);
      };
  },

  pageView(_path: string) {
    // Plausible auto-tracks page views — no manual call needed
  },

  event(name: string, params?: Record<string, string | number | boolean>) {
    window.plausible?.(name, params ? { props: params } : undefined);
  },
};
