/**
 * Analytics abstraction layer.
 * Provider-agnostic API — swap implementations without touching consumer code.
 * Default: Plausible (privacy-respecting, no cookies, GDPR-friendly).
 */

type AnalyticsProvider = {
  init(): void;
  pageView(path: string): void;
  event(name: string, params?: Record<string, string | number | boolean>): void;
};

let provider: AnalyticsProvider | null = null;
let initialized = false;

export const analytics = {
  setProvider(p: AnalyticsProvider) {
    provider = p;
  },

  init() {
    if (initialized || !provider) return;
    provider.init();
    initialized = true;
  },

  pageView(path: string) {
    if (!initialized || !provider) return;
    provider.pageView(path);
  },

  event(name: string, params?: Record<string, string | number | boolean>) {
    if (!initialized || !provider) return;
    provider.event(name, params);
  },
};
