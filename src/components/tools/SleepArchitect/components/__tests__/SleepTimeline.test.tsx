import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SleepTimeline from '../SleepTimeline';
import type { CycleArchitecture } from '../../model';

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

const mockCycles: CycleArchitecture[] = [
    { cycleNumber: 1, durationMinutes: 90, n1Percent: 5, n2Percent: 50, n3Percent: 25, remPercent: 20, startMinuteFromSleep: 0, endMinuteFromSleep: 90 },
    { cycleNumber: 2, durationMinutes: 90, n1Percent: 5, n2Percent: 55, n3Percent: 15, remPercent: 25, startMinuteFromSleep: 90, endMinuteFromSleep: 180 },
];

describe('SleepTimeline', () => {
    it('should render timeline with aria-label', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getByRole('img', { name: /sleep architecture timeline/i })).toBeInTheDocument();
    });

    it('should display bedtime and wake time', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getByText('23:00')).toBeInTheDocument();
        expect(screen.getByText('07:00')).toBeInTheDocument();
    });

    it('should render legend labels', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getByText('N1 (Light)')).toBeInTheDocument();
        expect(screen.getByText('N3 (Deep)')).toBeInTheDocument();
        expect(screen.getByText('REM')).toBeInTheDocument();
        expect(screen.getByText('Falling Asleep')).toBeInTheDocument();
    });

    it('should render cycle cards', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getByText('Cycle 1')).toBeInTheDocument();
        expect(screen.getByText('Cycle 2')).toBeInTheDocument();
    });

    it('should show cycle duration', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getAllByText('90 min')).toHaveLength(2);
    });

    it('should return null when totalBarMinutes is 0', () => {
        const { container } = render(
            <SleepTimeline bedtime="23:00" wakeTime="23:00" latencyMinutes={0} cycles={[]} totalSleepMinutes={0} />
        );
        expect(container.innerHTML).toBe('');
    });

    it('should render latency segment title when latency > 0', () => {
        render(
            <SleepTimeline bedtime="23:00" wakeTime="07:00" latencyMinutes={15} cycles={mockCycles} totalSleepMinutes={180} />
        );
        expect(screen.getByTitle(/falling asleep: ~15 min/i)).toBeInTheDocument();
    });
});
