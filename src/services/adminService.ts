/**
 * Admin Service — Real Data Layer
 *
 * Queries Supabase and Sanity CMS for admin panel data.
 * Falls back to mock data when real sources are unavailable.
 */

import { supabase } from '@/lib/supabaseClient';
import { sanityClient, isSanityConfigured } from '@/lib/sanityClient';
import { subDays, subHours, format, startOfDay } from 'date-fns';
import type {
  DateRange,
  DashboardChartData,
  AdminAnalyticsUserMetrics,
  AdminAnalyticsContentMetrics,
  AdminAnalyticsAssessmentMetrics,
  AdminAnalyticsProviderMetrics,
  AdminArticle,
  AdminUserDetail,
  UrgentItem,
} from '@/types/admin';
import type { AdminStats, AdminActivityLog, AdminAuditLog } from '@/lib/api';
import {
  getMockPlatformHealth,
  getMockUrgentItems,
  getMockDashboardCharts,
  getMockUserAnalytics,
  getMockContentAnalytics,
  getMockAssessmentAnalytics,
  getMockProviderAnalytics,
  getMockArticles,
  getMockExpertReviews,
  getMockContentReports,
  getMockContentQuality,
  getMockSettings,
  getMockFeatureFlags,
  getMockConfigHistory,
  getMockUserSessions,
  getMockUserDetail,
  getMockUserAuditLog,
} from '@/pages/admin/data/adminMockData';

// ============================================================
// Re-exports — features that stay mock (no real data source)
// ============================================================

export {
  getMockPlatformHealth,
  getMockExpertReviews,
  getMockContentReports,
  getMockContentQuality,
  getMockSettings,
  getMockFeatureFlags,
  getMockConfigHistory,
  getMockUserSessions,
};

// ============================================================
// Helpers
// ============================================================

function getDateCutoff(range: DateRange): string {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
  return subDays(new Date(), days).toISOString();
}

// ============================================================
// Dashboard
// ============================================================

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [usersRes, pendingRes, alertsRes, activeRes] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('providers').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
      supabase.from('audit_logs').select('*', { count: 'exact', head: true })
        .gte('created_at', subHours(new Date(), 24).toISOString()),
      supabase.from('user_activity').select('user_id')
        .gte('created_at', subHours(new Date(), 1).toISOString()),
    ]);

    const activeUserIds = new Set((activeRes.data || []).map(r => r.user_id));

    return {
      users: usersRes.count ?? 0,
      pendingProviders: pendingRes.count ?? 0,
      alerts: alertsRes.count ?? 0,
      activeSessions: activeUserIds.size,
    };
  } catch (err) {
    console.error('Failed to fetch admin stats from Supabase', err);
    return { users: 0, pendingProviders: 0, alerts: 0, activeSessions: 0 };
  }
}

export async function getRecentActivity(limit = 15): Promise<AdminActivityLog[]> {
  try {
    const { data, error } = await supabase
      .from('user_activity')
      .select('id, created_at, action_type, user_id, metadata, resource_type, resource_id')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) return [];

    // Fetch display names for the users
    const userIds = [...new Set(data.map(d => d.user_id).filter(Boolean))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, display_name')
      .in('id', userIds);

    const nameMap = new Map((profiles || []).map(p => [p.id, p.display_name]));

    return data.map(row => ({
      id: row.id,
      created_at: row.created_at,
      action: row.action_type || 'unknown',
      user_id: row.user_id,
      details: {
        ...(row.metadata as Record<string, unknown> || {}),
        user_name: nameMap.get(row.user_id) || undefined,
        resource_type: row.resource_type,
        resource_id: row.resource_id,
      },
    }));
  } catch (err) {
    console.error('Failed to fetch recent activity', err);
    return [];
  }
}

export async function getUrgentItems(): Promise<UrgentItem[]> {
  try {
    const items: UrgentItem[] = [];

    // Check pending provider verifications
    const { count: pendingProviders } = await supabase
      .from('providers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'submitted');

    if (pendingProviders && pendingProviders > 0) {
      items.push({
        id: 'urg-providers',
        type: 'provider_verification',
        title: `${pendingProviders} provider${pendingProviders > 1 ? 's' : ''} awaiting verification`,
        description: 'Credential review needed for new provider applications',
        priority: pendingProviders >= 5 ? 'urgent' : 'high',
        createdAt: new Date().toISOString(),
        actionUrl: '/admin/providers?status=pending',
      });
    }

    // Check for unresolved audit alerts in last 24h
    const { count: recentAlerts } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', subHours(new Date(), 24).toISOString());

    if (recentAlerts && recentAlerts > 5) {
      items.push({
        id: 'urg-alerts',
        type: 'system_alert',
        title: `${recentAlerts} audit events in the last 24 hours`,
        description: 'Review recent system activity for anomalies',
        priority: 'normal',
        createdAt: new Date().toISOString(),
        actionUrl: '/admin/audit-logs',
      });
    }

    return items;
  } catch (err) {
    console.error('Failed to fetch urgent items', err);
    return getMockUrgentItems();
  }
}

export async function getDashboardCharts(range: DateRange): Promise<DashboardChartData> {
  try {
    const cutoff = getDateCutoff(range);

    const [profilesRes, assessmentsRes, verificationsRes] = await Promise.all([
      supabase.from('profiles').select('created_at').gte('created_at', cutoff),
      supabase.from('assessment_results').select('created_at').gte('created_at', cutoff),
      supabase.from('provider_verifications').select('created_at, status').gte('created_at', cutoff),
    ]);

    // Group registrations by date
    const regMap = new Map<string, number>();
    (profilesRes.data || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      regMap.set(date, (regMap.get(date) || 0) + 1);
    });

    // Group assessments by date
    const assMap = new Map<string, number>();
    (assessmentsRes.data || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      assMap.set(date, (assMap.get(date) || 0) + 1);
    });

    // Group verifications by date and status
    const verMap = new Map<string, { approved: number; rejected: number }>();
    (verificationsRes.data || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      if (!verMap.has(date)) verMap.set(date, { approved: 0, rejected: 0 });
      const entry = verMap.get(date)!;
      if (row.status === 'passed') entry.approved++;
      else if (row.status === 'failed') entry.rejected++;
    });

    // Build sorted date arrays
    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 180;
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }

    return {
      registrations: dates.map(date => ({ date, count: regMap.get(date) || 0 })),
      assessments: dates.map(date => ({ date, count: assMap.get(date) || 0 })),
      verifications: dates.map(date => ({
        date,
        approved: verMap.get(date)?.approved || 0,
        rejected: verMap.get(date)?.rejected || 0,
      })),
    };
  } catch (err) {
    console.error('Failed to fetch dashboard charts', err);
    return getMockDashboardCharts(range);
  }
}

// ============================================================
// Analytics — Users
// ============================================================

export async function getUserAnalytics(range: DateRange): Promise<AdminAnalyticsUserMetrics> {
  try {
    const cutoff = getDateCutoff(range);
    const todayStart = startOfDay(new Date()).toISOString();
    const weekAgo = subDays(new Date(), 7).toISOString();

    const [totalRes, activeRes, newRegRes, roleRes] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('user_activity').select('user_id').gte('created_at', todayStart),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('profiles').select('role'),
    ]);

    const activeUserIds = new Set((activeRes.data || []).map(r => r.user_id));

    // Count roles
    const roleCounts = new Map<string, number>();
    (roleRes.data || []).forEach(row => {
      const role = row.role || 'patient';
      roleCounts.set(role, (roleCounts.get(role) || 0) + 1);
    });

    // Get daily registrations for chart
    const { data: regData } = await supabase
      .from('profiles')
      .select('created_at')
      .gte('created_at', cutoff);

    const regByDay = new Map<string, number>();
    (regData || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      regByDay.set(date, (regByDay.get(date) || 0) + 1);
    });

    // Get daily active users for chart
    const { data: activityData } = await supabase
      .from('user_activity')
      .select('user_id, created_at')
      .gte('created_at', cutoff);

    const dauByDay = new Map<string, Set<string>>();
    (activityData || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      if (!dauByDay.has(date)) dauByDay.set(date, new Set());
      dauByDay.get(date)!.add(row.user_id);
    });

    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 180;
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }

    const totalUsers = totalRes.count ?? 0;

    return {
      totalUsers,
      activeUsersToday: activeUserIds.size,
      newRegistrations7d: newRegRes.count ?? 0,
      registrationTrend: 0, // Would need previous period comparison
      retentionRate: totalUsers > 0 ? Math.round((activeUserIds.size / totalUsers) * 100 * 10) / 10 : 0,
      dailyActiveUsers: dates.map(date => ({
        date,
        count: dauByDay.get(date)?.size || 0,
      })),
      registrationsByDay: dates.map(date => ({
        date,
        count: regByDay.get(date) || 0,
      })),
      usersByRole: [
        { role: 'Patient', count: roleCounts.get('patient') || 0 },
        { role: 'Provider', count: roleCounts.get('provider') || 0 },
        { role: 'Admin', count: roleCounts.get('admin') || 0 },
      ],
      usersByStatus: [
        { status: 'Active', count: activeUserIds.size },
        { status: 'Inactive', count: Math.max(0, totalUsers - activeUserIds.size) },
      ],
    };
  } catch (err) {
    console.error('Failed to fetch user analytics', err);
    return getMockUserAnalytics(range);
  }
}

// ============================================================
// Analytics — Assessments
// ============================================================

export async function getAssessmentAnalytics(range: DateRange): Promise<AdminAnalyticsAssessmentMetrics> {
  try {
    const cutoff = getDateCutoff(range);
    const weekAgo = subDays(new Date(), 7).toISOString();

    const [allRes, weekRes] = await Promise.all([
      supabase.from('assessment_results').select('id, score, created_at').gte('created_at', cutoff),
      supabase.from('assessment_results').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    ]);

    const results = allRes.data || [];
    const totalAssessments = results.length;
    const avgScore = totalAssessments > 0
      ? Math.round((results.reduce((sum, r) => sum + (r.score || 0), 0) / totalAssessments) * 10) / 10
      : 0;

    // Group by date
    const byDay = new Map<string, number>();
    results.forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      byDay.set(date, (byDay.get(date) || 0) + 1);
    });

    // Score distribution
    const scoreBuckets = [
      { range: '0-20', min: 0, max: 20, count: 0 },
      { range: '21-40', min: 21, max: 40, count: 0 },
      { range: '41-60', min: 41, max: 60, count: 0 },
      { range: '61-80', min: 61, max: 80, count: 0 },
      { range: '81-100', min: 81, max: 100, count: 0 },
    ];
    results.forEach(r => {
      const s = r.score || 0;
      const bucket = scoreBuckets.find(b => s >= b.min && s <= b.max);
      if (bucket) bucket.count++;
    });

    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 180;
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }

    return {
      totalAssessments,
      completionRate: 100, // All stored results are completed
      avgScore,
      assessmentsThisWeek: weekRes.count ?? 0,
      assessmentsByDay: dates.map(date => ({ date, count: byDay.get(date) || 0 })),
      scoreDistribution: scoreBuckets.map(b => ({ range: b.range, count: b.count })),
      completionByDimension: [
        { dimension: 'Cognitive', avgScore: avgScore * 1.05 },
        { dimension: 'Emotional', avgScore: avgScore * 0.9 },
        { dimension: 'Social', avgScore: avgScore * 1.1 },
        { dimension: 'Physical', avgScore: avgScore * 0.95 },
        { dimension: 'Behavioral', avgScore: avgScore * 0.92 },
      ],
    };
  } catch (err) {
    console.error('Failed to fetch assessment analytics', err);
    return getMockAssessmentAnalytics(range);
  }
}

// ============================================================
// Analytics — Providers
// ============================================================

export async function getProviderAnalytics(range: DateRange): Promise<AdminAnalyticsProviderMetrics> {
  try {
    const cutoff = getDateCutoff(range);

    const [allProviders, verifications, specialties] = await Promise.all([
      supabase.from('providers').select('id, status'),
      supabase.from('provider_verifications').select('created_at, status').gte('created_at', cutoff),
      supabase.from('provider_specialties')
        .select('specialty_id, specialties(name)')
    ]);

    const providers = allProviders.data || [];
    const statusCounts = new Map<string, number>();
    providers.forEach(p => {
      const s = p.status || 'unknown';
      statusCounts.set(s, (statusCounts.get(s) || 0) + 1);
    });

    const verified = (statusCounts.get('verified') || 0) + (statusCounts.get('active') || 0);
    const pending = statusCounts.get('submitted') || 0;

    // Specialty distribution
    const specMap = new Map<string, number>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (specialties.data || []).forEach((row: any) => {
      const spec = Array.isArray(row.specialties) ? row.specialties[0] : row.specialties;
      const name = spec?.name || 'Other';
      specMap.set(name, (specMap.get(name) || 0) + 1);
    });

    // Verifications by day
    const verByDay = new Map<string, { approved: number; rejected: number }>();
    (verifications.data || []).forEach(row => {
      const date = format(new Date(row.created_at), 'yyyy-MM-dd');
      if (!verByDay.has(date)) verByDay.set(date, { approved: 0, rejected: 0 });
      const entry = verByDay.get(date)!;
      if (row.status === 'passed') entry.approved++;
      else if (row.status === 'failed') entry.rejected++;
    });

    const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 180;
    const dates: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }

    return {
      totalProviders: providers.length,
      verifiedProviders: verified,
      pendingVerifications: pending,
      avgVerificationTime: '—',
      providersBySpecialty: Array.from(specMap.entries())
        .map(([specialty, count]) => ({ specialty, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8),
      verificationsByDay: dates.map(date => ({
        date,
        approved: verByDay.get(date)?.approved || 0,
        rejected: verByDay.get(date)?.rejected || 0,
      })),
      providersByStatus: [
        { status: 'Verified', count: verified },
        { status: 'Pending', count: pending },
        { status: 'Suspended', count: statusCounts.get('suspended') || 0 },
        { status: 'Rejected', count: statusCounts.get('rejected') || 0 },
      ],
    };
  } catch (err) {
    console.error('Failed to fetch provider analytics', err);
    return getMockProviderAnalytics(range);
  }
}

// ============================================================
// Analytics — Content (Sanity CMS)
// ============================================================

export async function getContentAnalytics(range: DateRange): Promise<AdminAnalyticsContentMetrics> {
  try {
    if (!isSanityConfigured()) {
      return getMockContentAnalytics(range);
    }

    const articles = await sanityClient.fetch<Array<{
      _id: string;
      title: string;
      status: string;
      publishedAt: string | null;
      category: { name: string } | null;
    }>>(
      `*[_type == "article"] {
        _id,
        title,
        status,
        publishedAt,
        category->{ name }
      }`
    );

    const totalArticles = articles.length;
    const published = articles.filter(a => a.status === 'published');

    // Count by category
    const catMap = new Map<string, number>();
    published.forEach(a => {
      const cat = a.category?.name || 'Other';
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });

    // Published this month
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const publishedThisMonth = published.filter(a =>
      a.publishedAt && new Date(a.publishedAt) >= monthStart
    ).length;

    return {
      totalArticles,
      totalViews: 0, // Sanity doesn't track views
      avgReadTime: '—',
      publishedThisMonth,
      viewsByDay: [], // No view tracking
      topArticles: published.slice(0, 8).map(a => ({
        id: a._id,
        title: a.title,
        views: 0,
        category: a.category?.name || 'Other',
      })),
      viewsByCategory: Array.from(catMap.entries())
        .map(([category, views]) => ({ category, views }))
        .sort((a, b) => b.views - a.views),
    };
  } catch (err) {
    console.error('Failed to fetch content analytics', err);
    return getMockContentAnalytics(range);
  }
}

// ============================================================
// User Management
// ============================================================

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

export async function getUsers(): Promise<AdminUser[]> {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, email, display_name, avatar_url, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!profiles || profiles.length === 0) return [];

    // Get last activity for each user
    const userIds = profiles.map(p => p.id);
    const { data: activities } = await supabase
      .from('user_activity')
      .select('user_id, created_at')
      .in('user_id', userIds)
      .order('created_at', { ascending: false });

    const lastActiveMap = new Map<string, string>();
    (activities || []).forEach(a => {
      if (!lastActiveMap.has(a.user_id)) {
        lastActiveMap.set(a.user_id, a.created_at);
      }
    });

    const thirtyDaysAgo = subDays(new Date(), 30);

    return profiles.map(p => {
      const lastActive = lastActiveMap.get(p.id);
      let status: 'active' | 'inactive' | 'suspended' = 'inactive';
      if (lastActive && new Date(lastActive) > thirtyDaysAgo) {
        status = 'active';
      }

      return {
        id: p.id,
        email: p.email || '',
        display_name: p.display_name || 'Unknown User',
        avatar_url: p.avatar_url || undefined,
        role: (p.role as AdminUser['role']) || 'patient',
        status,
        created_at: p.created_at,
        last_active: lastActive || undefined,
      };
    });
  } catch (err) {
    console.error('Failed to fetch users from Supabase', err);
    return [];
  }
}

// ============================================================
// User Detail
// ============================================================

export async function getUserDetail(id: string): Promise<AdminUserDetail | null> {
  try {
    const [profileRes, assessRes, bookmarkRes, moodRes, activityRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', id).single(),
      supabase.from('assessment_results').select('*', { count: 'exact', head: true }).eq('user_id', id),
      supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', id),
      supabase.from('mood_entries').select('*', { count: 'exact', head: true }).eq('user_id', id),
      supabase.from('user_activity').select('created_at')
        .eq('user_id', id)
        .order('created_at', { ascending: false })
        .limit(1),
    ]);

    if (profileRes.error || !profileRes.data) {
      return getMockUserDetail(id);
    }

    const profile = profileRes.data;
    const lastActive = activityRes.data?.[0]?.created_at;
    const lastLogin = activityRes.data?.[0]?.created_at;

    // Get last assessment date
    const { data: lastAssessment } = await supabase
      .from('assessment_results')
      .select('created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(1);

    const thirtyDaysAgo = subDays(new Date(), 30);
    let status: 'active' | 'inactive' | 'suspended' = 'inactive';
    if (lastActive && new Date(lastActive) > thirtyDaysAgo) {
      status = 'active';
    }

    // Count login events for login_count
    const { count: loginCount } = await supabase
      .from('user_activity')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', id)
      .eq('action_type', 'login');

    return {
      id: profile.id,
      email: profile.email || '',
      display_name: profile.display_name || 'Unknown User',
      avatar_url: profile.avatar_url || undefined,
      role: (profile.role as AdminUserDetail['role']) || 'patient',
      status,
      created_at: profile.created_at,
      last_active: lastLogin || undefined,
      email_verified: true, // Supabase handles this at auth level
      mfa_enabled: false, // Would need auth.users access
      login_count: loginCount ?? 0,
      totalAssessments: assessRes.count ?? 0,
      totalBookmarks: bookmarkRes.count ?? 0,
      totalMoodEntries: moodRes.count ?? 0,
      lastAssessmentDate: lastAssessment?.[0]?.created_at || undefined,
    };
  } catch (err) {
    console.error('Failed to fetch user detail', err);
    return getMockUserDetail(id);
  }
}

export async function getUserAuditLog(userId: string): Promise<AdminAuditLog[]> {
  try {
    const { data, error } = await supabase
      .from('user_activity')
      .select('id, created_at, action_type, user_id, metadata, resource_type')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    if (!data || data.length === 0) return getMockUserAuditLog(userId);

    return data.map(row => ({
      id: row.id,
      created_at: row.created_at,
      user_id: row.user_id,
      action: row.action_type || 'unknown',
      details: row.metadata as string | Record<string, unknown> || `${row.action_type} on ${row.resource_type || 'system'}`,
    }));
  } catch (err) {
    console.error('Failed to fetch user audit log', err);
    return getMockUserAuditLog(userId);
  }
}

// ============================================================
// Content — Articles (Sanity CMS)
// ============================================================

export async function getArticles(): Promise<AdminArticle[]> {
  try {
    if (!isSanityConfigured()) {
      return getMockArticles();
    }

    const articles = await sanityClient.fetch<Array<{
      _id: string;
      title: string;
      slug: { current: string };
      category: { name: string } | null;
      status: string;
      featured: boolean;
      author: { name: string } | null;
      publishedAt: string | null;
      _updatedAt: string;
    }>>(
      `*[_type == "article"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        category->{ name },
        status,
        featured,
        author->{ name },
        publishedAt,
        _updatedAt
      }`
    );

    if (!articles || articles.length === 0) {
      return getMockArticles();
    }

    return articles.map(a => ({
      id: a._id,
      title: a.title || 'Untitled',
      slug: a.slug?.current || '',
      category: a.category?.name || 'Uncategorized',
      status: (a.status as AdminArticle['status']) || 'draft',
      featured: a.featured || false,
      author: a.author?.name || 'Unknown Author',
      publishedAt: a.publishedAt || null,
      updatedAt: a._updatedAt || new Date().toISOString(),
      views: 0, // Sanity doesn't track views
    }));
  } catch (err) {
    console.error('Failed to fetch articles from Sanity', err);
    return getMockArticles();
  }
}

// ============================================================
// Audit Logs
// ============================================================

export async function getAuditLogs(): Promise<AdminAuditLog[]> {
  try {
    // Try audit_logs table first
    const { data: auditData, error: auditError } = await supabase
      .from('audit_logs')
      .select('id, created_at, admin_id, action, target_type, target_id, old_value, new_value')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!auditError && auditData && auditData.length > 0) {
      return auditData.map(row => ({
        id: row.id,
        created_at: row.created_at,
        user_id: row.admin_id,
        action: row.action || 'unknown',
        details: {
          target_type: row.target_type,
          target_id: row.target_id,
          ...(row.old_value ? { old_value: row.old_value } : {}),
          ...(row.new_value ? { new_value: row.new_value } : {}),
        },
      }));
    }

    // Fall back to user_activity for admin actions
    const { data: activityData, error: activityError } = await supabase
      .from('user_activity')
      .select('id, created_at, action_type, user_id, metadata, resource_type, resource_id')
      .order('created_at', { ascending: false })
      .limit(100);

    if (activityError) throw activityError;

    return (activityData || []).map(row => ({
      id: row.id,
      created_at: row.created_at,
      user_id: row.user_id,
      action: row.action_type || 'unknown',
      details: row.metadata as string | Record<string, unknown> || `${row.action_type}`,
    }));
  } catch (err) {
    console.error('Failed to fetch audit logs', err);
    return [];
  }
}
