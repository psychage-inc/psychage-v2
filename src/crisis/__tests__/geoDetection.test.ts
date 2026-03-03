/**
 * GEO-DETECTION TESTS
 *
 * Tests fallback chain and resource loading.
 */

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useGeoLocation } from '../hooks/useGeoLocation';

describe('Geo Detection', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset fetch mock
    global.fetch = vi.fn();
  });

  test('Uses localStorage override when available', async () => {
    localStorage.setItem('psychage_crisis_country_override', 'GB');

    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countryCode).toBe('GB');
    expect(result.current.countryName).toBe('United Kingdom');
    expect(result.current.confidence).toBe('manual');
    expect(result.current.crisisResources.length).toBeGreaterThan(0);
  });

  test('Falls back to API when no localStorage', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ countryCode: 'CA', countryName: 'Canada' }),
    });

    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countryCode).toBe('CA');
    expect(result.current.confidence).toBe('high');
  });

  test('Falls back to navigator.language when API fails', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('API failed'));

    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });

    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countryCode).toBe('US');
    expect(result.current.confidence).toBe('medium');
  });

  test('Returns INTL for unknown countries', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ countryCode: 'UNKNOWN' }),
    });

    Object.defineProperty(navigator, 'language', {
      value: 'xx',
      configurable: true,
    });

    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countryCode).toBe('INTL');
    expect(result.current.countryName).toBe('International');
    expect(result.current.confidence).toBe('low');
  });

  test('Handles all detection failures gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    Object.defineProperty(navigator, 'language', {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.countryCode).toBe('INTL');
    expect(result.current.crisisResources.length).toBeGreaterThan(0);
  });

  test('overrideCountry saves to localStorage', async () => {
    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.overrideCountry('AU');
    });

    await waitFor(() => {
      expect(result.current.countryCode).toBe('AU');
    });

    expect(result.current.countryName).toBe('Australia');
    expect(result.current.confidence).toBe('manual');
    expect(localStorage.getItem('psychage_crisis_country_override')).toBe('AU');
  });

  test('Loads appropriate resources for each country', async () => {
    const { result } = renderHook(() => useGeoLocation());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.overrideCountry('US');
    });

    await waitFor(() => {
      expect(result.current.crisisResources.some(r => r.organizationName.includes('988'))).toBe(true);
    });

    act(() => {
      result.current.overrideCountry('GB');
    });

    await waitFor(() => {
      expect(result.current.crisisResources.some(r => r.organizationName.includes('Samaritans'))).toBe(true);
    });

    act(() => {
      result.current.overrideCountry('CA');
    });

    await waitFor(() => {
      expect(result.current.crisisResources.some(r => r.organizationName.includes('Talk Suicide'))).toBe(true);
    });
  });
});
