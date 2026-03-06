import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExportPanel from '../ExportPanel';
import type { SleepPlanInputs, SleepPlanOutput } from '../../model';

vi.mock('../../share', () => ({
    copySummaryToClipboard: vi.fn(() => Promise.resolve(true)),
    downloadJson: vi.fn(),
    downloadIcs: vi.fn(),
    buildShareUrl: vi.fn(() => 'https://example.com/share'),
}));

import { copySummaryToClipboard, downloadJson, downloadIcs } from '../../share';

const mockInputs: SleepPlanInputs = {
    bedtime: '23:00',
    wakeTime: '07:00',
    sleepLatencyMinutes: 15,
    awakeningsCount: 0,
    awakeningMinutesEach: 0,
    naps: [],
    profile: {
        ageGroup: 'adult',
        chronotype: 'neutral',
        targetSleepHours: 8,
        caffeineCutoffTime: '14:00',
        exerciseTime: '',
    },
};

const mockOutput: SleepPlanOutput = {
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
};

describe('ExportPanel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all 4 action buttons', () => {
        render(<ExportPanel inputs={mockInputs} output={mockOutput} />);
        expect(screen.getByText('Copy Summary')).toBeInTheDocument();
        expect(screen.getByText('Share Link')).toBeInTheDocument();
        expect(screen.getByText('Export JSON')).toBeInTheDocument();
        expect(screen.getByText('Add to Calendar')).toBeInTheDocument();
    });

    it('should call copySummaryToClipboard on Copy Summary click', () => {
        render(<ExportPanel inputs={mockInputs} output={mockOutput} />);
        fireEvent.click(screen.getByText('Copy Summary'));
        expect(copySummaryToClipboard).toHaveBeenCalledWith(mockInputs, mockOutput);
    });

    it('should call downloadJson on Export JSON click', () => {
        render(<ExportPanel inputs={mockInputs} output={mockOutput} />);
        fireEvent.click(screen.getByText('Export JSON'));
        expect(downloadJson).toHaveBeenCalledWith(mockInputs, mockOutput);
    });

    it('should call downloadIcs on Add to Calendar click', () => {
        render(<ExportPanel inputs={mockInputs} output={mockOutput} />);
        fireEvent.click(screen.getByText('Add to Calendar'));
        expect(downloadIcs).toHaveBeenCalledWith(mockInputs);
    });
});
