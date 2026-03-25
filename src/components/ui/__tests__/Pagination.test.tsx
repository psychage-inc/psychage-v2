 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Pagination from '../Pagination';

vi.mock('framer-motion', () => ({
    motion: {
        button: React.forwardRef(({ children, ...props }: any, ref: any) => (
            <button ref={ref} {...props}>{children}</button>
        )),
    },
}));

describe('Pagination', () => {
    it('should render nothing when totalPages <= 1', () => {
        const { container } = render(
            <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render page numbers', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(String(i))).toBeInTheDocument();
        }
    });

    it('should call onPageChange when page button clicked', () => {
        const onPageChange = vi.fn();
        render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
        fireEvent.click(screen.getByText('3'));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it('should mark current page with aria-current', () => {
        render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);
        expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
        expect(screen.getByText('3')).not.toHaveAttribute('aria-current');
    });

    it('should disable previous button on first page', () => {
        render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
        expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });

    it('should disable next button on last page', () => {
        render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
        expect(screen.getByLabelText('Next page')).toBeDisabled();
    });

    it('should call onPageChange with previous page', () => {
        const onPageChange = vi.fn();
        render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
        fireEvent.click(screen.getByLabelText('Previous page'));
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('should call onPageChange with next page', () => {
        const onPageChange = vi.fn();
        render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
        fireEvent.click(screen.getByLabelText('Next page'));
        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('should show ellipsis for many pages', () => {
        render(<Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />);
        const ellipses = screen.getAllByText('...');
        expect(ellipses.length).toBeGreaterThanOrEqual(1);
    });
});
