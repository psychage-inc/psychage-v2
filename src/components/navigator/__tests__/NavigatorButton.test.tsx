import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavigatorButton } from '../NavigatorButton';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            button: forwardRef(({ children, whileHover, whileTap, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

describe('NavigatorButton', () => {
    it('should render children', () => {
        render(<NavigatorButton>Click Me</NavigatorButton>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should render as button element', () => {
        render(<NavigatorButton>Test</NavigatorButton>);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be disabled when isDisabled is true', () => {
        render(<NavigatorButton isDisabled>Test</NavigatorButton>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should be disabled when isLoading is true', () => {
        render(<NavigatorButton isLoading>Test</NavigatorButton>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should show loading spinner when isLoading', () => {
        render(<NavigatorButton isLoading>Loading</NavigatorButton>);
        const button = screen.getByRole('button');
        expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should apply fullWidth class', () => {
        render(<NavigatorButton fullWidth>Full</NavigatorButton>);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('should accept custom className', () => {
        render(<NavigatorButton className="custom-class">Test</NavigatorButton>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should handle click events', () => {
        const onClick = vi.fn();
        render(<NavigatorButton onClick={onClick}>Test</NavigatorButton>);

        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should forward ref', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<NavigatorButton ref={ref}>Test</NavigatorButton>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should have displayName', () => {
        expect(NavigatorButton.displayName).toBe('NavigatorButton');
    });
});
