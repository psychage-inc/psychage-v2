/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CrisisBanner from '../CrisisBanner';

// AnimatePresence/motion are not relevant to behavior here — render children plainly.
vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

// Resolve to deterministic US resources so the rendered phone/label are known.
vi.mock('@/lib/crisis', () => ({
    resolveCountry: () => 'US',
    getResourcesForCountry: () => ({
        country: { country_name: 'United States', iso2: 'US' },
        emergency_number: '911',
        all_resources: [
            {
                name: '988 Suicide & Crisis Lifeline',
                type: 'hotline',
                phone: '988',
                verification_status: 'verified',
                source_priority: 1,
            },
        ],
    }),
}));

const renderBanner = () =>
    render(
        <MemoryRouter>
            <CrisisBanner />
        </MemoryRouter>
    );

// i18n is initialized in src/tests/setup.ts; useTranslation resolves to EN here.
describe('CrisisBanner', () => {
    beforeEach(() => {
        try {
            sessionStorage.clear();
        } catch {
            /* sessionStorage unavailable */
        }
    });

    it('renders the localized 24/7 crisis support title', () => {
        renderBanner();
        expect(screen.getByText('24/7 Crisis Support')).toBeInTheDocument();
    });

    it('shows the resolved primary phone and label', () => {
        renderBanner();
        expect(screen.getByText(/988 \(988 Suicide & Crisis Lifeline\)/)).toBeInTheDocument();
    });

    it('renders a Call Now action linking to tel: the primary phone', () => {
        renderBanner();
        const call = screen.getByText('Call Now').closest('a');
        expect(call).toHaveAttribute('href', 'tel:988');
    });

    it('renders a Resources link to the /crisis page', () => {
        renderBanner();
        const resources = screen.getByText('Resources').closest('a');
        expect(resources).toHaveAttribute('href', '/crisis');
    });

    it('dismisses the banner when the dismiss control is clicked', () => {
        renderBanner();
        fireEvent.click(screen.getByLabelText('Dismiss crisis support notification'));
        expect(screen.queryByText('24/7 Crisis Support')).not.toBeInTheDocument();
    });
});
