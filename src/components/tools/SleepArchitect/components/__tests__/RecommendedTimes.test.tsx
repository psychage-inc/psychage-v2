/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RecommendedTimes from '../RecommendedTimes';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

const mockWakeTimes = [
    { time: '06:30', cycles: 4, totalSleepMinutes: 360, label: 'Minimum' },
    { time: '08:00', cycles: 5, totalSleepMinutes: 450, label: 'Recommended' },
];

const mockBedtimes = [
    { time: '22:30', cycles: 5, totalSleepMinutes: 450, label: 'Ideal' },
    { time: '00:00', cycles: 4, totalSleepMinutes: 360, label: 'Late' },
];

describe('RecommendedTimes', () => {
    it('should render toggle button with label', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        expect(screen.getByText('Recommended Times')).toBeInTheDocument();
    });

    it('should start collapsed', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        expect(screen.getByRole('button', { name: /recommended times/i })).toHaveAttribute('aria-expanded', 'false');
    });

    it('should expand on click', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        fireEvent.click(screen.getByText('Recommended Times'));
        expect(screen.getByRole('button', { name: /recommended times/i })).toHaveAttribute('aria-expanded', 'true');
    });

    it('should show wake times when expanded', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        fireEvent.click(screen.getByText('Recommended Times'));
        expect(screen.getByText('06:30')).toBeInTheDocument();
        expect(screen.getByText('08:00')).toBeInTheDocument();
        expect(screen.getByText('Minimum')).toBeInTheDocument();
        expect(screen.getByText('Recommended')).toBeInTheDocument();
    });

    it('should show bedtimes when expanded', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        fireEvent.click(screen.getByText('Recommended Times'));
        expect(screen.getByText('22:30')).toBeInTheDocument();
        expect(screen.getByText('00:00')).toBeInTheDocument();
        expect(screen.getByText('Ideal')).toBeInTheDocument();
        expect(screen.getByText('Late')).toBeInTheDocument();
    });

    it('should show section headers when expanded', () => {
        render(<RecommendedTimes wakeTimes={mockWakeTimes} bedtimes={mockBedtimes} />);
        fireEvent.click(screen.getByText('Recommended Times'));
        expect(screen.getByText(/wake at end of cycle/i)).toBeInTheDocument();
        expect(screen.getByText(/ideal bedtimes for your wake time/i)).toBeInTheDocument();
    });
});
