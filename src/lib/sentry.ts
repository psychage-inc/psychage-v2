import * as Sentry from '@sentry/react';

const DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const IS_DEV = import.meta.env.DEV;

/**
 * Initialize Sentry error monitoring.
 * - Disabled in development (no DSN = no-op)
 * - Strips PHI from error events (email, search queries, message content)
 * - DSN provided via VITE_SENTRY_DSN env var
 */
export function initSentry() {
  if (!DSN || IS_DEV) return;

  Sentry.init({
    dsn: DSN,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_GIT_SHA || undefined,

    // Sample 100% of errors, 10% of transactions
    sampleRate: 1.0,
    tracesSampleRate: 0.1,

    // Strip PHI from error events
    beforeSend(event) {
      // Strip user email
      if (event.user) {
        delete event.user.email;
        delete event.user.username;
      }

      // Strip search queries and message content from breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map(crumb => {
          if (crumb.data) {
            delete crumb.data.query;
            delete crumb.data.search;
            delete crumb.data.message;
          }
          return crumb;
        });
      }

      // Strip URL query params that may contain health data
      if (event.request?.url) {
        try {
          const url = new URL(event.request.url);
          url.searchParams.delete('q');
          url.searchParams.delete('query');
          url.searchParams.delete('specialty');
          event.request.url = url.toString();
        } catch {
          // Non-URL, leave as-is
        }
      }

      return event;
    },
  });
}
