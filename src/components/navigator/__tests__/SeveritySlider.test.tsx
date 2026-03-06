import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeveritySlider } from '../SeveritySlider';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, style, initial, animate, transition, ...props }: any, ref: any) => (
                <div ref={ref} style={style} {...props}>{children}</div>
            )),
        },
    };
});

describe('SeveritySlider', () => {
    it('should render range input', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('should have default value of 5', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByRole('slider')).toHaveValue('5');
    });

    it('should accept initial value', () => {
        render(<SeveritySlider value={8} onChange={vi.fn()} />);
        expect(screen.getByRole('slider')).toHaveValue('8');
    });

    it('should render Mild and Severe labels by default', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByText('Mild')).toBeInTheDocument();
        expect(screen.getByText('Severe')).toBeInTheDocument();
    });

    it('should accept custom labels', () => {
        render(<SeveritySlider onChange={vi.fn()} minLabel="Low" maxLabel="High" />);
        expect(screen.getByText('Low')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    it('should call onChange when value changes', () => {
        const onChange = vi.fn();
        render(<SeveritySlider onChange={onChange} />);

        fireEvent.change(screen.getByRole('slider'), { target: { value: '7' } });
        expect(onChange).toHaveBeenCalledWith(7);
    });

    it('should have proper aria-label', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByLabelText(/severity scale/i)).toBeInTheDocument();
    });

    it('should display current value', () => {
        render(<SeveritySlider value={3} onChange={vi.fn()} />);
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should have range 1 to 10', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '1');
        expect(slider).toHaveAttribute('max', '10');
    });
});
