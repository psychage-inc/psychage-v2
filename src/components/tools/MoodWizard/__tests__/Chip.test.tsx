 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from '../Chip';

describe('Chip', () => {
    it('should render label text', () => {
        render(<Chip label="Happy" selected={false} onClick={vi.fn()} />);
        expect(screen.getByText('Happy')).toBeInTheDocument();
    });

    it('should render as button', () => {
        render(<Chip label="Sad" selected={false} onClick={vi.fn()} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have aria-pressed false when not selected', () => {
        render(<Chip label="Test" selected={false} onClick={vi.fn()} />);
        expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('should have aria-pressed true when selected', () => {
        render(<Chip label="Test" selected={true} onClick={vi.fn()} />);
        expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('should apply selected styles', () => {
        render(<Chip label="Test" selected={true} onClick={vi.fn()} />);
        // Selected state applies shadow-lg and scale-105
        expect(screen.getByRole('button')).toHaveClass('shadow-lg');
        expect(screen.getByRole('button')).toHaveClass('scale-105');
    });

    it('should call onClick when clicked', () => {
        const onClick = vi.fn();
        render(<Chip label="Test" selected={false} onClick={onClick} />);

        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
