import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminFilterBar from '../AdminFilterBar';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

describe('AdminFilterBar', () => {
    it('should render search input', () => {
        render(<AdminFilterBar searchValue="" onSearchChange={vi.fn()} />);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('should display custom placeholder', () => {
        render(<AdminFilterBar searchValue="" onSearchChange={vi.fn()} searchPlaceholder="Search providers..." />);
        expect(screen.getByPlaceholderText('Search providers...')).toBeInTheDocument();
    });

    it('should call onSearchChange on input', () => {
        const onSearchChange = vi.fn();
        render(<AdminFilterBar searchValue="" onSearchChange={onSearchChange} />);
        fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test' } });
        expect(onSearchChange).toHaveBeenCalledWith('test');
    });

    it('should show clear button when search has value', () => {
        render(<AdminFilterBar searchValue="test" onSearchChange={vi.fn()} />);
        expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
    });

    it('should not show clear button when search is empty', () => {
        render(<AdminFilterBar searchValue="" onSearchChange={vi.fn()} />);
        expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
    });

    it('should clear search when clear button clicked', () => {
        const onSearchChange = vi.fn();
        render(<AdminFilterBar searchValue="test" onSearchChange={onSearchChange} />);
        fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
        expect(onSearchChange).toHaveBeenCalledWith('');
    });

    it('should render filter buttons when filters provided', () => {
        const filters = [
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
        ];
        render(
            <AdminFilterBar
                searchValue=""
                onSearchChange={vi.fn()}
                filters={filters}
                activeFilter="all"
                onFilterChange={vi.fn()}
            />
        );
        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should call onFilterChange when filter clicked', () => {
        const onFilterChange = vi.fn();
        const filters = [{ key: 'active', label: 'Active' }];
        render(
            <AdminFilterBar
                searchValue=""
                onSearchChange={vi.fn()}
                filters={filters}
                activeFilter="all"
                onFilterChange={onFilterChange}
            />
        );
        fireEvent.click(screen.getByText('Active'));
        expect(onFilterChange).toHaveBeenCalledWith('active');
    });
});
