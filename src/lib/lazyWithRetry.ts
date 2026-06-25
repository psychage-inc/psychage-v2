import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Drop-in replacement for `React.lazy` that survives stale chunks after a deploy.
 *
 * Vite emits content-hashed route chunks. When a new deploy ships, the CDN purges
 * the old hashes. A tab that was opened before the deploy and then navigates
 * (typically via browser Back) to a route whose chunk has not been loaded yet
 * triggers a dynamic `import()` for a URL that now 404s — the import rejects and
 * the user lands on the error boundary ("This page encountered an error").
 *
 * This wrapper catches that failure and forces a single full reload to fetch the
 * fresh asset manifest, so the Back navigation simply re-resolves. A
 * sessionStorage flag prevents a reload loop: if the import still fails after one
 * reload (a genuinely missing module / syntax error), we rethrow so the
 * ErrorBoundary fallback renders as before.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
    const FLAG = 'psychage_chunk_reloaded';
    return lazy(async () => {
        try {
            const mod = await factory();
            // Success — clear the flag so a *future* stale-chunk failure can reload again.
            if (typeof window !== 'undefined') window.sessionStorage.removeItem(FLAG);
            return mod;
        } catch (err) {
            const canReload = typeof window !== 'undefined';
            const alreadyReloaded = canReload && window.sessionStorage.getItem(FLAG) === '1';
            if (canReload && !alreadyReloaded) {
                window.sessionStorage.setItem(FLAG, '1');
                window.location.reload();
                // Keep the Suspense fallback up until the reload takes over the page.
                return new Promise<{ default: T }>(() => {});
            }
            // Already retried once (or no window) — surface to the ErrorBoundary.
            throw err;
        }
    });
}
