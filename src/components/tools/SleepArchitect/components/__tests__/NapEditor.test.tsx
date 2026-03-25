/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NapEditor from '../NapEditor';

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

describe('NapEditor', () => {
    it('should render Naps heading', () => {
        render(<NapEditor naps={[]} napAnalysis={[]} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByText('Naps')).toBeInTheDocument();
    });

    it('should show empty state when no naps', () => {
        render(<NapEditor naps={[]} napAnalysis={[]} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByText(/no naps scheduled/i)).toBeInTheDocument();
    });

    it('should call onAdd when Add Nap clicked', () => {
        const onAdd = vi.fn();
        render(<NapEditor naps={[]} napAnalysis={[]} onAdd={onAdd} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        fireEvent.click(screen.getByLabelText('Add nap'));
        expect(onAdd).toHaveBeenCalledOnce();
    });

    it('should render nap inputs when naps exist', () => {
        const naps = [{ id: 'n1', startTime: '14:00', durationMinutes: 20 }];
        render(<NapEditor naps={naps} napAnalysis={[]} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    });

    it('should call onRemove when remove clicked', () => {
        const onRemove = vi.fn();
        const naps = [{ id: 'n1', startTime: '14:00', durationMinutes: 20 }];
        render(<NapEditor naps={naps} napAnalysis={[]} onAdd={vi.fn()} onRemove={onRemove} onUpdate={vi.fn()} />);
        fireEvent.click(screen.getByLabelText('Remove nap'));
        expect(onRemove).toHaveBeenCalledWith('n1');
    });

    it('should call onUpdate when start time changed', () => {
        const onUpdate = vi.fn();
        const naps = [{ id: 'n1', startTime: '14:00', durationMinutes: 20 }];
        render(<NapEditor naps={naps} napAnalysis={[]} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={onUpdate} />);
        fireEvent.change(screen.getByLabelText(/start time/i), { target: { value: '15:00' } });
        expect(onUpdate).toHaveBeenCalledWith('n1', 'startTime', '15:00');
    });

    it('should show nap analysis when available', () => {
        const naps = [{ id: 'n1', startTime: '14:00', durationMinutes: 20 }];
        const napAnalysis = [{
            nap: naps[0],
            classification: 'power_nap' as const,
            label: 'Power Nap',
            description: 'Quick refresh',
            inertiaRisk: false,
            tooCloseToSleep: false,
        }];
        render(<NapEditor naps={naps} napAnalysis={napAnalysis} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByText('Power Nap')).toBeInTheDocument();
    });

    it('should show inertia risk warning', () => {
        const naps = [{ id: 'n1', startTime: '14:00', durationMinutes: 40 }];
        const napAnalysis = [{
            nap: naps[0],
            classification: 'deep_risk' as const,
            label: 'Risky Nap',
            description: 'May cause grogginess',
            inertiaRisk: true,
            tooCloseToSleep: false,
        }];
        render(<NapEditor naps={naps} napAnalysis={napAnalysis} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByText('Sleep inertia risk')).toBeInTheDocument();
    });

    it('should show too close to bedtime warning', () => {
        const naps = [{ id: 'n1', startTime: '20:00', durationMinutes: 20 }];
        const napAnalysis = [{
            nap: naps[0],
            classification: 'power_nap' as const,
            label: 'Power Nap',
            description: '',
            inertiaRisk: false,
            tooCloseToSleep: true,
        }];
        render(<NapEditor naps={naps} napAnalysis={napAnalysis} onAdd={vi.fn()} onRemove={vi.fn()} onUpdate={vi.fn()} />);
        expect(screen.getByText('Too close to bedtime')).toBeInTheDocument();
    });
});
