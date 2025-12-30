import { describe, it, expect } from 'vitest';
import { getPopularArticles } from './articleUtils';
import { Article } from '../types/models';

// Mock Article Factory
const createArticle = (id: number, views?: number): Article => ({
    id: id.toString(),
    title: `Article ${id}`,
    slug: `article-${id}`,
    description: 'desc',
    content: 'content',
    author: { name: 'Author', role: 'Role', avatar: 'avatar' },
    category: { id: 'cat', name: 'Category', slug: 'cat', group: 'group' },
    readTime: 5,
    publishDate: '2023-01-01',
    image: 'image.jpg',
    views: views
});

describe('getPopularArticles', () => {
    it('should sort articles by views in descending order', () => {
        const articles = [
            createArticle(1, 100),
            createArticle(2, 300),
            createArticle(3, 200)
        ];
        const result = getPopularArticles(articles);
        expect(result.map(a => a.id)).toEqual(['2', '3', '1']);
    });

    it('should return top 5 articles', () => {
        const articles = Array.from({ length: 10 }, (_, i) => createArticle(i, i * 10));
        const result = getPopularArticles(articles);
        expect(result.length).toBe(5);
        // Should be 90, 80, 70, 60, 50 (indices 9, 8, 7, 6, 5)
        expect(result[0].views).toBe(90);
    });

    it('should handle undefined views as 0', () => {
        const articles = [
            createArticle(1, 100),
            createArticle(2, undefined), // 0
            createArticle(3, 50)
        ];
        const result = getPopularArticles(articles);
        expect(result.map(a => a.id)).toEqual(['1', '3', '2']);
    });

    it('should handle empty array', () => {
        const result = getPopularArticles([]);
        expect(result).toEqual([]);
    });
});
