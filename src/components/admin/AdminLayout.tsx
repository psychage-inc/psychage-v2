import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminKeyboardShortcuts } from '@/hooks/useAdminKeyboardShortcuts';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import CommandPalette from './CommandPalette';

const AdminLayout: React.FC = () => {
  const { adminUser, loading, denied } = useAdminAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isDev = import.meta.env.DEV;

  const togglePalette = useCallback(() => setPaletteOpen((prev) => !prev), []);

  useAdminKeyboardShortcuts({
    onCommandPalette: togglePalette,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4 px-6">
        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center text-xl font-bold">!</div>
        <h2 className="text-lg font-semibold text-text-primary">Access Denied</h2>
        {denied ? (
          <div className="max-w-md text-center space-y-3">
            <p className="text-sm text-text-secondary">
              Your account does not have an <code className="bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono">admin_roles</code> entry.
            </p>
            {isDev && (
              <div className="p-4 rounded-lg border border-amber-300/50 bg-amber-50/80 dark:bg-amber-900/20 dark:border-amber-500/30 text-left space-y-2">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Dev Setup</p>
                <ol className="text-xs text-amber-700 dark:text-amber-400 list-decimal list-inside space-y-1.5">
                  <li>Add <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to your <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded font-mono">.env</code></li>
                  <li>Run <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded font-mono">npx tsx scripts/create-demo-admin.ts</code></li>
                  <li>Log in with <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded font-mono">demo@psychage.com</code> / <code className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded font-mono">PsychageAdmin2026!</code></li>
                </ol>
              </div>
            )}
            {!isDev && (
              <p className="text-xs text-text-tertiary">
                Contact a super admin to add your user to the admin_roles table.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-secondary max-w-sm text-center">
            Could not verify admin access. Please try logging in again.
          </p>
        )}
        <button
          onClick={() => { window.location.href = '/'; }}
          className="mt-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Return to Main Site
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />
      <AdminTopBar
        adminUser={adminUser}
        sidebarCollapsed={sidebarCollapsed}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-200',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <div className="p-6 max-w-admin mx-auto">
          <Outlet />
        </div>
      </main>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
};

export default AdminLayout;
