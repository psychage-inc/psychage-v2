 
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VisuallyHidden } from '../VisuallyHidden';
import { LiveRegion } from '../LiveRegion';

describe('VisuallyHidden', () => {
    it('should render children', () => {
        render(<VisuallyHidden>Hidden text</VisuallyHidden>);
        expect(screen.getByText('Hidden text')).toBeInTheDocument();
    });

    it('should use span by default', () => {
        render(<VisuallyHidden>Text</VisuallyHidden>);
        expect(screen.getByText('Text').tagName).toBe('SPAN');
    });

    it('should accept custom element via as prop', () => {
        render(<VisuallyHidden as="div">Text</VisuallyHidden>);
        expect(screen.getByText('Text').tagName).toBe('DIV');
    });

    it('should apply visually hidden styles', () => {
        render(<VisuallyHidden>Text</VisuallyHidden>);
        const el = screen.getByText('Text');
        expect(el.className).toContain('absolute');
        expect(el.className).toContain('overflow-hidden');
        expect(el.style.clip).toContain('rect');
    });

    it('should forward additional props', () => {
        render(<VisuallyHidden aria-live="polite" aria-atomic="true">Msg</VisuallyHidden>);
        const el = screen.getByText('Msg');
        expect(el).toHaveAttribute('aria-live', 'polite');
        expect(el).toHaveAttribute('aria-atomic', 'true');
    });

    it('should merge custom className', () => {
        render(<VisuallyHidden className="extra">Text</VisuallyHidden>);
        expect(screen.getByText('Text').className).toContain('extra');
    });
});

describe('LiveRegion', () => {
    it('should render polite message', () => {
        render(<LiveRegion politeMessage="Step 2 of 5" assertiveMessage="" />);
        expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
    });

    it('should render assertive message', () => {
        render(<LiveRegion politeMessage="" assertiveMessage="Crisis detected" />);
        expect(screen.getByText('Crisis detected')).toBeInTheDocument();
    });

    it('should have polite aria-live region', () => {
        render(<LiveRegion politeMessage="Update" assertiveMessage="" />);
        const polite = screen.getByText('Update').closest('[aria-live="polite"]');
        expect(polite).toBeInTheDocument();
    });

    it('should have assertive aria-live region', () => {
        render(<LiveRegion politeMessage="" assertiveMessage="Alert" />);
        const assertive = screen.getByText('Alert').closest('[aria-live="assertive"]');
        expect(assertive).toBeInTheDocument();
    });
});
