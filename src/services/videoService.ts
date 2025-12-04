import { Video } from '../types/models';
import { videos } from '../data/videos';

export const videoService = {
    getAll: async (): Promise<Video[]> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return videos as unknown as Video[];
    },

    getById: async (id: number): Promise<Video | undefined> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return (videos as unknown as Video[]).find(v => v.id === id);
    }
};
