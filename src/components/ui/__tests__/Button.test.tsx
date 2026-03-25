/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            button: forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

import Button from '../Button';

describe('Button', () => {
    it('should render with children', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should apply primary variant by default', () => {
        render(<Button>Test</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-primary');
    });

    it('should apply variant classes', () => {
        const { rerender } = render(<Button variant="secondary">Test</Button>);
        expect(screen.getByRole('button').className).toContain('bg-surface-active');

        rerender(<Button variant="danger">Test</Button>);
        expect(screen.getByRole('button').className).toContain('bg-error');

        rerender(<Button variant="ghost">Test</Button>);
        expect(screen.getByRole('button').className).toContain('bg-transparent');

        rerender(<Button variant="outline">Test</Button>);
        expect(screen.getByRole('button').className).toContain('border-2');
    });

    it('should apply size classes', () => {
        const { rerender } = render(<Button size="sm">Test</Button>);
        expect(screen.getByRole('button').className).toContain('h-9');

        rerender(<Button size="lg">Test</Button>);
        expect(screen.getByRole('button').className).toContain('h-14');

        rerender(<Button size="xl">Test</Button>);
        expect(screen.getByRole('button').className).toContain('h-16');
    });

    it('should show loading spinner when isLoading', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Test</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should be disabled when isLoading', () => {
        render(<Button isLoading>Test</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should render left icon', () => {
        render(<Button leftIcon={<span data-testid="left-icon">L</span>}>Test</Button>);
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should render right icon', () => {
        render(<Button rightIcon={<span data-testid="right-icon">R</span>}>Test</Button>);
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('should hide icons when loading', () => {
        render(
            <Button isLoading leftIcon={<span data-testid="left">L</span>} rightIcon={<span data-testid="right">R</span>}>
                Test
            </Button>
        );
        expect(screen.queryByTestId('left')).not.toBeInTheDocument();
        expect(screen.queryByTestId('right')).not.toBeInTheDocument();
    });

    it('should handle click events', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should apply custom className', () => {
        render(<Button className="custom-class">Test</Button>);
        expect(screen.getByRole('button').className).toContain('custom-class');
    });

    it('should set aria-label from children string', () => {
        render(<Button>Submit Form</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Submit Form');
    });

    it('should prefer explicit aria-label', () => {
        render(<Button aria-label="Custom label">Submit</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
    });
});
