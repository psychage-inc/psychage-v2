/**
 * FP-02 regression: NPI bulk import must insert into the REAL providers schema.
 * The old code inserted name/credentials/city/state/specialties — none of which
 * exist on `providers` — so every import failed. The fix writes display_name +
 * provider_type_id (NOT NULL) + npi_number + verification fields, and puts
 * city/state in provider_locations.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const inserts: Array<{ table: string; payload: Record<string, unknown> }> = [];

function makeChain(table: string) {
  const chain: Record<string, unknown> = {};
  chain.select = () => chain;
  chain.eq = () => chain;
  chain.insert = (payload: Record<string, unknown>) => {
    inserts.push({ table, payload });
    return {
      select: () => ({ single: () => Promise.resolve({ data: { id: `${table}-id` }, error: null }) }),
      then: (r: (v: { data: null; error: null }) => unknown) => Promise.resolve({ data: null, error: null }).then(r),
    };
  };
  chain.maybeSingle = () => Promise.resolve({ data: null, error: null }); // no existing provider
  // provider_types lookup: select().then / awaited
  chain.then = (r: (v: { data: unknown; error: null }) => unknown) => {
    if (table === 'provider_types') {
      return Promise.resolve({ data: [{ id: 'type-therapist', slug: 'therapist' }, { id: 'type-psych', slug: 'psychiatrist' }], error: null }).then(r);
    }
    return Promise.resolve({ data: [], error: null }).then(r);
  };
  return chain;
}

vi.mock('@/lib/supabaseClient', () => ({
  supabase: { from: (t: string) => makeChain(t) },
}));
vi.mock('@/lib/admin/auditLogger', () => ({ logAdminAction: vi.fn(() => Promise.resolve()) }));

import AdminBulkImport from '../BulkImport';

const NPPES_RESPONSE = {
  results: [{
    enumeration_type: 'NPI-1',
    basic: { first_name: 'Jane', last_name: 'Doe', credential: 'LMFT' },
    addresses: [{ city: 'Austin', state: 'TX' }],
    taxonomies: [{ desc: 'Marriage & Family Therapist' }],
  }],
};

describe('BulkImport (FP-02)', () => {
  beforeEach(() => {
    inserts.length = 0;
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve(NPPES_RESPONSE) } as Response)));
  });

  it('inserts a provider row with real columns + a provider_type_id, and city/state into provider_locations', async () => {
    render(
      <MemoryRouter><AdminBulkImport /></MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/1234567890/), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /^import$/i }));

    await waitFor(() => {
      expect(inserts.some((i) => i.table === 'providers')).toBe(true);
    });

    const prov = inserts.find((i) => i.table === 'providers')!.payload;
    // Real columns present:
    expect(prov.display_name).toBe('Jane Doe');
    expect(prov.npi_number).toBe('1234567890');
    expect(prov.provider_type_id).toBe('type-therapist');
    expect(prov.verification_tier).toBe('npi_verified');
    expect(prov.source).toBe('npi_registry');
    // Phantom columns absent:
    expect(prov).not.toHaveProperty('name');
    expect(prov).not.toHaveProperty('city');
    expect(prov).not.toHaveProperty('state');
    expect(prov).not.toHaveProperty('specialties');

    const loc = inserts.find((i) => i.table === 'provider_locations')!.payload;
    expect(loc.city).toBe('Austin');
    expect(loc.state_province).toBe('TX');
    expect(loc.is_primary).toBe(true);

    await waitFor(() => expect(screen.getByText(/1 imported/)).toBeTruthy());
  });
});
