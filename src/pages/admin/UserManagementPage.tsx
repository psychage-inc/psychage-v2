import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import AdminLayout from './components/AdminLayout';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import { type ColumnDef } from '@tanstack/react-table';

interface AdminUser {
    id: string;
    email: string;
    display_name: string;
    avatar_url?: string;
    role: 'patient' | 'provider' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    last_active?: string;
}

const roleFilters = [
    { key: 'all', label: 'All' },
    { key: 'patient', label: 'Patient' },
    { key: 'provider', label: 'Provider' },
    { key: 'admin', label: 'Admin' },
];

// TODO: Wire to api.admin.getUsers() or direct Supabase query on profiles table
const MOCK_USERS: AdminUser[] = [
    { id: 'usr-001', email: 'alice@example.com', display_name: 'Alice Johnson', role: 'patient', status: 'active', created_at: '2025-08-15T10:00:00Z', last_active: '2026-03-05T14:30:00Z' },
    { id: 'usr-002', email: 'bob@example.com', display_name: 'Bob Smith', avatar_url: '', role: 'provider', status: 'active', created_at: '2025-09-20T08:00:00Z', last_active: '2026-03-04T09:15:00Z' },
    { id: 'usr-003', email: 'carol@example.com', display_name: 'Carol Davis', role: 'patient', status: 'active', created_at: '2025-10-01T12:00:00Z', last_active: '2026-02-28T17:45:00Z' },
    { id: 'usr-004', email: 'dave@example.com', display_name: 'Dave Wilson', role: 'admin', status: 'active', created_at: '2025-06-01T08:00:00Z', last_active: '2026-03-06T08:00:00Z' },
    { id: 'usr-005', email: 'eve@example.com', display_name: 'Eve Martinez', role: 'patient', status: 'inactive', created_at: '2025-11-10T15:00:00Z', last_active: '2026-01-05T11:20:00Z' },
    { id: 'usr-006', email: 'frank@example.com', display_name: 'Frank Thompson', role: 'provider', status: 'suspended', created_at: '2025-12-20T09:00:00Z', last_active: '2026-02-10T16:00:00Z' },
    { id: 'usr-007', email: 'grace@example.com', display_name: 'Grace Lee', role: 'patient', status: 'active', created_at: '2026-01-05T14:00:00Z', last_active: '2026-03-06T07:30:00Z' },
    { id: 'usr-008', email: 'henry@example.com', display_name: 'Henry Brown', role: 'patient', status: 'active', created_at: '2026-01-15T11:00:00Z', last_active: '2026-03-03T19:00:00Z' },
];

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const { searchTerm, debouncedSearchTerm, setSearchTerm } = useAdminSearch();

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Wire to api.admin.getUsers() or direct Supabase query
            await new Promise(resolve => setTimeout(resolve, 400));
            setUsers(MOCK_USERS);
        } catch (err) {
            console.error("Failed to fetch users", err);
            setError('Failed to load users. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        let result = users;

        if (roleFilter !== 'all') {
            result = result.filter(u => u.role === roleFilter);
        }

        if (debouncedSearchTerm) {
            const term = debouncedSearchTerm.toLowerCase();
            result = result.filter(u =>
                u.display_name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
            );
        }

        return result;
    }, [users, roleFilter, debouncedSearchTerm]);

    const columns: ColumnDef<AdminUser, unknown>[] = useMemo(() => [
        {
            accessorKey: 'display_name',
            header: 'Name',
            cell: ({ row }) => {
                const u = row.original;
                return (
                    <div className="flex items-center gap-3">
                        {u.avatar_url ? (
                            <img src={u.avatar_url} alt={u.display_name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                {u.display_name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-text-primary">{u.display_name}</div>
                            <div className="text-xs text-text-secondary">{u.email}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ getValue }) => {
                const role = getValue() as string;
                const badgeColors: Record<string, string> = {
                    admin: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                    provider: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    patient: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                };
                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide capitalize ${badgeColors[role] || 'bg-gray-100 text-gray-700'}`}>
                        {role}
                    </span>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Joined',
            cell: ({ getValue }) => (
                <span className="text-sm text-text-secondary">
                    {format(new Date(getValue() as string), 'MMM d, yyyy')}
                </span>
            ),
        },
        {
            accessorKey: 'last_active',
            header: 'Last Active',
            cell: ({ getValue }) => {
                const val = getValue() as string | undefined;
                return (
                    <span className="text-sm text-text-tertiary">
                        {val ? format(new Date(val), 'MMM d, yyyy') : 'Never'}
                    </span>
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
        },
    ], []);

    return (
        <AdminLayout title="User Management" seoTitle="Users | Admin">
            {error && <AdminErrorBanner message={error} onRetry={fetchUsers} />}

            <AdminFilterBar
                searchValue={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search by name or email..."
                filters={roleFilters}
                activeFilter={roleFilter}
                onFilterChange={setRoleFilter}
            />

            <AdminDataTable
                columns={columns}
                data={filteredUsers}
                isLoading={isLoading}
                loadingRows={5}
                pageSize={20}
                emptyState={
                    <AdminEmptyState
                        icon={UserCircle}
                        title="No users found"
                        description={debouncedSearchTerm ? 'Try adjusting your search terms.' : 'No users match the current filters.'}
                    />
                }
            />
        </AdminLayout>
    );
};

export default UserManagementPage;
