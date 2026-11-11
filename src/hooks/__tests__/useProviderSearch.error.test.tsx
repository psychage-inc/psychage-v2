import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const searchProviders = vi.fn();
vi.mock('@/lib/providers/queries', () => ({
  searchProviders: (...args: unknown[]) => searchProviders(...args),
}));

import { useProviderSearch } from '../useProviderSearch';

function wrapper(initialUrl: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialUrl]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

const page = (names: string[]) => ({
  providers: names.map(n => ({ id: n, display_name: n })),
  total_count: names.length,
  page: 1,
  per_page: 20,
  has_more: false,
});

describe('useProviderSearch — error state', () => {
  beforeEach(() => {
    searchProviders.mockReset();
  });

  it('shows an error and no providers when the search fails', async () => {
    searchProviders.mockImplementation(() => Promise.reject(new Error('Provider search failed: boom')));
    const { result } = renderHook(() => useProviderSearch(), { wrapper: wrapper('/find-care?state=TX') });

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.providers).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it('does not keep the previous search results on screen after a failure', async () => {
    searchProviders.mockResolvedValueOnce(page(['Amy']));
    const { result } = renderHook(() => useProviderSearch(), { wrapper: wrapper('/find-care?state=TX') });
    await waitFor(() => expect(result.current.providers).toHaveLength(1));

    searchProviders.mockImplementation(() => Promise.reject(new Error('Provider search failed: boom')));
    act(() => result.current.setParams({ state: 'CA' }));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.providers).toEqual([]);
  });

  it('retry re-runs the same search', async () => {
    searchProviders.mockRejectedValueOnce(new Error('Provider search failed: boom'));
    const { result } = renderHook(() => useProviderSearch(), { wrapper: wrapper('/find-care?state=TX') });
    await waitFor(() => expect(result.current.error).not.toBeNull());

    searchProviders.mockResolvedValueOnce(page(['Amy']));
    act(() => result.current.retry());

    await waitFor(() => expect(result.current.providers).toHaveLength(1));
    expect(result.current.error).toBeNull();
    const [firstCall, secondCall] = searchProviders.mock.calls;
    expect(secondCall[0]).toEqual(firstCall[0]);
  });
});
