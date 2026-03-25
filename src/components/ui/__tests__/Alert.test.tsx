 
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert, AlertTitle, AlertDescription } from '../Alert';

describe('Alert', () => {
    it('should render with role="alert"', () => {
        render(<Alert>Alert content</Alert>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should render children', () => {
        render(<Alert>Something happened</Alert>);
        expect(screen.getByText('Something happened')).toBeInTheDocument();
    });

    it('should render icon', () => {
        render(<Alert icon={<span data-testid="alert-icon">!</span>}>Test</Alert>);
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        render(<Alert className="my-custom">Test</Alert>);
        expect(screen.getByRole('alert').className).toContain('my-custom');
    });

    it('should forward ref', () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<Alert ref={ref}>Test</Alert>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});

describe('AlertTitle', () => {
    it('should render as h5', () => {
        render(<AlertTitle>Title</AlertTitle>);
        const title = screen.getByText('Title');
        expect(title.tagName).toBe('H5');
    });

    it('should apply custom className', () => {
        render(<AlertTitle className="extra">Title</AlertTitle>);
        expect(screen.getByText('Title').className).toContain('extra');
    });
});

describe('AlertDescription', () => {
    it('should render description text', () => {
        render(<AlertDescription>Details here</AlertDescription>);
        expect(screen.getByText('Details here')).toBeInTheDocument();
    });
});
