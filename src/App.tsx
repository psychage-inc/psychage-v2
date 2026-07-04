import React, { Suspense, useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
const MindMateWidget = lazyWithRetry(() => import('./components/ai/MindMate'));
const HomePage = lazyWithRetry(() => import('./pages/home/HomePage'));
import CookieConsent from './components/ui/CookieConsent';
import NotFoundPage from './components/pages/NotFoundPage';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BookmarkProvider } from './context/BookmarkContext';
import { ProviderLookupsProvider } from './context/ProviderLookupsContext';
import SkipLink from './components/ui/SkipLink';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import DeletionScheduledBanner from './components/account/DeletionScheduledBanner';
import { adminUrl } from './lib/urls';
import { lazyWithRetry } from './lib/lazyWithRetry';
import { notificationService } from './lib/notifications/notificationService';
import { analytics } from './lib/analytics';
import { plausibleProvider } from './lib/analytics/plausible';
import Preloader from './components/Preloader';
import PageTransition from './components/ui/PageTransition';
import { ScrollManager } from './components/ui/ScrollManager';
// Mobile (≤639px) foundation chrome — phone-only, desktop frozen.
import MobileCrisisHeader from './components/mobile/MobileCrisisHeader';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import MobileFooter from './components/mobile/MobileFooter';
import ResponsiveRoute from './components/mobile/ResponsiveRoute';
import { useMediaQuery, MOBILE_NARROW_QUERY } from './hooks/useMediaQuery';

// --- LAZY LOADED ROUTES (Code Splitting) ---
const LearnPage = lazyWithRetry(() => import('./pages/LearnPage'));
const BrowseByTopicPage = lazyWithRetry(() => import('./pages/BrowseByTopicPage'));
// Mobile (≤639px) screen stubs — rendered via ResponsiveRoute, filled in Wave 1.
const MobileHome = lazyWithRetry(() => import('./components/mobile/screens/MobileHome'));
const MobileBrowse = lazyWithRetry(() => import('./components/mobile/screens/MobileBrowse'));
const MobileCategory = lazyWithRetry(() => import('./components/mobile/screens/MobileCategory'));
const MobileReader = lazyWithRetry(() => import('./components/mobile/screens/MobileReader'));
const MobileSearch = lazyWithRetry(() => import('./components/mobile/screens/MobileSearch'));
const MobileTools = lazyWithRetry(() => import('./components/mobile/screens/MobileTools'));
const MobileProviders = lazyWithRetry(() => import('./components/mobile/screens/MobileProviders'));
const ArticleCategoryPage = lazyWithRetry(() => import('./pages/ArticleCategoryPage'));
const ArticlePage = lazyWithRetry(() => import('./pages/learn/ArticlePage'));
const ArticleRedirect = lazyWithRetry(() => import('./components/article/ArticleRedirect'));
const ConditionsIndexPage = lazyWithRetry(() => import('./pages/conditions/ConditionsIndexPage'));
const ConditionDetailPage = lazyWithRetry(() => import('./pages/conditions/ConditionDetailPage'));
const ConditionArticlesPage = lazyWithRetry(() => import('./pages/conditions/ConditionArticlesPage'));
const VideoDetail = lazyWithRetry(() => import('./components/pages/VideoDetail'));
// Provider Directory V2
const ProvidersLandingPage = lazyWithRetry(() => import('./pages/providers/ProvidersLandingPage'));
const ProviderSearchPage = lazyWithRetry(() => import('./pages/providers/ProviderSearchPage'));
const ProviderProfilePage = lazyWithRetry(() => import('./pages/providers/ProviderProfilePage'));
const ForProvidersLandingPage = lazyWithRetry(() => import('./pages/providers/ForProvidersLandingPage'));
const HowWeVerifyPage = lazyWithRetry(() => import('./pages/providers/HowWeVerifyPage'));
const ProviderApplyPage = lazyWithRetry(() => import('./pages/providers/ProviderApplyPage'));
const ProviderClaimPage = lazyWithRetry(() => import('./pages/providers/ProviderClaimPage'));
const ToolsPage = lazyWithRetry(() => import('./components/pages/ToolsPage'));
const MoodJournal = lazyWithRetry(() => import('./components/tools/MoodJournal'));
const SleepArchitect = lazyWithRetry(() => import('./components/tools/SleepArchitect'));
const PsychageAIPage = lazyWithRetry(() => import('./pages/tools/MindMate'));
const SearchResults = lazyWithRetry(() => import('./components/pages/SearchResults'));
const ClarityScoreTool = lazyWithRetry(() => import('./components/pages/ClarityScoreTool'));
const AboutPage = lazyWithRetry(() => import('./components/pages/AboutPage'));
const ContactPage = lazyWithRetry(() => import('./pages/core/ContactPage'));
const ContentStandardsPage = lazyWithRetry(() => import('./pages/core/ContentStandardsPage'));
const AdvisoryBoardPage = lazyWithRetry(() => import('./pages/core/AdvisoryBoardPage'));
const AuthorProfilePage = lazyWithRetry(() => import('./pages/core/AuthorProfilePage'));
const LegalPage = lazyWithRetry(() => import('./components/pages/LegalPages'));
const CrisisPage = lazyWithRetry(() => import('./components/pages/CrisisPage'));
const NavigatorPage = lazyWithRetry(() => import('./components/pages/NavigatorPage'));
const RelationshipHealthCheck = lazyWithRetry(() => import('./components/tools/RelationshipHealthCheck'));
const ClarityJournal = lazyWithRetry(() => import('./components/tools/ClarityJournal'));
const ClarityJournalDailyCheckIn = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/DailyCheckIn'));
const ClarityJournalWeeklyScreening = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/WeeklyScreening'));
const ClarityJournalThoughtRecord = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/ThoughtRecord'));
const ClarityJournalBehavioralActivation = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/BehavioralActivation'));
const ClarityJournalTriggerLog = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/TriggerLog'));
const ClarityJournalWellnessToolbox = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/WellnessToolbox'));
const ClarityJournalWeeklyReflection = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/WeeklyReflection'));
const ClarityJournalHistory = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/JournalHistory'));
const ClarityJournalInsights = lazyWithRetry(() => import('./components/tools/ClarityJournal/sections/JournalInsights'));
// Clarity Journal V2
const ClarityJournalDailyEntry = lazyWithRetry(() => import('./components/tools/ClarityJournal/v2-sections/DailyEntryV2'));
const ClarityJournalReport = lazyWithRetry(() => import('./components/tools/ClarityJournal/v2-report/ReportConfigScreen'));
const CrisisResourcesScreen = lazyWithRetry(() => import('./components/screens/CrisisResourcesScreen'));
const MedicationTracker = lazyWithRetry(() => import('./components/tools/MedicationTracker'));
// Toolkits
const ToolkitsIndexPage = lazyWithRetry(() => import('./pages/toolkits/ToolkitsIndexPage'));
const ToolkitDetailPage = lazyWithRetry(() => import('./pages/toolkits/ToolkitDetailPage'));

// Sitemap
const SitemapPage = lazyWithRetry(() => import('./pages/SitemapPage'));

// Auth Pages
const LoginPage = lazyWithRetry(() => import('./pages/auth/LoginPage'));
const SignUpPage = lazyWithRetry(() => import('./pages/auth/SignUpPage'));
const CheckEmailPage = lazyWithRetry(() => import('./pages/auth/CheckEmailPage'));
const ResetPasswordPage = lazyWithRetry(() => import('./pages/auth/ResetPasswordPage'));
const UpdatePasswordPage = lazyWithRetry(() => import('./pages/auth/UpdatePasswordPage'));
const AuthCallback = lazyWithRetry(() => import('./pages/auth/AuthCallback'));

// User Dashboard
const UserDashboard = lazyWithRetry(() => import('./pages/dashboard/UserDashboard'));
const AccountSettings = lazyWithRetry(() => import('./pages/dashboard/AccountSettings'));
const PrivacySettings = lazyWithRetry(() => import('./pages/dashboard/PrivacySettings'));
const BookmarksPage = lazyWithRetry(() => import('./pages/dashboard/BookmarksPage'));
const AssessmentHistory = lazyWithRetry(() => import('./pages/dashboard/AssessmentHistory'));
const OnboardingPage = lazyWithRetry(() => import('./pages/OnboardingPage'));

// Admin redirect — admin panel lives on a separate domain (admin.psychage.com)
// In local dev (no VITE_ADMIN_URL), redirects to /admin.html entry point

/** Legacy redirect: preserves :id param from /find-care/provider/:id → /providers/:id */
const LegacyProviderRedirect: React.FC = () => {
  const { id } = useParams();
  return <Navigate to={`/providers/${id}`} replace />;
};

/** Legacy `/category/:category` → canonical `/learn/:category` (which resolves
 *  legacy slugs via resolveCanonicalSlug). The old CategoryPage used a separate,
 *  taxonomy-unaware data path; this folds it into the single Learn pipeline. */
const CategoryRedirect: React.FC = () => {
  const { category } = useParams();
  return <Navigate to={category ? `/learn/${category}` : '/learn'} replace />;
};

// Provider Portal V2
const PortalLayout = lazyWithRetry(() => import('./components/portal/PortalLayout'));
const PortalDashboard = lazyWithRetry(() => import('./pages/portal/PortalDashboard'));
const PortalProfile = lazyWithRetry(() => import('./pages/portal/PortalProfile'));
const PortalReviews = lazyWithRetry(() => import('./pages/portal/PortalReviews'));
const PortalVerification = lazyWithRetry(() => import('./pages/portal/PortalVerification'));
const PortalSubscription = lazyWithRetry(() => import('./pages/portal/PortalSubscription'));
const PortalAnalytics = lazyWithRetry(() => import('./pages/portal/PortalAnalytics'));
const PortalSettings = lazyWithRetry(() => import('./pages/portal/PortalSettings'));

// Provider Registration (legacy — kept for admin reference only)

// --- ADMIN REDIRECT ---

/** Redirects /admin/* to the admin domain (or /admin/* with Vite middleware in dev) */
const AdminRedirect: React.FC = () => {
    const location = useLocation();
    const subPath = location.pathname.replace(/^\/admin/, '') || '/';
    React.useEffect(() => {
        // adminUrl() handles both production (cross-domain) and dev (/admin/*)
        window.location.href = adminUrl(subPath);
    }, [subPath]);
    return null;
};

// --- PER-ROUTE ERROR BOUNDARY ---

// --- MAIN APP COMPONENT ---

/** Lightweight Suspense fallback — matches GlobalLoading style from Skeletons.tsx */
const RouteLoadingIndicator = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-neutral-700 border-t-[var(--color-primary)] animate-spin" />
            <span className="text-xs text-text-tertiary">Loading...</span>
        </div>
    </div>
);

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    // Phone breakpoint: swaps desktop chrome/screens for the mobile presentation.
    const isPhone = useMediaQuery(MOBILE_NARROW_QUERY);

    // Register service worker + initialize analytics (once)
    useEffect(() => {
        notificationService.registerServiceWorker();
        analytics.setProvider(plausibleProvider);
        analytics.init();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
            <BookmarkProvider>
                <ProviderLookupsProvider>
                    <SkipLink />
                    {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

                    {/* Crisis access rendered outside preloader gate — always reachable */}
                    {isLoading && (
                        <a
                            href="/crisis"
                            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 text-white text-sm font-bold shadow-lg hover:bg-red-700 transition-colors"
                            aria-label="Crisis support - get immediate help"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            Need Help Now?
                        </a>
                    )}

                    <ScrollManager />

                    {/* App content always renders — Preloader is a fixed overlay (z-9999) that fades out */}
                    <div className="min-h-[100dvh] bg-background font-sans text-gray-900 overflow-x-hidden flex flex-col transition-colors duration-300">
                            {!isPhone && <Navigation />}
                            {isPhone && <MobileCrisisHeader />}
                            {/* AUTH-021: app-wide pending-deletion banner. Renders nothing
                                when no deletion is scheduled. */}
                            <DeletionScheduledBanner />

                            <main id="main-content" className={`flex-grow w-full outline-none min-h-[100dvh] ${location.pathname === '/tools/mindmate' ? '' : 'pb-24'} max-sm:pt-14 ${location.pathname !== '/' ? 'sm:pt-20' : ''}`} tabIndex={-1}>
                                <ErrorBoundary
                                    resetKeys={[location.pathname]}
                                    fallback={(error, reset) => (
                                        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center mb-6 text-2xl">!</div>
                                            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">This page encountered an error</h2>
                                            <p className="text-gray-500 dark:text-neutral-400 mb-1 max-w-md">Something went wrong loading this page. Try again or navigate to another page.</p>
                                            {error && <p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded mt-2 mb-4">{error.message}</p>}
                                            <div className="flex gap-3 mt-4">
                                                <button onClick={reset} className="px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity">Try Again</button>
                                                <button onClick={() => navigate('/', { replace: true })} className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">Return Home</button>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Suspense fallback={<RouteLoadingIndicator />}>
                                        <Routes location={location}>
                                            <Route path="/" element={
                                                <PageTransition>
                                                    <ResponsiveRoute mobile={<MobileHome />} desktop={<HomePage />} />
                                                </PageTransition>
                                            } />

                                            {/* Public Routes */}
                                            <Route path="/learn" element={<PageTransition><ResponsiveRoute mobile={<MobileBrowse />} desktop={<LearnPage />} /></PageTransition>} />
                                            <Route path="/learn/topics" element={<PageTransition><BrowseByTopicPage /></PageTransition>} />
                                            <Route path="/learn/article/:id" element={<PageTransition><ArticleRedirect /></PageTransition>} />
                                            <Route path="/learn/:categorySlug/:articleSlug" element={<PageTransition><ResponsiveRoute mobile={<MobileReader />} desktop={<ArticlePage />} /></PageTransition>} />
                                            <Route path="/learn/:categorySlug" element={<PageTransition><ResponsiveRoute mobile={<MobileCategory />} desktop={<ArticleCategoryPage />} /></PageTransition>} />
                                            {/* Conditions A–Z reference */}
                                            <Route path="/conditions" element={<PageTransition><ConditionsIndexPage /></PageTransition>} />
                                            <Route path="/conditions/:slug/articles" element={<PageTransition><ConditionArticlesPage /></PageTransition>} />
                                            <Route path="/conditions/:slug" element={<PageTransition><ConditionDetailPage /></PageTransition>} />
                                            <Route path="/watch/:id" element={<PageTransition><VideoDetail /></PageTransition>} />
                                            {/* Provider Directory V2 */}
                                            <Route path="/providers" element={<PageTransition><ResponsiveRoute mobile={<MobileProviders />} desktop={<ProvidersLandingPage />} /></PageTransition>} />
                                            <Route path="/providers/search" element={<PageTransition><ProviderSearchPage /></PageTransition>} />
                                            <Route path="/providers/:id" element={<PageTransition><ProviderProfilePage /></PageTransition>} />
                                            <Route path="/how-we-verify" element={<PageTransition><HowWeVerifyPage /></PageTransition>} />
                                            <Route path="/for-providers" element={<PageTransition><ForProvidersLandingPage /></PageTransition>} />
                                            <Route path="/for-providers/apply" element={<PageTransition><ProviderApplyPage /></PageTransition>} />
                                            <Route path="/for-providers/claim" element={<PageTransition><ProviderClaimPage /></PageTransition>} />

                                            {/* Legacy provider redirects */}
                                            <Route path="/find-care" element={<Navigate to="/providers" replace />} />
                                            <Route path="/find-care/provider/:id" element={<LegacyProviderRedirect />} />
                                            <Route path="/tools" element={<PageTransition><ResponsiveRoute mobile={<MobileTools />} desktop={<ToolsPage />} /></PageTransition>} />
                                            <Route path="/toolkits" element={<PageTransition><ToolkitsIndexPage /></PageTransition>} />
                                            <Route path="/toolkits/:id" element={<PageTransition><ToolkitDetailPage /></PageTransition>} />
                                            <Route path="/tools/mood-journal" element={<PageTransition><MoodJournal /></PageTransition>} />
                                            <Route path="/tools/sleep-architect" element={<PageTransition><SleepArchitect /></PageTransition>} />
                                            <Route path="/tools/mindmate" element={
                                                <ProtectedRoute>
                                                    <PageTransition><PsychageAIPage /></PageTransition>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/tools/symptom-navigator" element={<PageTransition><NavigatorPage /></PageTransition>} />
                                            <Route path="/tools/symptom-navigator/crisis" element={<PageTransition><CrisisResourcesScreen /></PageTransition>} />
                                            <Route path="/tools/relationship-health" element={<PageTransition><RelationshipHealthCheck /></PageTransition>} />
                                            <Route path="/tools/medication-tracker" element={<PageTransition><MedicationTracker /></PageTransition>} />
                                            <Route path="/tools/clarity-journal" element={<PageTransition><ClarityJournal /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/daily" element={<PageTransition><ClarityJournalDailyCheckIn /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/screening" element={<PageTransition><ClarityJournalWeeklyScreening /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/thought-record" element={<PageTransition><ClarityJournalThoughtRecord /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/activation" element={<PageTransition><ClarityJournalBehavioralActivation /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/triggers" element={<PageTransition><ClarityJournalTriggerLog /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/toolbox" element={<PageTransition><ClarityJournalWellnessToolbox /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/reflection" element={<PageTransition><ClarityJournalWeeklyReflection /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/history" element={<PageTransition><ClarityJournalHistory /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/insights" element={<PageTransition><ClarityJournalInsights /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/entry" element={<PageTransition><ClarityJournalDailyEntry /></PageTransition>} />
                                            <Route path="/tools/clarity-journal/report" element={<PageTransition><ClarityJournalReport /></PageTransition>} />
                                            <Route path="/category/:category" element={<CategoryRedirect />} />
                                            <Route path="/search" element={<PageTransition><ResponsiveRoute mobile={<MobileSearch />} desktop={<SearchResults />} /></PageTransition>} />
                                            <Route path="/clarity-score" element={<PageTransition><ClarityScoreTool /></PageTransition>} />
                                            {/* Legacy alias — older copy / breadcrumbs reference /tools/clarity-score */}
                                            <Route path="/tools/clarity-score" element={<Navigate to="/clarity-score" replace />} />
                                            <Route path="/tools/clarity-score/*" element={<Navigate to="/clarity-score" replace />} />
                                            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                                            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                                            <Route path="/content-standards" element={<PageTransition><ContentStandardsPage /></PageTransition>} />
                                            <Route path="/advisory-board" element={<PageTransition><AdvisoryBoardPage /></PageTransition>} />
                                            <Route path="/authors/:slug" element={<PageTransition><AuthorProfilePage /></PageTransition>} />
                                            <Route path="/legal/privacy" element={<PageTransition><LegalPage type="privacy" /></PageTransition>} />
                                            <Route path="/legal/terms" element={<PageTransition><LegalPage type="terms" /></PageTransition>} />
                                            <Route path="/legal/accessibility" element={<PageTransition><LegalPage type="accessibility" /></PageTransition>} />
                                            <Route path="/crisis" element={<PageTransition><CrisisPage /></PageTransition>} />
                                            <Route path="/sitemap" element={<PageTransition><SitemapPage /></PageTransition>} />
                                            {/* Redirect legacy /navigator routes to /tools/symptom-navigator */}
                                            <Route path="/navigator" element={<Navigate to="/tools/symptom-navigator" replace />} />
                                            <Route path="/navigator/crisis" element={<Navigate to="/tools/symptom-navigator/crisis" replace />} />
                                            <Route path="/providers/register" element={<Navigate to="/for-providers/apply" replace />} />

                                            {/* Auth Routes */}
                                            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                                            <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
                                            <Route path="/auth/check-email" element={<PageTransition><CheckEmailPage /></PageTransition>} />
                                            <Route path="/reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
                                            <Route path="/update-password" element={<PageTransition><UpdatePasswordPage /></PageTransition>} />
                                            <Route path="/auth/callback" element={<AuthCallback />} />

                                            {/* Onboarding (auth-only, no role guard) */}
                                            <Route path="/onboarding" element={
                                                <ProtectedRoute>
                                                    <PageTransition><OnboardingPage /></PageTransition>
                                                </ProtectedRoute>
                                            } />

                                            {/* Protected Routes: User Dashboard */}
                                            <Route path="/dashboard" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['patient', 'admin']}>
                                                        <PageTransition><UserDashboard /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/dashboard/profile" element={<Navigate to="/dashboard/settings" replace />} />
                                            <Route path="/dashboard/settings" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['patient', 'admin']}>
                                                        <PageTransition><AccountSettings /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/dashboard/bookmarks" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['patient', 'admin']}>
                                                        <PageTransition><BookmarksPage /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/dashboard/privacy" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['patient', 'admin']}>
                                                        <PageTransition><PrivacySettings /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/dashboard/assessments" element={<Navigate to="/dashboard/history" replace />} />
                                            <Route path="/dashboard/history" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['patient', 'admin']}>
                                                        <PageTransition><AssessmentHistory /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />

                                            {/* Admin Panel — redirect to admin domain */}
                                            <Route path="/admin/*" element={<AdminRedirect />} />

                                            {/* Provider Portal V2 */}
                                            <Route path="/portal" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['provider', 'admin']}>
                                                        <PageTransition><PortalLayout /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            }>
                                                <Route index element={<PortalDashboard />} />
                                                <Route path="profile" element={<PortalProfile />} />
                                                <Route path="reviews" element={<PortalReviews />} />
                                                <Route path="verification" element={<PortalVerification />} />
                                                <Route path="subscription" element={<PortalSubscription />} />
                                                <Route path="analytics" element={<PortalAnalytics />} />
                                                <Route path="settings" element={<PortalSettings />} />
                                            </Route>

                                            {/* Legacy provider dashboard — redirect to portal */}
                                            <Route path="/provider" element={<Navigate to="/portal" replace />} />
                                            <Route path="/provider/dashboard" element={<Navigate to="/portal" replace />} />
                                            <Route path="/provider/profile" element={<Navigate to="/portal/profile" replace />} />
                                            <Route path="/provider/analytics" element={<Navigate to="/portal/analytics" replace />} />
                                            <Route path="/provider/patients" element={<Navigate to="/portal" replace />} />

                                            <Route path="*" element={
                                                <PageTransition>
                                                    <NotFoundPage />
                                                </PageTransition>
                                            } />
                                        </Routes>
                                    </Suspense>
                                </ErrorBoundary>
                            </main>

                            {isPhone && location.pathname !== '/tools/mindmate' && !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/portal') && location.pathname !== '/onboarding' && <MobileFooter />}

                            {isPhone && <MobileBottomNav />}

                            {!isPhone && location.pathname !== '/tools/mindmate' && !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/portal') && location.pathname !== '/onboarding' && <Footer />}

                            {location.pathname !== '/tools/mindmate' && !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/portal') && location.pathname !== '/onboarding' && (
                                <Suspense fallback={null}>
                                    <MindMateWidget />
                                </Suspense>
                            )}
                            <CookieConsent />

                            {/* Persistent Mobile CTA (Homepage Only) — tablet only; phone uses the bottom nav. */}
                            {location.pathname === '/' && !isPhone && (
                                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-border z-[60] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/clarity-score')}
                                        className="w-full bg-primary hover:bg-primary-hover text-white font-medium rounded-xl h-12 flex items-center justify-center transition-colors shadow-sm"
                                    >
                                        Start Free Assessment
                                    </button>
                                </div>
                            )}

                            <Toaster
                                position="bottom-right"
                                toastOptions={{
                                    className: 'font-sans',
                                    style: {
                                        borderRadius: 'var(--radius-lg)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-surface)',
                                        color: 'var(--color-text-primary)',
                                    },
                                }}
                                closeButton
                            />
                    </div>
                </ProviderLookupsProvider>
            </BookmarkProvider>
        </MotionConfig>
        </QueryClientProvider>
    );
};

export default App;
