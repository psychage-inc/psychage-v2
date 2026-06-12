/**
 * UserManagement RPC wiring tests.
 *
 * Role CRUD routes through SECURITY DEFINER RPCs (admin_list_roles,
 * admin_upsert_role, admin_remove_role) because admin_roles' direct-write
 * policy is USING(false). These tests cover:
 *   - the list renders from admin_list_roles (with emails),
 *   - invite resolves the user via get_user_by_email then calls
 *     admin_upsert_role,
 *   - the last-super_admin refusal (a RAISE from admin_upsert_role) is
 *     surfaced to the user, not swallowed.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const LIST_ROWS = [
    { id: 'r-1', user_id: 'user-other-aaaaaaaa-bbbb-cccc-dddd', email: 'other@test.com', role: 'viewer', granted_by: null, created_at: '2026-01-01' },
    { id: 'r-2', user_id: 'user-self-aaaaaaaa-bbbb-cccc-dddd', email: 'self@test.com', role: 'super_admin', granted_by: null, created_at: '2026-01-02' },
];

// Per-test RPC behavior; defaults to returning the list for admin_list_roles.
const rpcImpl = vi.fn((fn: string, _args?: unknown) => {
    if (fn === 'admin_list_roles') return Promise.resolve({ data: LIST_ROWS, error: null });
    return Promise.resolve({ data: null, error: null });
});

const mockRpc = vi.fn((...args: unknown[]) => rpcImpl(...(args as [string, unknown?])));

vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        rpc: (...args: unknown[]) => mockRpc(...args),
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

describe('UserManagement RPC wiring', () => {
    beforeEach(() => {
        mockRpc.mockClear();
        rpcImpl.mockReset();
        rpcImpl.mockImplementation((fn: string) => {
            if (fn === 'admin_list_roles') return Promise.resolve({ data: LIST_ROWS, error: null });
            return Promise.resolve({ data: null, error: null });
        });
    });

    it('renders the admin list from admin_list_roles with emails', async () => {
        renderPage();
        expect(await screen.findByText('other@test.com')).toBeInTheDocument();
        expect(await screen.findByText('self@test.com')).toBeInTheDocument();
        expect(mockRpc).toHaveBeenCalledWith('admin_list_roles');
    });

    it('invite resolves the user then calls admin_upsert_role', async () => {
        rpcImpl.mockImplementation((fn: string) => {
            if (fn === 'admin_list_roles') return Promise.resolve({ data: LIST_ROWS, error: null });
            if (fn === 'get_user_by_email') return Promise.resolve({ data: [{ id: 'new-user-id' }], error: null });
            if (fn === 'admin_upsert_role') return Promise.resolve({ data: {}, error: null });
            return Promise.resolve({ data: null, error: null });
        });

        renderPage();
        await screen.findByText('other@test.com');

        // Open the invite dialog (header action button).
        fireEvent.click(screen.getByRole('button', { name: /Add Admin/i }));

        const email = screen.getByPlaceholderText('user@example.com');
        fireEvent.change(email, { target: { value: 'new@test.com' } });

        // The dialog submit button is the second "Add Admin" button in the DOM.
        const addButtons = screen.getAllByRole('button', { name: /Add Admin/i });
        fireEvent.click(addButtons[addButtons.length - 1]);

        await waitFor(() => {
            expect(mockRpc).toHaveBeenCalledWith('get_user_by_email', { email_input: 'new@test.com' });
            expect(mockRpc).toHaveBeenCalledWith('admin_upsert_role', {
                target_user_id: 'new-user-id',
                new_role: 'viewer',
            });
        });
    });

    it('surfaces the last-super_admin refusal from admin_upsert_role', async () => {
        const REFUSAL = 'admin_upsert_role: cannot demote the last remaining super_admin';
        rpcImpl.mockImplementation((fn: string) => {
            if (fn === 'admin_list_roles') return Promise.resolve({ data: LIST_ROWS, error: null });
            if (fn === 'admin_upsert_role') return Promise.resolve({ data: null, error: { message: REFUSAL } });
            return Promise.resolve({ data: null, error: null });
        });

        renderPage();
        const selects = await screen.findAllByRole('combobox') as HTMLSelectElement[];
        // Self row (super_admin) → demote to viewer.
        const selfSelect = selects[1];
        expect(selfSelect.value).toBe('super_admin');
        fireEvent.change(selfSelect, { target: { value: 'viewer' } });

        const dialog = await screen.findByRole('alertdialog');
        fireEvent.click(within(dialog).getByRole('button', { name: 'Change Role' }));

        // The RAISE message must reach the user, not be swallowed.
        expect(await screen.findByText(REFUSAL)).toBeInTheDocument();
    });
});
