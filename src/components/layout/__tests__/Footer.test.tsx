/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, initial, whileInView, animate, transition, viewport, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
        useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
        useTransform: () => 0,
    };
});

// Mock CrisisBanner since it's already tested separately
vi.mock('../CrisisBanner', () => ({
    default: () => <div data-testid="crisis-banner">Crisis Banner</div>,
}));

describe('Footer', () => {
    const renderFooter = () => render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );

    it('should render footer element', () => {
        renderFooter();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('should render crisis banner', () => {
        renderFooter();
        expect(screen.getByTestId('crisis-banner')).toBeInTheDocument();
    });

    it('should render brand watermark', () => {
        renderFooter();
        expect(screen.getByText('psychage')).toBeInTheDocument();
    });

    it('should render tagline', () => {
        renderFooter();
        expect(screen.getByText(/mental health/i)).toBeInTheDocument();
        expect(screen.getByText(/is just health/i)).toBeInTheDocument();
    });

    it('should render footer link columns', () => {
        renderFooter();
        expect(screen.getByText('Learn')).toBeInTheDocument();
        expect(screen.getByText('Popular')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Connect')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
        renderFooter();
        expect(screen.getByText('Anxiety & Panic')).toBeInTheDocument();
        expect(screen.getByText('Clarity Score™')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Crisis Resources')).toBeInTheDocument();
    });

    it('should render social media links', () => {
        renderFooter();
        expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
        expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
        expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    });

    it('should render copyright with current year', () => {
        renderFooter();
        const year = new Date().getFullYear();
        expect(screen.getByText(`© ${year} Psychage Health, Inc.`)).toBeInTheDocument();
    });

    it('should render legal links', () => {
        renderFooter();
        expect(screen.getByText('Privacy')).toBeInTheDocument();
        expect(screen.getByText('Terms')).toBeInTheDocument();
    });

    it('should render Back to Top button', () => {
        renderFooter();
        expect(screen.getByText(/back to top/i)).toBeInTheDocument();
    });

    it('should scroll to top when Back to Top is clicked', () => {
        const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
        renderFooter();

        fireEvent.click(screen.getByText(/back to top/i));
        expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

        scrollToSpy.mockRestore();
    });
});
