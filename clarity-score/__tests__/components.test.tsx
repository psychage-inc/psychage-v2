import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ScoreHero from '../components/clarity-score/ScoreHero';

describe('ScoreHero component', () => {
    it('renders the correct category text for excellent score', () => {
        render(<ScoreHero score={95} />);
        // The qualitative text for 95 should be "Excellence"
        expect(screen.getByText('Excellence')).toBeDefined();
    });

    it('renders the correct category text for poor score', () => {
        render(<ScoreHero score={30} />);
        expect(screen.getByText('Significant Distress')).toBeDefined();
    });
});
