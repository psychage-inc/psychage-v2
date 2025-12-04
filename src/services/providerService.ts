import { Provider } from '../types/models';
import { providers } from '../data/providers';

export const providerService = {
    getAll: async (): Promise<Provider[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return providers as unknown as Provider[];
    },

    getById: async (id: number): Promise<Provider | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return (providers as unknown as Provider[]).find(p => p.id === id);
    }
};
