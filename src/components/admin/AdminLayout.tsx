import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminKeyboardShortcuts } from '@/hooks/useAdminKeyboardShortcuts';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import CommandPalette from './CommandPalette';

const AdminLayout: React.FC = () => {
  const { adminUser, loading } = useAdminAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const togglePalette = useCallback(() => setPaletteOpen((prev) => !prev), []);

  useAdminKeyboardShortcuts({
    onCommandPalette: togglePalette,
  });

  if (loading || !adminUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
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
