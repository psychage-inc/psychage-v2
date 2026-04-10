// =============================================================================
// Location Parsing Utilities for Provider Search
// =============================================================================

/**
 * Full state name → 2-letter abbreviation (lowercase keys for case-insensitive lookup).
 */
export const US_STATE_NAME_TO_ABBR: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
  'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
  'district of columbia': 'DC', 'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI',
  'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
  'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME',
  'maryland': 'MD', 'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN',
  'mississippi': 'MS', 'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE',
  'nevada': 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM',
  'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH',
  'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI',
  'south carolina': 'SC', 'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX',
  'utah': 'UT', 'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA',
  'west virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY',
};

/** Set of valid 2-letter state abbreviations (uppercase). */
export const US_STATE_ABBRS = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]);

/** Sorted array of abbreviations for dropdown menus. */
export const US_STATE_ABBRS_LIST = [...US_STATE_ABBRS].sort();

/**
 * Resolves a string to a state abbreviation if it's a valid abbreviation or full state name.
 * Returns undefined if not recognized.
 */
function resolveState(input: string): string | undefined {
  const trimmed = input.trim();
  const upper = trimmed.toUpperCase();
  if (trimmed.length === 2 && US_STATE_ABBRS.has(upper)) {
    return upper;
  }
  return US_STATE_NAME_TO_ABBR[trimmed.toLowerCase()];
}

/**
 * Parses a free-text location input into structured { city, state } fields.
 *
 * Examples:
 *   "FL"           → { state: "FL" }
 *   "Florida"      → { state: "FL" }
 *   "Miami, FL"    → { city: "Miami", state: "FL" }
 *   "Florida, NY"  → { city: "Florida", state: "NY" }
 *   "Springfield"  → { city: "Springfield" }
 *   ""             → {}
 */
export function parseLocation(input: string): { city?: string; state?: string } {
  const trimmed = input.trim();
  if (!trimmed) return {};

  // Check for comma-separated "City, State" format
  const lastComma = trimmed.lastIndexOf(',');
  if (lastComma !== -1) {
    const right = trimmed.slice(lastComma + 1).trim();
    const left = trimmed.slice(0, lastComma).trim();

    const stateAbbr = resolveState(right);
    if (stateAbbr && left) {
      return { city: left, state: stateAbbr };
    }
    // Right side isn't a valid state — treat entire input as city
    return { city: trimmed };
  }

  // No comma — check if the entire input is a state
  const stateAbbr = resolveState(trimmed);
  if (stateAbbr) {
    return { state: stateAbbr };
  }

  // Default: treat as city name
  return { city: trimmed };
}
