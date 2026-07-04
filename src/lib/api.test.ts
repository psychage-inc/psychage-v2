import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// api.ts reads the Supabase session for the auth header; stub it out so the
// fetch behavior is the only thing under test.
vi.mock('./supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            refreshSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        },
    },
}));

import { api, ApiError } from './api';

function mockFetchOnce(opts: { ok: boolean; status: number; body: string }) {
    return vi.fn().mockResolvedValue({
        ok: opts.ok,
        status: opts.status,
        text: () => Promise.resolve(opts.body),
    });
}

describe('fetchApi defensive parsing (api-1 / api-2 regression)', () => {
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('preserves the real HTTP status on a non-JSON error page (was rewrapped as status 0)', async () => {
        global.fetch = mockFetchOnce({
            ok: false,
            status: 502,
            body: '<html><body>Bad Gateway</body></html>',
        }) as unknown as typeof fetch;

        await expect(api.get('/anything')).rejects.toMatchObject({ status: 502 });
    });

    it('does not throw on an empty 2xx body (204 No Content)', async () => {
        global.fetch = mockFetchOnce({ ok: true, status: 204, body: '' }) as unknown as typeof fetch;

        await expect(api.get('/anything')).resolves.toBeNull();
    });

    it('surfaces a JSON error message with its status', async () => {
        global.fetch = mockFetchOnce({
            ok: false,
            status: 400,
            body: JSON.stringify({ error: 'Bad input' }),
        }) as unknown as typeof fetch;

        await expect(api.get('/anything')).rejects.toMatchObject({
            message: 'Bad input',
            status: 400,
        });
    });

    it('wraps a genuine network rejection as ApiError(status 0)', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch')) as unknown as typeof fetch;

        const err = await api.get('/anything').catch((e) => e);
        expect(err).toBeInstanceOf(ApiError);
        expect(err.status).toBe(0);
    });
});
