import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SummaryCards from '../SummaryCards';
import type { SleepPlanOutput } from '../../model';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
        },
    };
});

const makeOutput = (overrides: Partial<SleepPlanOutput> = {}): SleepPlanOutput => ({
    timeInBedMinutes: 480,
    totalSleepTimeMinutes: 450,
    sleepEfficiency: 0.94,
    wasoMinutes: 0,
    estimatedCycles: 5,
    cycleArchitecture: [],
    napAnalysis: [],
    recommendedWakeTimes: [],
    recommendedBedtimes: [],
    riskFlags: [],
    ...overrides,
});

describe('SummaryCards', () => {
    it('should render metric labels', () => {
        render(<SummaryCards output={makeOutput()} />);
        expect(screen.getByText('Time in Bed')).toBeInTheDocument();
        expect(screen.getByText('Total Sleep')).toBeInTheDocument();
        expect(screen.getByText('Efficiency')).toBeInTheDocument();
        expect(screen.getByText('Cycles')).toBeInTheDocument();
    });

    it('should display efficiency as percentage', () => {
        render(<SummaryCards output={makeOutput({ sleepEfficiency: 0.94 })} />);
        expect(screen.getByText('94%')).toBeInTheDocument();
    });

    it('should display cycle count', () => {
        render(<SummaryCards output={makeOutput({ estimatedCycles: 5 })} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should show WASO when > 0', () => {
        render(<SummaryCards output={makeOutput({ wasoMinutes: 30 })} />);
        expect(screen.getByText(/wake after sleep onset/i)).toBeInTheDocument();
    });

    it('should not show WASO when 0', () => {
        render(<SummaryCards output={makeOutput({ wasoMinutes: 0 })} />);
        expect(screen.queryByText(/wake after sleep onset/i)).not.toBeInTheDocument();
    });

    it('should show risk flags when present', () => {
        const output = makeOutput({
            riskFlags: [{ type: 'too_short', severity: 'warning', message: 'Sleep duration is very short' }],
        });
        render(<SummaryCards output={output} />);
        expect(screen.getByText('Alerts')).toBeInTheDocument();
        expect(screen.getByText('Sleep duration is very short')).toBeInTheDocument();
    });

    it('should not show risk flags section when empty', () => {
        render(<SummaryCards output={makeOutput()} />);
        expect(screen.queryByText('Alerts')).not.toBeInTheDocument();
    });

    it('should show multiple risk flags', () => {
        const output = makeOutput({
            riskFlags: [
                { type: 'too_short', severity: 'danger', message: 'Sleep too short' },
                { type: 'low_efficiency', severity: 'warning', message: 'Low efficiency' },
            ],
        });
        render(<SummaryCards output={output} />);
        expect(screen.getByText('Sleep too short')).toBeInTheDocument();
        expect(screen.getByText('Low efficiency')).toBeInTheDocument();
    });
});
