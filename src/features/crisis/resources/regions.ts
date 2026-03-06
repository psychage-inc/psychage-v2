import type { CountryResources, CrisisLine } from '../types';
import { getResourcesForCountry, COUNTRY_DATABASE } from '@/lib/crisis';
import type { CrisisResource as CanonicalResource } from '@/lib/crisis';

/**
 * Convert a canonical CrisisResource to the legacy CrisisLine format
 * used by CrisisSupportModalContent and other existing components.
 */
function toLine(r: CanonicalResource): CrisisLine {
  return {
    name: r.name,
    num: r.phone,
    chat: r.chat_url != null,
    text: r.text_instruction ?? undefined,
    available: r.hours,
    languages: r.languages.length > 0 ? r.languages : undefined,
  };
}

/** International fallback for unrecognized regions */
export const INTERNATIONAL_FALLBACK: CountryResources = {
  name: 'International',
  flag: '\u{1F30D}',
  region: 'Global',
  emergency: '112',
  lines: [
    { name: 'Find A Helpline', num: null, chat: true, available: 'Global directory' },
    { name: 'Befrienders Worldwide', num: null, available: 'Global directory' },
    { name: 'IASP Crisis Centers', num: null, available: 'Global directory' },
  ],
};

// Legacy export kept for backwards compatibility
export const CRISIS_RESOURCES: Record<string, CountryResources> = {};

/**
 * Get crisis resources for a country code.
 * Delegates to the canonical engine and converts to legacy format.
 */
export function getResourcesForRegion(countryCode?: string): CountryResources {
  if (!countryCode) {
    return getResourcesForRegion('US');
  }

  const upper = countryCode.toUpperCase();
  const entry = COUNTRY_DATABASE[upper];

  if (!entry) {
    return INTERNATIONAL_FALLBACK;
  }

  const result = getResourcesForCountry(upper);
  const lines = result.all_resources
    .filter((r) => r.phone !== null || r.text_instruction !== null || r.chat_url !== null)
    .map(toLine);

  return {
    name: entry.country_name,
    flag: '',
    region: entry.region,
    emergency: entry.emergency_number,
    lines: lines.length > 0 ? lines : INTERNATIONAL_FALLBACK.lines,
  };
}
