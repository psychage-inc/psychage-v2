// =============================================================================
// JSON-LD Structured Data — Schema.org for provider profiles
// =============================================================================

import type { ProviderWithDetails } from './types';

/**
 * Generates JSON-LD structured data for a provider profile.
 * - Individual practitioners use @type: Physician
 * - Group practices / clinics use @type: MedicalBusiness
 *
 * Missing fields are omitted entirely (not rendered as null).
 */
export function generateProviderJsonLd(
  provider: ProviderWithDetails
): Record<string, unknown> {
  const isGroupPractice =
    provider.practice_type === 'group' ||
    provider.practice_type === 'clinic' ||
    provider.practice_type === 'hospital';

  const fullName = provider.credentials_suffix
    ? `${provider.display_name}, ${provider.credentials_suffix}`
    : provider.display_name;

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isGroupPractice ? 'MedicalBusiness' : 'Physician',
    name: fullName,
    url: `https://psychage.com/providers/${provider.id}`,
  };

  if (provider.bio) base.description = provider.bio;
  if (provider.phone) base.telephone = provider.phone;
  if (provider.email) base.email = provider.email;
  if (provider.photo_url) base.image = provider.photo_url;

  const primaryLocation = provider.locations.find((l) => l.is_primary) ?? provider.locations[0];
  if (primaryLocation) {
    const address: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'US' };
    if (primaryLocation.address_line1) address.streetAddress = primaryLocation.address_line1;
    if (primaryLocation.city) address.addressLocality = primaryLocation.city;
    if (primaryLocation.state_province) address.addressRegion = primaryLocation.state_province;
    if (primaryLocation.postal_code) address.postalCode = primaryLocation.postal_code;
    base.address = address;
  }

  if (provider.taxonomy_description) {
    base.medicalSpecialty = [provider.taxonomy_description];
  }

  const treatmentApproaches = provider.specialties.filter(
    (s) => s.category === 'treatment_approach'
  );
  if (treatmentApproaches.length > 0) {
    base.availableService = treatmentApproaches.map((s) => ({
      '@type': 'MedicalTherapy',
      name: s.label,
    }));
  }

  if (provider.is_accepting_patients != null) {
    base.isAcceptingNewPatients = provider.is_accepting_patients;
  }

  if (provider.npi_number) {
    base.identifier = {
      '@type': 'PropertyValue',
      propertyID: 'NPI',
      value: provider.npi_number,
    };
  }

  return base;
}
