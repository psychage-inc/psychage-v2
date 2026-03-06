import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CrisisResources from '../CrisisResources';

describe('CrisisResources', () => {
    it('should render crisis heading', () => {
        render(<CrisisResources />);
        expect(screen.getByText(/in crisis/i)).toBeInTheDocument();
    });

    it('should display 988 lifeline', () => {
        render(<CrisisResources />);
        expect(screen.getByText('988')).toBeInTheDocument();
        expect(screen.getByText(/suicide & crisis lifeline/i)).toBeInTheDocument();
    });

    it('should display crisis text line', () => {
        render(<CrisisResources />);
        expect(screen.getByText(/text home to 741741/i)).toBeInTheDocument();
        expect(screen.getByText(/crisis text line/i)).toBeInTheDocument();
    });

    it('should display FindTreatment.gov', () => {
        render(<CrisisResources />);
        expect(screen.getByText('FindTreatment.gov')).toBeInTheDocument();
        expect(screen.getByText(/treatment locator/i)).toBeInTheDocument();
    });

    it('should render tel:988 link', () => {
        render(<CrisisResources />);
        const link = screen.getByRole('link', { name: /988/i });
        expect(link).toHaveAttribute('href', 'tel:988');
    });

    it('should render sms link for crisis text line', () => {
        render(<CrisisResources />);
        const link = screen.getByRole('link', { name: /text home/i });
        expect(link).toHaveAttribute('href', 'sms:741741');
    });

    it('should render external FindTreatment link with noopener', () => {
        render(<CrisisResources />);
        const link = screen.getByRole('link', { name: /findtreatment/i });
        expect(link).toHaveAttribute('href', 'https://findtreatment.gov');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
        expect(link).toHaveAttribute('target', '_blank');
    });
});
