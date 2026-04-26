import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RetryAction from '../RetryAction';

// Bootstrap a minimal i18n instance with the keys this component reads.
i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
            translation: {
                auth: {
                    retry: {
                        resendIn: 'You can resend in {{seconds}}s',
                    },
                },
            },
        },
    },
    interpolation: { escapeValue: false },
});

function withI18n(node: React.ReactNode) {
    return <I18nextProvider i18n={i18n}>{node}</I18nextProvider>;
}

describe('RetryAction — AUTH-014', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders enabled with the primary label when not throttled', () => {
        const onRetry = vi.fn();
        render(withI18n(<RetryAction label="Try again" onRetry={onRetry} />));
        const btn = screen.getByRole('button', { name: 'Try again' }) as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
        btn.click();
        expect(onRetry).toHaveBeenCalledOnce();
    });

    it('renders disabled with countdown when throttledUntil is in future', () => {
        const fixedNow = 1_700_000_000_000;
        vi.setSystemTime(fixedNow);
        const onRetry = vi.fn();
        render(
            withI18n(
                <RetryAction
                    label="Try again"
                    onRetry={onRetry}
                    throttledUntil={fixedNow + 30_000}
                />,
            ),
        );
        const btn = screen.getByRole('button') as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
        expect(btn.textContent).toContain('30s');
        btn.click();
        expect(onRetry).not.toHaveBeenCalled();
    });

    it('counts down monotonically as time passes', () => {
        const fixedNow = 1_700_000_000_000;
        vi.setSystemTime(fixedNow);
        render(
            withI18n(
                <RetryAction
                    label="Try again"
                    onRetry={vi.fn()}
                    throttledUntil={fixedNow + 30_000}
                />,
            ),
        );
        const initial = (screen.getByRole('button') as HTMLButtonElement).textContent ?? '';
        expect(initial).toContain('30s');

        // Drive the polling interval forward — `setNow(Date.now())` re-renders.
        act(() => {
            vi.advanceTimersByTime(10_000);
        });
        const after = (screen.getByRole('button') as HTMLButtonElement).textContent ?? '';
        // Whatever the exact countdown granularity, the displayed
        // remaining time must have decreased.
        const initialMatch = /(\d+)s/.exec(initial);
        const afterMatch = /(\d+)s/.exec(after);
        expect(initialMatch).not.toBeNull();
        expect(afterMatch).not.toBeNull();
        expect(Number(afterMatch![1])).toBeLessThan(Number(initialMatch![1]));
    });

    it('re-enables when throttle expires', () => {
        const fixedNow = 1_700_000_000_000;
        vi.setSystemTime(fixedNow);
        const onRetry = vi.fn();
        render(
            withI18n(
                <RetryAction
                    label="Try again"
                    onRetry={onRetry}
                    throttledUntil={fixedNow + 2_000}
                />,
            ),
        );
        expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true);

        act(() => {
            vi.setSystemTime(fixedNow + 2_500);
            vi.advanceTimersByTime(2_500);
        });
        const btn = screen.getByRole('button') as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
        expect(btn.textContent).toBe('Try again');
        btn.click();
        expect(onRetry).toHaveBeenCalledOnce();
    });

    it('treats null/undefined throttledUntil as not throttled', () => {
        const onRetry = vi.fn();
        const { rerender } = render(
            withI18n(<RetryAction label="A" onRetry={onRetry} throttledUntil={null} />),
        );
        expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
        rerender(
            withI18n(<RetryAction label="A" onRetry={onRetry} throttledUntil={undefined} />),
        );
        expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
    });
});
