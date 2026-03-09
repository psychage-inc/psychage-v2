import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { UserPlus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
import { ADMIN_ROLE_LABELS } from '@/lib/admin/constants';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import type { AdminRole, AdminRoleRecord } from '@/lib/admin/types';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import AdminStatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const AdminUserManagementV2: React.FC = () => {
  const { adminUser } = useAdminAuth(['super_admin']);
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('viewer');
  const [showInvite, setShowInvite] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<AdminRoleRecord | null>(null);

  const { data: adminUsers, isLoading } = useQuery({
    queryKey: ['admin', 'admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_roles')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []) as AdminRoleRecord[];
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ id, newRole }: { id: string; newRole: AdminRole }) => {
      const { error } = await supabase.from('admin_roles').update({ role: newRole }).eq('id', id);
      if (error) throw error;
      await logAdminAction({ action: 'update', resourceType: 'admin_role', resourceId: id, newValue: { role: newRole } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'admin-users'] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('admin_roles').delete().eq('id', id);
      if (error) throw error;
      await logAdminAction({ action: 'delete', resourceType: 'admin_role', resourceId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'admin-users'] });
      setRemoveTarget(null);
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async () => {
      // In a real implementation, this would use Supabase Auth admin invite
      // For now, we create the role entry (the user must already exist)
      const { data: users } = await supabase.rpc('get_user_by_email', { email_input: inviteEmail });
      if (!users || users.length === 0) throw new Error('User not found. They must sign up first.');
      const userId = users[0].id;
      const { error } = await supabase.from('admin_roles').insert({
        user_id: userId,
        role: inviteRole,
        granted_by: adminUser?.id,
      });
      if (error) throw error;
      await logAdminAction({ action: 'create', resourceType: 'admin_role', newValue: { email: inviteEmail, role: inviteRole } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'admin-users'] });
      setShowInvite(false);
      setInviteEmail('');
    },
  });

  const isSuperAdmin = adminUser?.role === 'super_admin';

  const columns: ColumnDef<AdminRoleRecord, unknown>[] = [
    {
      accessorKey: 'user_id',
      header: 'User ID',
      cell: ({ row }) => (
        <code className="text-xs font-mono text-gray-500">{row.original.user_id.slice(0, 8)}...</code>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        if (!isSuperAdmin) return <AdminStatusBadge status={row.original.role} />;
        return (
          <select
            value={row.original.role}
            onChange={(e) => changeRoleMutation.mutate({ id: row.original.id, newRole: e.target.value as AdminRole })}
            className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="super_admin">Super Admin</option>
            <option value="clinical_admin">Clinical Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        );
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Added',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        if (!isSuperAdmin || row.original.user_id === adminUser?.id) return null;
        return (
          <button
            onClick={() => setRemoveTarget(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove"
          >
            <Trash2 size={15} />
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage admin users and roles"
        actions={
          isSuperAdmin ? (
            <button
              onClick={() => setShowInvite(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <UserPlus size={16} /> Add Admin
            </button>
          ) : null
        }
      />

      {!isSuperAdmin && (
        <div className="mb-4 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-700 dark:text-amber-400">
          Only super admins can manage user roles and permissions.
        </div>
      )}

      <DataTable
        columns={columns}
        data={adminUsers || []}
        isLoading={isLoading}
        emptyMessage="No admin users found."
        enableSearch={false}
      />

      {/* Invite dialog */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowInvite(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Admin User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="viewer">Viewer</option>
                  <option value="clinical_admin">Clinical Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              {inviteMutation.isError && (
                <p className="text-sm text-red-500">{String(inviteMutation.error)}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowInvite(false)}
                  className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => inviteMutation.mutate()}
                  disabled={inviteMutation.isPending || !inviteEmail.trim()}
                  className="flex-1 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  {inviteMutation.isPending ? 'Adding...' : 'Add Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!removeTarget}
        onOpenChange={(open) => !open && setRemoveTarget(null)}
        title="Remove Admin"
        description="Remove this user's admin access? They will no longer be able to access the admin panel."
        confirmLabel="Remove"
        destructive
        onConfirm={() => removeTarget && removeMutation.mutate(removeTarget.id)}
      />
    </div>
  );
};

export default AdminUserManagementV2;
