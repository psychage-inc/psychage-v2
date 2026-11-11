/**
 * Test harness for the MindMate serverless handler (api/ai/chat.ts).
 *
 * - `createClient` from supabase-js is mocked in each test file with
 *   vi.hoisted + vi.mock (both must live in the test file).
 * - global fetch is stubbed and every outbound request is recorded, so tests
 *   can assert exactly which hosts a message reached.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface OutboundCall {
  host: string;
  url: string;
  body: string;
}

/** Anthropic Messages API response carrying `text`. */
function anthropicReply(text: string) {
  return new Response(
    JSON.stringify({
      id: 'msg_test',
      type: 'message',
      role: 'assistant',
      model: 'claude-test',
      content: [{ type: 'text', text }],
      stop_reason: 'end_turn',
      usage: { input_tokens: 10, output_tokens: 10 },
    }),
    { status: 200, headers: { 'content-type': 'application/json' } },
  );
}

/**
 * Stub fetch. Anthropic calls get a classifier verdict for the safety prompt
 * and a plain educational answer otherwise. Any other host is recorded and
 * answered with 418 so a stray call is visible.
 */
export function stubFetch(answer = 'Depression is a common mood condition.') {
  const calls: OutboundCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const body = typeof init?.body === 'string' ? init.body : '';
    calls.push({ host: new URL(url).host, url, body });
    if (new URL(url).host === 'api.anthropic.com') {
      const isClassifier = /classif|safety level|"level"/i.test(body);
      return anthropicReply(
        isClassifier
          ? JSON.stringify({ level: 'SAFE', confidence: 0.95, reasoning: 'educational' })
          : answer,
      );
    }
    return new Response('unexpected host', { status: 418 });
  }) as typeof fetch;
  return { calls, restore: () => { globalThis.fetch = original; } };
}

export interface CapturedResponse {
  statusCode: number;
  json: unknown;
  chunks: string[];
  ended: boolean;
}

export function fakeReqRes(body: unknown, headers: Record<string, string> = {}) {
  const captured: CapturedResponse = { statusCode: 0, json: undefined, chunks: [], ended: false };
  const listeners: Record<string, () => void> = {};
  const res = {
    status(code: number) { captured.statusCode = code; return res; },
    json(payload: unknown) { captured.json = payload; captured.ended = true; return res; },
    writeHead(code: number) { captured.statusCode = code; return res; },
    write(chunk: string) { captured.chunks.push(chunk); return true; },
    end() { captured.ended = true; return res; },
    setHeader() { return res; },
    on(event: string, cb: () => void) { listeners[event] = cb; return res; },
  } as unknown as VercelResponse;
  const req = {
    method: 'POST',
    headers: { authorization: 'Bearer valid-token', ...headers },
    body,
    on() { return req; },
  } as unknown as VercelRequest;
  return { req, res, captured };
}

export function setChatEnv() {
  process.env.ANTHROPIC_API_KEY = 'sk-ant-test';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-test';
  process.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
}
