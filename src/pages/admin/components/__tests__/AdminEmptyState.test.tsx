import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminEmptyState from '../AdminEmptyState';
import { Users } from 'lucide-react';

describe('AdminEmptyState', () => {
    it('should render title', () => {
        render(<AdminEmptyState icon={Users} title="No users found" />);
        expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
        render(<AdminEmptyState icon={Users} title="No data" description="Try changing your filters" />);
        expect(screen.getByText('Try changing your filters')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
        render(<AdminEmptyState icon={Users} title="No data" />);
        expect(screen.queryByText('Try changing')).not.toBeInTheDocument();
    });

    it('should render heading element', () => {
        render(<AdminEmptyState icon={Users} title="Empty" />);
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Empty');
    });
});
