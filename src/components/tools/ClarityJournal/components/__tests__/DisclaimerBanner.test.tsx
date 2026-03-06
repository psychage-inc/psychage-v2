import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DisclaimerBanner from '../DisclaimerBanner';

describe('DisclaimerBanner', () => {
    it('should render disclaimer text', () => {
        render(<DisclaimerBanner text="This is not a diagnosis." />);
        expect(screen.getByText('This is not a diagnosis.')).toBeInTheDocument();
    });

    it('should render with warning styling', () => {
        const { container } = render(<DisclaimerBanner text="Test warning" />);
        const banner = container.firstElementChild as HTMLElement;
        expect(banner).toHaveClass('bg-amber-50');
    });
});
