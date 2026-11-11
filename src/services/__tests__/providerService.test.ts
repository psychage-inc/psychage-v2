 
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { providerService } from '../providerService';

// Mock API
vi.mock('@/lib/api', () => ({
    default: {
        providers: {
            getAll: vi.fn(),
            getById: vi.fn(),
            getSpecializations: vi.fn(),
            getInsurance: vi.fn(),
            toggleFavorite: vi.fn(),
            getFavorites: vi.fn(),
            trackView: vi.fn(),
        },
        provider: {
            updateProfile: vi.fn(),
            updateAvailability: vi.fn(),
            getActivity: vi.fn(),
        },
        admin: {
            updateProviderStatus: vi.fn(),
            getProviders: vi.fn(),
        },
        post: vi.fn(),
    },
    api: {
        providers: {
            getAll: vi.fn(),
            getById: vi.fn(),
            getSpecializations: vi.fn(),
            getInsurance: vi.fn(),
            toggleFavorite: vi.fn(),
            getFavorites: vi.fn(),
            trackView: vi.fn(),
        },
        provider: {
            updateProfile: vi.fn(),
            updateAvailability: vi.fn(),
            getActivity: vi.fn(),
        },
        admin: {
            updateProviderStatus: vi.fn(),
            getProviders: vi.fn(),
        },
        post: vi.fn(),
    }
}));

describe('providerService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('toggleFavorite', () => {
        it('should return favorited status', async () => {
            const result = await providerService.toggleFavorite(1);
            expect(result).toHaveProperty('favorited');
        });
    });

    describe('getFavorites', () => {
        it('should return array of favorite providers', async () => {
            const favorites = await providerService.getFavorites();
            expect(Array.isArray(favorites)).toBe(true);
        });
    });

    describe('updateProviderStatus', () => {
        it('should return success status', async () => {
            const result = await providerService.updateProviderStatus(1, 'active');
            expect(typeof result).toBe('boolean');
        });
    });
});
