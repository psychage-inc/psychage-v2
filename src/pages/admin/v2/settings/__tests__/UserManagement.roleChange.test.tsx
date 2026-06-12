/**
 * AB-003 regression test: role grant/revoke must open ConfirmDialog and
 * NOT mutate on the dropdown change event itself. Without this guard a
 * stray click on a role select can promote a viewer to super_admin or
 * demote the only super_admin out of write capability.
 *
 * Mutations now route through the admin_upsert_role / admin_remove_role
 * SECURITY DEFINER RPCs; the list loads via admin_list_roles.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const LIST_ROWS = [
    { id: 'r-1', user_id: 'user-other-aaaaaaaa-bbbb-cccc-dddd', email: 'other@test.com', role: 'viewer', granted_by: null, created_at: '2026-01-01' },
    { id: 'r-2', user_id: 'user-self-aaaaaaaa-bbbb-cccc-dddd', email: 'self@test.com', role: 'super_admin', granted_by: null, created_at: '2026-01-02' },
];

const mockRpc = vi.fn((fn: string) => {
    if (fn === 'admin_list_roles') return Promise.resolve({ data: LIST_ROWS, error: null });
    return Promise.resolve({ data: null, error: null });
});

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        rpc: (...args: unknown[]) => mockRpc(...(args as [string])),
        auth: { getUser: () => Promise.resolve({ data: { user: null } }) },
    },
}));

vi.mock('@/lib/admin/auditLogger', () => ({
    logAdminAction: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/hooks/useAdminAuth', () => ({
    useAdminAuth: () => ({
        adminUser: { id: 'user-self-aaaaaaaa-bbbb-cccc-dddd', email: 'self@test.com', role: 'super_admin' },
        loading: false,
        denied: false,
    }),
}));

import AdminUserManagementV2 from '../UserManagement';

const renderPage = () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
    return render(
        <QueryClientProvider client={qc}>
            <MemoryRouter>
                <AdminUserManagementV2 />
            </MemoryRouter>
        </QueryClientProvider>,
    );
};

describe('AB-003: role change requires explicit confirmation', () => {
    beforeEach(() => {
        mockRpc.mockClear();
    });

    const findRoleSelects = async (): Promise<HTMLSelectElement[]> => {
        // Wait until both rows have rendered their role select
        return await screen.findAllByRole('combobox') as HTMLSelectElement[];
    };

    it('changing the role select does NOT immediately fire the upsert RPC', async () => {
        renderPage();
        const selects = await findRoleSelects();
        // First row is the other admin (viewer); promote to super_admin
        const target = selects[0];
        expect(target.value).toBe('viewer');
        fireEvent.change(target, { target: { value: 'super_admin' } });

        // Mutation must not have fired without confirmation
        expect(mockRpc).not.toHaveBeenCalledWith('admin_upsert_role', expect.anything());

        // Confirm dialog must be visible with the from→to transition
        expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
        expect(screen.getByText(/Change Admin Role/i)).toBeInTheDocument();
    });

    it('confirmation dialog warns when super_admin demotes themselves', async () => {
        renderPage();
        const selects = await findRoleSelects();
        // Second row is the self row (super_admin → viewer demotion)
        const selfSelect = selects[1];
        expect(selfSelect.value).toBe('super_admin');
        fireEvent.change(selfSelect, { target: { value: 'viewer' } });

        const dialog = await screen.findByRole('alertdialog');
        expect(dialog).toHaveTextContent(/changing your own role/i);
        expect(mockRpc).not.toHaveBeenCalledWith('admin_upsert_role', expect.anything());
    });
});
