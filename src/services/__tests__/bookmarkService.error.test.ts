import { describe, it, expect, vi, beforeEach } from 'vitest';

// Chain mock covering .from().select().eq().maybeSingle() and .insert()/.delete().
const mockMaybeSingle = vi.fn();
const mockInsertResult = vi.fn();
const mockDeleteResult = vi.fn();

const chain: Record<string, unknown> = {};
const self = () => chain;
chain.select = vi.fn(self);
chain.eq = vi.fn(self);
chain.maybeSingle = () => mockMaybeSingle();
chain.single = () => mockInsertResult();
chain.insert = vi.fn(() => ({ select: vi.fn(() => ({ single: () => mockInsertResult() })) }));
chain.delete = vi.fn(() => ({ eq: () => ({ eq: () => ({ eq: () => mockDeleteResult() }) }) }));

vi.mock('../../lib/supabaseClient', () => ({
    supabase: { from: vi.fn(() => chain) },
}));

import { bookmarkService } from '../bookmarkService';

describe('bookmarkService write truthfulness (systemic error-swallow fix)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('toggle throws when the existence check errors (was masked as bookmarked:false)', async () => {
        mockMaybeSingle.mockResolvedValue({ data: null, error: { message: 'rls denied' } });

        await expect(bookmarkService.toggle('u1', 'article', 'a1')).rejects.toThrow('rls denied');
    });

    it('toggle throws when the insert (add) fails instead of fabricating success', async () => {
        mockMaybeSingle.mockResolvedValue({ data: null, error: null }); // not bookmarked → add
        mockInsertResult.mockResolvedValue({ data: null, error: { message: 'insert failed' } });

        await expect(bookmarkService.toggle('u1', 'article', 'a1')).rejects.toThrow('insert failed');
    });

    it('toggle throws when the delete (remove) fails', async () => {
        mockMaybeSingle.mockResolvedValue({ data: { id: 'b1' }, error: null }); // exists → remove
        mockDeleteResult.mockResolvedValue({ error: { message: 'delete failed' } });

        await expect(bookmarkService.toggle('u1', 'article', 'a1')).rejects.toThrow('delete failed');
    });

    it('toggle resolves normally on success', async () => {
        mockMaybeSingle.mockResolvedValue({ data: null, error: null });
        mockInsertResult.mockResolvedValue({ data: { id: 'b1' }, error: null });

        await expect(bookmarkService.toggle('u1', 'article', 'a1')).resolves.toEqual({ bookmarked: true });
    });
});
