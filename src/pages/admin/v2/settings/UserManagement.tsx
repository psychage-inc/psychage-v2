import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type ColumnDef } from '@tanstack/react-table';
import { UserPlus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { logAdminAction } from '@/lib/admin/auditLogger';
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
  const [roleChangeTarget, setRoleChangeTarget] = useState<{ record: AdminRoleRecord; newRole: AdminRole } | null>(null);

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
    mutationFn: async ({ id, newRole, previousRole }: { id: string; newRole: AdminRole; previousRole: AdminRole }) => {
      const { error } = await supabase.from('admin_roles').update({ role: newRole }).eq('id', id);
      if (error) throw error;
      await logAdminAction({
        action: 'update',
        resourceType: 'admin_role',
        resourceId: id,
        previousValue: { role: previousRole },
        newValue: { role: newRole },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'admin-users'] });
      setRoleChangeTarget(null);
    },
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
        <code className="text-xs font-mono text-text-secondary">{row.original.user_id.slice(0, 8)}...</code>
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
            onChange={(e) => {
              const newRole = e.target.value as AdminRole;
              if (newRole === row.original.role) return;
              setRoleChangeTarget({ record: row.original, newRole });
            }}
            className="text-sm border border-border rounded-lg px-2 py-1 bg-surface outline-none focus:ring-2 focus:ring-primary"
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
        <span className="text-sm text-text-secondary">
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
            className="p-1.5 text-text-tertiary hover:text-red-500 transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors"
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
          <div className="relative bg-surface rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Add Admin User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface outline-none focus:ring-2 focus:ring-primary"
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
                  className="flex-1 py-2 bg-surface-hover text-text-secondary text-sm rounded-lg hover:bg-surface-active"
                >
                  Cancel
                </button>
                <button
                  onClick={() => inviteMutation.mutate()}
                  disabled={inviteMutation.isPending || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)}
                  className="flex-1 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover disabled:opacity-50"
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

      <ConfirmDialog
        open={!!roleChangeTarget}
        onOpenChange={(open) => !open && setRoleChangeTarget(null)}
        title="Change Admin Role"
        description={
          roleChangeTarget ? (
            <span>
              Change role from <strong>{roleChangeTarget.record.role}</strong> to{' '}
              <strong>{roleChangeTarget.newRole}</strong>? This will take effect immediately.
              {roleChangeTarget.record.user_id === adminUser?.id && (
                <span className="block mt-2 text-amber-600 dark:text-amber-400">
                  Warning: you are changing your own role. If you demote yourself from super_admin you may lose access to manage other admin users.
                </span>
              )}
            </span>
          ) : ''
        }
        confirmLabel="Change Role"
        destructive
        onConfirm={() =>
          roleChangeTarget &&
          changeRoleMutation.mutate({
            id: roleChangeTarget.record.id,
            newRole: roleChangeTarget.newRole,
            previousRole: roleChangeTarget.record.role,
          })
        }
      />
    </div>
  );
};

export default AdminUserManagementV2;
