 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from '../StatusBadge';

describe('StatusBadge', () => {
    it('should render status text', () => {
        render(<StatusBadge status="active" />);
        expect(screen.getByText('active')).toBeInTheDocument();
    });

    it('should apply green styles for active status', () => {
        render(<StatusBadge status="active" />);
        expect(screen.getByText('active')).toHaveClass('bg-green-100');
    });

    it('should apply green styles for approved status', () => {
        render(<StatusBadge status="approved" />);
        expect(screen.getByText('approved')).toHaveClass('bg-green-100');
    });

    it('should apply amber styles for pending status', () => {
        render(<StatusBadge status="pending" />);
        expect(screen.getByText('pending')).toHaveClass('bg-amber-100');
    });

    it('should apply red styles for suspended status', () => {
        render(<StatusBadge status="suspended" />);
        expect(screen.getByText('suspended')).toHaveClass('bg-red-100');
    });

    it('should apply blue styles for investigating status', () => {
        render(<StatusBadge status="investigating" />);
        expect(screen.getByText('investigating')).toHaveClass('bg-blue-100');
    });

    it('should fallback to inactive styles for unknown status', () => {
        render(<StatusBadge status="unknown" />);
        expect(screen.getByText('unknown')).toHaveClass('bg-surface-hover');
    });

    it('should normalize case for lookup', () => {
        render(<StatusBadge status="Active" />);
        expect(screen.getByText('Active')).toHaveClass('bg-green-100');
    });

    it('should apply custom className', () => {
        render(<StatusBadge status="active" className="ml-2" />);
        expect(screen.getByText('active')).toHaveClass('ml-2');
    });
});
