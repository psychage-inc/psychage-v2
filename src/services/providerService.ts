import { Provider } from '../types/models';
import { api } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { providers as mockProviders } from '../data/providers';

const USE_API = import.meta.env.VITE_API_URL ? true : false;

export interface ProviderSearchParams {
    specialty?: string;
    insurance?: string;
    location?: string;
    verified?: boolean;
    videoVisit?: boolean;
    page?: number;
    limit?: number;
}

export const providerService = {
    getAll: async (params?: ProviderSearchParams): Promise<Provider[]> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 800));
            let result = mockProviders as unknown as Provider[];
            if (params?.specialty) {
                result = result.filter(p => p.specialties.includes(params.specialty!));
            }
            if (params?.insurance) {
                result = result.filter(p => p.insurance.includes(params.insurance!));
            }
            if (params?.verified) {
                result = result.filter(p => p.verified);
            }
            return result;
        }

        try {
            const queryParams = new URLSearchParams();
            if (params?.specialty) queryParams.set('specialty', params.specialty);
            if (params?.insurance) queryParams.set('insurance', params.insurance);
            if (params?.location) queryParams.set('location', params.location);
            if (params?.verified) queryParams.set('verified', 'true');
            if (params?.videoVisit) queryParams.set('videoVisit', 'true');
            if (params?.page) queryParams.set('page', params.page.toString());
            if (params?.limit) queryParams.set('limit', params.limit.toString());

            const query = queryParams.toString();
            const response = await api.get<Provider[]>(
                `/api/providers${query ? `?${query}` : ''}`
            );
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch providers from API, using mock data:', error);
            return mockProviders as unknown as Provider[];
        }
    },

    getById: async (id: number): Promise<Provider | undefined> => {
        if (!USE_API) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return (mockProviders as unknown as Provider[]).find(p => p.id === id);
        }

        try {
            const response = await api.get<Provider>(`/api/providers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch provider from API, using mock data:', error);
            return (mockProviders as unknown as Provider[]).find(p => p.id === id);
        }
    },

    getSpecializations: async (): Promise<string[]> => {
        if (!USE_API) {
            const allSpecialties = new Set<string>();
            (mockProviders as unknown as Provider[]).forEach(p => {
                p.specialties.forEach(s => allSpecialties.add(s));
            });
            return Array.from(allSpecialties).sort();
        }

        try {
            const response = await api.get<string[]>('/api/providers?specializations=true');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch specializations:', error);
            return [];
        }
    },

    getInsuranceProviders: async (): Promise<string[]> => {
        if (!USE_API) {
            const allInsurance = new Set<string>();
            (mockProviders as unknown as Provider[]).forEach(p => {
                p.insurance.forEach(i => allInsurance.add(i));
            });
            return Array.from(allInsurance).sort();
        }

        try {
            const response = await api.get<string[]>('/api/providers?insurance=list');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch insurance providers:', error);
            return [];
        }
    },

    toggleFavorite: async (providerId: number): Promise<{ favorited: boolean }> => {
        try {
            const response = await api.post<{ favorited: boolean }>('/api/providers/favorites', { providerId });
            return response.data || { favorited: false };
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            throw error;
        }
    },

    getFavorites: async (): Promise<Provider[]> => {
        try {
            const response = await api.get<Provider[]>('/api/providers/favorites');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
            return [];
        }
    },

    submitReview: async (providerId: number, data: { rating: number; comment: string }): Promise<void> => {
        try {
            await api.post(`/api/providers/${providerId}/reviews`, data);
        } catch (error) {
            console.error('Failed to submit review:', error);
            throw error;
        }
    },

    trackView: async (providerId: number): Promise<void> => {
        try {
            await api.post(`/api/providers/${providerId}/view`);
        } catch (error) {
            // Silent fail for analytics
            console.debug('Failed to track provider view:', error);
        }
    }
};

// Hook wrapper for React components
export function useProviderService() {
    return useMemo(() => providerService, []);
}
