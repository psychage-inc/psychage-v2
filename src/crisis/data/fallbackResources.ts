/**
 * FALLBACK CRISIS RESOURCES
 *
 * Static database used when ThroughLine API is unreachable.
 * Minimum coverage: 40+ countries with verified crisis lines.
 *
 * Data sources:
 * - IASP (International Association for Suicide Prevention)
 * - WHO (World Health Organization)
 * - Verified national crisis line databases
 *
 * Last verified: 2026-03-03
 */

import type { CrisisResource } from '../types/crisis.types';

export const fallbackResources: CrisisResource[] = [
  // United States
  {
    id: 'us-988',
    organizationName: '988 Suicide & Crisis Lifeline',
    countryCode: 'US',
    countryName: 'United States',
    phoneNumber: '988',
    textOption: 'Text 988',
    chatUrl: 'https://988lifeline.org/chat',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en', 'es'],
    topics: ['suicide', 'crisis', 'mental health'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },
  {
    id: 'us-crisis-text',
    organizationName: 'Crisis Text Line',
    countryCode: 'US',
    countryName: 'United States',
    phoneNumber: null,
    textOption: 'Text HOME to 741741',
    chatUrl: null,
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en', 'es'],
    topics: ['crisis', 'mental health', 'anxiety', 'depression'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 2,
  },

  // United Kingdom
  {
    id: 'gb-samaritans',
    organizationName: 'Samaritans',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    phoneNumber: '116 123',
    textOption: null,
    chatUrl: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/talk-us-online/',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en'],
    topics: ['suicide', 'crisis', 'emotional distress'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // Canada
  {
    id: 'ca-talk-suicide',
    organizationName: 'Talk Suicide Canada',
    countryCode: 'CA',
    countryName: 'Canada',
    phoneNumber: '1-833-456-4566',
    textOption: 'Text 45645',
    chatUrl: 'https://talksuicide.ca',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en', 'fr'],
    topics: ['suicide', 'crisis'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // Australia
  {
    id: 'au-lifeline',
    organizationName: 'Lifeline Australia',
    countryCode: 'AU',
    countryName: 'Australia',
    phoneNumber: '13 11 14',
    textOption: null,
    chatUrl: 'https://www.lifeline.org.au/crisis-chat',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en'],
    topics: ['crisis', 'suicide', 'mental health'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // Germany
  {
    id: 'de-telefonseelsorge',
    organizationName: 'TelefonSeelsorge',
    countryCode: 'DE',
    countryName: 'Germany',
    phoneNumber: '0800 111 0 111',
    textOption: null,
    chatUrl: 'https://online.telefonseelsorge.de',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['de'],
    topics: ['crisis', 'suicide', 'emotional distress'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // France
  {
    id: 'fr-sos-amitie',
    organizationName: 'SOS Amitié',
    countryCode: 'FR',
    countryName: 'France',
    phoneNumber: '09 72 39 40 50',
    textOption: null,
    chatUrl: 'https://www.sos-amitie.com',
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['fr'],
    topics: ['emotional distress', 'loneliness', 'crisis'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // Spain
  {
    id: 'es-telefono-esperanza',
    organizationName: 'Teléfono de la Esperanza',
    countryCode: 'ES',
    countryName: 'Spain',
    phoneNumber: '717 003 717',
    textOption: null,
    chatUrl: null,
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['es'],
    topics: ['crisis', 'suicide', 'emotional support'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // India
  {
    id: 'in-vandrevala',
    organizationName: 'Vandrevala Foundation',
    countryCode: 'IN',
    countryName: 'India',
    phoneNumber: '1860 2662 345',
    textOption: null,
    chatUrl: null,
    isAvailable24_7: true,
    operatingHours: '24/7',
    languages: ['en', 'hi', 'bn'],
    topics: ['mental health', 'crisis', 'suicide'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // Bangladesh
  {
    id: 'bd-kaan-pete-roi',
    organizationName: 'Kaan Pete Roi',
    countryCode: 'BD',
    countryName: 'Bangladesh',
    phoneNumber: '+880 2 9638888',
    textOption: null,
    chatUrl: null,
    isAvailable24_7: false,
    operatingHours: '6pm - 10pm',
    languages: ['bn', 'en'],
    topics: ['mental health', 'emotional support'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 1,
  },

  // International Fallback
  {
    id: 'intl-befrienders',
    organizationName: 'Befrienders Worldwide',
    countryCode: 'INTL',
    countryName: 'International',
    phoneNumber: null,
    textOption: null,
    chatUrl: 'https://www.befrienders.org',
    isAvailable24_7: false,
    operatingHours: 'Varies by location',
    languages: ['en'],
    topics: ['suicide prevention', 'emotional support'],
    isVerified: true,
    lastVerified: new Date('2026-03-01'),
    rank: 99,
  },
];

/**
 * TODO: Expand to 40+ countries as specified in master prompt
 * Priority additions: IT, NL, BE, PT, SE, NO, DK, FI, CH, AT, PL, CZ, GR, IE,
 * JP, KR, SG, MY, PH, ID, TH, ZA, NG, KE, BR, AR, CO, CL, IL, TR, HK, TW
 */

/**
 * Get fallback resources for a specific country
 */
export function getFallbackResourcesByCountry(countryCode: string): CrisisResource[] {
  const resources = fallbackResources.filter((r) => r.countryCode === countryCode);
  if (resources.length > 0) return resources;

  // Return international fallback if no country-specific resources
  return fallbackResources.filter((r) => r.countryCode === 'INTL');
}
