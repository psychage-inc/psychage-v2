 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScreeningQuestion from '../ScreeningQuestion';
import { FREQUENCY_OPTIONS } from '../../constants';

describe('ScreeningQuestion', () => {
    it('should render question as legend', () => {
        render(
            <ScreeningQuestion
                question="How often have you felt anxious?"
                options={FREQUENCY_OPTIONS}
                value={null}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByText('How often have you felt anxious?')).toBeInTheDocument();
    });

    it('should render all options', () => {
        render(
            <ScreeningQuestion
                question="Test"
                options={FREQUENCY_OPTIONS}
                value={null}
                onChange={vi.fn()}
            />
        );
        expect(screen.getByText('Not at all')).toBeInTheDocument();
        expect(screen.getByText('Several days')).toBeInTheDocument();
        expect(screen.getByText('More than half the days')).toBeInTheDocument();
        expect(screen.getByText('Nearly every day')).toBeInTheDocument();
    });

    it('should use radio role with aria-checked', () => {
        render(
            <ScreeningQuestion
                question="Test"
                options={FREQUENCY_OPTIONS}
                value={1}
                onChange={vi.fn()}
            />
        );
        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(4);
        expect(radios[1]).toHaveAttribute('aria-checked', 'true');
        expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    });

    it('should call onChange when option clicked', () => {
        const onChange = vi.fn();
        render(
            <ScreeningQuestion
                question="Test"
                options={FREQUENCY_OPTIONS}
                value={null}
                onChange={onChange}
            />
        );
        fireEvent.click(screen.getByText('Several days'));
        expect(onChange).toHaveBeenCalledWith(1);
    });

    it('should disable fieldset when disabled prop is true', () => {
        render(
            <ScreeningQuestion
                question="Test"
                options={FREQUENCY_OPTIONS}
                value={null}
                onChange={vi.fn()}
                disabled
            />
        );
        const fieldset = screen.getByRole('group');
        expect(fieldset).toBeDisabled();
    });

    it('should render within a fieldset element', () => {
        const { container } = render(
            <ScreeningQuestion
                question="Test"
                options={FREQUENCY_OPTIONS}
                value={null}
                onChange={vi.fn()}
            />
        );
        expect(container.querySelector('fieldset')).not.toBeNull();
    });
});
