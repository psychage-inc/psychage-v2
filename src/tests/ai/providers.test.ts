// =============================================================================
// Provider Search Tests
// =============================================================================

import { describe, it, expect } from 'vitest';
import {
  extractProviderCriteria,
  formatProviderSuggestion,
} from '@/lib/ai/providers';
import type { ProviderSuggestion, ProviderResult } from '@/lib/ai/types';

// =============================================================================
// Criteria Extraction Tests
// =============================================================================

describe('Provider Criteria Extraction', () => {
  it('should extract location from entities', () => {
    const criteria = extractProviderCriteria('Find a therapist in London', {
      location: 'London',
      providerType: 'therapist',
    });

    expect(criteria.location).toBe('London');
    expect(criteria.providerType).toBe('therapist');
  });

  it('should detect telehealth from query text', () => {
    const criteria = extractProviderCriteria(
      'I need an online therapist for depression',
      { providerType: 'therapist', conditions: ['depression'] }
    );

    expect(criteria.telehealth).toBe(true);
    expect(criteria.specialty).toBe('depression');
  });

  it('should extract Spanish-speaking preference', () => {
    const criteria = extractProviderCriteria(
      'I need a Spanish-speaking psychiatrist',
      { providerType: 'psychiatrist' }
    );

    expect(criteria.language).toBe('es');
    expect(criteria.providerType).toBe('psychiatrist');
  });

  it('should extract French-speaking preference', () => {
    const criteria = extractProviderCriteria(
      'Find a French-speaking counselor',
      { providerType: 'counselor' }
    );

    expect(criteria.language).toBe('fr');
  });

  it('should handle virtual/remote keywords', () => {
    const keywords = ['online', 'telehealth', 'virtual', 'remote', 'video'];

    for (const keyword of keywords) {
      const criteria = extractProviderCriteria(
        `I want a ${keyword} therapist`,
        { providerType: 'therapist' }
      );
      expect(criteria.telehealth).toBe(true);
    }
  });

  it('should extract condition as specialty', () => {
    const criteria = extractProviderCriteria(
      'I need help with my PTSD',
      { conditions: ['ptsd'] }
    );

    expect(criteria.specialty).toBe('ptsd');
  });
});

// =============================================================================
// Response Formatting Tests
// =============================================================================

describe('Provider Suggestion Formatting', () => {
  it('should format provider results correctly', () => {
    const suggestion: ProviderSuggestion = {
      providers: [
        createMockProvider({
          name: 'Dr. Sarah Chen',
          credentials: 'Ph.D., Licensed Clinical Psychologist',
          providerType: 'psychologist',
          specialties: ['depression', 'anxiety'],
          city: 'New York',
          country: 'US',
          telehealthAvailable: true,
          languages: ['en', 'zh'],
          isVerified: true,
        }),
      ],
      searchCriteria: { location: 'New York' },
      totalMatches: 3,
    };

    const formatted = formatProviderSuggestion(suggestion);

    expect(formatted).toContain('Dr. Sarah Chen');
    expect(formatted).toContain('Ph.D.');
    expect(formatted).toContain('Psychologist');
    expect(formatted).toContain('depression');
    expect(formatted).toContain('Telehealth available');
    expect(formatted).toContain('[Find Care](/providers)');
  });

  it('should handle empty results', () => {
    const suggestion: ProviderSuggestion = {
      providers: [],
      searchCriteria: { location: 'Timbuktu' },
      totalMatches: 0,
    };

    const formatted = formatProviderSuggestion(suggestion);
    expect(formatted).toContain('wasn\'t able to find');
    expect(formatted).toContain('[Find Care](/providers)');
  });

  it('should show total matches count', () => {
    const suggestion: ProviderSuggestion = {
      providers: [
        createMockProvider({ name: 'Dr. A' }),
        createMockProvider({ name: 'Dr. B' }),
      ],
      searchCriteria: {},
      totalMatches: 15,
    };

    const formatted = formatProviderSuggestion(suggestion);
    expect(formatted).toContain('15 providers');
  });

  it('should show languages for multilingual providers', () => {
    const suggestion: ProviderSuggestion = {
      providers: [
        createMockProvider({
          name: 'Dra. Costa',
          languages: ['pt', 'en', 'es'],
        }),
      ],
      searchCriteria: {},
      totalMatches: 1,
    };

    const formatted = formatProviderSuggestion(suggestion);
    expect(formatted).toContain('Languages:');
    expect(formatted).toContain('pt');
  });
});

// =============================================================================
// Helpers
// =============================================================================

function createMockProvider(
  overrides: Partial<ProviderResult> = {}
): ProviderResult {
  return {
    id: crypto.randomUUID(),
    name: 'Dr. Test Provider',
    credentials: 'Ph.D.',
    providerType: 'psychologist',
    specialties: ['depression'],
    city: 'Test City',
    state: null,
    country: 'US',
    telehealthAvailable: false,
    languages: ['en'],
    bio: 'Test bio',
    website: null,
    isVerified: true,
    listingTier: 'basic',
    ...overrides,
  };
}
