import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clarityScoreService } from '../clarityScoreService';
import type { ClarityScoreResult } from '../../lib/clarity/types';

const mockSingle = vi.fn();
const mockGetUser = vi.fn();

const buildChain = () => {
    const chain: any = {};
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.single = mockSingle;
    return chain;
};

const chain = buildChain();

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => chain),
        auth: { getUser: () => mockGetUser() },
    },
}));

function resetChain() {
    const self = () => chain;
    chain.select = vi.fn(self);
    chain.insert = vi.fn(self);
    chain.eq = vi.fn(self);
    chain.order = vi.fn(self);
    chain.limit = vi.fn(self);
    chain.single = mockSingle;
}

// A fully-populated result, including the sensitive fields that must NOT persist.
const fullResult: ClarityScoreResult = {
    totalScore: 72,
    domainScores: { emotional: 14, vitality: 16, social: 12, cognitive: 18, functioning: 12 },
    subScores: { phq2: 1, gad2: 2, who5Percentage: 80, uclaScore: 4, pssScore: 6 },
    rawScores: { q1: 1, q2: 0, q3: 2, q4: 1 },
    flags: ['SOME_CLINICAL_FLAG'],
    structuredFlags: [{ label: 'PHQ-2', result: 'negative', severity: 'elevated' }],
    strengths: ['You manage stress effectively.'],
    growthAreas: ['Room to deepen connection.'],
    label: 'Balanced',
    tier: 'balanced',
};

describe('clarityScoreService.saveResult', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetChain();
        vi.spyOn(console, 'error').mockImplementation(() => {});
        mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
        mockSingle.mockResolvedValue({ data: { id: 'row-1' }, error: null });
    });

    // SR-4 guard: opt-in save persists DERIVED scores only. If any item-level,
    // sub-score, flag, strengths, growth_areas, or tier field reappears in the
    // insert payload, this test must fail.
    it('persists ONLY the four derived read fields', async () => {
        await clarityScoreService.saveResult(fullResult);

        expect(chain.insert).toHaveBeenCalledTimes(1);
        const payload = chain.insert.mock.calls[0][0];

        expect(Object.keys(payload).sort()).toEqual(
            ['domain_scores', 'label', 'total_score', 'user_id'].sort()
        );
        expect(payload).toEqual({
            user_id: 'user-1',
            total_score: 72,
            label: 'Balanced',
            domain_scores: fullResult.domainScores,
        });

        // Explicitly assert none of the purged fields leak in.
        for (const banned of ['raw_answers', 'sub_scores', 'flags', 'strengths', 'growth_areas', 'tier']) {
            expect(payload).not.toHaveProperty(banned);
        }
    });

    it('returns success with the new row id', async () => {
        const res = await clarityScoreService.saveResult(fullResult);
        expect(res).toEqual({ success: true, id: 'row-1' });
    });

    it('does not insert when there is no authenticated user', async () => {
        mockGetUser.mockResolvedValue({ data: { user: null } });
        const res = await clarityScoreService.saveResult(fullResult);
        expect(res).toEqual({ success: false });
        expect(chain.insert).not.toHaveBeenCalled();
    });
});
