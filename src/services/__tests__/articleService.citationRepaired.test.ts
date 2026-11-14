import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Citation repair wave 1: for repaired articles the database copy is
// authoritative, never the bundled JSX copy with the unrepaired citations.

const REPAIRED = 'ai-anxiety-fear-artificial-intelligence-job-displacement';
const OTHER = 'some-rich-bundled-article';

vi.mock('virtual:article-slug-index', () => ({
  default: {
    'ai-anxiety-fear-artificial-intelligence-job-displacement': ['category-01'],
    'some-rich-bundled-article': ['category-01'],
  },
}));
vi.mock('../../data/articles/all-articles', () => ({
  loadArticlesFromFolders: async () => [REPAIRED, OTHER].map((slug) => ({
    id: slug, slug, title: 'Bundled', status: 'published',
    content: React.createElement('div', null, 'bundled JSX body'),
    citations: [{ id: 'old', text: 'unrepaired citation' }],
  })),
}));

const single = vi.fn();
vi.mock('../../lib/supabaseClient', () => {
  const chain: Record<string, unknown> = {};
  chain.select = () => chain; chain.eq = () => chain; chain.single = () => single();
  return { supabase: { from: () => chain } };
});

import { articleService } from '../articleService';

const dbRow = (slug: string) => ({
  id: 'db-' + slug, slug, title: 'DB title', status: 'published', content: '<p>repaired body [1]</p>',
  content_format: 'html', article_citations: [{ id: 'new', text: 'repaired citation', sort_order: 1 }],
});

describe('articleService.getBySlug for citation-repaired articles', () => {
  beforeEach(() => single.mockReset());

  it('serves the database body and citations, not the bundled JSX', async () => {
    single.mockResolvedValue({ data: dbRow(REPAIRED), error: null });
    const a = await articleService.getBySlug(REPAIRED);
    expect(typeof a?.content).toBe('string');
    expect(a?.content).toContain('repaired body');
    expect(a?._source).not.toBe('mock');
  });

  it('does not fall back to the bundled copy when the database fails', async () => {
    single.mockResolvedValue({ data: null, error: { code: '500', message: 'network down' } });
    expect(await articleService.getBySlug(REPAIRED)).toBeUndefined();
  });

  it('still prefers bundled JSX for other articles', async () => {
    single.mockResolvedValue({ data: dbRow(OTHER), error: null });
    const a = await articleService.getBySlug(OTHER);
    expect(a?._source).toBe('mock');
    expect(typeof a?.content).not.toBe('string');
  });
});
