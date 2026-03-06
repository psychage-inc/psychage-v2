import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
        render(<NewsletterSection />);
        expect(screen.getByText(/exceed every expectation/i)).toBeInTheDocument();
    });

    it('should render email input', () => {
        render(<NewsletterSection />);
        expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    });

    it('should render subscribe button', () => {
        render(<NewsletterSection />);
        expect(screen.getByText('Subscribe')).toBeInTheDocument();
    });

    it('should show success message after subscribing', async () => {
        mockSubscribe.mockResolvedValue({ success: true });
        render(<NewsletterSection />);

        const input = screen.getByPlaceholderText(/enter your email/i);
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
        });
    });

    it('should show error state on failure', async () => {
        mockSubscribe.mockRejectedValue(new Error('fail'));
        render(<NewsletterSection />);

        const input = screen.getByPlaceholderText(/enter your email/i);
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(screen.getByText('Try Again')).toBeInTheDocument();
        });
    });

    it('should show subscriber count text', () => {
        render(<NewsletterSection />);
        expect(screen.getByText(/50,000/)).toBeInTheDocument();
    });
});
