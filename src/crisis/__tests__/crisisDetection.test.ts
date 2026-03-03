/**
 * CRISIS DETECTION TESTS
 *
 * Tests detection accuracy, performance, and false-positive prevention.
 * All tests must pass before deployment.
 */

import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCrisisDetection } from '../hooks/useCrisisDetection';

describe('Crisis Detection', () => {
  test('Detects Tier 3 in English: "I want to kill myself"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('I want to kill myself');

    expect(detection.tier).toBe(3);
    expect(detection.shouldShowEmergencyModal).toBe(true);
    expect(detection.matchedKeywords.length).toBeGreaterThan(0);
    expect(detection.matchedKeywords).toContain('kill myself');
  });

  test('Detects Tier 3 in Spanish: "quiero suicidarme"', () => {
    const { result } = renderHook(() => useCrisisDetection('es'));
    const detection = result.current.detect('quiero suicidarme');

    expect(detection.tier).toBe(3);
    expect(detection.shouldShowEmergencyModal).toBe(true);
    expect(detection.matchedKeywords.length).toBeGreaterThan(0);
    expect(detection.matchedKeywords).toContain('suicidarme');
  });

  test('Detects Tier 3 in Bangla: "আত্মহত্যা করতে চাই"', () => {
    const { result } = renderHook(() => useCrisisDetection('bn'));
    const detection = result.current.detect('আত্মহত্যা করতে চাই');

    expect(detection.tier).toBe(3);
    expect(detection.shouldShowEmergencyModal).toBe(true);
    expect(detection.matchedKeywords.length).toBeGreaterThan(0);
    expect(detection.matchedKeywords).toContain('আত্মহত্যা');
  });

  test('Detects Tier 3 in French: "je veux mourir"', () => {
    const { result } = renderHook(() => useCrisisDetection('fr'));
    const detection = result.current.detect('je veux mourir');

    expect(detection.tier).toBe(3);
    expect(detection.shouldShowEmergencyModal).toBe(true);
    expect(detection.matchedKeywords.length).toBeGreaterThan(0);
    expect(detection.matchedKeywords).toContain('veux mourir');
  });

  test('Does NOT false-positive on: "I could kill for a coffee right now"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('I could kill for a coffee right now');

    expect(detection.tier).toBe(0);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.shouldShowCrisisBanner).toBe(false);
  });

  test('Does NOT false-positive on: "I died laughing"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('I died laughing');

    expect(detection.tier).toBe(0);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.shouldShowCrisisBanner).toBe(false);
  });

  test('Does NOT false-positive on: "my business is dying"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('my business is dying');

    expect(detection.tier).toBe(0);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.shouldShowCrisisBanner).toBe(false);
  });

  test('Detects Tier 2: "I feel completely hopeless"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('I feel completely hopeless');

    expect(detection.tier).toBe(2);
    expect(detection.shouldShowCrisisBanner).toBe(true);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.matchedKeywords).toContain('hopeless');
  });

  test('Detects Tier 1: "I have been feeling really anxious"', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('I have been feeling really anxious');

    expect(detection.tier).toBe(1);
    expect(detection.shouldShowGentleCheckin).toBe(true);
    expect(detection.shouldShowCrisisBanner).toBe(false);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.matchedKeywords).toContain('anxious');
  });

  test('Returns Tier 0 for neutral text', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('What are the symptoms of depression?');

    expect(detection.tier).toBe(0);
    expect(detection.shouldShowGentleCheckin).toBe(false);
    expect(detection.shouldShowCrisisBanner).toBe(false);
    expect(detection.shouldShowEmergencyModal).toBe(false);
    expect(detection.matchedKeywords.length).toBe(0);
  });

  test('Completes detection in under 50ms for any input', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));

    const testInputs = [
      'I want to kill myself',
      'I feel hopeless and worthless, nobody cares about me',
      'I have been feeling sad and anxious lately',
      'What are the symptoms of PTSD?',
      'A'.repeat(1000), // Long input
    ];

    testInputs.forEach(input => {
      const start = performance.now();
      result.current.detect(input);
      const elapsed = performance.now() - start;

      expect(elapsed).toBeLessThan(50);
    });
  });

  test('Handles empty input gracefully', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));
    const detection = result.current.detect('');

    expect(detection.tier).toBe(0);
    expect(detection.matchedKeywords.length).toBe(0);
  });

  test('Reset function clears last result', () => {
    const { result } = renderHook(() => useCrisisDetection('en'));

    act(() => {
      result.current.detect('I feel anxious');
    });
    expect(result.current.lastResult).not.toBeNull();

    act(() => {
      result.current.reset();
    });
    expect(result.current.lastResult).toBeNull();
  });
});
