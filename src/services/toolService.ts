import { Tool } from '../types/models';
import { useMemo } from 'react';
import { tools as mockTools } from '../data/tools';

/**
 * Tools are served from the bundled catalog (`src/data/tools`).
 *
 * The public site has no reachable `/api/tools` backend: the legacy v1 API host
 * baked into `VITE_API_URL` is cross-origin and blocked by the public CSP, so
 * the previous `api.tools.*` calls always failed and fell back to this same
 * catalog — emitting a CSP violation + a `[toolService] Failed` console error on
 * every `/tools` and `/search` visit for no behavioural gain. Serving the
 * catalog directly keeps the identical data and removes the console noise.
 */
const allTools = mockTools as unknown as Tool[];

export const toolService = {
    getAll: async (): Promise<Tool[]> => allTools,

    getById: async (id: number): Promise<Tool | undefined> =>
        allTools.find((t) => t.id === id),

    getByCategory: async (category: string): Promise<Tool[]> =>
        allTools.filter((t) => t.category.toLowerCase() === category.toLowerCase()),
};

// Hook wrapper for React components
export function useToolService() {
    return useMemo(() => toolService, []);
}
