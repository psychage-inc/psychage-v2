/**
 * API Client for Psychage Backend
 *
 * Handles all HTTP requests to the backend API with:
 * - Supabase session-based authentication
 * - Error handling
 * - Type-safe responses
 */

import { supabase } from './supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'patient' | 'provider' | 'admin';
  display_name?: string;
  avatar_url?: string;
}

export interface ProviderStats {
  profileCompleteness: number;
  activePatients: number;
  patientsChange: number;
  pendingRequests: number;
  requestsChange: number;
  totalAppointments?: number;
  averageRating?: number;
  revenue?: number;
  views?: number;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  specialization: string[];
  bio: string;
  display_name?: string;
  email?: string;
  role?: string;
  status?: string;
  // Additional profile fields
  full_name?: string;
  title?: string;
  specialities?: string[];
}

// Admin types
export interface AdminStats {
  users: number;
  pendingProviders: number;
  alerts: number;
  activeSessions: number;
}

export interface AdminActivityLog {
  id: string;
  created_at: string;
  action: string;
  user_id?: string;
  details: string | Record<string, unknown>;
}

export interface AdminAuditLog {
  id: string;
  created_at: string;
  user_id?: string;
  action: string;
  details: string | Record<string, unknown>;
}

export interface AdminReport {
  id: string;
  created_at: string;
  type: 'content' | 'user' | 'system';
  subject?: string;
  description?: string;
  status: 'pending' | 'investigating' | 'resolved';
  reporter_id?: string;
  reporter_email?: string;
  resolution_notes?: string;
  resolved_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  role: 'patient' | 'provider' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_active?: string;
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Core fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  _isRetry = false
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get auth token from Supabase session
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${session.access_token}`;
    }
  } catch {
    // No session available, proceed without auth header
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 - try Supabase token refresh (only once to prevent infinite loop)
      if (response.status === 401 && !_isRetry) {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError && refreshData.session) {
          return fetchApi<T>(endpoint, options, true);
        }
      }

      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    return data as ApiResponse<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or other issue
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// API methods
export const api = {
  // Generic methods
  get: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    fetchApi<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) => fetchApi<T>(endpoint, { method: 'DELETE' }),

  // Provider endpoints
  providers: {
    getAll: (params?: {
      state?: string;
      specialization?: string;
      insurance?: string;
      page?: number;
      limit?: number;
    }) => {
      const searchParams = new URLSearchParams();
      if (params?.state) searchParams.set('state', params.state);
      if (params?.specialization) searchParams.set('specialization', params.specialization);
      if (params?.insurance) searchParams.set('insurance', params.insurance);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const query = searchParams.toString();
      return api.get<unknown[]>(`/api/providers${query ? `?${query}` : ''}`);
    },

    getById: (id: string | number) => api.get<unknown>(`/api/providers/${id}`),

    getSpecializations: () => api.get<string[]>('/api/providers?specializations=true'),

    getInsurance: () => api.get<string[]>('/api/providers?insurance=true'),

    trackView: (id: string | number) => api.post(`/api/providers/${id}/view`),

    toggleFavorite: (id: string | number) => api.post(`/api/providers/favorites`, { providerId: id }),

    getFavorites: () => api.get<unknown[]>('/api/providers/favorites'),

    register: (data: Record<string, unknown>) => api.post('/api/providers/profile/submit', data),
  },

  // Provider Dashboard endpoints (uses /api/providers/ to match V1 backend)
  provider: {
    getStats: () => api.get<ProviderStats>('/api/providers/dashboard'),
    getActivity: () => api.get<unknown[]>('/api/providers/activity'),
    getAnalytics: (params?: { range?: '7d' | '30d' | '90d' | 'all' }) => {
      const searchParams = new URLSearchParams();
      if (params?.range) searchParams.set('range', params.range);
      return api.get<{
        profileViews: number[];
        viewLabels: string[];
        totalViews: number;
        viewsChange: number;
        conversionRate: number;
        conversionChange: number;
        profileCompleteness: number;
        topLocations: { location: string; percentage: number }[];
      }>(`/api/providers/analytics?${searchParams.toString()}`);
    },
    getPatients: (params?: { page?: number; limit?: number; search?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      return api.get<unknown[]>(`/api/providers/patients?${searchParams.toString()}`);
    },
    getAppointments: (params?: { start?: string; end?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.start) searchParams.set('start', params.start);
      if (params?.end) searchParams.set('end', params.end);
      return api.get<unknown[]>(`/api/providers/appointments?${searchParams.toString()}`);
    },
    getProfile: () => api.get<ProviderProfile>('/api/providers/profile'),
    updateProfile: (data: Partial<ProviderProfile>) => api.put<ProviderProfile>('/api/providers/profile', data),
    updateAvailability: (availability: unknown) => api.put('/api/providers/availability', availability),
  },

  // Article endpoints
  articles: {
    getAll: (params?: { category?: string; page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.set('category', params.category);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const query = searchParams.toString();
      return api.get<unknown[]>(`/api/articles${query ? `?${query}` : ''}`);
    },

    getById: (id: string | number) => api.get<unknown>(`/api/articles/${id}`),

    bookmark: (id: string | number) => api.post(`/api/articles/${id}/bookmark`),

    getBookmarks: () => api.get<unknown[]>('/api/articles/bookmarks'),
  },

  // Clarity Score endpoints
  clarityScore: {
    save: (answers: Record<string, number>) =>
      api.post<{ score: number; breakdown: unknown }>('/api/clarity-score', { answers }),

    getHistory: () => api.get<unknown[]>('/api/clarity-score'),

    getStats: () => api.get<unknown>('/api/clarity-score/stats'),
  },

  // Assessment endpoints
  assessment: {
    getQuestions: () => api.get<unknown[]>('/api/assessment/questions'),
  },

  user: {
    getProfile: () => api.get<User & { location?: string }>('/api/user/profile'),
    updateProfile: (data: Partial<User & { location?: string }>) => api.put<User>('/api/user/profile', data),
    getActivity: () => api.get<Record<string, unknown>[]>('/api/user/activity'),
    changePassword: (data: Record<string, unknown>) => api.post('/api/user/password', data),
    uploadAvatar: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const headers: Record<string, string> = {};
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }
      } catch {
        // proceed without auth
      }

      const response = await fetch(`${API_URL}/api/user/photo`, {
        method: 'POST',
        headers,
        body: formData
      });
      return response.json();
    }
  },

  // Admin endpoints
  admin: {
    getStats: () => api.get<AdminStats>('/api/admin/stats'),
    getRecentActivity: () => api.get<AdminActivityLog[]>('/api/admin/activity'),
    getProviders: (params?: { status?: string; page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set('status', params.status);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      const query = searchParams.toString();
      return api.get<unknown[]>(`/api/admin/providers${query ? `?${query}` : ''}`);
    },
    updateProviderStatus: (id: string | number, status: 'active' | 'suspended' | 'rejected') =>
      api.post(`/api/admin/providers/${id}/status`, { status }),
    getAuditLogs: (params?: { page?: number; limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      return api.get<AdminAuditLog[]>(`/api/admin/audit-logs?${searchParams.toString()}`);
    },
    getReports: (type: string) => api.get<AdminReport[]>(`/api/admin/reports?type=${encodeURIComponent(type)}`),
    getReport: (id: string) => api.get<AdminReport>(`/api/admin/reports/${id}`),
    updateReportStatus: (id: string, status: string, notes?: string) =>
      api.post(`/api/admin/reports/${id}/status`, { status, notes }),
    getUsers: (params?: { role?: string; page?: number; limit?: number; search?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.role) searchParams.set('role', params.role);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      return api.get<AdminUser[]>(`/api/admin/users?${searchParams.toString()}`);
    },
    updateUserStatus: (id: string, status: string) =>
      api.post(`/api/admin/users/${id}/status`, { status }),
    saveProviderNotes: (id: string | number, notes: string) =>
      api.post(`/api/admin/providers/${id}/notes`, { notes }),
    updateProviderStatusWithReason: (id: string | number, status: string, reason?: string) =>
      api.post(`/api/admin/providers/${id}/status`, { status, reason }),
    inviteAdmin: (email: string, displayName: string) =>
      api.post<{ success: boolean }>('/api/admin/invite', { email, display_name: displayName }),
  },

  // Mood tracking endpoints
  mood: {
    getEntries: () => api.get<unknown[]>('/api/mood'),

    createEntry: (data: { mood_rating: number; notes?: string; entry_date: string }) =>
      api.post<unknown>('/api/mood', data),
  },

  // Sleep tracking endpoints
  sleep: {
    getEntries: () => api.get<unknown[]>('/api/sleep'),

    createEntry: (data: { hours: number; quality: number; notes?: string; bed_time?: string; wake_time?: string; date?: string }) =>
      api.post<unknown>('/api/sleep', data),

    updateEntry: (id: string, data: { hours?: number; quality?: number; notes?: string; bed_time?: string; wake_time?: string }) =>
      api.put<unknown>(`/api/sleep/${id}`, data),

    deleteEntry: (id: string) => api.delete<void>(`/api/sleep/${id}`),

    getAverages: (days?: number) => api.get<unknown>(`/api/sleep/averages${days ? `?days=${days}` : ''}`),

    getStats: () => api.get<unknown>('/api/sleep/stats'),
  },

  // Tools endpoints
  tools: {
    getAll: () => api.get<unknown[]>('/api/tools'),

    getById: (id: number) => api.get<unknown>(`/api/tools/${id}`),

    getByCategory: (category: string) => api.get<unknown[]>(`/api/tools?category=${encodeURIComponent(category)}`),
  },

  // Symptoms endpoints
  symptoms: {
    getAll: () => api.get<unknown[]>('/api/symptoms'),

    check: (symptomIds: string[]) =>
      api.post<{ conditions: unknown[]; isCrisis: boolean }>('/api/symptoms/check', { symptomIds }),

    getConditions: () => api.get<unknown[]>('/api/conditions'),

    getCrisisResources: () => api.get<unknown[]>('/api/crisis-resources'),
  },

  // Bookmarks endpoints (general)
  bookmarks: {
    getAll: () => api.get<unknown[]>('/api/bookmarks'),

    getByType: (resourceType: string) => api.get<unknown[]>(`/api/bookmarks?type=${resourceType}`),

    add: (resourceType: string, resourceId: string) =>
      api.post<unknown>('/api/bookmarks', { resource_type: resourceType, resource_id: resourceId }),

    remove: (resourceType: string, resourceId: string) =>
      api.delete<void>(`/api/bookmarks?type=${resourceType}&id=${resourceId}`),

    toggle: (resourceType: string, resourceId: string) =>
      api.post<{ bookmarked: boolean }>('/api/bookmarks/toggle', { resource_type: resourceType, resource_id: resourceId }),

    isBookmarked: (resourceType: string, resourceId: string) =>
      api.get<{ bookmarked: boolean }>(`/api/bookmarks/check?type=${resourceType}&id=${resourceId}`),
  },

  // Activity endpoints
  activity: {
    getRecent: (limit?: number) => api.get<unknown[]>(`/api/user/activity${limit ? `?limit=${limit}` : ''}`),

    log: (actionType: string, resourceType?: string, resourceId?: string, metadata?: Record<string, unknown>) =>
      api.post<void>('/api/user/activity', { action_type: actionType, resource_type: resourceType, resource_id: resourceId, metadata }),

    getByType: (actionType: string, limit?: number) =>
      api.get<unknown[]>(`/api/user/activity?action_type=${encodeURIComponent(actionType)}${limit ? `&limit=${limit}` : ''}`),

    getStats: () => api.get<unknown>('/api/user/activity/stats'),
  },

  // Search endpoints
  search: {
    all: (params: { query: string; type?: 'articles' | 'providers' | 'tools' | 'all'; limit?: number; page?: number }) => {
      const searchParams = new URLSearchParams();
      searchParams.set('q', params.query);
      if (params.type) searchParams.set('type', params.type);
      if (params.limit) searchParams.set('limit', params.limit.toString());
      if (params.page) searchParams.set('page', params.page.toString());
      return api.get<{
        articles: unknown[];
        providers: unknown[];
        tools: unknown[];
        total: number;
      }>(`/api/search?${searchParams.toString()}`);
    },

    articles: (query: string, limit?: number) =>
      api.get<unknown[]>(`/api/search/articles?q=${encodeURIComponent(query)}${limit ? `&limit=${limit}` : ''}`),

    providers: (query: string, limit?: number) =>
      api.get<unknown[]>(`/api/search/providers?q=${encodeURIComponent(query)}${limit ? `&limit=${limit}` : ''}`),

    tools: (query: string, limit?: number) =>
      api.get<unknown[]>(`/api/search/tools?q=${encodeURIComponent(query)}${limit ? `&limit=${limit}` : ''}`),

    suggestions: (query: string) =>
      api.get<{ suggestions: string[]; recentSearches: string[] }>(`/api/search/suggestions?q=${encodeURIComponent(query)}`),
  },
};

export default api;
