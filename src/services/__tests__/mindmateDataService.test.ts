import { describe, it, expect, vi, beforeEach } from 'vitest';

const rpc = vi.fn();
vi.mock('@/lib/supabaseClient', () => ({ supabase: { rpc: (...a: unknown[]) => rpc(...a) } }));

import {
  getMindMateConsentStatus,
  hasActiveMindMateConsent,
  grantMindMateConsent,
  withdrawMindMateConsent,
  deleteAllMindMateConversations,
  MINDMATE_HISTORY_KEY,
  MINDMATE_SESSION_KEY,
} from '../mindmateDataService';

describe('mindmateDataService', () => {
  beforeEach(() => {
    rpc.mockReset();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('status reads mindmate_consent_status', async () => {
    rpc.mockResolvedValue({ data: 'outdated', error: null });
    await expect(getMindMateConsentStatus()).resolves.toBe('outdated');
    expect(rpc).toHaveBeenCalledWith('mindmate_consent_status');
  });

  it('status throws on an error or an unexpected value', async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: 'nope' } });
    await expect(getMindMateConsentStatus()).rejects.toThrow('nope');
    rpc.mockResolvedValueOnce({ data: 'maybe', error: null });
    await expect(getMindMateConsentStatus()).rejects.toThrow('Unexpected');
  });

  it('consent is active only at the current version', async () => {
    rpc.mockResolvedValueOnce({ data: 'current', error: null });
    await expect(hasActiveMindMateConsent()).resolves.toBe(true);
    rpc.mockResolvedValueOnce({ data: 'outdated', error: null });
    await expect(hasActiveMindMateConsent()).resolves.toBe(false);
    rpc.mockResolvedValueOnce({ data: 'none', error: null });
    await expect(hasActiveMindMateConsent()).resolves.toBe(false);
  });

  it('grant records the text version shown and the app version', async () => {
    rpc.mockResolvedValue({ error: null });
    await grantMindMateConsent();
    expect(rpc).toHaveBeenCalledWith('grant_mindmate_consent', {
      p_version: 'mm-consent-v1',
      p_app_version: expect.stringMatching(/^web-\d+\.\d+\.\d+/),
    });
  });

  it('grant throws when the server rejects it', async () => {
    rpc.mockResolvedValue({ error: { message: 'not the current version' } });
    await expect(grantMindMateConsent()).rejects.toThrow('not the current version');
  });

  it('withdraw calls withdraw_mindmate_consent', async () => {
    rpc.mockResolvedValue({ error: null });
    await withdrawMindMateConsent();
    expect(rpc).toHaveBeenCalledWith('withdraw_mindmate_consent');
  });

  it('withdraw throws when the server rejects it', async () => {
    rpc.mockResolvedValue({ error: { message: 'denied' } });
    await expect(withdrawMindMateConsent()).rejects.toThrow('denied');
  });

  it('delete calls delete_mindmate_conversations and clears the browser copies', async () => {
    rpc.mockResolvedValue({ error: null });
    localStorage.setItem(MINDMATE_HISTORY_KEY, '[]');
    sessionStorage.setItem(MINDMATE_SESSION_KEY, 's1');
    await deleteAllMindMateConversations();
    expect(rpc).toHaveBeenCalledWith('delete_mindmate_conversations');
    expect(localStorage.getItem(MINDMATE_HISTORY_KEY)).toBeNull();
    expect(sessionStorage.getItem(MINDMATE_SESSION_KEY)).toBeNull();
  });

  it('delete throws and keeps the browser copy when the server fails', async () => {
    rpc.mockResolvedValue({ error: { message: 'boom' } });
    localStorage.setItem(MINDMATE_HISTORY_KEY, '[]');
    await expect(deleteAllMindMateConversations()).rejects.toThrow('boom');
    expect(localStorage.getItem(MINDMATE_HISTORY_KEY)).toBe('[]');
  });
});
