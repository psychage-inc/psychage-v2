/**
 * FC-01 regression: creating a content document must send url_path (NOT NULL
 * in prod) and a type value the live CHECK constraint accepts. Before the fix
 * the insert omitted url_path and offered guide/glossary/infographic types the
 * DB rejects, so every create failed.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CONTENT_TYPES } from '@/lib/admin/constants';

// Column set the live content_documents.type CHECK accepts
// (supabase/migrations/20250220000006_ai_tables.sql).
const LIVE_ALLOWED_TYPES = new Set([
  'article', 'condition_guide', 'coping_strategy',
  'video_transcript', 'faq', 'tool_description', 'crisis_resource',
]);

const inserts: Array<{ table: string; payload: unknown }> = [];

function makeChain(table: string) {
  const chain: Record<string, unknown> = {};
  const ret = () => chain;
  chain.insert = (payload: unknown) => { inserts.push({ table, payload }); return chain; };
  chain.update = ret;
  chain.delete = ret;
  chain.eq = ret;
  chain.order = ret;
  chain.limit = ret;
  chain.select = ret;
  chain.single = () => Promise.resolve({ data: { id: 'new-doc-id' }, error: null });
  // Awaiting the chain (insert without .select) resolves ok.
  chain.then = (res: (v: { data: unknown; error: null }) => unknown) =>
    Promise.resolve({ data: null, error: null }).then(res);
  return chain;
}

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: (table: string) => makeChain(table),
    auth: { getUser: () => Promise.resolve({ data: { user: { id: 'admin-1', email: 'a@test.com' } } }) },
  },
}));

vi.mock('@/lib/admin/auditLogger', () => ({ logAdminAction: vi.fn(() => Promise.resolve()) }));
vi.mock('@/components/admin/TiptapEditor', () => ({
  default: ({ onChange }: { onChange?: (v: string) => void }) => (
    <textarea data-testid="tiptap" onChange={(e) => onChange?.(e.target.value)} />
  ),
}));

import AdminContentEditor from '../ContentEditor';

const renderNew = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={['/content/new']}>
        <AdminContentEditor />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ContentEditor create (FC-01)', () => {
  beforeEach(() => { inserts.length = 0; });

  it('offers only content types the live DB CHECK accepts', () => {
    for (const t of CONTENT_TYPES) {
      expect(LIVE_ALLOWED_TYPES.has(t.value)).toBe(true);
    }
  });

  it('sends url_path and a live-valid type in the create payload', async () => {
    renderNew();

    const title = await screen.findByPlaceholderText(/title/i);
    fireEvent.change(title, { target: { value: 'Managing Panic Attacks' } });

    fireEvent.click(screen.getByRole('button', { name: /save draft/i }));

    await waitFor(() => {
      expect(inserts.some((i) => i.table === 'content_documents')).toBe(true);
    });

    const docInsert = inserts.find((i) => i.table === 'content_documents')!;
    const payload = docInsert.payload as Record<string, unknown>;
    expect(typeof payload.url_path).toBe('string');
    expect((payload.url_path as string).length).toBeGreaterThan(1);
    expect(LIVE_ALLOWED_TYPES.has(payload.type as string)).toBe(true);
    expect(payload.title).toBe('Managing Panic Attacks');
    expect(payload.slug).toBeTruthy();
  });
});
