/**
 * GEO-LOCATION HOOK
 *
 * Determines user's country for crisis resource routing.
 * Fallback chain:
 * 1. localStorage preference (manual override)
 * 2. Vercel Edge geo headers via API
 * 3. Browser navigator.language
 * 4. "INTL" (international fallback)
 */

import { useState, useEffect, useCallback } from 'react';
import type { GeoConfidence, CrisisResource } from '../types/crisis.types';
import { fallbackResources } from '../data/fallbackResources';

interface UseGeoLocationReturn {
  countryCode: string;
  countryName: string;
  isLoading: boolean;
  confidence: GeoConfidence;
  overrideCountry: (code: string) => void;
  crisisResources: CrisisResource[];
}

const STORAGE_KEY = 'psychage_crisis_country_override';

/**
 * Extract country code from browser locale (e.g., "en-US" → "US")
 */
function getCountryFromNavigator(): string | null {
  if (typeof navigator === 'undefined') return null;

  const language = navigator.language || (navigator as any).userLanguage;
  if (!language) return null;

  // Extract country code from locale (e.g., "en-US" → "US")
  const parts = language.split('-');
  if (parts.length === 2) {
    return parts[1].toUpperCase();
  }

  // Map language-only codes to likely countries
  const languageToCountry: Record<string, string> = {
    en: 'US',
    es: 'ES',
    fr: 'FR',
    de: 'DE',
    pt: 'BR',
    it: 'IT',
    ja: 'JP',
    ko: 'KR',
    zh: 'CN',
    ar: 'SA',
    hi: 'IN',
    bn: 'BD',
  };

  return languageToCountry[parts[0]] || null;
}

/**
 * Get country name from code
 */
function getCountryName(code: string): string {
  if (code === 'INTL') return 'International';

  // Try to find in fallback resources
  const resource = fallbackResources.find((r) => r.countryCode === code);
  if (resource) return resource.countryName;

  // Fallback to code itself
  return code;
}

/**
 * Load crisis resources for a given country
 */
function loadResourcesForCountry(code: string): CrisisResource[] {
  if (code === 'INTL') {
    // Return top global resources
    return [
      fallbackResources.find((r) => r.id === 'us-988')!,
      ...fallbackResources.filter((r) => r.id === 'intl-findahelpline'),
    ].filter(Boolean);
  }

  // Filter resources by country code, sorted by rank
  const resources = fallbackResources
    .filter((r) => r.countryCode === code)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999));

  // If no resources found for this country, return international fallback
  if (resources.length === 0) {
    return loadResourcesForCountry('INTL');
  }

  return resources;
}

export function useGeoLocation(): UseGeoLocationReturn {
  const [countryCode, setCountryCode] = useState<string>('INTL');
  const [countryName, setCountryName] = useState<string>('International');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [confidence, setConfidence] = useState<GeoConfidence>('low');
  const [crisisResources, setCrisisResources] = useState<CrisisResource[]>([]);

  useEffect(() => {
    async function detectGeo() {
      try {
        // 1. Check localStorage for manual override (highest priority)
        const savedCountry = localStorage.getItem(STORAGE_KEY);
        if (savedCountry) {
          const name = getCountryName(savedCountry);
          const resources = loadResourcesForCountry(savedCountry);

          setCountryCode(savedCountry);
          setCountryName(name);
          setConfidence('manual');
          setCrisisResources(resources);
          setIsLoading(false);
          return;
        }

        // 2. Try API geo detection (Vercel Edge headers)
        try {
          const response = await fetch('/api/geo-detect');
          if (response.ok) {
            const data = await response.json();
            if (data.countryCode && data.countryCode !== 'UNKNOWN') {
              const name = data.countryName || getCountryName(data.countryCode);
              const resources = loadResourcesForCountry(data.countryCode);

              setCountryCode(data.countryCode);
              setCountryName(name);
              setConfidence('high');
              setCrisisResources(resources);
              setIsLoading(false);
              return;
            }
          }
        } catch (apiError) {
          console.warn('Geo API failed, falling back to navigator.language');
        }

        // 3. Fall back to navigator.language
        const navCountry = getCountryFromNavigator();
        if (navCountry) {
          const name = getCountryName(navCountry);
          const resources = loadResourcesForCountry(navCountry);

          setCountryCode(navCountry);
          setCountryName(name);
          setConfidence('medium');
          setCrisisResources(resources);
          setIsLoading(false);
          return;
        }

        // 4. Final fallback: International
        setCountryCode('INTL');
        setCountryName('International');
        setConfidence('low');
        setCrisisResources(loadResourcesForCountry('INTL'));
        setIsLoading(false);
      } catch (error) {
        console.error('Geo detection error:', error);

        // Error state: use international fallback
        setCountryCode('INTL');
        setCountryName('International');
        setConfidence('low');
        setCrisisResources(loadResourcesForCountry('INTL'));
        setIsLoading(false);
      }
    }

    detectGeo();
  }, []);

  const overrideCountry = useCallback((code: string) => {
    const name = getCountryName(code);
    const resources = loadResourcesForCountry(code);

    setCountryCode(code);
    setCountryName(name);
    setConfidence('manual');
    setCrisisResources(resources);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  return {
    countryCode,
    countryName,
    isLoading,
    confidence,
    overrideCountry,
    crisisResources,
  };
}
