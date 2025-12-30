import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthModal from '../components/auth/AuthModal';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
    X: () => <svg data-testid="icon-close" />,
    Mail: () => <svg data-testid="icon-mail" />,
    Lock: () => <svg data-testid="icon-lock" />,
    ArrowRight: () => <svg data-testid="icon-arrow-right" />,
    Github: () => <svg data-testid="icon-github" />,
    Chrome: () => <svg data-testid="icon-chrome" />,
    Sparkles: () => <svg data-testid="icon-sparkles" />,
    Loader2: () => <svg data-testid="icon-loader" />,
}));

describe('AuthModal Accessibility', () => {
    it('inputs should be associated with their labels', () => {
        render(<AuthModal isOpen={true} onClose={() => {}} />);

        // Check for Email input association
        const emailInput = screen.getByLabelText(/Email/i);
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');

        // Check for Password input association (default view is login)
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('close button should have an accessible label', () => {
        render(<AuthModal isOpen={true} onClose={() => {}} />);

        const closeButton = screen.getByRole('button', { name: /close modal/i });
        expect(closeButton).toBeInTheDocument();
    });
});
