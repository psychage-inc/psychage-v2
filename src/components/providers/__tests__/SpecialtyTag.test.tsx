import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SpecialtyTag } from '../shared/SpecialtyTag';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const conditionSpec = { slug: 'anxiety', label: 'Anxiety', category: 'condition' };
const treatmentSpec = { slug: 'cbt', label: 'CBT', category: 'treatment_approach' };
const populationSpec = { slug: 'adolescents', label: 'Adolescents', category: 'population' };

describe('SpecialtyTag', () => {
    it('should render label text', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} />
            </MemoryRouter>
        );
        expect(screen.getByText('Anxiety')).toBeInTheDocument();
    });

    it('should render as span by default', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} />
            </MemoryRouter>
        );
        expect(screen.getByText('Anxiety').tagName).toBe('SPAN');
    });

    it('should render as button when clickable', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} clickable />
            </MemoryRouter>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should navigate on click when clickable', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} clickable />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(mockNavigate).toHaveBeenCalledWith('/providers/search?specialty=anxiety');
    });

    it('should apply condition styles', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} />
            </MemoryRouter>
        );
        expect(screen.getByText('Anxiety')).toHaveClass('text-blue-600');
    });

    it('should apply treatment_approach styles', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={treatmentSpec} />
            </MemoryRouter>
        );
        expect(screen.getByText('CBT')).toHaveClass('text-teal-600');
    });

    it('should apply population styles', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={populationSpec} />
            </MemoryRouter>
        );
        expect(screen.getByText('Adolescents')).toHaveClass('text-purple-600');
    });

    it('should support sm size', () => {
        render(
            <MemoryRouter>
                <SpecialtyTag specialty={conditionSpec} size="sm" />
            </MemoryRouter>
        );
        expect(screen.getByText('Anxiety')).toHaveClass('text-[11px]');
    });
});
