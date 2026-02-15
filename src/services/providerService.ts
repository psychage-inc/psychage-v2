import { Provider } from '../types/models';
import api, { ProviderProfile } from '../lib/api';
import { useMemo } from 'react';

// Fallback to mock data if API fails
import { providers as mockProviders } from '../data/providers';

export interface ProviderSearchParams {
    specialty?: string;
    insurance?: string;
    location?: string;
    verified?: boolean;
    videoVisit?: boolean;
    page?: number;
    limit?: number;
    search?: string;
}

interface DBProvider {
    id: number | string;
    full_name: string;
    role?: string;
    profile_photo_url?: string;
    rating?: number;
    reviews_count?: number;
    specialties?: string[];
    practice_city?: string;
    practice_state?: string;
    is_accepting_patients?: boolean;
    insurance?: string[];
    verification_status?: string;
    bio?: string;
    credentials?: string;
    languages_spoken?: string[];
    treatment_approaches?: string | string[];
    years_of_experience?: number;
    practice_name?: string;
}

function mapToProvider(data: DBProvider): Provider {
    return {
        id: data.id,
        name: data.full_name,
        role: data.role || 'Provider',
        image: data.profile_photo_url,
        rating: Number(data.rating || 0),
        reviews: data.reviews_count || 0,
        specialties: data.specialties || [],
        location: `${data.practice_city || ''}, ${data.practice_state || ''}`.replace(/^, |, $/g, ''),
        availability: data.is_accepting_patients ? 'Available' : 'Full',
        insurance: data.insurance || [],
        verified: data.verification_status === 'verified',
        bio: data.bio || '',
        education: [data.credentials || ''],
        languages: data.languages_spoken || [],
        approach: typeof data.treatment_approaches === 'string' ? data.treatment_approaches : (data.treatment_approaches?.[0] || ''),
        yearsExperience: data.years_of_experience || 0,
        reviewsList: [],
        isVideoVisit: true,
        status: data.verification_status,
        email: 'provider@example.com'
    };
}

// Helper function to filter mock providers based on search params
function filterMockProviders(providers: Provider[], params?: ProviderSearchParams): Provider[] {
    let filtered = [...providers];

    if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.specialties.some(s => s.toLowerCase().includes(searchLower))
        );
    }
    if (params?.specialty) {
        filtered = filtered.filter(p => p.specialties.includes(params.specialty!));
    }
    if (params?.insurance) {
        filtered = filtered.filter(p => p.insurance.includes(params.insurance!));
    }
    if (params?.location) {
        const locationLower = params.location.toLowerCase();
        filtered = filtered.filter(p => p.location.toLowerCase().includes(locationLower));
    }
    if (params?.verified) {
        filtered = filtered.filter(p => p.verified);
    }
    if (params?.limit) {
        const start = params.page ? (params.page - 1) * params.limit : 0;
        filtered = filtered.slice(start, start + params.limit);
    }

    return filtered;
}

export const providerService = {
    getAll: async (params?: ProviderSearchParams): Promise<Provider[]> => {
        try {
            const response = await api.providers.getAll({
                state: params?.location,
                specialization: params?.specialty,
                insurance: params?.insurance,
                page: params?.page,
                limit: params?.limit
            });

            if (!response.success || !response.data || (response.data as DBProvider[]).length === 0) {
                console.warn('API returned no providers, using mock data');
                return filterMockProviders(mockProviders, params);
            }

            return (response.data as DBProvider[]).map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch providers from API, using fallback:', error);
            return filterMockProviders(mockProviders, params);
        }
    },

    getById: async (id: number | string): Promise<Provider | undefined> => {
        try {
            const response = await api.providers.getById(id);

            if (!response.success || !response.data) {
                return mockProviders.find(p => p.id === Number(id) || p.id === id);
            }

            return mapToProvider(response.data as DBProvider);
        } catch (error) {
            console.error('Failed to fetch provider from API, using fallback:', error);
            return mockProviders.find(p => p.id === Number(id) || p.id === id);
        }
    },

    getLocations: async (): Promise<string[]> => {
        try {
            // Get unique states from providers
            const response = await api.providers.getAll({});
            if (!response.success || !response.data) {
                const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
                return Array.from(mockLocations).sort();
            }

            const states = new Set((response.data as DBProvider[]).map(p => p.practice_state).filter(Boolean) as string[]);
            if (states.size === 0) {
                const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
                return Array.from(mockLocations).sort();
            }
            return Array.from(states).sort();
        } catch (error) {
            console.error('Failed to fetch locations, using fallback:', error);
            const mockLocations = new Set(mockProviders.map(p => p.location.split(',')[1]?.trim()).filter(Boolean));
            return Array.from(mockLocations).sort();
        }
    },

    getSpecializations: async (): Promise<string[]> => {
        try {
            const response = await api.providers.getSpecializations();
            if (!response.success || !response.data || (response.data as string[]).length === 0) {
                const specialties = new Set<string>();
                mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
                return Array.from(specialties).sort();
            }
            return response.data as string[];
        } catch (error) {
            console.error('Failed to fetch specializations, using fallback:', error);
            const specialties = new Set<string>();
            mockProviders.forEach(p => p.specialties.forEach(s => specialties.add(s)));
            return Array.from(specialties).sort();
        }
    },

    getInsuranceProviders: async (): Promise<string[]> => {
        try {
            const response = await api.providers.getInsurance();
            if (!response.success || !response.data || (response.data as string[]).length === 0) {
                const insurance = new Set<string>();
                mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
                return Array.from(insurance).sort();
            }
            return response.data as string[];
        } catch (error) {
            console.error('Failed to fetch insurance, using fallback:', error);
            const insurance = new Set<string>();
            mockProviders.forEach(p => p.insurance.forEach(i => insurance.add(i)));
            return Array.from(insurance).sort();
        }
    },

    updateProfile: async (data: Partial<ProviderProfile>): Promise<void> => {
        const response = await api.provider.updateProfile(data);
        if (!response.success) {
            throw new Error(response.error || 'Failed to update profile');
        }
    },

    updateAvailability: async (data: unknown): Promise<void> => {
        const response = await api.provider.updateAvailability(data);
        if (!response.success) {
            throw new Error(response.error || 'Failed to update availability');
        }
    },

    verifyProvider: async (providerId: number | string, status: 'active' | 'rejected'): Promise<{ success: boolean }> => {
        try {
            const response = await api.admin.updateProviderStatus(providerId, status);
            return { success: response.success };
        } catch (error) {
            console.error('Failed to verify provider:', error);
            return { success: false };
        }
    },

    toggleFavorite: async (providerId: number | string): Promise<{ favorited: boolean }> => {
        try {
            const response = await api.providers.toggleFavorite(providerId);
            if (!response.success) {
                return { favorited: false };
            }
            return (response.data as { favorited: boolean }) || { favorited: true };
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            return { favorited: false };
        }
    },

    getFavorites: async (): Promise<Provider[]> => {
        try {
            const response = await api.providers.getFavorites();
            if (!response.success || !response.data) {
                return [];
            }
            return (response.data as DBProvider[]).map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
            return [];
        }
    },

    submitReview: async (providerId: number | string, data: { rating: number; comment: string }): Promise<{ success: boolean; error?: string }> => {
        try {
            // Try to submit to backend API
            const response = await api.post<{ success: boolean }>(`/api/providers/${providerId}/reviews`, data);
            return { success: response.success };
        } catch (error) {
            console.error('Failed to submit review:', error);
            // Queue locally for later sync if API unavailable
            try {
                const queueKey = 'psychage_review_queue';
                const existingQueue = JSON.parse(localStorage.getItem(queueKey) || '[]');
                existingQueue.push({
                    providerId,
                    ...data,
                    queuedAt: new Date().toISOString()
                });
                localStorage.setItem(queueKey, JSON.stringify(existingQueue));
                return { success: true, error: 'Review saved locally. Will sync when connection is restored.' };
            } catch {
                return { success: false, error: 'Failed to submit review. Please try again.' };
            }
        }
    },

    getActivity: async (_providerId: string): Promise<Record<string, unknown>[]> => {
        try {
            const response = await api.provider.getActivity();
            if (!response.success || !response.data) {
                return [];
            }
            return response.data as Record<string, unknown>[];
        } catch (error) {
            console.error('Failed to fetch provider activity:', error);
            return [];
        }
    },

    trackView: async (providerId: number | string): Promise<void> => {
        try {
            await api.providers.trackView(providerId);
        } catch (error) {
            console.error('Failed to track provider view:', error);
        }
    },

    // Admin methods
    getAdminProviders: async (status: string): Promise<Provider[]> => {
        try {
            const response = await api.admin.getProviders({ status });
            if (!response.success || !response.data) {
                // Fallback to filtering mockProviders
                return mockProviders.filter(p => {
                    const pStatus = p.verified ? 'active' : 'pending';
                    return pStatus === status;
                }).map(p => ({ ...p, status: p.verified ? 'active' : 'pending' }));
            }
            return (response.data as DBProvider[]).map(mapToProvider);
        } catch (error) {
            console.error('Failed to fetch admin providers', error);
            return mockProviders.filter(p => {
                const pStatus = p.verified ? 'active' : 'pending';
                return pStatus === status;
            }).map(p => ({ ...p, status: p.verified ? 'active' : 'pending' }));
        }
    },

    updateProviderStatus: async (id: number | string, status: string): Promise<void> => {
        const response = await api.admin.updateProviderStatus(id, status as 'active' | 'suspended' | 'rejected');
        if (!response.success) {
            throw new Error(response.error || 'Failed to update provider status');
        }
    }
};

// Hook wrapper for React components
export function useProviderService() {
    return useMemo(() => providerService, []);
}
