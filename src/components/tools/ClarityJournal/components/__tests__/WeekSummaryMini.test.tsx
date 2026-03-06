import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WeekSummaryMini from '../WeekSummaryMini';
import type { DailyCheckIn } from '../../types';

const makeCheckIn = (overrides: Partial<DailyCheckIn> = {}): DailyCheckIn => ({
    id: '1',
    date: '2026-03-06',
    mood: 7,
    sleepHours: 7.5,
    sleepQuality: 'good',
    energy: 6,
    oneSentence: 'Doing fine',
    tags: [],
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z',
    ...overrides,
});

describe('WeekSummaryMini', () => {
    it('should show empty state when no check-ins', () => {
        render(<WeekSummaryMini checkIns={[]} />);
        expect(screen.getByText(/no daily check-ins this week/i)).toBeInTheDocument();
    });

    it('should render stat labels', () => {
        render(<WeekSummaryMini checkIns={[makeCheckIn()]} />);
        expect(screen.getByText('Avg Mood')).toBeInTheDocument();
        expect(screen.getByText('Avg Energy')).toBeInTheDocument();
        expect(screen.getByText('Avg Sleep')).toBeInTheDocument();
        expect(screen.getByText('Check-ins')).toBeInTheDocument();
    });

    it('should calculate correct average mood', () => {
        const checkIns = [
            makeCheckIn({ mood: 6 }),
            makeCheckIn({ id: '2', mood: 8 }),
        ];
        render(<WeekSummaryMini checkIns={checkIns} />);
        expect(screen.getByText('7.0')).toBeInTheDocument();
    });

    it('should calculate correct average sleep', () => {
        const checkIns = [
            makeCheckIn({ sleepHours: 7 }),
            makeCheckIn({ id: '2', sleepHours: 9 }),
        ];
        render(<WeekSummaryMini checkIns={checkIns} />);
        expect(screen.getByText('8.0h')).toBeInTheDocument();
    });

    it('should display check-in count', () => {
        const checkIns = [makeCheckIn(), makeCheckIn({ id: '2' }), makeCheckIn({ id: '3' })];
        render(<WeekSummaryMini checkIns={checkIns} />);
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
