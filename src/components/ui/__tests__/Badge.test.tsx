import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '../Badge';

describe('Badge', () => {
    it('should render children', () => {
        render(<Badge>Status</Badge>);
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('should apply neutral variant by default', () => {
        render(<Badge>Default</Badge>);
        expect(screen.getByText('Default').className).toContain('bg-gray-100');
    });

    it('should apply success variant', () => {
        render(<Badge variant="success">Active</Badge>);
        expect(screen.getByText('Active').className).toContain('bg-green-100');
    });

    it('should apply warning variant', () => {
        render(<Badge variant="warning">Pending</Badge>);
        expect(screen.getByText('Pending').className).toContain('bg-amber-100');
    });

    it('should apply error variant', () => {
        render(<Badge variant="error">Error</Badge>);
        expect(screen.getByText('Error').className).toContain('bg-red-100');
    });

    it('should apply info variant', () => {
        render(<Badge variant="info">Info</Badge>);
        expect(screen.getByText('Info').className).toContain('bg-blue-100');
    });

    it('should apply outline variant', () => {
        render(<Badge variant="outline">Outline</Badge>);
        expect(screen.getByText('Outline').className).toContain('bg-transparent');
    });

    it('should apply custom className', () => {
        render(<Badge className="ml-2">Test</Badge>);
        expect(screen.getByText('Test').className).toContain('ml-2');
    });

    it('should render as inline-flex span', () => {
        render(<Badge>Tag</Badge>);
        const badge = screen.getByText('Tag');
        expect(badge.tagName).toBe('SPAN');
        expect(badge.className).toContain('inline-flex');
    });
});
