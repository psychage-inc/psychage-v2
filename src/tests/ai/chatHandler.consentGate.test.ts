// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { stubFetch, fakeReqRes, setChatEnv } from './chatHandler.harness';

// Compliance item 5. Required order in api/ai/chat.ts:
//   1. keyword crisis check (no model call), before auth
//   2. auth
//   3. consent gate (rejects without a current, non-withdrawn consent)
//   4. classifier
//   5. chat
// The client screen is not the gate; the server is.

const USER_ID = '00000000-0000-0000-0000-000000000001';

const supabase = vi.hoisted(() => ({
  auth: {
    getUser: vi.fn(async (token: string) =>
      token === 'valid-token'
        ? { data: { user: { id: '00000000-0000-0000-0000-000000000001' } }, error: null }
        : { data: { user: null }, error: { message: 'invalid' } },
    ),
  },
  rpc: vi.fn(),
  from: vi.fn(),
}));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => supabase }));

// Explicit .ts: a plain specifier resolves to the gitignored compiled bundle.
import handler from '../../../api/ai/chat.ts';

const consent = (data: boolean | null, error: { message: string } | null = null) =>
  supabase.rpc.mockImplementation(async () => ({ data, error }));

describe('MindMate server consent gate', () => {
  let fetchStub: ReturnType<typeof stubFetch>;

  beforeEach(() => {
    setChatEnv();
    fetchStub = stubFetch();
    supabase.rpc.mockReset();
    supabase.auth.getUser.mockClear();
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('rejects a request without consent and calls no model', async () => {
    consent(false);
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What is CBT?' }],
      stream: false,
    });

    await handler(req, res);

    expect(captured.statusCode).toBe(403);
    expect(captured.json).toMatchObject({ code: 'CONSENT_REQUIRED' });
    expect(fetchStub.calls).toEqual([]);
    expect(supabase.rpc).toHaveBeenCalledWith('has_current_mindmate_consent', { p_user_id: USER_ID });
  });

  it('rejects a streaming request without consent before any stream starts', async () => {
    consent(false);
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What is CBT?' }],
      stream: true,
    });

    await handler(req, res);

    expect(captured.statusCode).toBe(403);
    expect(captured.chunks).toEqual([]);
    expect(fetchStub.calls).toEqual([]);
  });

  it('fails closed when the consent check errors', async () => {
    consent(null, { message: 'db down' });
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What is CBT?' }],
      stream: false,
    });

    await handler(req, res);

    expect(captured.statusCode).toBe(500);
    expect(fetchStub.calls).toEqual([]);
  });

  it('runs the classifier and the chat only after consent passes', async () => {
    consent(true);
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What is CBT?' }],
      stream: false,
    });

    await handler(req, res);

    expect(captured.statusCode).toBe(200);
    expect(fetchStub.calls.length).toBe(2); // classifier, then chat
    expect(new Set(fetchStub.calls.map((c) => c.host))).toEqual(new Set(['api.anthropic.com']));
  });

  it('checks auth before consent', async () => {
    consent(true);
    const { req, res, captured } = fakeReqRes(
      { messages: [{ role: 'user', content: 'What is CBT?' }], stream: false },
      { authorization: '' },
    );

    await handler(req, res);

    expect(captured.statusCode).toBe(401);
    expect(supabase.rpc).not.toHaveBeenCalled();
    expect(fetchStub.calls).toEqual([]);
  });

  describe('keyword crisis check (before auth, no model call)', () => {
    it('answers a signed-out crisis message with the crisis text', async () => {
      const { req, res, captured } = fakeReqRes(
        { messages: [{ role: 'user', content: 'I want to kill myself' }], stream: false },
        { authorization: '' },
      );

      await handler(req, res);

      expect(captured.statusCode).toBe(200);
      expect(captured.json).toMatchObject({ isCrisis: true, safetyLevel: 'CRISIS' });
      expect(fetchStub.calls).toEqual([]);
      expect(supabase.auth.getUser).not.toHaveBeenCalled();
      expect(supabase.rpc).not.toHaveBeenCalled();
    });

    it('answers a crisis message from a user without consent with the crisis text', async () => {
      consent(false);
      const { req, res, captured } = fakeReqRes({
        messages: [{ role: 'user', content: "I'm going to hurt myself tonight" }],
        stream: true,
      });

      await handler(req, res);

      expect(captured.statusCode).toBe(200);
      expect(captured.json).toMatchObject({ isCrisis: true });
      expect(fetchStub.calls).toEqual([]);
    });
  });
});
