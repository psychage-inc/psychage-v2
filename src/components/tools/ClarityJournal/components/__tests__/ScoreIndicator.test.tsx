 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreIndicator from '../ScoreIndicator';

describe('ScoreIndicator', () => {
    it('should render label text', () => {
        render(<ScoreIndicator label="Depression" score={3} maxScore={6} level="moderate" />);
        expect(screen.getByText('Depression')).toBeInTheDocument();
    });

    it('should render score and max', () => {
        render(<ScoreIndicator label="Anxiety" score={2} maxScore={6} level="low" />);
        expect(screen.getByText('(2/6)')).toBeInTheDocument();
    });

    it('should display Low concern for low level', () => {
        render(<ScoreIndicator label="Test" score={1} maxScore={6} level="low" />);
        expect(screen.getByText('Low concern')).toBeInTheDocument();
    });

    it('should display Moderate for moderate level', () => {
        render(<ScoreIndicator label="Test" score={3} maxScore={6} level="moderate" />);
        expect(screen.getByText('Moderate')).toBeInTheDocument();
    });

    it('should display Elevated for elevated level', () => {
        render(<ScoreIndicator label="Test" score={5} maxScore={6} level="elevated" />);
        expect(screen.getByText('Elevated')).toBeInTheDocument();
    });

    it('should show inverted labels when invertedDescription is true', () => {
        render(<ScoreIndicator label="Well-being" score={8} maxScore={10} level="low" invertedDescription />);
        expect(screen.getByText('Good')).toBeInTheDocument();
    });

    it('should show Fair for moderate with inverted description', () => {
        render(<ScoreIndicator label="Well-being" score={5} maxScore={10} level="moderate" invertedDescription />);
        expect(screen.getByText('Fair')).toBeInTheDocument();
    });

    it('should show Low for elevated with inverted description', () => {
        render(<ScoreIndicator label="Well-being" score={2} maxScore={10} level="elevated" invertedDescription />);
        expect(screen.getByText('Low')).toBeInTheDocument();
    });

    it('should have accessible aria-label', () => {
        render(<ScoreIndicator label="Depression" score={1} maxScore={6} level="low" />);
        expect(screen.getByLabelText('Depression: Low concern')).toBeInTheDocument();
    });
});
