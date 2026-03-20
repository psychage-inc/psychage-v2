import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VerificationBadge } from '../shared/VerificationBadge';

describe('VerificationBadge', () => {
    it('should show Verified for verified status', () => {
        render(<VerificationBadge status="verified" verifiedAt="2026-01-01" />);
        expect(screen.getByText('Psychage Verified')).toBeInTheDocument();
    });

    it('should show Verified for active status', () => {
        render(<VerificationBadge status="active" verifiedAt={null} />);
        expect(screen.getByText('Psychage Verified')).toBeInTheDocument();
    });

    it('should show Verified when verifiedAt is set regardless of status', () => {
        render(<VerificationBadge status="seeded" verifiedAt="2026-01-01" />);
        expect(screen.getByText('Psychage Verified')).toBeInTheDocument();
    });

    it('should show Listed for seeded status without verifiedAt', () => {
        render(<VerificationBadge status="seeded" verifiedAt={null} />);
        expect(screen.getByText('Publicly Listed')).toBeInTheDocument();
    });

    it('should render nothing for unknown status without verifiedAt', () => {
        const { container } = render(<VerificationBadge status={'pending' as any} verifiedAt={null} />);
        expect(container.textContent).toBe('');
    });

    it('should support sm size', () => {
        render(<VerificationBadge status="verified" verifiedAt="2026-01-01" size="sm" />);
        const badge = screen.getByText('Psychage Verified').closest('span');
        expect(badge).toHaveClass('text-[10px]');
    });

    it('should support md size by default', () => {
        render(<VerificationBadge status="verified" verifiedAt="2026-01-01" />);
        const badge = screen.getByText('Psychage Verified').closest('span');
        expect(badge).toHaveClass('text-xs');
    });
});
