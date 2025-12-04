import { Category } from '../types/models';
import { categories } from '../data/categories';

export const categoryService = {
    getAll: async (): Promise<Category[]> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return categories;
    },
    getBySlug: async (slug: string): Promise<Category | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return categories.find(c => c.slug === slug);
    }
};
