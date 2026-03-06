import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkipLink from '../SkipLink';

describe('SkipLink', () => {
    it('should render a skip link', () => {
        render(<SkipLink />);
        expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    });

    it('should link to #main-content', () => {
        render(<SkipLink />);
        expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main-content');
    });

    it('should be a link element', () => {
        render(<SkipLink />);
        expect(screen.getByText('Skip to main content').tagName).toBe('A');
    });
});
