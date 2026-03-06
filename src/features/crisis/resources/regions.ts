import type { CountryResources } from '../types';

/**
 * Comprehensive global crisis resource database.
 * Subset of verified resources — production should integrate ThroughLine API
 * for the full 1,300+ helpline directory.
 */
export const CRISIS_RESOURCES: Record<string, CountryResources> = {
  US: {
    name: 'United States',
    flag: '\u{1F1FA}\u{1F1F8}',
    region: 'North America',
    emergency: '911',
    lines: [
      { name: '988 Suicide & Crisis Lifeline', num: '988', chat: true, text: 'Text HOME to 741741', available: '24/7', languages: ['EN', 'ES'] },
      { name: 'Crisis Text Line', num: null, text: 'Text HOME to 741741', available: '24/7' },
      { name: 'Trevor Project (LGBTQ+)', num: '1-866-488-7386', available: '24/7' },
    ],
  },
  CA: {
    name: 'Canada',
    flag: '\u{1F1E8}\u{1F1E6}',
    region: 'North America',
    emergency: '911',
    lines: [
      { name: 'Talk Suicide Canada', num: '988', chat: true, available: '24/7' },
      { name: 'Crisis Services Canada', num: '1-833-456-4566', text: 'Text 45645', available: '24/7' },
    ],
  },
  GB: {
    name: 'United Kingdom',
    flag: '\u{1F1EC}\u{1F1E7}',
    region: 'Europe',
    emergency: '999',
    lines: [
      { name: 'Samaritans', num: '116 123', available: '24/7' },
      { name: 'SHOUT Crisis Text Line', num: null, text: 'Text SHOUT to 85258', available: '24/7' },
    ],
  },
  DE: {
    name: 'Germany',
    flag: '\u{1F1E9}\u{1F1EA}',
    region: 'Europe',
    emergency: '112',
    lines: [
      { name: 'Telefonseelsorge', num: '0800 111 0 111', available: '24/7' },
    ],
  },
  FR: {
    name: 'France',
    flag: '\u{1F1EB}\u{1F1F7}',
    region: 'Europe',
    emergency: '15',
    lines: [
      { name: 'Num\u00e9ro National Pr\u00e9vention Suicide', num: '3114', chat: true, available: '24/7' },
    ],
  },
  AU: {
    name: 'Australia',
    flag: '\u{1F1E6}\u{1F1FA}',
    region: 'Asia-Pacific',
    emergency: '000',
    lines: [
      { name: 'Lifeline Australia', num: '13 11 14', chat: true, available: '24/7' },
      { name: 'Beyond Blue', num: '1300 22 4636', chat: true, available: '24/7' },
    ],
  },
  IN: {
    name: 'India',
    flag: '\u{1F1EE}\u{1F1F3}',
    region: 'Asia-Pacific',
    emergency: '112',
    lines: [
      { name: 'iCall', num: '9152987821', available: 'Mon-Sat' },
      { name: 'Vandrevala Foundation', num: '1860-2662-345', available: '24/7' },
    ],
  },
  NG: {
    name: 'Nigeria',
    flag: '\u{1F1F3}\u{1F1EC}',
    region: 'Africa',
    emergency: '199',
    lines: [
      { name: 'Suicide Prevention Initiative Nigeria', num: '234-703-593-8000', available: '24/7' },
    ],
  },
  ZA: {
    name: 'South Africa',
    flag: '\u{1F1FF}\u{1F1E6}',
    region: 'Africa',
    emergency: '10111',
    lines: [
      { name: 'SADAG', num: '0800 456 789', available: '24/7' },
    ],
  },
  BR: {
    name: 'Brazil',
    flag: '\u{1F1E7}\u{1F1F7}',
    region: 'Latin America',
    emergency: '192',
    lines: [
      { name: 'CVV - Centro de Valoriza\u00e7\u00e3o da Vida', num: '188', chat: true, available: '24/7' },
    ],
  },
  JP: {
    name: 'Japan',
    flag: '\u{1F1EF}\u{1F1F5}',
    region: 'Asia-Pacific',
    emergency: '110',
    lines: [
      { name: 'Inochi no Denwa', num: '0120-783-556', available: '24/7' },
    ],
  },
};

/** International fallback for unrecognized regions */
export const INTERNATIONAL_FALLBACK: CountryResources = {
  name: 'International',
  flag: '\u{1F30D}',
  region: 'Global',
  emergency: '112',
  lines: [
    { name: 'Befrienders Worldwide', num: null, chat: true, available: 'Global directory' },
    { name: 'IASP Crisis Centers', num: null, available: 'Global directory' },
  ],
};

/**
 * Get crisis resources for a country code.
 * Falls back to international directory if country not found.
 */
export function getResourcesForRegion(countryCode?: string): CountryResources {
  if (!countryCode) return CRISIS_RESOURCES.US;
  const upper = countryCode.toUpperCase();
  return CRISIS_RESOURCES[upper] ?? INTERNATIONAL_FALLBACK;
}
