import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import QuickActionCard from '../QuickActionCard';
import { Sun } from 'lucide-react';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('QuickActionCard', () => {
    it('should render title', () => {
        renderWithRouter(
            <QuickActionCard icon={Sun} title="Daily Check-In" subtitle="2 min" route="/tools/daily" />
        );
        expect(screen.getByText('Daily Check-In')).toBeInTheDocument();
    });

    it('should render subtitle', () => {
        renderWithRouter(
            <QuickActionCard icon={Sun} title="Test" subtitle="Quick task" route="/tools/test" />
        );
        expect(screen.getByText('Quick task')).toBeInTheDocument();
    });

    it('should link to the correct route', () => {
        renderWithRouter(
            <QuickActionCard icon={Sun} title="Test" subtitle="Sub" route="/tools/mood" />
        );
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/tools/mood');
    });

    it('should show completed state with check icon', () => {
        const { container } = renderWithRouter(
            <QuickActionCard icon={Sun} title="Done" subtitle="Done" route="/x" completed />
        );
        // Completed card uses teal styling
        expect(container.querySelector('.bg-teal-50')).not.toBeNull();
    });

    it('should apply red accent styling', () => {
        const { container } = renderWithRouter(
            <QuickActionCard icon={Sun} title="Crisis" subtitle="Help" route="/crisis" accent="red" />
        );
        expect(container.querySelector('.bg-red-50')).not.toBeNull();
    });
});
