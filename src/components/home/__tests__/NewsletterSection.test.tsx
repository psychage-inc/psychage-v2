import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NewsletterSection from '../NewsletterSection';

const mockSubscribe = vi.fn();

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, initial, whileInView, animate, transition, viewport, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: forwardRef(({ children, whileTap, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

vi.mock('@/services/newsletterService', () => ({
    useNewsletterService: () => ({
        subscribe: mockSubscribe,
    }),
}));

describe('NewsletterSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render heading', () => {
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);
        expect(screen.getByText(/start understanding your mind today/i)).toBeInTheDocument();
    });

    it('should render email input', () => {
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('should render subscribe button', () => {
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);
        expect(screen.getByText('Subscribe')).toBeInTheDocument();
    });

    it('should show success message after subscribing', async () => {
        mockSubscribe.mockResolvedValue({ success: true });
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);

        const input = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
        });
    });

    it('should show error state on failure', async () => {
        mockSubscribe.mockRejectedValue(new Error('fail'));
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);

        const input = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(screen.getByText('Try again')).toBeInTheDocument();
        });
    });

    it('should show newsletter description text', () => {
        render(<MemoryRouter><NewsletterSection /></MemoryRouter>);
        expect(screen.getByText(/free weekly insights on mental health/i)).toBeInTheDocument();
    });
});
