import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Presets from '../Presets';
import { PRESETS } from '../../model';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

const defaultInputs = {
    bedtime: '23:00',
    wakeTime: '07:00',
    sleepLatencyMinutes: 15,
    awakeningsCount: 0,
    awakeningMinutesEach: 0,
    naps: [],
    profile: {
        ageGroup: 'adult' as const,
        chronotype: 'neutral' as const,
        targetSleepHours: 8,
        caffeineCutoffTime: '14:00',
        exerciseTime: '',
    },
};

describe('Presets', () => {
    it('should render Quick Presets label', () => {
        render(<Presets currentInputs={defaultInputs} onApply={vi.fn()} />);
        expect(screen.getByText('Quick Presets')).toBeInTheDocument();
    });

    it('should render all preset buttons', () => {
        render(<Presets currentInputs={defaultInputs} onApply={vi.fn()} />);
        PRESETS.forEach(preset => {
            expect(screen.getByText(preset.label)).toBeInTheDocument();
        });
    });

    it('should call onApply when preset clicked', () => {
        const onApply = vi.fn();
        render(<Presets currentInputs={defaultInputs} onApply={onApply} />);
        fireEvent.click(screen.getByText(PRESETS[0].label));
        expect(onApply).toHaveBeenCalledOnce();
    });

    it('should pass preset descriptions as title attributes', () => {
        render(<Presets currentInputs={defaultInputs} onApply={vi.fn()} />);
        PRESETS.forEach(preset => {
            expect(screen.getByTitle(preset.description)).toBeInTheDocument();
        });
    });
});
