 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CitationCard from '../CitationCard';

const mockCitation = {
    document_id: 'doc-1',
    title: 'Understanding Anxiety Disorders',
    url_path: '/learn/conditions/anxiety-disorders',
};

describe('CitationCard', () => {
    it('should render citation title', () => {
        render(<CitationCard citation={mockCitation} />);
        expect(screen.getByText('Understanding Anxiety Disorders')).toBeInTheDocument();
    });

    it('should render as a link with correct href', () => {
        render(<CitationCard citation={mockCitation} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/learn/conditions/anxiety-disorders');
    });

    it('should open in new tab with security attributes', () => {
        render(<CitationCard citation={mockCitation} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('should display Article type badge', () => {
        render(<CitationCard citation={mockCitation} />);
        expect(screen.getByText('Article')).toBeInTheDocument();
    });
});
