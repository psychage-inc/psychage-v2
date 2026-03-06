import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CrisisBanner from '../CrisisBanner';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            button: forwardRef(({ children, whileTap, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

describe('CrisisBanner', () => {
    it('should render crisis heading', () => {
        render(<CrisisBanner />);
        expect(screen.getByText(/need immediate help/i)).toBeInTheDocument();
    });

    it('should display 988 number', () => {
        render(<CrisisBanner />);
        expect(screen.getByText('988')).toBeInTheDocument();
    });

    it('should display text line number', () => {
        render(<CrisisBanner />);
        expect(screen.getByText('741741')).toBeInTheDocument();
    });

    it('should render Call 988 button', () => {
        render(<CrisisBanner />);
        expect(screen.getByText('Call 988')).toBeInTheDocument();
    });

    it('should render Text Crisis Line button', () => {
        render(<CrisisBanner />);
        expect(screen.getByText('Text Crisis Line')).toBeInTheDocument();
    });

    it('should open tel:988 on Call 988 click', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<CrisisBanner />);

        fireEvent.click(screen.getByText('Call 988'));
        expect(openSpy).toHaveBeenCalledWith('tel:988');

        openSpy.mockRestore();
    });

    it('should open sms:741741 on Text Crisis Line click', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        render(<CrisisBanner />);

        fireEvent.click(screen.getByText('Text Crisis Line'));
        expect(openSpy).toHaveBeenCalledWith('sms:741741');

        openSpy.mockRestore();
    });
});
