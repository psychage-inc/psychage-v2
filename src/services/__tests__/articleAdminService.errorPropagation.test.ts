/**
 * FA-01 regression: read functions reachable from routed admin pages must
 * PROPAGATE errors, never fall back to fabricated mock data. A real article
 * rendering mock comments/images/history, or a dashboard rendering mock counts,
 * is a false success.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

const errorResult = { data: null, error: { message: 'RLS denied', code: '42501' } };

// Chain whose terminal awaits resolve to an error result.
function makeErrorChain() {
  const chain: Record<string, unknown> = {};
  const self = () => chain;
  chain.select = self;
  chain.eq = self;
  chain.order = self;
  chain.limit = self;
  chain.then = (r: (v: typeof errorResult) => unknown) => Promise.resolve(errorResult).then(r);
  return chain;
}

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => makeErrorChain(),
    auth: { getUser: () => Promise.resolve({ data: { user: { id: 'u1' } } }) },
  },
}));

// If any of these were reached, the test would (wrongly) pass with mock data.
vi.mock('@/pages/admin/data/articleMockData', () => ({
  getMockArticles: () => { throw new Error('getMockArticles should not be called here'); },
}));

vi.mock('@/lib/admin/auditLogger', () => ({ logAdminAction: vi.fn(() => Promise.resolve()) }));

import {
  getArticleComments,
  getArticleStatusHistory,
  getArticleImages,
  getArticleStats,
} from '@/services/articleAdminService';

describe('articleAdminService FA-01 error propagation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getArticleComments rejects instead of returning mock', async () => {
    await expect(getArticleComments('article-1')).rejects.toBeTruthy();
  });

  it('getArticleStatusHistory rejects instead of returning mock', async () => {
    await expect(getArticleStatusHistory('article-1')).rejects.toBeTruthy();
  });

  it('getArticleImages rejects instead of returning mock', async () => {
    await expect(getArticleImages('article-1')).rejects.toBeTruthy();
  });

  it('getArticleStats rejects instead of returning fabricated counts', async () => {
    await expect(getArticleStats()).rejects.toBeTruthy();
  });
});
