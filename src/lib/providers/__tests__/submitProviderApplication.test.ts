import { describe, it, expect, vi, beforeEach } from 'vitest';

// Per-table behavior is injected by each test via `tableBehavior`.
const tableBehavior: Record<string, unknown> = {};
const deletedProviders: string[] = [];

vi.mock('../../supabaseClient', () => ({
    supabase: {
        from: (table: string) => ({
            insert: (rows: unknown) => {
                if (table === 'providers') {
                    // provider insert → .select('id').single()
                    return {
                        select: () => ({
                            single: () => Promise.resolve(tableBehavior['providers'] ?? { data: { id: 'prov-1' }, error: null }),
                        }),
                    };
                }
                // child-table insert resolves { error } directly
                void rows;
                return Promise.resolve(tableBehavior[table] ?? { error: null });
            },
            delete: () => ({
                eq: (_col: string, id: string) => {
                    if (table === 'providers') deletedProviders.push(id);
                    return Promise.resolve({ error: null });
                },
            }),
        }),
    },
}));

import { submitProviderApplication } from '../queries';
import type { ProviderApplication } from '../types';

const baseApplication = (): ProviderApplication => ({
    npi_number: '1234567890',
    provider_type_id: 'pt-1',
    display_name: 'Dr. Test',
    credentials_suffix: 'PhD',
    bio: 'bio',
    email: 'dr@test.com',
    telehealth_available: true,
    in_person_available: false,
    location: { city: 'Boston', address_line1: '1 Main St' },
    specialty_ids: ['s1'],
    language_ids: [],
    competency_ids: [],
    insurance_plan_ids: [],
} as unknown as ProviderApplication);

describe('submitProviderApplication child-write integrity', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        for (const k of Object.keys(tableBehavior)) delete tableBehavior[k];
        deletedProviders.length = 0;
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('returns the provider id when all child inserts succeed', async () => {
        const result = await submitProviderApplication(baseApplication(), 'user-1');
        expect(result).toEqual({ id: 'prov-1' });
        expect(deletedProviders).toHaveLength(0);
    });

    it('returns {error} and rolls back the provider when a child insert fails', async () => {
        // Make the specialties insert fail
        tableBehavior['provider_specialties'] = { error: { message: 'specialty FK violation' } };

        const result = await submitProviderApplication(baseApplication(), 'user-1');

        expect('error' in result).toBe(true);
        expect((result as { error: string }).error).toContain('specialty FK violation');
        // Compensating rollback deleted the just-created provider row
        expect(deletedProviders).toContain('prov-1');
    });

    it('returns {error} without touching children when the provider insert fails', async () => {
        tableBehavior['providers'] = { data: null, error: { message: 'provider denied' } };

        const result = await submitProviderApplication(baseApplication(), 'user-1');

        expect('error' in result).toBe(true);
        expect(deletedProviders).toHaveLength(0);
    });
});
