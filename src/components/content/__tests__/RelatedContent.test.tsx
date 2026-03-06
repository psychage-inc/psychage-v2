import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RelatedContent from '../RelatedContent';

const mockArticles = [
    {
        id: 1,
        title: 'Understanding Anxiety',
        slug: 'understanding-anxiety',
        description: 'A guide',
        content: '',
        category: { name: 'Mental Health', slug: 'mental-health' },
        tags: ['anxiety'],
    },
    {
        id: 2,
        title: 'Sleep Tips',
        slug: 'sleep-tips',
        description: 'Better sleep',
        content: '',
        category: { name: 'Wellness', slug: 'wellness' },
        tags: ['sleep'],
    },
] as any;

describe('RelatedContent', () => {
    it('should render nothing when articles is empty', () => {
        const { container } = render(
            <MemoryRouter>
                <RelatedContent articles={[]} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render nothing when articles is null-ish', () => {
        const { container } = render(
            <MemoryRouter>
                <RelatedContent articles={null as any} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render default title', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} />
            </MemoryRouter>
        );
        expect(screen.getByText('Related Articles')).toBeInTheDocument();
    });

    it('should render custom title', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} title="More Reading" />
            </MemoryRouter>
        );
        expect(screen.getByText('More Reading')).toBeInTheDocument();
    });

    it('should render article titles', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} />
            </MemoryRouter>
        );
        expect(screen.getByText('Understanding Anxiety')).toBeInTheDocument();
        expect(screen.getByText('Sleep Tips')).toBeInTheDocument();
    });

    it('should render category names', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} />
            </MemoryRouter>
        );
        expect(screen.getByText('Mental Health')).toBeInTheDocument();
        expect(screen.getByText('Wellness')).toBeInTheDocument();
    });

    it('should render links with correct paths', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} />
            </MemoryRouter>
        );
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/learn/mental-health/understanding-anxiety');
        expect(links[1]).toHaveAttribute('href', '/learn/wellness/sleep-tips');
    });

    it('should show Read Article text', () => {
        render(
            <MemoryRouter>
                <RelatedContent articles={mockArticles} />
            </MemoryRouter>
        );
        const readLinks = screen.getAllByText('Read Article');
        expect(readLinks).toHaveLength(2);
    });
});
