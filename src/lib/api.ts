/**
 * API Client for Psychage Backend
 *
 * Handles all HTTP requests to the backend API with:
 * - Authentication token management
 * - Error handling
 * - Type-safe responses
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Token storage keys
const ACCESS_TOKEN_KEY = 'psychage_access_token';
const REFRESH_TOKEN_KEY = 'psychage_refresh_token';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  email: string;
  role: 'patient' | 'provider' | 'admin';
  display_name?: string;
  avatar_url?: string;
}

// Token management
export const tokenStorage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens: (tokens: AuthTokens): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  },

  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }
};

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
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = tokenStorage.getAccessToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies for CORS
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 - try to refresh token
      if (response.status === 401 && tokenStorage.getRefreshToken()) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // Retry the original request with new token
          return fetchApi<T>(endpoint, options);
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

// Refresh access token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      tokenStorage.clearTokens();
      return false;
    }

    const data = await response.json();
    if (data.success && data.data) {
      tokenStorage.setTokens(data.data);
      return true;
    }

    tokenStorage.clearTokens();
    return false;
  } catch {
    tokenStorage.clearTokens();
    return false;
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

  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await api.post<AuthTokens & { user: User }>('/api/auth/login', {
        email,
        password,
      });
      if (response.success && response.data) {
        tokenStorage.setTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      }
      return response;
    },

    signup: async (email: string, password: string, displayName?: string) => {
      return api.post<{ user: User }>('/api/auth/signup', {
        email,
        password,
        display_name: displayName,
      });
    },

    logout: async () => {
      try {
        await api.post('/api/auth/logout');
      } finally {
        tokenStorage.clearTokens();
      }
    },

    me: () => api.get<User>('/api/auth/me'),
  },

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

  // Mood tracking endpoints
  mood: {
    getEntries: () => api.get<unknown[]>('/api/mood'),

    createEntry: (data: { value: number; notes?: string }) =>
      api.post<unknown>('/api/mood', data),
  },

  // Sleep tracking endpoints
  sleep: {
    getEntries: () => api.get<unknown[]>('/api/sleep'),

    createEntry: (data: { hours: number; quality: number; notes?: string }) =>
      api.post<unknown>('/api/sleep', data),

    getAverages: () => api.get<unknown>('/api/sleep/averages'),
  },
};

export default api;
