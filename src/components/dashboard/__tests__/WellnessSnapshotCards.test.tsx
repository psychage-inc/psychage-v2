import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WellnessSnapshotCards from '../WellnessSnapshotCards';

import { vi } from 'vitest';

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

const mockMoodStats = {
    averageMood: 3.8,
    totalEntries: 15,
    trend: 'up' as const,
    streakDays: 5,
    recentEntries: [],
};

const mockSleepStats = {
    averageHours: 7.2,
    averageQuality: 3.5,
    totalEntries: 10,
    trend: 'down' as const,
    recommendations: [],
};

const mockClarityStats = {
    streak: 3,
    latestScore: 72,
    lastAssessed: '2026-03-05',
    change: 5,
};

describe('WellnessSnapshotCards', () => {
    it('should render all three snapshot cards', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={mockMoodStats} sleepStats={mockSleepStats} clarityStats={mockClarityStats} />
        );
        expect(screen.getByText('Mood')).toBeInTheDocument();
        expect(screen.getByText('Sleep')).toBeInTheDocument();
        expect(screen.getByText('Clarity')).toBeInTheDocument();
    });

    it('should display mood average when data exists', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={mockMoodStats} sleepStats={null} clarityStats={null} />
        );
        expect(screen.getByText('3.8')).toBeInTheDocument();
        expect(screen.getByText('/ 5')).toBeInTheDocument();
    });

    it('should show streak days for mood', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={mockMoodStats} sleepStats={null} clarityStats={null} />
        );
        expect(screen.getByText('5-day streak')).toBeInTheDocument();
    });

    it('should display sleep average hours', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={null} sleepStats={mockSleepStats} clarityStats={null} />
        );
        expect(screen.getByText('7.2')).toBeInTheDocument();
        expect(screen.getByText('h avg')).toBeInTheDocument();
    });

    it('should display clarity score', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={null} sleepStats={null} clarityStats={mockClarityStats} />
        );
        expect(screen.getByText('72')).toBeInTheDocument();
        expect(screen.getByText('/ 100')).toBeInTheDocument();
    });

    it('should show empty states with CTA links when no data', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={null} sleepStats={null} clarityStats={null} />
        );
        expect(screen.getByText('Open Mood Journal')).toBeInTheDocument();
        expect(screen.getByText('Open Sleep Architect')).toBeInTheDocument();
        expect(screen.getByText('Start Clarity Score')).toBeInTheDocument();
    });

    it('should link to tool pages from empty states', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={null} sleepStats={null} clarityStats={null} />
        );
        const links = screen.getAllByRole('link');
        const hrefs = links.map(l => l.getAttribute('href'));
        expect(hrefs).toContain('/tools/mood-journal');
        expect(hrefs).toContain('/tools/sleep-architect');
        expect(hrefs).toContain('/clarity-score');
    });

    it('should show change percentage for clarity', () => {
        renderWithRouter(
            <WellnessSnapshotCards moodStats={null} sleepStats={null} clarityStats={mockClarityStats} />
        );
        expect(screen.getByText('+5%')).toBeInTheDocument();
    });
});
