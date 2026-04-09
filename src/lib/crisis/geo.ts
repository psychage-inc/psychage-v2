// =============================================================================
// Crisis System — Country Geolocation Detection
// =============================================================================

const STORAGE_KEY = 'psychage_crisis_country';

/**
 * Language code to country code mapping for browser locale inference.
 * Maps primary language subtags to most likely country.
 */
const LANGUAGE_TO_COUNTRY: Record<string, string> = {
  bn: 'BD',    // Bengali → Bangladesh
  hi: 'IN',    // Hindi → India
  ja: 'JP',    // Japanese → Japan
  ko: 'KR',    // Korean → South Korea
  zh: 'CN',    // Chinese → China
  th: 'TH',    // Thai → Thailand
  vi: 'VN',    // Vietnamese → Vietnam
  sv: 'SE',    // Swedish → Sweden
  da: 'DK',    // Danish → Denmark
  fi: 'FI',    // Finnish → Finland
  nb: 'NO',    // Norwegian Bokmål → Norway
  nn: 'NO',    // Norwegian Nynorsk → Norway
  pl: 'PL',    // Polish → Poland
  cs: 'CZ',    // Czech → Czech Republic
  hu: 'HU',    // Hungarian → Hungary
  ro: 'RO',    // Romanian → Romania
  el: 'GR',    // Greek → Greece
  tr: 'TR',    // Turkish → Turkey
  he: 'IL',    // Hebrew → Israel
  ar: 'SA',    // Arabic → Saudi Arabia (default)
  fa: 'IR',    // Persian → Iran
  ur: 'PK',    // Urdu → Pakistan
  ta: 'IN',    // Tamil → India
  te: 'IN',    // Telugu → India
  ml: 'IN',    // Malayalam → India
  mr: 'IN',    // Marathi → India
  gu: 'IN',    // Gujarati → India
  kn: 'IN',    // Kannada → India
  si: 'LK',    // Sinhala → Sri Lanka
  ne: 'NP',    // Nepali → Nepal
  my: 'MM',    // Burmese → Myanmar
  km: 'KH',    // Khmer → Cambodia
  lo: 'LA',    // Lao → Laos
  ms: 'MY',    // Malay → Malaysia
  id: 'ID',    // Indonesian → Indonesia
  tl: 'PH',    // Tagalog → Philippines
  uk: 'UA',    // Ukrainian → Ukraine
  ru: 'RU',    // Russian → Russia
  bg: 'BG',    // Bulgarian → Bulgaria
  hr: 'HR',    // Croatian → Croatia
  sr: 'RS',    // Serbian → Serbia
  sk: 'SK',    // Slovak → Slovakia
  sl: 'SI',    // Slovenian → Slovenia
  et: 'EE',    // Estonian → Estonia
  lv: 'LV',    // Latvian → Latvia
  lt: 'LT',    // Lithuanian → Lithuania
  ka: 'GE',    // Georgian → Georgia
  hy: 'AM',    // Armenian → Armenia
  az: 'AZ',    // Azerbaijani → Azerbaijan
  sw: 'KE',    // Swahili → Kenya
  am: 'ET',    // Amharic → Ethiopia
  zu: 'ZA',    // Zulu → South Africa
  af: 'ZA',    // Afrikaans → South Africa
  is: 'IS',    // Icelandic → Iceland
  ga: 'IE',    // Irish → Ireland
  cy: 'GB',    // Welsh → United Kingdom
  mt: 'MT',    // Maltese → Malta
  lb: 'LU',    // Luxembourgish → Luxembourg
  sq: 'AL',    // Albanian → Albania
  mk: 'MK',    // Macedonian → North Macedonia
  bs: 'BA',    // Bosnian → Bosnia and Herzegovina
  mn: 'MN',    // Mongolian → Mongolia
};

/**
 * Infer country code from browser language string.
 * Handles formats: 'en-US', 'en-BD', 'bn', 'zh-TW', etc.
 */
function inferCountryFromLanguage(lang: string): string | null {
  if (!lang) return null;

  // Try extracting region subtag first (e.g., 'en-US' → 'US', 'pt-BR' → 'BR')
  const regionMatch = lang.match(/^[a-z]{2,3}[-_]([A-Z]{2})$/i);
  if (regionMatch) {
    const region = regionMatch[1].toUpperCase();
    const primaryLangPrefix = lang.split(/[-_]/)[0].toLowerCase();
    // For English locales, only accept major English-speaking countries
    // to avoid false positives from obscure region subtags
    const MAJOR_EN_REGIONS = new Set(['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'IN']);
    if (primaryLangPrefix === 'en' && !MAJOR_EN_REGIONS.has(region)) {
      return 'US';
    }
    return region;
  }

  // Fall back to language → country mapping
  const primaryLang = lang.split(/[-_]/)[0].toLowerCase();

  // English defaults to US (most users; avoids small-territory false positives)
  if (primaryLang === 'en') return 'US';

  return LANGUAGE_TO_COUNTRY[primaryLang] ?? null;
}

/**
 * Get the Vercel geolocation country header.
 * In production, Vercel sets this header on every request.
 * On the client side, we can read it from a meta tag if the server injects it,
 * or from a cookie/API response.
 */
function getVercelCountry(): string | null {
  if (typeof document === 'undefined') return null;

  // Check for meta tag (server can inject this)
  const meta = document.querySelector('meta[name="x-vercel-ip-country"]');
  if (meta) {
    const content = meta.getAttribute('content');
    if (content && content.length === 2) return content.toUpperCase();
  }

  return null;
}

/** Save user's country selection to localStorage */
export function saveCountryPreference(iso2: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, iso2.toUpperCase());
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
}

/** Load user's saved country preference from localStorage */
export function loadCountryPreference(): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.length === 2) return stored.toUpperCase();
  } catch {
    // localStorage unavailable
  }
  return null;
}

/** Clear saved country preference */
export function clearCountryPreference(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }
}

/**
 * Resolve the user's country using the priority chain:
 * 1. Explicit user selection (from function call)
 * 2. Stored preference (localStorage)
 * 3. Vercel geolocation header
 * 4. Browser navigator.language inference
 * 5. Safe default: 'US'
 *
 * Never returns null. Always returns a valid ISO2 country code.
 */
export function resolveCountry(options?: {
  explicit?: string;
  stored?: string;
}): string {
  // 1. Explicit user selection
  if (options?.explicit) {
    return options.explicit.toUpperCase();
  }

  // 2. Stored preference
  const stored = options?.stored ?? loadCountryPreference();
  if (stored) {
    return stored.toUpperCase();
  }

  // 3. Vercel geolocation header
  const vercelCountry = getVercelCountry();
  if (vercelCountry) {
    return vercelCountry;
  }

  // 4. Browser locale inference
  if (typeof navigator !== 'undefined' && navigator.language) {
    const inferred = inferCountryFromLanguage(navigator.language);
    if (inferred) return inferred;
  }

  // 5. Safe default
  return 'US';
}
