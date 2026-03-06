import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RecentActivityCard from '../RecentActivityCard';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

const mockActivity = [
    { type: 'assessment' as const, title: 'Clarity Score Check-in', date: '2026-03-05T14:30:00Z' },
    { type: 'appointment' as const, title: 'Dr. Smith Visit', date: '2026-03-04T10:00:00Z' },
];

describe('RecentActivityCard', () => {
    it('should render Activity label', () => {
        renderWithRouter(<RecentActivityCard activity={[]} />);
        expect(screen.getByText('Activity')).toBeInTheDocument();
    });

    it('should show empty state when no activity', () => {
        renderWithRouter(<RecentActivityCard activity={[]} />);
        expect(screen.getByText('No recent activity')).toBeInTheDocument();
    });

    it('should display activity items', () => {
        renderWithRouter(<RecentActivityCard activity={mockActivity} />);
        expect(screen.getByText('Clarity Score Check-in')).toBeInTheDocument();
        expect(screen.getByText('Dr. Smith Visit')).toBeInTheDocument();
    });

    it('should limit to 3 items', () => {
        const fourItems = [
            ...mockActivity,
            { type: 'assessment' as const, title: 'Item 3', date: '2026-03-03T12:00:00Z' },
            { type: 'assessment' as const, title: 'Item 4', date: '2026-03-02T12:00:00Z' },
        ];
        renderWithRouter(<RecentActivityCard activity={fourItems} />);
        expect(screen.queryByText('Item 4')).not.toBeInTheDocument();
    });

    it('should display View All link to history', () => {
        renderWithRouter(<RecentActivityCard activity={mockActivity} />);
        const link = screen.getByRole('link', { name: /view all/i });
        expect(link).toHaveAttribute('href', '/dashboard/history');
    });
});
