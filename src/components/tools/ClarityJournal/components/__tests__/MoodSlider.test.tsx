import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MoodSlider from '../MoodSlider';

describe('MoodSlider', () => {
    it('should render label', () => {
        render(<MoodSlider value={5} onChange={vi.fn()} label="Mood" />);
        expect(screen.getByText('Mood')).toBeInTheDocument();
    });

    it('should render 10 buttons by default (1-10)', () => {
        render(<MoodSlider value={5} onChange={vi.fn()} />);
        for (let i = 1; i <= 10; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }
    });

    it('should render custom range with min/max', () => {
        render(<MoodSlider value={3} onChange={vi.fn()} min={1} max={5} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.queryByText('6')).not.toBeInTheDocument();
    });

    it('should call onChange when button clicked', () => {
        const onChange = vi.fn();
        render(<MoodSlider value={5} onChange={onChange} />);
        fireEvent.click(screen.getByText('7'));
        expect(onChange).toHaveBeenCalledWith(7);
    });

    it('should use aria-label on each button', () => {
        render(<MoodSlider value={5} onChange={vi.fn()} label="Mood" />);
        expect(screen.getByLabelText('Mood 1 out of 10')).toBeInTheDocument();
        expect(screen.getByLabelText('Mood 10 out of 10')).toBeInTheDocument();
    });

    it('should visually distinguish selected button', () => {
        render(<MoodSlider value={5} onChange={vi.fn()} />);
        const selectedBtn = screen.getByLabelText('Mood 5 out of 10');
        expect(selectedBtn.className).toContain('bg-teal-600');
    });

    it('should not render label when empty string', () => {
        render(<MoodSlider value={5} onChange={vi.fn()} label="" />);
        // With empty string label, the <label> is not rendered (falsy)
        expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
});
