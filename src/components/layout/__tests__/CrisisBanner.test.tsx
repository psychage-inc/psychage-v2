import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CrisisBanner from '../CrisisBanner';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            button: forwardRef(({ children, whileTap, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

// Mock crisis module to return known US resources
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
            {
                name: 'Crisis Text Line',
                type: 'text',
                text_instruction: 'Text HOME to 741741',
                verification_status: 'verified',
                source_priority: 1,
            },
        ],
    }),
}));

describe('CrisisBanner', () => {
    it('should render 24/7 support label', () => {
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);
        expect(screen.getByText('24/7 Support')).toBeInTheDocument();
    });

    it('should display 988 number', () => {
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);
        expect(screen.getByText('988')).toBeInTheDocument();
    });

    it('should display crisis hotline label', () => {
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);
        expect(screen.getByText(/988 Suicide & Crisis Lifeline/)).toBeInTheDocument();
    });

    it('should render Call Now button', () => {
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);
        expect(screen.getByText('Call Now')).toBeInTheDocument();
    });

    it('should render text action button', () => {
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);
        expect(screen.getByText('Text HOME to 741741')).toBeInTheDocument();
    });

    it('should open tel:988 on Call Now click', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);

        fireEvent.click(screen.getByText('Call Now'));
        expect(openSpy).toHaveBeenCalledWith('tel:988');

        openSpy.mockRestore();
    });

    it('should open sms:741741 on text button click', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<MemoryRouter><CrisisBanner /></MemoryRouter>);

        fireEvent.click(screen.getByText('Text HOME to 741741'));
        expect(openSpy).toHaveBeenCalledWith('sms:741741');

        openSpy.mockRestore();
    });
});
