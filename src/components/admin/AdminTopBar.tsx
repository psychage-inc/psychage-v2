import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, LogOut, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { mainUrl } from '@/lib/urls';
import type { AdminUser } from '@/lib/admin/types';
import { ADMIN_ROLE_LABELS } from '@/lib/admin/constants';

interface AdminTopBarProps {
  adminUser: AdminUser;
  sidebarCollapsed: boolean;
  onOpenPalette?: () => void;
}

const breadcrumbLabels: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  content: 'Content',
  new: 'New',
  edit: 'Edit',
  providers: 'Providers',
  applications: 'Applications',
  import: 'Import',
  'symptom-navigator': 'Symptom Navigator',
  symptoms: 'Symptoms',
  conditions: 'Conditions',
  mappings: 'Mappings',
  safety: 'Safety',
  keywords: 'Keywords',
  conversations: 'Conversations',
  settings: 'Settings',
  users: 'Users',
  'audit-log': 'Audit Log',
};

const AdminTopBar: React.FC<AdminTopBarProps> = ({ adminUser, sidebarCollapsed, onOpenPalette }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = breadcrumbLabels[segment] || segment;
    return { label, path };
  });

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 z-30 transition-all duration-200',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.path}>
            {i > 0 && <span className="mx-2 text-text-tertiary">/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-text-primary font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-text-tertiary hover:text-text-primary"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-tertiary bg-surface-hover border border-border rounded-lg hover:text-text-secondary hover:border-border-hover transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 bg-surface rounded border border-border">
            ⌘K
          </kbd>
        </button>

        <a
          href={mainUrl('/')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-sm text-text-tertiary hover:text-primary transition-colors"
        >
          View Live Site
          <ExternalLink size={14} />
        </a>

        {/* Admin info */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-text-primary truncate max-w-[160px]">
              {adminUser.email}
            </p>
            <p className="text-xs text-text-secondary">
              {ADMIN_ROLE_LABELS[adminUser.role]}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {adminUser.email.charAt(0).toUpperCase()}
            </span>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="p-2 text-text-tertiary hover:text-error transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
