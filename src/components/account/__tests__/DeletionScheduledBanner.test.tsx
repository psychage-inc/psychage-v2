import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@/lib/i18n';
import React from 'react';

/**
 * AUTH-021 — DeletionScheduledBanner renders only when a deletion is
 * scheduled, displays days remaining, and removes itself when the user
 * cancels.
 */

const cancelDeletionMock = vi.fn();

vi.mock('@/services/privacyService', () => ({
    privacyService: {
        cancelDeletion: () => cancelDeletionMock(),
    },
}));

let mockStatus = {
    isScheduled: false,
    scheduledAt: null as Date | null,
    daysRemaining: null as number | null,
    isLoading: false,
    refetch: vi.fn(),
};

vi.mock('@/hooks/useAccountDeletionStatus', () => ({
    useAccountDeletionStatus: () => mockStatus,
}));

import DeletionScheduledBanner from '../DeletionScheduledBanner';

function renderBanner() {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(
        <QueryClientProvider client={qc}>
            <I18nextProvider i18n={i18n}>
                <DeletionScheduledBanner />
            </I18nextProvider>
        </QueryClientProvider>,
    );
}

describe('DeletionScheduledBanner — AUTH-021', () => {
    beforeEach(() => {
        cancelDeletionMock.mockReset();
        mockStatus = {
            isScheduled: false,
            scheduledAt: null,
            daysRemaining: null,
            isLoading: false,
            refetch: vi.fn(),
        };
    });

    it('renders nothing when no deletion is scheduled', () => {
        const { container } = renderBanner();
        expect(container.querySelector('[data-testid="deletion-scheduled-banner"]')).toBeNull();
    });

    it('renders the banner with days remaining when scheduled', () => {
        const future = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        mockStatus = {
            isScheduled: true,
            scheduledAt: future,
            daysRemaining: 15,
            isLoading: false,
            refetch: vi.fn(),
        };
        renderBanner();
        expect(screen.getByTestId('deletion-scheduled-banner')).toBeTruthy();
        expect(screen.getByText(/Account deletion scheduled/i)).toBeTruthy();
        // Body should contain "15 days"
        expect(screen.getByText(/15 days/i)).toBeTruthy();
    });

    it('uses the singular "tomorrow" copy when 1 day remains', () => {
        const future = new Date(Date.now() + 24 * 60 * 60 * 1000);
        mockStatus = {
            isScheduled: true,
            scheduledAt: future,
            daysRemaining: 1,
            isLoading: false,
            refetch: vi.fn(),
        };
        renderBanner();
        expect(screen.getByText(/tomorrow/i)).toBeTruthy();
    });

    it('calls cancelDeletion when the cancel button is clicked', async () => {
        cancelDeletionMock.mockResolvedValueOnce(true);
        const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        mockStatus = {
            isScheduled: true,
            scheduledAt: future,
            daysRemaining: 5,
            isLoading: false,
            refetch: vi.fn(),
        };
        renderBanner();
        const btn = screen.getByRole('button', { name: /Cancel deletion/i });
        await act(async () => {
            btn.click();
        });
        await waitFor(() => {
            expect(cancelDeletionMock).toHaveBeenCalledOnce();
        });
    });

    it('shows an error message when cancel fails', async () => {
        cancelDeletionMock.mockResolvedValueOnce(false);
        const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        mockStatus = {
            isScheduled: true,
            scheduledAt: future,
            daysRemaining: 5,
            isLoading: false,
            refetch: vi.fn(),
        };
        renderBanner();
        const btn = screen.getByRole('button', { name: /Cancel deletion/i });
        await act(async () => {
            btn.click();
        });
        await waitFor(() => {
            expect(screen.getByText(/Couldn't cancel deletion right now/i)).toBeTruthy();
        });
    });
});
