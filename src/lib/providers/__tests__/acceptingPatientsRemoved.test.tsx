import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// "Accepting patients" was hard-coded true by every importer, so it is no
// longer shown, filtered on, or published anywhere.

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

vi.mock('@/lib/providers/queries', () => ({ searchProviders: vi.fn(() => new Promise(() => {})) }));

import { generateProviderJsonLd } from '../jsonLd';
import { ProviderCard } from '@/components/providers/cards/ProviderCard';
import { useProviderSearch } from '@/hooks/useProviderSearch';
import type { ProviderCardData, ProviderWithDetails } from '../types';

const card = (overrides: Record<string, unknown> = {}) =>
  ({
    id: 'p1',
    display_name: 'Amy Example',
    credentials_suffix: 'PhD',
    bio: null,
    photo_url: null,
    status: 'seeded',
    tier: 'free',
    practice_name: null,
    phone: null,
    email: null,
    website_url: null,
    appointment_url: null,
    npi_number: '1234567890',
    telehealth_available: false,
    in_person_available: true,
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
    ...overrides,
  }) as unknown as ProviderCardData;

describe('accepting-patients is removed from every web surface', () => {
  it('JSON-LD never includes isAcceptingNewPatients, even if the row still has a value', () => {
    const provider = {
      ...card({ is_accepting_patients: true }),
      locations: [],
      specialties: [],
      languages: [],
      cultural_competencies: [],
      insurance_plans: [],
      treatment_approaches: [],
    } as unknown as ProviderWithDetails;
    expect(generateProviderJsonLd(provider)).not.toHaveProperty('isAcceptingNewPatients');
  });

  it.each([true, false, null])('ProviderCard shows no accepting label when the value is %s', (value) => {
    render(
      <MemoryRouter>
        <ProviderCard provider={card({ is_accepting_patients: value })} />
      </MemoryRouter>,
    );
    expect(screen.queryByText('providers.card.accepting')).toBeNull();
    expect(screen.queryByText('providers.card.not_accepting')).toBeNull();
  });

  it('ignores a stale ?accepting=true URL param', () => {
    const client = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/find-care?accepting=true']}>{children}</MemoryRouter>
      </QueryClientProvider>
    );
    const { result } = renderHook(() => useProviderSearch(), { wrapper });
    expect(result.current.params).not.toHaveProperty('accepting_patients');
  });
});
