import { describe, it, expect, vi, beforeEach } from 'vitest';

const rpc = vi.fn();
vi.mock('@/lib/supabaseClient', () => ({ supabase: { rpc: (...a: unknown[]) => rpc(...a) } }));

import {
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
