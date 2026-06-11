import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Initialize the real i18n instance for all tests so components wired with
// useTranslation()/<Trans> resolve to actual EN strings (not raw keys). Without
// this, the crisis-namespace migration would turn every text assertion into a
// missing-provider key lookup. LanguageDetector resolves to 'en' in jsdom.
import '@/lib/i18n';

expect.extend(matchers);

if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
}

afterEach(() => {
    cleanup();
});
