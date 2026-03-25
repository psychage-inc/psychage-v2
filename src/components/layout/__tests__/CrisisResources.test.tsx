 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CrisisResources from '../CrisisResources';

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
                chat_url: 'sms:741741',
                verification_status: 'verified',
                source_priority: 1,
            },
            {
                name: 'SAMHSA Treatment Locator',
                type: 'web',
                web_url: 'https://findtreatment.gov',
                verification_status: 'verified',
                source_priority: 2,
            },
        ],
    }),
}));

describe('CrisisResources', () => {
    it('should render crisis heading', () => {
        render(<CrisisResources />);
        expect(screen.getByText(/in crisis/i)).toBeInTheDocument();
    });

    it('should display 988 lifeline', () => {
        render(<CrisisResources />);
        expect(screen.getByText('988')).toBeInTheDocument();
        expect(screen.getByText(/988 Suicide & Crisis Lifeline/i)).toBeInTheDocument();
    });

    it('should display crisis text line', () => {
        render(<CrisisResources />);
        expect(screen.getByText(/Text HOME to 741741/i)).toBeInTheDocument();
        expect(screen.getByText(/Crisis Text Line/i)).toBeInTheDocument();
    });

    it('should display treatment locator', () => {
        render(<CrisisResources />);
        expect(screen.getByText(/Visit website/i)).toBeInTheDocument();
        expect(screen.getByText(/SAMHSA Treatment Locator/i)).toBeInTheDocument();
    });

    it('should render tel:988 link', () => {
        render(<CrisisResources />);
        const link = screen.getByRole('link', { name: /988/i });
        expect(link).toHaveAttribute('href', 'tel:988');
    });

    it('should render external treatment locator link with noopener', () => {
        render(<CrisisResources />);
        const link = screen.getByRole('link', { name: /SAMHSA/i });
        expect(link).toHaveAttribute('href', 'https://findtreatment.gov');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
        expect(link).toHaveAttribute('target', '_blank');
    });
});
