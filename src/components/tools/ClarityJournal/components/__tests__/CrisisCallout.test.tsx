 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CrisisCallout from '../CrisisCallout';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('CrisisCallout', () => {
    it('should render crisis heading', () => {
        renderWithRouter(<CrisisCallout />);
        expect(screen.getByText(/if you are in crisis/i)).toBeInTheDocument();
    });

    it('should display 988 contact', () => {
        renderWithRouter(<CrisisCallout />);
        expect(screen.getByText('988')).toBeInTheDocument();
    });

    it('should link to findahelpline.com', () => {
        renderWithRouter(<CrisisCallout />);
        const link = screen.getByRole('link', { name: /findahelpline/i });
        expect(link).toHaveAttribute('href', 'https://findahelpline.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('should link to internal crisis page', () => {
        renderWithRouter(<CrisisCallout />);
        const link = screen.getByRole('link', { name: /psychage\.com\/crisis/i });
        expect(link).toHaveAttribute('href', '/crisis');
    });

    it('should have red styling for urgency', () => {
        const { container } = renderWithRouter(<CrisisCallout />);
        const banner = container.firstElementChild as HTMLElement;
        expect(banner).toHaveClass('bg-red-50');
    });
});
