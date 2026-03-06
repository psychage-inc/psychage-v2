import { subDays, format, subHours } from 'date-fns';
import type {
  DateRange,
  PlatformHealthMetrics,
  UrgentItem,
  DashboardChartData,
  AdminAnalyticsUserMetrics,
  AdminAnalyticsContentMetrics,
  AdminAnalyticsAssessmentMetrics,
  AdminAnalyticsProviderMetrics,
  AdminArticle,
  AdminExpertReview,
  AdminContentReport,
  ContentQualityMetrics,
  AdminSettings,
  AdminFeatureFlag,
  ConfigHistoryEntry,
  AdminUserDetail,
  UserSession,
} from '@/types/admin';
import type { AdminAuditLog } from '@/lib/api';

// Helper: simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: get day count from range
function getDays(range: DateRange): number {
  switch (range) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    case 'all': return 180;
  }
}

// Helper: generate daily time series
function generateDailySeries(days: number, minVal: number, maxVal: number): { date: string; count: number }[] {
  const result: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    result.push({
      date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
      count: Math.floor(Math.random() * (maxVal - minVal) + minVal),
    });
  }
  return result;
}

// ============================================================
// Dashboard
// ============================================================

export async function getMockPlatformHealth(): Promise<PlatformHealthMetrics> {
  await delay();
  return {
    uptime: '99.97%',
    responseTime: '142ms',
    errorRate: 0.03,
    activeUsers: 847,
    uptimeTrend: 0.01,
    responseTimeTrend: -5,
    errorRateTrend: -0.01,
    activeUsersTrend: 12,
  };
}

export async function getMockUrgentItems(): Promise<UrgentItem[]> {
  await delay();
  return [
    {
      id: 'urg-1',
      type: 'provider_verification',
      title: '3 providers awaiting verification',
      description: 'Credential review needed for new provider applications',
      priority: 'high',
      createdAt: subHours(new Date(), 4).toISOString(),
      actionUrl: '/admin/providers?status=pending',
    },
    {
      id: 'urg-2',
      type: 'content_report',
      title: '2 content reports pending review',
      description: 'Users flagged potentially inaccurate health information',
      priority: 'urgent',
      createdAt: subHours(new Date(), 1).toISOString(),
      actionUrl: '/admin/reports',
    },
    {
      id: 'urg-3',
      type: 'system_alert',
      title: 'Assessment completion rate dropped 8%',
      description: 'Week-over-week decrease in Clarity Score completions',
      priority: 'normal',
      createdAt: subHours(new Date(), 12).toISOString(),
      actionUrl: '/admin/analytics',
    },
  ];
}

export async function getMockDashboardCharts(range: DateRange): Promise<DashboardChartData> {
  await delay(200);
  const days = getDays(range);
  return {
    registrations: generateDailySeries(days, 5, 25),
    assessments: generateDailySeries(days, 10, 40),
    verifications: Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - 1 - i), 'yyyy-MM-dd'),
      approved: Math.floor(Math.random() * 5),
      rejected: Math.floor(Math.random() * 2),
    })),
  };
}

// ============================================================
// Analytics
// ============================================================

export async function getMockUserAnalytics(range: DateRange): Promise<AdminAnalyticsUserMetrics> {
  await delay();
  const days = getDays(range);
  return {
    totalUsers: 4832,
    activeUsersToday: 347,
    newRegistrations7d: 89,
    registrationTrend: 12.5,
    retentionRate: 68.3,
    dailyActiveUsers: generateDailySeries(days, 200, 500),
    registrationsByDay: generateDailySeries(days, 5, 25),
    usersByRole: [
      { role: 'Patient', count: 4120 },
      { role: 'Provider', count: 684 },
      { role: 'Admin', count: 28 },
    ],
    usersByStatus: [
      { status: 'Active', count: 4215 },
      { status: 'Inactive', count: 489 },
      { status: 'Suspended', count: 128 },
    ],
  };
}

export async function getMockContentAnalytics(range: DateRange): Promise<AdminAnalyticsContentMetrics> {
  await delay();
  const days = getDays(range);
  return {
    totalArticles: 156,
    totalViews: 89420,
    avgReadTime: '4m 32s',
    publishedThisMonth: 12,
    viewsByDay: Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - 1 - i), 'yyyy-MM-dd'),
      views: Math.floor(Math.random() * 800 + 200),
    })),
    topArticles: [
      { id: 'art-1', title: 'Understanding Depression: Signs and Treatment', views: 12450, category: 'Depression' },
      { id: 'art-2', title: 'What is PTSD? A Comprehensive Guide', views: 9870, category: 'PTSD' },
      { id: 'art-3', title: 'Anxiety Disorders Explained', views: 8340, category: 'Anxiety' },
      { id: 'art-4', title: 'Bipolar Disorder: Types and Management', views: 7210, category: 'Bipolar' },
      { id: 'art-5', title: 'ADHD in Adults: Recognition and Support', views: 6890, category: 'ADHD' },
      { id: 'art-6', title: 'Schizophrenia: Breaking Down Myths', views: 5430, category: 'Psychosis' },
      { id: 'art-7', title: 'OCD: More Than Just Cleanliness', views: 4980, category: 'OCD' },
      { id: 'art-8', title: 'Eating Disorders: Warning Signs', views: 4520, category: 'Eating Disorders' },
    ],
    viewsByCategory: [
      { category: 'Depression', views: 24500 },
      { category: 'Anxiety', views: 18300 },
      { category: 'PTSD', views: 12800 },
      { category: 'Bipolar', views: 9400 },
      { category: 'ADHD', views: 8200 },
      { category: 'Psychosis', views: 6100 },
      { category: 'OCD', views: 5800 },
      { category: 'Other', views: 4320 },
    ],
  };
}

export async function getMockAssessmentAnalytics(range: DateRange): Promise<AdminAnalyticsAssessmentMetrics> {
  await delay();
  const days = getDays(range);
  return {
    totalAssessments: 12847,
    completionRate: 78.5,
    avgScore: 62.3,
    assessmentsThisWeek: 342,
    assessmentsByDay: generateDailySeries(days, 15, 60),
    scoreDistribution: [
      { range: '0-20', count: 420 },
      { range: '21-40', count: 1850 },
      { range: '41-60', count: 4210 },
      { range: '61-80', count: 3890 },
      { range: '81-100', count: 2477 },
    ],
    completionByDimension: [
      { dimension: 'Cognitive', avgScore: 68.4 },
      { dimension: 'Emotional', avgScore: 54.2 },
      { dimension: 'Social', avgScore: 71.8 },
      { dimension: 'Physical', avgScore: 63.1 },
      { dimension: 'Behavioral', avgScore: 59.7 },
    ],
  };
}

export async function getMockProviderAnalytics(range: DateRange): Promise<AdminAnalyticsProviderMetrics> {
  await delay();
  const days = getDays(range);
  return {
    totalProviders: 684,
    verifiedProviders: 521,
    pendingVerifications: 38,
    avgVerificationTime: '2.4 days',
    providersBySpecialty: [
      { specialty: 'Psychiatry', count: 142 },
      { specialty: 'Clinical Psychology', count: 189 },
      { specialty: 'Counseling', count: 156 },
      { specialty: 'Social Work', count: 98 },
      { specialty: 'Marriage & Family', count: 54 },
      { specialty: 'Addiction', count: 45 },
    ],
    verificationsByDay: Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - 1 - i), 'yyyy-MM-dd'),
      approved: Math.floor(Math.random() * 5),
      rejected: Math.floor(Math.random() * 2),
    })),
    providersByStatus: [
      { status: 'Verified', count: 521 },
      { status: 'Pending', count: 38 },
      { status: 'Suspended', count: 12 },
      { status: 'Expired', count: 113 },
    ],
  };
}

// ============================================================
// Content Management
// ============================================================

export async function getMockArticles(): Promise<AdminArticle[]> {
  await delay();
  const categories = ['Depression', 'Anxiety', 'PTSD', 'Bipolar', 'ADHD', 'OCD', 'Psychosis', 'Eating Disorders'];
  const statuses: AdminArticle['status'][] = ['published', 'draft', 'archived'];
  const authors = ['Dr. Sarah Chen', 'Dr. Michael Torres', 'Dr. Emily Roberts', 'Dr. James Wilson'];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `art-${i + 1}`,
    title: [
      'Understanding Depression: A Complete Guide',
      'Anxiety Disorders Explained',
      'Living with PTSD: Recovery Strategies',
      'Bipolar Disorder Types and Treatment',
      'ADHD in Adults: What You Need to Know',
      'OCD: Beyond the Stereotypes',
      'Psychosis and Schizophrenia Spectrum',
      'Eating Disorders: Early Warning Signs',
      'Managing Panic Attacks',
      'Social Anxiety: Causes and Solutions',
      'Trauma-Informed Care Basics',
      'Sleep and Mental Health Connection',
      'Grief and Loss Processing',
      'Substance Use and Mental Health',
      'Building Resilience: Practical Steps',
    ][i],
    slug: `article-${i + 1}`,
    category: categories[i % categories.length],
    status: i < 10 ? 'published' : statuses[i % statuses.length],
    featured: i < 3,
    author: authors[i % authors.length],
    publishedAt: i < 10 ? subDays(new Date(), i * 5 + 2).toISOString() : null,
    updatedAt: subDays(new Date(), i * 2).toISOString(),
    views: Math.floor(Math.random() * 10000 + 500),
  }));
}

export async function getMockExpertReviews(): Promise<AdminExpertReview[]> {
  await delay();
  const statuses: AdminExpertReview['status'][] = ['pending', 'approved', 'rejected', 'revision_requested'];
  return [
    { id: 'rev-1', articleId: 'art-1', articleTitle: 'Understanding Depression', reviewerName: 'Dr. Lisa Park', reviewerCredentials: 'MD, Psychiatry', status: 'pending', submittedAt: subDays(new Date(), 2).toISOString() },
    { id: 'rev-2', articleId: 'art-2', articleTitle: 'Anxiety Disorders Explained', reviewerName: 'Dr. Robert Kim', reviewerCredentials: 'PhD, Clinical Psychology', status: 'approved', submittedAt: subDays(new Date(), 5).toISOString(), reviewNotes: 'Clinically accurate and well-referenced.' },
    { id: 'rev-3', articleId: 'art-3', articleTitle: 'Living with PTSD', reviewerName: 'Dr. Maria Garcia', reviewerCredentials: 'PsyD, Trauma Specialist', status: 'pending', submittedAt: subDays(new Date(), 1).toISOString() },
    { id: 'rev-4', articleId: 'art-7', articleTitle: 'Psychosis and Schizophrenia', reviewerName: 'Dr. David Nguyen', reviewerCredentials: 'MD, Psychiatry', status: 'revision_requested', submittedAt: subDays(new Date(), 8).toISOString(), reviewNotes: 'Needs updated DSM-5-TR criteria references.' },
    { id: 'rev-5', articleId: 'art-5', articleTitle: 'ADHD in Adults', reviewerName: 'Dr. Sarah Ahmed', reviewerCredentials: 'MD, Psychiatry', status: 'rejected', submittedAt: subDays(new Date(), 12).toISOString(), reviewNotes: 'Contains outdated treatment recommendations.' },
    { id: 'rev-6', articleId: 'art-8', articleTitle: 'Eating Disorders', reviewerName: 'Dr. Jennifer Lee', reviewerCredentials: 'PhD, Clinical Psychology', status: 'pending', submittedAt: subDays(new Date(), 3).toISOString() },
    { id: 'rev-7', articleId: 'art-4', articleTitle: 'Bipolar Disorder Types', reviewerName: 'Dr. Thomas Brown', reviewerCredentials: 'MD, Psychiatry', status: 'approved', submittedAt: subDays(new Date(), 15).toISOString() },
    { id: 'rev-8', articleId: 'art-6', articleTitle: 'OCD: Beyond Stereotypes', reviewerName: 'Dr. Rachel Green', reviewerCredentials: 'PsyD, OCD Specialist', status: statuses[0], submittedAt: subDays(new Date(), 4).toISOString() },
  ];
}

export async function getMockContentReports(): Promise<AdminContentReport[]> {
  await delay();
  return [
    { id: 'cr-1', contentId: 'art-7', contentTitle: 'Psychosis and Schizophrenia Spectrum', contentType: 'article', reason: 'Potentially triggering content without adequate warning', reporterEmail: 'user1@example.com', status: 'pending', createdAt: subDays(new Date(), 1).toISOString() },
    { id: 'cr-2', contentId: 'art-14', contentTitle: 'Substance Use and Mental Health', contentType: 'article', reason: 'Inaccurate statistics cited', reporterEmail: 'user2@example.com', status: 'pending', createdAt: subDays(new Date(), 2).toISOString() },
    { id: 'cr-3', contentId: 'prov-23', contentTitle: 'Dr. Smith Profile', contentType: 'provider_profile', reason: 'Unverified credentials listed', reporterEmail: 'user3@example.com', status: 'reviewed', createdAt: subDays(new Date(), 5).toISOString() },
    { id: 'cr-4', contentId: 'art-3', contentTitle: 'Living with PTSD', contentType: 'article', reason: 'Missing crisis resources for veterans', reporterEmail: 'user4@example.com', status: 'action_taken', createdAt: subDays(new Date(), 8).toISOString() },
    { id: 'cr-5', contentId: 'cmt-45', contentTitle: 'Comment on Depression article', contentType: 'comment', reason: 'Promoting unproven treatment methods', reporterEmail: 'user5@example.com', status: 'dismissed', createdAt: subDays(new Date(), 10).toISOString() },
    { id: 'cr-6', contentId: 'art-9', contentTitle: 'Managing Panic Attacks', contentType: 'article', reason: 'Advice contradicts clinical guidelines', reporterEmail: 'user6@example.com', status: 'pending', createdAt: subDays(new Date(), 1).toISOString() },
  ];
}

export async function getMockContentQuality(): Promise<ContentQualityMetrics> {
  await delay();
  return {
    avgQualityScore: 84.2,
    articlesNeedingUpdate: 14,
    staleArticles: 8,
    freshArticles: 134,
    articlesByFreshness: [
      { range: 'Fresh (< 30d)', count: 42 },
      { range: 'Recent (30-90d)', count: 58 },
      { range: 'Aging (90-180d)', count: 34 },
      { range: 'Stale (180d+)', count: 22 },
    ],
    qualityDistribution: [
      { score: '90-100', count: 28 },
      { score: '80-89', count: 52 },
      { score: '70-79', count: 41 },
      { score: '60-69', count: 23 },
      { score: 'Below 60', count: 12 },
    ],
  };
}

// ============================================================
// Settings
// ============================================================

export async function getMockSettings(): Promise<AdminSettings> {
  await delay();
  return {
    general: {
      platformName: 'Psychage',
      supportEmail: 'support@psychage.com',
      maintenanceMode: false,
      maxUploadSizeMb: 10,
    },
    assessment: {
      maxQuestionsPerSession: 25,
      cooldownHours: 24,
      showDetailedResults: true,
      requireAuth: false,
    },
    provider: {
      autoApprove: false,
      requireNPI: true,
      maxSpecialties: 5,
      verificationExpiryDays: 365,
    },
    email: {
      welcomeEmailEnabled: true,
      weeklyDigestEnabled: false,
      providerNotificationsEnabled: true,
      fromAddress: 'noreply@psychage.com',
    },
    security: {
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 60,
      requireMFA: false,
      passwordMinLength: 8,
      allowSocialLogin: true,
    },
  };
}

export async function getMockFeatureFlags(): Promise<AdminFeatureFlag[]> {
  await delay();
  return [
    { id: 'ff-1', key: 'mindmate_ai', name: 'MindMate AI Chat', description: 'AI-powered mental health chatbot', enabled: true, lastModified: subDays(new Date(), 30).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-2', key: 'provider_directory', name: 'Provider Directory', description: 'Find and connect with mental health providers', enabled: true, lastModified: subDays(new Date(), 45).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-3', key: 'mood_journal', name: 'Mood Journal', description: 'Daily mood tracking and journaling', enabled: true, lastModified: subDays(new Date(), 20).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-4', key: 'sleep_tracker', name: 'Sleep Architect', description: 'Sleep quality tracking and analysis', enabled: true, lastModified: subDays(new Date(), 15).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-5', key: 'clarity_score', name: 'Clarity Score', description: 'Cognitive wellness assessment tool', enabled: true, lastModified: subDays(new Date(), 10).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-6', key: 'symptom_navigator', name: 'Symptom Navigator', description: 'Guided symptom assessment and condition matching', enabled: true, lastModified: subDays(new Date(), 5).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-7', key: 'dark_mode', name: 'Dark Mode', description: 'Application-wide dark theme support', enabled: true, lastModified: subDays(new Date(), 60).toISOString(), modifiedBy: 'admin@psychage.com' },
    { id: 'ff-8', key: 'beta_features', name: 'Beta Features', description: 'Early access to upcoming features', enabled: false, scheduledAt: subDays(new Date(), -14).toISOString(), lastModified: subDays(new Date(), 2).toISOString(), modifiedBy: 'admin@psychage.com' },
  ];
}

export async function getMockConfigHistory(): Promise<ConfigHistoryEntry[]> {
  await delay();
  return [
    { id: 'ch-1', section: 'Security', key: 'maxLoginAttempts', previousValue: '3', newValue: '5', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 1).toISOString(), canRollback: true },
    { id: 'ch-2', section: 'Feature Flags', key: 'symptom_navigator', previousValue: 'disabled', newValue: 'enabled', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 5).toISOString(), canRollback: true },
    { id: 'ch-3', section: 'Email', key: 'weeklyDigestEnabled', previousValue: 'true', newValue: 'false', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 7).toISOString(), canRollback: true },
    { id: 'ch-4', section: 'Assessment', key: 'cooldownHours', previousValue: '12', newValue: '24', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 10).toISOString(), canRollback: true },
    { id: 'ch-5', section: 'Provider', key: 'verificationExpiryDays', previousValue: '180', newValue: '365', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 14).toISOString(), canRollback: true },
    { id: 'ch-6', section: 'General', key: 'platformName', previousValue: 'Psychage Beta', newValue: 'Psychage', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 21).toISOString(), canRollback: false },
    { id: 'ch-7', section: 'Security', key: 'passwordMinLength', previousValue: '6', newValue: '8', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 25).toISOString(), canRollback: true },
    { id: 'ch-8', section: 'Feature Flags', key: 'beta_features', previousValue: 'enabled', newValue: 'disabled', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 28).toISOString(), canRollback: true },
    { id: 'ch-9', section: 'Email', key: 'fromAddress', previousValue: 'hello@psychage.com', newValue: 'noreply@psychage.com', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 35).toISOString(), canRollback: true },
    { id: 'ch-10', section: 'Provider', key: 'requireNPI', previousValue: 'false', newValue: 'true', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 42).toISOString(), canRollback: true },
    { id: 'ch-11', section: 'Assessment', key: 'maxQuestionsPerSession', previousValue: '20', newValue: '25', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 50).toISOString(), canRollback: true },
    { id: 'ch-12', section: 'Security', key: 'sessionTimeoutMinutes', previousValue: '30', newValue: '60', changedBy: 'admin@psychage.com', changedAt: subDays(new Date(), 55).toISOString(), canRollback: true },
  ];
}

// ============================================================
// User Detail
// ============================================================

const MOCK_USER_DETAILS: Record<string, AdminUserDetail> = {
  'usr-001': { id: 'usr-001', email: 'alice@example.com', display_name: 'Alice Johnson', role: 'patient', status: 'active', created_at: '2025-08-15T10:00:00Z', last_active: '2026-03-05T14:30:00Z', email_verified: true, mfa_enabled: false, login_count: 142, totalAssessments: 8, totalBookmarks: 23, totalMoodEntries: 67, lastAssessmentDate: '2026-03-01T09:00:00Z' },
  'usr-002': { id: 'usr-002', email: 'bob@example.com', display_name: 'Bob Smith', role: 'provider', status: 'active', created_at: '2025-09-20T08:00:00Z', last_active: '2026-03-04T09:15:00Z', email_verified: true, mfa_enabled: true, login_count: 310, totalAssessments: 0, totalBookmarks: 5, totalMoodEntries: 0 },
  'usr-003': { id: 'usr-003', email: 'carol@example.com', display_name: 'Carol Davis', role: 'patient', status: 'active', created_at: '2025-10-01T12:00:00Z', last_active: '2026-02-28T17:45:00Z', email_verified: true, mfa_enabled: false, login_count: 89, totalAssessments: 5, totalBookmarks: 12, totalMoodEntries: 34, lastAssessmentDate: '2026-02-20T11:00:00Z' },
  'usr-004': { id: 'usr-004', email: 'dave@example.com', display_name: 'Dave Wilson', role: 'admin', status: 'active', created_at: '2025-06-01T08:00:00Z', last_active: '2026-03-06T08:00:00Z', email_verified: true, mfa_enabled: true, login_count: 523, totalAssessments: 2, totalBookmarks: 0, totalMoodEntries: 0 },
  'usr-005': { id: 'usr-005', email: 'eve@example.com', display_name: 'Eve Martinez', role: 'patient', status: 'inactive', created_at: '2025-11-10T15:00:00Z', last_active: '2026-01-05T11:20:00Z', email_verified: true, mfa_enabled: false, login_count: 34, totalAssessments: 2, totalBookmarks: 8, totalMoodEntries: 15, lastAssessmentDate: '2025-12-15T14:00:00Z' },
  'usr-006': { id: 'usr-006', email: 'frank@example.com', display_name: 'Frank Thompson', role: 'provider', status: 'suspended', created_at: '2025-12-20T09:00:00Z', last_active: '2026-02-10T16:00:00Z', email_verified: true, mfa_enabled: false, login_count: 78, totalAssessments: 0, totalBookmarks: 2, totalMoodEntries: 0 },
  'usr-007': { id: 'usr-007', email: 'grace@example.com', display_name: 'Grace Lee', role: 'patient', status: 'active', created_at: '2026-01-05T14:00:00Z', last_active: '2026-03-06T07:30:00Z', email_verified: true, mfa_enabled: false, login_count: 56, totalAssessments: 3, totalBookmarks: 18, totalMoodEntries: 42, lastAssessmentDate: '2026-03-04T10:00:00Z' },
  'usr-008': { id: 'usr-008', email: 'henry@example.com', display_name: 'Henry Brown', role: 'patient', status: 'active', created_at: '2026-01-15T11:00:00Z', last_active: '2026-03-03T19:00:00Z', email_verified: false, mfa_enabled: false, login_count: 28, totalAssessments: 1, totalBookmarks: 4, totalMoodEntries: 12, lastAssessmentDate: '2026-02-10T16:00:00Z' },
};

export async function getMockUserDetail(id: string): Promise<AdminUserDetail | null> {
  await delay();
  return MOCK_USER_DETAILS[id] || null;
}

export async function getMockUserSessions(userId: string): Promise<UserSession[]> {
  await delay();
  void userId;
  const browsers = ['Chrome 122', 'Firefox 123', 'Safari 17', 'Edge 122', 'Chrome 121'];
  const oses = ['macOS 14.3', 'Windows 11', 'iOS 17.3', 'Android 14', 'Ubuntu 22.04'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL'];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `sess-${i + 1}`,
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    userAgent: `Mozilla/5.0 (${oses[i % oses.length]})`,
    browser: browsers[i % browsers.length],
    os: oses[i % oses.length],
    location: locations[i % locations.length],
    startedAt: subHours(new Date(), i * 24 + Math.floor(Math.random() * 12)).toISOString(),
    lastActiveAt: subHours(new Date(), i * 24).toISOString(),
    isCurrentSession: i === 0,
  }));
}

export async function getMockUserAuditLog(userId: string): Promise<AdminAuditLog[]> {
  await delay();
  void userId;
  const actions = ['login', 'assessment_completed', 'profile_updated', 'password_changed', 'bookmark_added', 'mood_entry_created', 'settings_updated', 'logout'];
  return Array.from({ length: 15 }, (_, i) => ({
    id: `audit-user-${i + 1}`,
    created_at: subHours(new Date(), i * 12 + Math.floor(Math.random() * 6)).toISOString(),
    user_id: userId,
    action: actions[i % actions.length],
    details: `User performed ${actions[i % actions.length].replace(/_/g, ' ')}`,
  }));
}
