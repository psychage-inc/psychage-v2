 
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import {
  ChevronLeft,
  ClipboardCheck,
  Bookmark,
  Heart,
  Calendar,
  FileText,
  Monitor,
} from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import type { AdminUserDetail, UserSession } from '@/types/admin';
import type { AdminAuditLog } from '@/lib/api';
import AdminLayout from './components/AdminLayout';
import AdminStatCard from './components/AdminStatCard';
import { AdminTabs, AdminTabContent } from './components/AdminTabs';
import AdminDataTable from './components/AdminDataTable';
import AdminEmptyState from './components/AdminEmptyState';
import AdminErrorBanner from './components/AdminErrorBanner';
import StatusBadge from './components/StatusBadge';
import { getActionBadgeStatus, humanizeAction } from './components/adminUtils';
import {
  getUserDetail as fetchUserDetail,
  getUserAuditLog as fetchUserAuditLog,
  getMockUserSessions,
} from '@/services/adminService';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRoleVariant(role: AdminUserDetail['role']): 'info' | 'warning' | 'success' {
  switch (role) {
    case 'admin':
      return 'info';
    case 'provider':
      return 'warning';
    case 'patient':
      return 'success';
  }
}

function formatAuditDetails(details: string | Record<string, unknown>): React.ReactNode {
  if (typeof details === 'string') return details;
  if (!details || typeof details !== 'object') return '\u2014';

  const entries = Object.entries(details).filter(
    ([, v]) => v !== null && v !== undefined && v !== '',
  );
  if (entries.length === 0) return '\u2014';

  return (
    <div className="space-y-1">
      {entries.map(([key, value]) => (
        <div key={key} className="flex gap-2 text-sm">
          <span className="text-text-tertiary font-mono text-xs">{key}:</span>
          <span className="text-text-secondary">
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column definitions
// ---------------------------------------------------------------------------

const auditColumns: ColumnDef<AdminAuditLog, unknown>[] = [
  {
    accessorKey: 'created_at',
    header: 'Timestamp',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap">
        {format(new Date(getValue<string>()), 'MMM d, yyyy h:mm a')}
      </span>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ getValue }) => {
      const action = getValue<string>();
      return <StatusBadge status={getActionBadgeStatus(action)}>{humanizeAction(action)}</StatusBadge>;
    },
  },
  {
    accessorKey: 'details',
    header: 'Details',
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary">
        {formatAuditDetails(getValue<string | Record<string, unknown>>())}
      </span>
    ),
  },
];

const sessionColumns: ColumnDef<UserSession, unknown>[] = [
  {
    accessorKey: 'browser',
    header: 'Browser',
    cell: ({ getValue }) => (
      <span className="text-sm font-medium text-text-primary">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'os',
    header: 'OS',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary font-mono">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary">{getValue<string>() || '\u2014'}</span>
    ),
  },
  {
    accessorKey: 'startedAt',
    header: 'Started',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap">
        {format(new Date(getValue<string>()), 'MMM d, yyyy h:mm a')}
      </span>
    ),
  },
  {
    accessorKey: 'lastActiveAt',
    header: 'Last Active',
    cell: ({ getValue }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap">
        {formatDistanceToNow(new Date(getValue<string>()), { addSuffix: true })}
      </span>
    ),
  },
  {
    accessorKey: 'isCurrentSession',
    header: 'Status',
    cell: ({ getValue }) =>
      getValue<boolean>() ? (
        <Badge variant="success">Current</Badge>
      ) : (
        <span className="text-sm text-text-tertiary">\u2014</span>
      ),
  },
];

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-8 animate-pulse">
    {/* Header card skeleton */}
    <Card className="p-6">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-full bg-surface-hover shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-7 w-48 bg-surface-hover rounded" />
          <div className="h-4 w-64 bg-surface-hover rounded" />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 bg-surface-hover rounded-full" />
            <div className="h-5 w-16 bg-surface-hover rounded-full" />
          </div>
          <div className="flex gap-4 mt-3">
            <div className="h-4 w-32 bg-surface-hover rounded" />
            <div className="h-4 w-40 bg-surface-hover rounded" />
          </div>
        </div>
      </div>
    </Card>

    {/* Stat cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-6">
          <div className="h-4 w-24 bg-surface-hover rounded mb-4" />
          <div className="h-8 w-16 bg-surface-hover rounded" />
        </Card>
      ))}
    </div>

    {/* Table skeleton */}
    <Card className="p-6">
      <div className="h-6 w-32 bg-surface-hover rounded mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          // eslint-disable-next-line react-hooks/purity
          <div key={i} className="h-4 bg-surface-hover rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
        ))}
      </div>
    </Card>
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AdminUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [userResult, sessionsResult, auditResult] = await Promise.all([
        fetchUserDetail(id),
        getMockUserSessions(id),
        fetchUserAuditLog(id),
      ]);

      if (!userResult) {
        setError('User not found.');
        return;
      }

      setUser(userResult);
      setSessions(sessionsResult);
      setAuditLogs(auditResult);
    } catch (err) {
      console.error('Failed to fetch user details', err);
      setError('Failed to load user details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tabItems = useMemo(
    () => [
      { value: 'audit', label: 'Audit Log', icon: FileText },
      { value: 'sessions', label: 'Sessions', icon: Monitor },
    ],
    [],
  );

  return (
    <AdminLayout title="User Details">
      {/* Back button */}
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6"
      >
        <ChevronLeft size={16} />
        Back to Users
      </Link>

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <AdminErrorBanner message={error} onRetry={fetchData} />
      ) : user ? (
        <>
          {/* User Header Card */}
          <Card className="p-6 mb-8">
            <div className="flex items-start gap-6">
              {/* Avatar circle with initial */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
                {user.display_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-text-primary">{user.display_name}</h2>
                <p className="text-text-secondary">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                  <StatusBadge status={user.status} />
                  {user.mfa_enabled && <Badge variant="info">MFA Enabled</Badge>}
                  {user.email_verified && <Badge variant="success">Email Verified</Badge>}
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-text-tertiary">
                  <span>Joined {format(new Date(user.created_at), 'MMM d, yyyy')}</span>
                  {user.last_active && (
                    <span>
                      Last active{' '}
                      {formatDistanceToNow(new Date(user.last_active), { addSuffix: true })}
                    </span>
                  )}
                  <span>{user.login_count} logins</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AdminStatCard
              label="Assessments"
              value={user.totalAssessments}
              icon={ClipboardCheck}
              color="text-blue-500"
            />
            <AdminStatCard
              label="Bookmarks"
              value={user.totalBookmarks}
              icon={Bookmark}
              color="text-amber-500"
            />
            <AdminStatCard
              label="Mood Entries"
              value={user.totalMoodEntries}
              icon={Heart}
              color="text-rose-500"
            />
            <AdminStatCard
              label="Last Assessment"
              value={
                user.lastAssessmentDate
                  ? format(new Date(user.lastAssessmentDate), 'MMM d, yyyy')
                  : 'Never'
              }
              icon={Calendar}
              color="text-green-500"
            />
          </div>

          {/* Tabs: Audit Log, Sessions */}
          <AdminTabs tabs={tabItems} defaultValue="audit">
            <AdminTabContent value="audit">
              <AdminDataTable
                columns={auditColumns}
                data={auditLogs}
                pageSize={10}
                emptyState={
                  <AdminEmptyState
                    icon={FileText}
                    title="No audit logs"
                    description="No activity has been recorded for this user yet."
                  />
                }
              />
            </AdminTabContent>

            <AdminTabContent value="sessions">
              <AdminDataTable
                columns={sessionColumns}
                data={sessions}
                pageSize={10}
                emptyState={
                  <AdminEmptyState
                    icon={Monitor}
                    title="No sessions"
                    description="No active sessions found for this user."
                  />
                }
              />
            </AdminTabContent>
          </AdminTabs>
        </>
      ) : null}
    </AdminLayout>
  );
};

export default AdminUserDetailPage;
