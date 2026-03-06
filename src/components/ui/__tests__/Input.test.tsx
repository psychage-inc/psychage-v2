import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
    it('should render an input element', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should apply type prop', () => {
        render(<Input type="email" placeholder="Email" />);
        expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
    });

    it('should show error state', () => {
        render(<Input error placeholder="Test" />);
        expect(screen.getByPlaceholderText('Test')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error message', () => {
        render(<Input error errorMessage="Required field" name="email" />);
        expect(screen.getByRole('alert')).toHaveTextContent('Required field');
    });

    it('should link error message via aria-describedby', () => {
        render(<Input error errorMessage="Invalid" name="email" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('should use name as id when id is not provided', () => {
        render(<Input name="username" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username');
    });

    it('should prefer id over name', () => {
        render(<Input id="custom-id" name="username" />);
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('should handle onChange events', () => {
        const onChange = vi.fn();
        render(<Input onChange={onChange} placeholder="Test" />);
        fireEvent.change(screen.getByPlaceholderText('Test'), { target: { value: 'hello' } });
        expect(onChange).toHaveBeenCalled();
    });

    it('should support disabled state', () => {
        render(<Input disabled placeholder="Test" />);
        expect(screen.getByPlaceholderText('Test')).toBeDisabled();
    });

    it('should apply custom className', () => {
        render(<Input className="custom" placeholder="Test" />);
        expect(screen.getByPlaceholderText('Test').className).toContain('custom');
    });

    it('should forward ref', () => {
        const ref = { current: null as HTMLInputElement | null };
        render(<Input ref={ref} placeholder="Test" />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
