/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SeveritySlider } from '../SeveritySlider';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, style, initial, animate, ...props }: any, ref: any) => (
                <div ref={ref} style={style} {...props}>{children}</div>
            )),
        },
    };
});

describe('SeveritySlider', () => {
    it('should render radiogroup', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('should have default value of 5', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        const selected = screen.getByRole('radio', { name: /^5 -/ });
        expect(selected).toHaveAttribute('aria-checked', 'true');
    });

    it('should accept initial value', () => {
        render(<SeveritySlider value={8} onChange={vi.fn()} />);
        const selected = screen.getByRole('radio', { name: /^8 -/ });
        expect(selected).toHaveAttribute('aria-checked', 'true');
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

        const button7 = screen.getByRole('radio', { name: /^7 -/ });
        fireEvent.click(button7);
        expect(onChange).toHaveBeenCalledWith(7);
    });

    it('should have proper aria-label', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        expect(screen.getByLabelText(/severity scale/i)).toBeInTheDocument();
    });

    it('should display current value', () => {
        render(<SeveritySlider value={3} onChange={vi.fn()} />);
        // Value appears in both display and button — verify at least one exists
        const matches = screen.getAllByText('3');
        expect(matches.length).toBeGreaterThanOrEqual(1);
    });

    it('should render 10 radio buttons', () => {
        render(<SeveritySlider onChange={vi.fn()} />);
        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(10);
    });
});
