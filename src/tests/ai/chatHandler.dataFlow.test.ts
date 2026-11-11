// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { stubFetch, fakeReqRes, setChatEnv } from './chatHandler.harness';

// Counsel was told MindMate messages go to Anthropic only. This pins it: a
// normal MindMate request reaches api.anthropic.com and no other host, and the
// server makes no database lookups with the message (no RAG).

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

// Explicit .ts: a plain specifier resolves to the gitignored compiled bundle
// (api/ai/chat.js) when it exists, which inlines supabase-js and skips the mock.
import handler from '../../../api/ai/chat.ts';

describe('MindMate data flow', () => {
  let fetchStub: ReturnType<typeof stubFetch>;

  beforeEach(() => {
    setChatEnv();
    process.env.OPENAI_API_KEY = 'sk-openai-should-be-ignored';
    fetchStub = stubFetch();
    supabase.rpc.mockClear();
    supabase.from.mockClear();
  });

  afterEach(() => {
    fetchStub.restore();
    delete process.env.OPENAI_API_KEY;
  });

  it('sends the message to Anthropic only, even when an OpenAI key is present', async () => {
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What are common symptoms of depression?' }],
      stream: false,
    });

    await handler(req, res);

    expect(captured.statusCode).toBe(200);
    expect(fetchStub.calls.length).toBeGreaterThan(0);
    expect(new Set(fetchStub.calls.map(c => c.host))).toEqual(new Set(['api.anthropic.com']));
  });

  it('does not query the database with the message (no retrieval)', async () => {
    const { req, res } = fakeReqRes({
      messages: [{ role: 'user', content: 'How does anxiety affect sleep?' }],
      stream: false,
    });

    await handler(req, res);

    expect(supabase.rpc).not.toHaveBeenCalled();
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it('returns no citations field', async () => {
    const { req, res, captured } = fakeReqRes({
      messages: [{ role: 'user', content: 'What is CBT?' }],
      stream: false,
    });

    await handler(req, res);

    expect(captured.json).not.toHaveProperty('citations');
  });
});
