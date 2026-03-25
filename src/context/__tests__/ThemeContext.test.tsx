 
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
    it('should provide light theme by default', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ThemeProvider,
        });

        expect(result.current.theme).toBe('light');
        expect(result.current.isDark).toBe(false);
    });

    it('should apply light class to document root', () => {
        render(
            <ThemeProvider>
                <div>test</div>
            </ThemeProvider>
        );

        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should render children', () => {
        render(
            <ThemeProvider>
                <div data-testid="child">Hello</div>
            </ThemeProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
