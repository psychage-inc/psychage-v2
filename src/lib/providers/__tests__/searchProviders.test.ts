import { describe, it, expect, vi, beforeEach } from 'vitest';

// Provider search uses the search_providers_v3 RPC only. These tests pin that
// a failed RPC throws instead of falling back to a direct table query or to
// mock data.

const rpc = vi.fn();
const from = vi.fn();

vi.mock('../../supabaseClient', () => ({
  supabase: {
    rpc: (...args: unknown[]) => rpc(...args),
    from: (...args: unknown[]) => from(...args),
  },
}));

import { searchProviders } from '../queries';

const row = (name: string) => ({
  id: name,
  display_name: name,
  credentials_suffix: null,
  bio: null,
  photo_url: null,
  status: 'seeded',
  tier: 'free',
  practice_name: null,
  phone: null,
  email: null,
  website_url: null,
  appointment_url: null,
  npi_number: null,
  telehealth_available: false,
  in_person_available: true,
  is_accepting_patients: null,
  verified_at: null,
  trust_score_cached: null,
  provider_type_slug: 'psychologist',
  provider_type_label: 'Psychologist',
  primary_city: 'Austin',
  primary_state: 'TX',
  specialty_tags: [],
  language_tags: [],
  competency_tags: [],
  insurance_tags: [],
  total_count: 1,
});

describe('searchProviders — database search only', () => {
  beforeEach(() => {
    rpc.mockReset();
    from.mockReset();
  });

  it('returns RPC rows', async () => {
    rpc.mockResolvedValue({ data: [row('Amy')], error: null });
    const result = await searchProviders({ state: 'TX' });
    expect(result.providers.map(p => p.display_name)).toEqual(['Amy']);
    expect(rpc).toHaveBeenCalledWith('search_providers_v3', expect.any(Object));
  });

  it('throws when the RPC fails and never queries the table or returns other data', async () => {
    rpc.mockResolvedValue({ data: null, error: { message: 'boom' } });
    await expect(searchProviders({ query: 'anxiety' })).rejects.toThrow('Provider search failed');
    expect(from).not.toHaveBeenCalled();
  });

  it('throws on RPC failure even without a location filter', async () => {
    rpc.mockResolvedValue({ data: null, error: { message: 'timeout' } });
    await expect(searchProviders({})).rejects.toThrow();
    expect(from).not.toHaveBeenCalled();
  });

  it('never sends coordinates to the RPC', async () => {
    rpc.mockResolvedValue({ data: [], error: null });
    await searchProviders({ state: 'TX', city: 'Austin' });
    const args = rpc.mock.calls[0][1] as Record<string, unknown>;
    expect(Object.keys(args).some(k => /lat|lng|longitude|radius/.test(k))).toBe(false);
  });
});
