// ============================================================
// Admin Panel Types — Psychage v2
// Comprehensive type definitions for the admin panel expansion
// ============================================================

// === Shared ===

export type DateRange = '7d' | '30d' | '90d' | 'all';

export interface DateRangeOption {
  label: string;
  value: DateRange;
}

// === Dashboard Enhancement ===

export interface PlatformHealthMetrics {
  uptime: string;
  responseTime: string;
  errorRate: number;
  activeUsers: number;
  uptimeTrend: number;
  responseTimeTrend: number;
  errorRateTrend: number;
  activeUsersTrend: number;
}

export interface UrgentItem {
  id: string;
  type: 'provider_verification' | 'content_report' | 'system_alert' | 'user_report';
  title: string;
  description: string;
  priority: 'urgent' | 'high' | 'normal';
  createdAt: string;
  actionUrl: string;
}

export interface DashboardChartData {
  registrations: { date: string; count: number }[];
  assessments: { date: string; count: number }[];
  verifications: { date: string; approved: number; rejected: number }[];
}

// === Analytics ===

export interface AdminAnalyticsUserMetrics {
  totalUsers: number;
  activeUsersToday: number;
  newRegistrations7d: number;
  registrationTrend: number;
  retentionRate: number;
  dailyActiveUsers: { date: string; count: number }[];
  registrationsByDay: { date: string; count: number }[];
  usersByRole: { role: string; count: number }[];
  usersByStatus: { status: string; count: number }[];
}

export interface AdminAnalyticsContentMetrics {
  totalArticles: number;
  totalViews: number;
  avgReadTime: string;
  publishedThisMonth: number;
  viewsByDay: { date: string; views: number }[];
  topArticles: { id: string; title: string; views: number; category: string }[];
  viewsByCategory: { category: string; views: number }[];
}

export interface AdminAnalyticsAssessmentMetrics {
  totalAssessments: number;
  completionRate: number;
  avgScore: number;
  assessmentsThisWeek: number;
  assessmentsByDay: { date: string; count: number }[];
  scoreDistribution: { range: string; count: number }[];
  completionByDimension: { dimension: string; avgScore: number }[];
}

export interface AdminAnalyticsProviderMetrics {
  totalProviders: number;
  verifiedProviders: number;
  pendingVerifications: number;
  avgVerificationTime: string;
  providersBySpecialty: { specialty: string; count: number }[];
  verificationsByDay: { date: string; approved: number; rejected: number }[];
  providersByStatus: { status: string; count: number }[];
}

// === Content Management ===

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  author: string;
  publishedAt: string | null;
  updatedAt: string;
  views: number;
}

export interface AdminExpertReview {
  id: string;
  articleId: string;
  articleTitle: string;
  reviewerName: string;
  reviewerCredentials: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  submittedAt: string;
  reviewNotes?: string;
}

export interface AdminContentReport {
  id: string;
  contentId: string;
  contentTitle: string;
  contentType: 'article' | 'comment' | 'provider_profile';
  reason: string;
  reporterEmail: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: string;
}

export interface ContentQualityMetrics {
  avgQualityScore: number;
  articlesNeedingUpdate: number;
  staleArticles: number;
  freshArticles: number;
  articlesByFreshness: { range: string; count: number }[];
  qualityDistribution: { score: string; count: number }[];
}

// === Settings ===

export interface AdminSettings {
  general: {
    platformName: string;
    supportEmail: string;
    maintenanceMode: boolean;
    maxUploadSizeMb: number;
  };
  assessment: {
    maxQuestionsPerSession: number;
    cooldownHours: number;
    showDetailedResults: boolean;
    requireAuth: boolean;
  };
  provider: {
    autoApprove: boolean;
    requireNPI: boolean;
    maxSpecialties: number;
    verificationExpiryDays: number;
  };
  email: {
    welcomeEmailEnabled: boolean;
    weeklyDigestEnabled: boolean;
    providerNotificationsEnabled: boolean;
    fromAddress: string;
  };
  security: {
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
    requireMFA: boolean;
    passwordMinLength: number;
    allowSocialLogin: boolean;
  };
}

export interface AdminFeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  scheduledAt?: string | null;
  lastModified: string;
  modifiedBy: string;
}

export interface ConfigHistoryEntry {
  id: string;
  section: string;
  key: string;
  previousValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
  canRollback: boolean;
}

// === User Detail ===

export interface AdminUserDetail {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  role: 'patient' | 'provider' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_active?: string;
  email_verified: boolean;
  mfa_enabled: boolean;
  login_count: number;
  totalAssessments: number;
  totalBookmarks: number;
  totalMoodEntries: number;
  lastAssessmentDate?: string;
}

export interface UserSession {
  id: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  location?: string;
  startedAt: string;
  lastActiveAt: string;
  isCurrentSession: boolean;
}
