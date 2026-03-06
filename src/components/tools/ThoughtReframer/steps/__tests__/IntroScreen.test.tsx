import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { IntroScreen } from '../IntroScreen';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('IntroScreen', () => {
    const defaultProps = {
        onSelectMode: vi.fn(),
        ruminationCount: 0,
        onOpenLibrary: vi.fn(),
    };

    it('should render title', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.getByText('Thought Reframer')).toBeInTheDocument();
    });

    it('should render description about thoughts', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.getByText(/thoughts aren't always accurate/i)).toBeInTheDocument();
    });

    it('should render Guided Exercise button', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.getByText('Guided Exercise')).toBeInTheDocument();
    });

    it('should render Quick Mode button', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.getByText('Quick Mode')).toBeInTheDocument();
    });

    it('should call onSelectMode with guided', () => {
        const onSelectMode = vi.fn();
        renderWithRouter(<IntroScreen {...defaultProps} onSelectMode={onSelectMode} />);
        fireEvent.click(screen.getByText('Guided Exercise'));
        expect(onSelectMode).toHaveBeenCalledWith('guided');
    });

    it('should call onSelectMode with quick', () => {
        const onSelectMode = vi.fn();
        renderWithRouter(<IntroScreen {...defaultProps} onSelectMode={onSelectMode} />);
        fireEvent.click(screen.getByText('Quick Mode'));
        expect(onSelectMode).toHaveBeenCalledWith('quick');
    });

    it('should render cognitive distortions link', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.getByText('Learn about cognitive distortions')).toBeInTheDocument();
    });

    it('should call onOpenLibrary when link clicked', () => {
        const onOpenLibrary = vi.fn();
        renderWithRouter(<IntroScreen {...defaultProps} onOpenLibrary={onOpenLibrary} />);
        fireEvent.click(screen.getByText('Learn about cognitive distortions'));
        expect(onOpenLibrary).toHaveBeenCalledTimes(1);
    });

    it('should not show rumination warning when count < 3', () => {
        renderWithRouter(<IntroScreen {...defaultProps} ruminationCount={2} />);
        expect(screen.queryByText(/weighing heavily/i)).not.toBeInTheDocument();
    });

    it('should show rumination warning when count >= 3', () => {
        renderWithRouter(<IntroScreen {...defaultProps} ruminationCount={3} />);
        expect(screen.getByText(/weighing heavily/i)).toBeInTheDocument();
        expect(screen.getByText('Find a Provider')).toBeInTheDocument();
        expect(screen.getByText('Talk to MindMate AI')).toBeInTheDocument();
    });

    it('should toggle about info on click', () => {
        renderWithRouter(<IntroScreen {...defaultProps} />);
        expect(screen.queryByText(/cognitive behavioral therapy/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('About this tool'));
        expect(screen.getByText(/cognitive behavioral therapy/i)).toBeInTheDocument();
    });
});
