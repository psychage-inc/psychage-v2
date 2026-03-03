/**
 * SAFETY PLAN TESTS
 *
 * Tests safety plan creation, storage, and security.
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSafetyPlan } from '../hooks/useSafetyPlan';
import { encryptSafetyPlan, decryptSafetyPlan } from '../lib/encryptionUtils';
import type { SafetyPlanContent } from '../types/crisis.types';

const mockSafetyPlanContent: SafetyPlanContent = {
  warningSignals: ['Feeling isolated', 'Difficulty sleeping'],
  copingStrategies: ['Go for a walk', 'Listen to music'],
  socialContacts: [
    { name: 'John Doe', phone: '555-0100', relationship: 'Friend' },
    { name: 'Jane Smith', phone: '555-0101', relationship: 'Sister' },
  ],
  professionalResources: [
    { name: 'Dr. Smith', phone: '555-0200', type: 'therapist' },
  ],
  environmentSafety: ['Remove harmful objects', 'Avoid alcohol'],
  reasonsForLiving: ['My family', 'My dog', 'Future goals'],
};

describe('Safety Plan Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Initializes with no plan', async () => {
    const { result } = renderHook(() => useSafetyPlan());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.plan).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('Saves safety plan to localStorage', async () => {
    const { result } = renderHook(() => useSafetyPlan());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.savePlan(mockSafetyPlanContent);
    });

    expect(result.current.plan).not.toBeNull();
    expect(result.current.plan?.content).toEqual(mockSafetyPlanContent);

    const stored = localStorage.getItem('psychage_safety_plan');
    expect(stored).not.toBeNull();
  });

  test('Loads existing safety plan from localStorage', async () => {
    const existingPlan = {
      id: 'test-id',
      content: mockSafetyPlanContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    localStorage.setItem('psychage_safety_plan', JSON.stringify(existingPlan));

    const { result } = renderHook(() => useSafetyPlan());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.plan).not.toBeNull();
    expect(result.current.plan?.id).toBe('test-id');
  });

  test('Deletes safety plan', async () => {
    const { result } = renderHook(() => useSafetyPlan());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.savePlan(mockSafetyPlanContent);
    });

    await act(async () => {
      await result.current.deletePlan();
    });

    expect(result.current.plan).toBeNull();
    expect(localStorage.getItem('psychage_safety_plan')).toBeNull();
  });
});

describe('Safety Plan Encryption', () => {
  test('Encrypted content is not human-readable', async () => {
    const userToken = 'test-user-token-12345';
    const { encryptedContent, iv } = await encryptSafetyPlan(mockSafetyPlanContent, userToken);

    // Encrypted content should not contain any plain text from the original
    expect(encryptedContent).not.toContain('John Doe');
    expect(encryptedContent).not.toContain('Feeling isolated');
    expect(encryptedContent).not.toContain('My family');

    // Should be base64 encoded
    expect(encryptedContent).toMatch(/^[A-Za-z0-9+/=]+$/);
    expect(iv).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  test('Decrypted content matches original input exactly', async () => {
    const userToken = 'test-user-token-12345';
    const { encryptedContent, iv } = await encryptSafetyPlan(mockSafetyPlanContent, userToken);

    const decrypted = await decryptSafetyPlan(encryptedContent, iv, userToken);

    expect(decrypted).toEqual(mockSafetyPlanContent);
    expect(decrypted.warningSignals).toEqual(mockSafetyPlanContent.warningSignals);
    expect(decrypted.socialContacts).toEqual(mockSafetyPlanContent.socialContacts);
  });

  test('Cannot decrypt without correct user token', async () => {
    const userToken = 'correct-token';
    const wrongToken = 'wrong-token';

    const { encryptedContent, iv } = await encryptSafetyPlan(mockSafetyPlanContent, userToken);

    // Attempting to decrypt with wrong token should fail
    await expect(
      decryptSafetyPlan(encryptedContent, iv, wrongToken)
    ).rejects.toThrow();
  });

  test('Each encryption produces different ciphertext (random IV)', async () => {
    const userToken = 'test-token';

    const { encryptedContent: encrypted1, iv: iv1 } = await encryptSafetyPlan(mockSafetyPlanContent, userToken);
    const { encryptedContent: encrypted2, iv: iv2 } = await encryptSafetyPlan(mockSafetyPlanContent, userToken);

    // Same content encrypted twice should produce different ciphertext
    expect(encrypted1).not.toBe(encrypted2);
    expect(iv1).not.toBe(iv2);

    // But both should decrypt to the same content
    const decrypted1 = await decryptSafetyPlan(encrypted1, iv1, userToken);
    const decrypted2 = await decryptSafetyPlan(encrypted2, iv2, userToken);
    expect(decrypted1).toEqual(decrypted2);
  });
});
