import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/error/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';

// Auth pages (reused from main app)
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const AuthCallback = React.lazy(() => import('./pages/auth/AuthCallback'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const UpdatePasswordPage = React.lazy(() => import('./pages/auth/UpdatePasswordPage'));

// Admin layout + pages
const AdminLayoutV2 = React.lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardV2 = React.lazy(() => import('./pages/admin/v2/Dashboard'));
const AdminContentList = React.lazy(() => import('./pages/admin/v2/content/ContentList'));
const AdminContentEditor = React.lazy(() => import('./pages/admin/v2/content/ContentEditor'));
const AdminProviderList = React.lazy(() => import('./pages/admin/v2/providers/ProviderList'));
const AdminApplicationReview = React.lazy(() => import('./pages/admin/v2/providers/ApplicationReview'));
const AdminProviderEditor = React.lazy(() => import('./pages/admin/v2/providers/ProviderEditor'));
const AdminBulkImport = React.lazy(() => import('./pages/admin/v2/providers/BulkImport'));
const AdminSymptomList = React.lazy(() => import('./pages/admin/v2/symptom-navigator/SymptomList'));
const AdminConditionList = React.lazy(() => import('./pages/admin/v2/symptom-navigator/ConditionList'));
const AdminConditionEditor = React.lazy(() => import('./pages/admin/v2/symptom-navigator/ConditionEditor'));
const AdminMappingMatrix = React.lazy(() => import('./pages/admin/v2/symptom-navigator/MappingMatrix'));
const AdminSafetyDashboard = React.lazy(() => import('./pages/admin/v2/safety/SafetyDashboard'));
const AdminCrisisKeywords = React.lazy(() => import('./pages/admin/v2/safety/CrisisKeywords'));
const AdminConversationReview = React.lazy(() => import('./pages/admin/v2/safety/ConversationReview'));
const AdminSettingsV2 = React.lazy(() => import('./pages/admin/v2/settings/Settings'));
const AdminUserManagementV2 = React.lazy(() => import('./pages/admin/v2/settings/UserManagement'));
const AdminAuditLogV2 = React.lazy(() => import('./pages/admin/v2/settings/AuditLog'));
const AdminArticleList = React.lazy(() => import('./pages/admin/v2/articles/ArticleList'));
const AdminArticleCreator = React.lazy(() => import('./pages/admin/v2/articles/ArticleCreator'));
const AdminArticleDetail = React.lazy(() => import('./pages/admin/v2/articles/ArticleDetail'));
const AdminArticleBreakdown = React.lazy(() => import('./pages/admin/v2/articles/ArticleBreakdown'));
const AdminTopicClusters = React.lazy(() => import('./pages/admin/v2/articles/TopicClusters'));
const AdminArticleCategories = React.lazy(() => import('./pages/admin/v2/articles/ArticleCategories'));
const AdminArticlePipeline = React.lazy(() => import('./pages/admin/v2/articles/ArticlePipeline'));
const AdminArticleTree = React.lazy(() => import('./pages/admin/v2/articles/ArticleTree'));
const AdminArticleQualityMap = React.lazy(() => import('./pages/admin/v2/articles/ArticleQualityMap'));
const AdminArticleCitationReport = React.lazy(() => import('./pages/admin/v2/articles/ArticleCitationReport'));
const AdminArticleQualityDashboard = React.lazy(() => import('./pages/admin/v2/articles/ArticleQualityDashboard'));
const AdminOnboarding = React.lazy(() => import('./pages/admin/AdminOnboarding'));

const AdminLoadingIndicator = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
    <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-500 animate-spin" />
  </div>
);

const AdminApp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white font-sans">
      <ErrorBoundary
        resetKeys={[location.pathname]}
        fallback={(error, reset) => (
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center mb-6 text-2xl">!</div>
            <h2 className="font-bold text-xl mb-2">Something went wrong</h2>
            {error && <p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded mt-2 mb-4">{error.message}</p>}
            <div className="flex gap-3 mt-4">
              <button onClick={reset} className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">Try Again</button>
              <button onClick={() => navigate('/dashboard', { replace: true })} className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Dashboard</button>
            </div>
          </div>
        )}
      >
        <Suspense fallback={<AdminLoadingIndicator />}>
          <Routes location={location}>
            {/* Auth routes on admin domain */}
            <Route path="/login" element={<LoginPage variant="admin" />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />

            {/* Admin onboarding (standalone, no layout) */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={['admin']}>
                  <AdminOnboarding />
                </RoleGuard>
              </ProtectedRoute>
            } />

            {/* Admin panel — root layout with nested routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <RoleGuard allowedRoles={['admin']}>
                  <AdminLayoutV2 />
                </RoleGuard>
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardV2 />} />
              {/* Articles (Command Center) */}
              <Route path="articles" element={<AdminArticleList />} />
              <Route path="articles/new" element={<AdminArticleCreator />} />
              <Route path="articles/categories" element={<AdminArticleCategories />} />
              <Route path="articles/pipeline" element={<AdminArticlePipeline />} />
              <Route path="articles/tree" element={<AdminArticleTree />} />
              <Route path="articles/quality" element={<AdminArticleQualityMap />} />
              <Route path="articles/citations" element={<AdminArticleCitationReport />} />
              <Route path="articles/quality-dashboard" element={<AdminArticleQualityDashboard />} />
              <Route path="articles/clusters" element={<AdminTopicClusters />} />
              <Route path="articles/:id" element={<AdminArticleDetail />} />
              <Route path="articles/:id/breakdown" element={<AdminArticleBreakdown />} />
              {/* Content */}
              <Route path="content" element={<AdminContentList />} />
              <Route path="content/new" element={<AdminContentEditor />} />
              <Route path="content/:id/edit" element={<AdminContentEditor />} />
              {/* Providers */}
              <Route path="providers" element={<AdminProviderList />} />
              <Route path="providers/new" element={<AdminProviderEditor />} />
              <Route path="providers/applications" element={<AdminApplicationReview />} />
              <Route path="providers/import" element={<AdminBulkImport />} />
              <Route path="providers/:id/edit" element={<AdminProviderEditor />} />
              {/* Symptom Navigator */}
              <Route path="symptom-navigator" element={<Navigate to="/symptom-navigator/symptoms" replace />} />
              <Route path="symptom-navigator/symptoms" element={<AdminSymptomList />} />
              <Route path="symptom-navigator/conditions" element={<AdminConditionList />} />
              <Route path="symptom-navigator/conditions/:id/edit" element={<AdminConditionEditor />} />
              <Route path="symptom-navigator/mappings" element={<AdminMappingMatrix />} />
              {/* Safety */}
              <Route path="safety" element={<AdminSafetyDashboard />} />
              <Route path="safety/keywords" element={<AdminCrisisKeywords />} />
              <Route path="safety/conversations" element={<AdminConversationReview />} />
              {/* Settings */}
              <Route path="settings" element={<AdminSettingsV2 />} />
              <Route path="settings/users" element={<AdminUserManagementV2 />} />
              <Route path="settings/audit-log" element={<AdminAuditLogV2 />} />
            </Route>

            {/* Catch-all: redirect to admin dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'font-sans',
          style: {
            borderRadius: 'var(--radius-lg, 0.75rem)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
          },
        }}
        closeButton
      />
    </div>
  );
};

export default AdminApp;
