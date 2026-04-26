import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import React from 'react';

/**
 * AUTH-018: AuthCallback's setTimeout(navigate, 3000) calls must be
 * cancelled on unmount. Otherwise navigate runs against an unmounted
 * tree, producing console warnings and (worse) yanking the user away
 * from a destination they reached in the meantime.
 */

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

const getSessionMock = vi.fn();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: () => getSessionMock(),
        },
    },
}));

vi.mock('@/lib/urls', () => ({
    adminUrl: (path: string) => `https://admin.example.com${path}`,
    mainUrl: (path: string) => `https://www.example.com${path}`,
    isAdminDomain: () => false,
}));

import AuthCallback from '../AuthCallback';

function renderPage() {
    return render(
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/auth/callback']}>
                    <AuthCallback />
                </MemoryRouter>
            </I18nextProvider>
        </HelmetProvider>,
    );
}

describe('AuthCallback — AUTH-018 cancellable timers', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        navigateMock.mockReset();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('cancels the pending redirect setTimeout when unmounted before it fires', async () => {
        getSessionMock.mockResolvedValueOnce({
            data: { session: null },
            error: { message: 'Some auth error', code: 'unknown' },
        });

        const { unmount } = renderPage();
        // Let the async getSession() resolve
        await act(async () => {
            await Promise.resolve();
        });

        unmount();

        // Drive the 3000ms timer past expiry
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        // The navigate scheduled inside the cancelled timer must NOT have fired
        expect(navigateMock).not.toHaveBeenCalled();
    });
});
