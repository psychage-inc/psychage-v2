import React, { Suspense } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';

interface RenderOptionsExtended extends Omit<RenderOptions, 'wrapper'> {
    initialEntries?: string[];
    withAuth?: boolean;
}

const buildQueryClient = () =>
    new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 } },
    });

export const renderWithProviders = (
    ui: React.ReactElement,
    { initialEntries = ['/'], withAuth = true, ...rest }: RenderOptionsExtended = {},
) => {
    const queryClient = buildQueryClient();
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const inner = (
            <Suspense fallback={<div data-testid="suspense-fallback" />}>
                {children}
            </Suspense>
        );
        const auth = withAuth ? <AuthProvider>{inner}</AuthProvider> : inner;
        return (
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter initialEntries={initialEntries}>{auth}</MemoryRouter>
                </QueryClientProvider>
            </HelmetProvider>
        );
    };
    return render(ui, { wrapper: Wrapper, ...rest });
};

export { buildQueryClient as buildTestQueryClient };
