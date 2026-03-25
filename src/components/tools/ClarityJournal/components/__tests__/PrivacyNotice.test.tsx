 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrivacyNotice from '../PrivacyNotice';

describe('PrivacyNotice', () => {
    it('should render privacy notice when not dismissed', () => {
        render(<PrivacyNotice dismissed={false} onDismiss={vi.fn()} />);
        expect(screen.getByText('Privacy First')).toBeInTheDocument();
    });

    it('should display privacy message', () => {
        render(<PrivacyNotice dismissed={false} onDismiss={vi.fn()} />);
        expect(screen.getByText(/never leaves your device/i)).toBeInTheDocument();
    });

    it('should not render when dismissed', () => {
        const { container } = render(<PrivacyNotice dismissed={true} onDismiss={vi.fn()} />);
        expect(container.innerHTML).toBe('');
    });

    it('should render dismiss button', () => {
        render(<PrivacyNotice dismissed={false} onDismiss={vi.fn()} />);
        expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    it('should call onDismiss when button clicked', () => {
        const onDismiss = vi.fn();
        render(<PrivacyNotice dismissed={false} onDismiss={onDismiss} />);
        fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
