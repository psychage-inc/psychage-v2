import { Tool } from '../types/models';
import { tools } from '../data/tools';

export const toolService = {
    getAll: async (): Promise<Tool[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return tools as unknown as Tool[];
    }
};
