import { Article } from '../types/models';
import { articles } from '../data/articles';

export const articleService = {
    getAll: async (): Promise<Article[]> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return articles;
    },
    getById: async (id: number | string): Promise<Article | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return articles.find(a => a.id.toString() === id.toString());
    },
    getBySlug: async (slug: string): Promise<Article | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return articles.find(a => a.slug === slug);
    }
};
