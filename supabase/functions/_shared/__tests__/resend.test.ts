/**
 * Deno unit tests for the shared Resend sender.
 *
 * Run with:
 *   deno test --allow-env supabase/functions/_shared/__tests__/resend.test.ts
 */

import {
    assertEquals,
    assertRejects,
    assertStrictEquals,
} from 'https://deno.land/std@0.168.0/testing/asserts.ts';
import { sendEmail } from '../resend.ts';

const RECIPIENT = 'person@example.com';
const MESSAGE = { to: RECIPIENT, subject: 'Subject', html: '<p>Body</p>' };

type FetchCall = { url: string; init: RequestInit };

function stubFetch(status: number, body: string): { calls: FetchCall[]; restore: () => void } {
    const original = globalThis.fetch;
    const calls: FetchCall[] = [];
    globalThis.fetch = ((url: string, init: RequestInit) => {
        calls.push({ url, init });
        return Promise.resolve(new Response(body, { status }));
    }) as typeof fetch;
    return { calls, restore: () => { globalThis.fetch = original; } };
}

function captureConsole(): { lines: string[]; restore: () => void } {
    const lines: string[] = [];
    const originals = { log: console.log, warn: console.warn, error: console.error };
    const record = (...args: unknown[]) => { lines.push(args.map(String).join(' ')); };
    console.log = record;
    console.warn = record;
    console.error = record;
    return { lines, restore: () => Object.assign(console, originals) };
}

Deno.test('sendEmail throws when RESEND_API_KEY is missing and sends nothing', async () => {
    Deno.env.delete('RESEND_API_KEY');
    const fetchStub = stubFetch(200, '{}');
    try {
        await assertRejects(() => sendEmail(MESSAGE, 'test'), Error, 'RESEND_API_KEY');
        assertEquals(fetchStub.calls.length, 0);
    } finally {
        fetchStub.restore();
    }
});

Deno.test('sendEmail sends with the "Psychage" from-name', async () => {
    Deno.env.set('RESEND_API_KEY', 're_test');
    Deno.env.set('NOTIFICATION_FROM_EMAIL', 'security@psychage.com');
    const fetchStub = stubFetch(200, '{"id":"x"}');
    try {
        const ok = await sendEmail(MESSAGE, 'test');
        assertStrictEquals(ok, true);
        const payload = JSON.parse(String(fetchStub.calls[0].init.body));
        assertEquals(payload.from, 'Psychage <security@psychage.com>');
        assertEquals(payload.to, RECIPIENT);
    } finally {
        fetchStub.restore();
        Deno.env.delete('RESEND_API_KEY');
        Deno.env.delete('NOTIFICATION_FROM_EMAIL');
    }
});

Deno.test('sendEmail never logs the recipient address on a rejected send', async () => {
    Deno.env.set('RESEND_API_KEY', 're_test');
    // Resend error bodies can echo the address back; it must not reach logs.
    const fetchStub = stubFetch(422, `{"message":"Invalid to field: ${RECIPIENT}"}`);
    const logs = captureConsole();
    try {
        const ok = await sendEmail(MESSAGE, 'test');
        assertStrictEquals(ok, false);
        assertEquals(logs.lines.some((l) => l.includes(RECIPIENT)), false);
        assertEquals(logs.lines.some((l) => l.includes('422')), true);
    } finally {
        logs.restore();
        fetchStub.restore();
        Deno.env.delete('RESEND_API_KEY');
    }
});
