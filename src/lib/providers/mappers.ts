// =============================================================================
// Provider Directory V2 — Compatibility Mapper
// Maps new normalized ProviderWithDetails to old flat Provider type.
// Used during transition for components that still consume the V1 type.
// =============================================================================

import type { Provider } from '@/types/models';
import type { ProviderWithDetails } from './types';
import { getPrimaryLocation, formatProviderLocation } from './types';

/**
 * Convert a V2 normalized provider to the old V1 flat Provider interface.
 * This allows existing components (homepage section, admin dashboard) to
 * keep working during the migration.
 */
export function toV1Provider(provider: ProviderWithDetails): Provider {
  const primaryLocation = getPrimaryLocation(provider);

  return {
    id: provider.id,
    name: provider.display_name,
    role: provider.provider_type?.label || 'Provider',
    image: provider.photo_url || '',
    specialties: provider.specialties.map(s => s.label),
    location: formatProviderLocation(primaryLocation),
    availability: provider.is_accepting_patients ? 'Accepting Patients' : 'Not Accepting',
    insurance: provider.insurance_plans.map(i => i.name),
    verified: provider.verified_at != null || provider.status === 'verified' || provider.status === 'active',
    bio: provider.bio || '',
    education: provider.credentials_suffix ? [provider.credentials_suffix] : [],
    languages: provider.languages.map(l => l.label),
    approach: '',
    yearsExperience: 0,
    isVideoVisit: provider.telehealth_available,
    status: provider.status,
    email: provider.email || undefined,
  };
}
