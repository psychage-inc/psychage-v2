import { describe, it, expect } from 'vitest';
import { parseLocation, US_STATE_ABBRS, US_STATE_ABBRS_LIST } from '../locationUtils';

describe('parseLocation', () => {
  // Empty / whitespace
  it('returns empty for empty string', () => {
    expect(parseLocation('')).toEqual({});
  });

  it('returns empty for whitespace-only input', () => {
    expect(parseLocation('   ')).toEqual({});
  });

  // 2-letter state abbreviations
  it('recognizes uppercase abbreviation', () => {
    expect(parseLocation('FL')).toEqual({ state: 'FL' });
  });

  it('recognizes lowercase abbreviation', () => {
    expect(parseLocation('fl')).toEqual({ state: 'FL' });
  });

  it('handles whitespace around abbreviation', () => {
    expect(parseLocation('  FL  ')).toEqual({ state: 'FL' });
  });

  // Full state names
  it('recognizes full state name "Florida"', () => {
    expect(parseLocation('Florida')).toEqual({ state: 'FL' });
  });

  it('recognizes full state name case-insensitively', () => {
    expect(parseLocation('florida')).toEqual({ state: 'FL' });
  });

  it('recognizes multi-word state "New York"', () => {
    expect(parseLocation('New York')).toEqual({ state: 'NY' });
  });

  it('recognizes "District of Columbia"', () => {
    expect(parseLocation('District of Columbia')).toEqual({ state: 'DC' });
  });

  it('recognizes "West Virginia"', () => {
    expect(parseLocation('west virginia')).toEqual({ state: 'WV' });
  });

  // City, State format
  it('parses "Miami, FL"', () => {
    expect(parseLocation('Miami, FL')).toEqual({ city: 'Miami', state: 'FL' });
  });

  it('parses "Miami, Florida"', () => {
    expect(parseLocation('Miami, Florida')).toEqual({ city: 'Miami', state: 'FL' });
  });

  it('parses "Los Angeles, CA"', () => {
    expect(parseLocation('Los Angeles, CA')).toEqual({ city: 'Los Angeles', state: 'CA' });
  });

  it('parses "San Francisco, California"', () => {
    expect(parseLocation('San Francisco, California')).toEqual({ city: 'San Francisco', state: 'CA' });
  });

  // Ambiguous: "Florida, NY" — right side is state, left side is city
  it('parses "Florida, NY" as city=Florida, state=NY', () => {
    expect(parseLocation('Florida, NY')).toEqual({ city: 'Florida', state: 'NY' });
  });

  it('parses "New York, NY" as city=New York, state=NY', () => {
    expect(parseLocation('New York, NY')).toEqual({ city: 'New York', state: 'NY' });
  });

  // Invalid state after comma — treat entire input as city
  it('treats "Somewhere, ZZ" as city (invalid state)', () => {
    expect(parseLocation('Somewhere, ZZ')).toEqual({ city: 'Somewhere, ZZ' });
  });

  // Plain city names (not matching any state)
  it('treats "Springfield" as city', () => {
    expect(parseLocation('Springfield')).toEqual({ city: 'Springfield' });
  });

  it('treats "Miami" as city (not a state name)', () => {
    expect(parseLocation('Miami')).toEqual({ city: 'Miami' });
  });

  // Two-letter non-state strings
  it('treats "ZZ" as city (not a valid state)', () => {
    expect(parseLocation('ZZ')).toEqual({ city: 'ZZ' });
  });
});

describe('US_STATE_ABBRS', () => {
  it('contains 51 entries (50 states + DC)', () => {
    expect(US_STATE_ABBRS.size).toBe(51);
  });

  it('includes FL and NY', () => {
    expect(US_STATE_ABBRS.has('FL')).toBe(true);
    expect(US_STATE_ABBRS.has('NY')).toBe(true);
  });
});

describe('US_STATE_ABBRS_LIST', () => {
  it('is sorted alphabetically', () => {
    const sorted = [...US_STATE_ABBRS_LIST].sort();
    expect(US_STATE_ABBRS_LIST).toEqual(sorted);
  });

  it('has same length as US_STATE_ABBRS', () => {
    expect(US_STATE_ABBRS_LIST.length).toBe(US_STATE_ABBRS.size);
  });
});
