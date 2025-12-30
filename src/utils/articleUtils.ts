import { Article } from '../types/models';

export const getPopularArticles = (articles: Article[]): Article[] => {
    return [...articles]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
};
