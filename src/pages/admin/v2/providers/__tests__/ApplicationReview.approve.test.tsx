/**
 * FP-04 regression: approving a provider application must create an active
 * provider linked to the application (previously it only flipped the
 * application status, so approved providers never entered the directory).
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const APP = {
  id: 'app-1', provider_name: 'Dr Jane Roe', credentials: 'Psychiatrist, MD',
  npi_number: '1234567890', npi_verified: true, npi_verification_data: null,
  practice_name: 'Roe Clinic', practice_address: { city: 'Denver', state: 'CO' },
  specialties: ['Psychiatry'], languages: [], telehealth_available: true,
  license_documents: [], bio: 'x', website_url: null, contact_email: 'jane@test.com',
  contact_phone: null, status: 'pending', reviewed_by: null, review_notes: null,
  rejection_reason: null, submitted_at: '2026-01-01', reviewed_at: null,
};

const inserts: Array<{ table: string; payload: Record<string, unknown> }> = [];
const updates: Array<{ table: string; payload: Record<string, unknown> }> = [];

function chain(table: string) {
  const c: Record<string, unknown> = {};
  c.select = () => c;
  c.eq = () => c;
  c.order = () => Promise.resolve({ data: table === 'provider_applications' ? [APP] : [], error: null });
  c.maybeSingle = () => Promise.resolve({ data: null, error: null }); // no existing provider
  c.single = () => Promise.resolve({ data: table === 'provider_types' ? null : { id: `${table}-id` }, error: null });
  c.insert = (payload: Record<string, unknown>) => {
    inserts.push({ table, payload });
    return { select: () => ({ single: () => Promise.resolve({ data: { id: `${table}-id` }, error: null }) }),
      then: (r: (v: { data: null; error: null }) => unknown) => Promise.resolve({ data: null, error: null }).then(r) };
  };
  c.update = (payload: Record<string, unknown>) => { updates.push({ table, payload }); return { eq: () => Promise.resolve({ data: null, error: null }) }; };
  // provider_types list is awaited directly
  c.then = (r: (v: { data: unknown; error: null }) => unknown) => {
    if (table === 'provider_types') return Promise.resolve({ data: [{ id: 'type-psych', slug: 'psychiatrist' }, { id: 'type-ther', slug: 'therapist' }], error: null }).then(r);
    return Promise.resolve({ data: [], error: null }).then(r);
  };
  return c;
}

vi.mock('@/lib/supabaseClient', () => ({
  supabase: { from: (t: string) => chain(t), auth: { getUser: () => Promise.resolve({ data: { user: { id: 'admin-1' } } }) } },
}));
vi.mock('@/lib/admin/auditLogger', () => ({ logAdminAction: vi.fn(() => Promise.resolve()) }));

import AdminApplicationReview from '../ApplicationReview';

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return render(<QueryClientProvider client={qc}><MemoryRouter><AdminApplicationReview /></MemoryRouter></QueryClientProvider>);
};

describe('ApplicationReview approve (FP-04)', () => {
  beforeEach(() => { inserts.length = 0; updates.length = 0; });

  it('creates an active linked provider and then marks the application approved', async () => {
    renderPage();
    await screen.findByText('Dr Jane Roe');
    fireEvent.click(screen.getByTitle('Approve'));

    await waitFor(() => expect(inserts.some((i) => i.table === 'providers')).toBe(true));

    const prov = inserts.find((i) => i.table === 'providers')!.payload;
    expect(prov.display_name).toBe('Dr Jane Roe');
    expect(prov.status).toBe('active');
    expect(prov.verification_tier).toBe('psychage_verified');
    expect(prov.provider_type_id).toBe('type-psych'); // bucketed from "Psychiatrist"
    expect(prov.application_id).toBe('app-1');
    expect(prov.source).toBe('manual');

    // primary location from practice_address
    const loc = inserts.find((i) => i.table === 'provider_locations')!.payload;
    expect(loc.city).toBe('Denver');
    expect(loc.state_province).toBe('CO');

    // application marked approved AFTER provider creation
    const appUpd = updates.find((u) => u.table === 'provider_applications')!.payload;
    expect(appUpd.status).toBe('approved');
  });
});
