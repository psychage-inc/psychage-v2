import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, UserPlus, X, Mail } from 'lucide-react';
import { format } from 'date-fns';
import AdminLayout from './components/AdminLayout';
import AdminFilterBar from './components/AdminFilterBar';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { useAdminSearch } from '@/hooks/useAdminSearch';
import { type ColumnDef } from '@tanstack/react-table';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { api } from '@/lib/api';
import { getUsers as fetchUsersFromService } from '@/services/adminService';

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

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roleFilter, setRoleFilter] = useState('all');
    const { searchTerm, debouncedSearchTerm, setSearchTerm } = useAdminSearch();

    // Invite admin modal state
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteDisplayName, setInviteDisplayName] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [inviteSuccess, setInviteSuccess] = useState(false);

    const handleInviteAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;

        setInviteLoading(true);
        setInviteError(null);
        try {
            await api.admin.inviteAdmin(inviteEmail.trim(), inviteDisplayName.trim());
            setInviteSuccess(true);
            setInviteEmail('');
            setInviteDisplayName('');
            setTimeout(() => {
                setShowInviteModal(false);
                setInviteSuccess(false);
            }, 2000);
        } catch (err) {
            setInviteError(err instanceof Error ? err.message : 'Failed to send invite');
        } finally {
            setInviteLoading(false);
        }
    };

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUsersFromService();
            setUsers(data);
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
                            <Link to={`/admin/users/${u.id}`} className="font-bold text-text-primary hover:text-primary transition-colors">
                                {u.display_name}
                            </Link>
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

            {/* Invite Admin Button */}
            <div className="flex justify-end mb-4">
                <Button
                    size="sm"
                    leftIcon={<UserPlus className="w-4 h-4" />}
                    onClick={() => { setShowInviteModal(true); setInviteError(null); setInviteSuccess(false); }}
                >
                    Invite Admin
                </Button>
            </div>

            {/* Invite Admin Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-surface border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-display font-bold text-text-primary">Invite New Admin</h3>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="p-1 rounded-lg hover:bg-surface-hover transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-text-tertiary" />
                            </button>
                        </div>

                        {inviteSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                                    <Mail className="w-8 h-8 text-teal-500" />
                                </div>
                                <p className="text-lg font-bold text-text-primary mb-1">Invite Sent</p>
                                <p className="text-text-secondary text-sm">They&apos;ll receive an email to set up their account.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleInviteAdmin} className="space-y-4">
                                <div>
                                    <Label htmlFor="invite-email">Email Address</Label>
                                    <Input
                                        id="invite-email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="invite-name">Display Name</Label>
                                    <Input
                                        id="invite-name"
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={inviteDisplayName}
                                        onChange={(e) => setInviteDisplayName(e.target.value)}
                                    />
                                </div>
                                {inviteError && (
                                    <p className="text-sm text-error">{inviteError}</p>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="flex-1"
                                        onClick={() => setShowInviteModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        isLoading={inviteLoading}
                                        disabled={!inviteEmail.trim()}
                                    >
                                        Send Invite
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

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
