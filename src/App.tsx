import React, { Suspense, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ProductShowcase from './components/home/ProductShowcase';
import HowItWorksSection from './components/home/HowItWorksSection';
import FeatureSpotlight from './components/home/FeatureSpotlight';
import ArticleCategorySection from './components/home/ArticleCategorySection';
import NewsletterSection from './components/home/NewsletterSection';
import MindMate from './components/ai/MindMate';
import CookieConsent from './components/ui/CookieConsent';
import NotFoundPage from './components/pages/NotFoundPage';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BookmarkProvider } from './context/BookmarkContext';
import { ProviderLookupsProvider } from './context/ProviderLookupsContext';
import SEO from './components/SEO';
import SkipLink from './components/ui/SkipLink';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import { adminUrl } from './lib/urls';
import Preloader from './components/Preloader';
import PageTransition from './components/ui/PageTransition';
import { ScrollManager } from './components/ui/ScrollManager';

// --- LAZY LOADED ROUTES (Code Splitting) ---
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const ArticleCategoryPage = React.lazy(() => import('./pages/ArticleCategoryPage'));
const ArticlePage = React.lazy(() => import('./pages/learn/ArticlePage'));
const ArticleRedirect = React.lazy(() => import('./components/article/ArticleRedirect'));
const _ArticleDetail = React.lazy(() => import('./components/pages/ArticleDetail'));
const VideoDetail = React.lazy(() => import('./components/pages/VideoDetail'));
// Provider Directory V2
const ProvidersLandingPage = React.lazy(() => import('./pages/providers/ProvidersLandingPage'));
const ProviderSearchPage = React.lazy(() => import('./pages/providers/ProviderSearchPage'));
const ProviderProfilePage = React.lazy(() => import('./pages/providers/ProviderProfilePage'));
const ForProvidersLandingPage = React.lazy(() => import('./pages/providers/ForProvidersLandingPage'));
const ProviderApplyPage = React.lazy(() => import('./pages/providers/ProviderApplyPage'));
const ProviderClaimPage = React.lazy(() => import('./pages/providers/ProviderClaimPage'));
const ToolsPage = React.lazy(() => import('./components/pages/ToolsPage'));
const MoodJournal = React.lazy(() => import('./components/tools/MoodJournal'));
const SleepArchitect = React.lazy(() => import('./components/tools/SleepArchitect'));
const PsychageAIPage = React.lazy(() => import('./pages/tools/MindMate'));
const CategoryPage = React.lazy(() => import('./components/pages/CategoryPage'));
const SearchResults = React.lazy(() => import('./components/pages/SearchResults'));
const ClarityScoreTool = React.lazy(() => import('./components/pages/ClarityScoreTool'));
const AboutPage = React.lazy(() => import('./components/pages/AboutPage'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
const LegalPage = React.lazy(() => import('./components/pages/LegalPages'));
const CrisisPage = React.lazy(() => import('./components/pages/CrisisPage'));
const NavigatorPage = React.lazy(() => import('./components/pages/NavigatorPage'));
const RelationshipHealthCheck = React.lazy(() => import('./components/tools/RelationshipHealthCheck'));
const ClarityJournal = React.lazy(() => import('./components/tools/ClarityJournal'));
const ClarityJournalDailyCheckIn = React.lazy(() => import('./components/tools/ClarityJournal/sections/DailyCheckIn'));
const ClarityJournalWeeklyScreening = React.lazy(() => import('./components/tools/ClarityJournal/sections/WeeklyScreening'));
const ClarityJournalThoughtRecord = React.lazy(() => import('./components/tools/ClarityJournal/sections/ThoughtRecord'));
const ClarityJournalBehavioralActivation = React.lazy(() => import('./components/tools/ClarityJournal/sections/BehavioralActivation'));
const ClarityJournalTriggerLog = React.lazy(() => import('./components/tools/ClarityJournal/sections/TriggerLog'));
const ClarityJournalWellnessToolbox = React.lazy(() => import('./components/tools/ClarityJournal/sections/WellnessToolbox'));
const ClarityJournalWeeklyReflection = React.lazy(() => import('./components/tools/ClarityJournal/sections/WeeklyReflection'));
const ClarityJournalHistory = React.lazy(() => import('./components/tools/ClarityJournal/sections/JournalHistory'));
const ClarityJournalInsights = React.lazy(() => import('./components/tools/ClarityJournal/sections/JournalInsights'));
// Clarity Journal V2
const ClarityJournalDailyEntry = React.lazy(() => import('./components/tools/ClarityJournal/v2-sections/DailyEntryV2'));
const ClarityJournalReport = React.lazy(() => import('./components/tools/ClarityJournal/v2-report/ReportConfigScreen'));
const CrisisResourcesScreen = React.lazy(() => import('./components/screens/CrisisResourcesScreen'));
const MedicationTracker = React.lazy(() => import('./components/tools/MedicationTracker'));

// Auth Pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const UpdatePasswordPage = React.lazy(() => import('./pages/auth/UpdatePasswordPage'));
const AuthCallback = React.lazy(() => import('./pages/auth/AuthCallback'));

// User Dashboard
const UserDashboard = React.lazy(() => import('./pages/dashboard/UserDashboard'));
const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));
const PrivacySettings = React.lazy(() => import('./pages/dashboard/PrivacySettings'));
const BookmarksPage = React.lazy(() => import('./pages/dashboard/BookmarksPage'));
const AssessmentHistory = React.lazy(() => import('./pages/dashboard/AssessmentHistory'));

// Admin redirect — admin panel lives on a separate domain (admin.psychage.com)
// In local dev (no VITE_ADMIN_URL), redirects to /admin.html entry point

// Provider Dashboard
const ProviderDashboard = React.lazy(() => import('./pages/provider/ProviderDashboard'));
const ProviderProfileEditor = React.lazy(() => import('./pages/provider/ProviderProfileEditor'));
const ProviderAnalytics = React.lazy(() => import('./pages/provider/ProviderAnalytics'));
const ProviderPatients = React.lazy(() => import('./pages/provider/ProviderPatients'));

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

// --- MAIN APP COMPONENT ---

/** Lightweight Suspense fallback — only shown on first-ever load of a lazy chunk */
const RouteLoadingIndicator = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-teal-500 animate-spin" />
    </div>
);

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <MotionConfig reducedMotion="user">
            <BookmarkProvider>
                <ProviderLookupsProvider>
                    <SkipLink />
                    {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

                    <ScrollManager />

                    {!isLoading && (
                        <div className="min-h-screen bg-background font-sans text-gray-900 overflow-x-hidden flex flex-col transition-colors duration-300">
                            <Navigation />

                            <main id="main-content" className={`flex-grow w-full outline-none ${location.pathname === '/tools/mindmate' ? '' : 'pb-24'} ${location.pathname !== '/' ? 'pt-20' : ''}`} tabIndex={-1}>
                                <ErrorBoundary
                                    resetKeys={[location.pathname]}
                                    fallback={(error, reset) => (
                                        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-2xl flex items-center justify-center mb-6 text-2xl">!</div>
                                            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">This page encountered an error</h2>
                                            <p className="text-gray-500 dark:text-gray-400 mb-1 max-w-md">Something went wrong loading this page. Try again or navigate to another page.</p>
                                            {error && <p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded mt-2 mb-4">{error.message}</p>}
                                            <div className="flex gap-3 mt-4">
                                                <button onClick={reset} className="px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity">Try Again</button>
                                                <button onClick={() => navigate('/', { replace: true })} className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Return Home</button>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Suspense fallback={<RouteLoadingIndicator />}>
                                        <Routes location={location}>
                                            <Route path="/" element={
                                                <PageTransition>
                                                    <SEO title="Psychage | Understand Your Mind" description="Free, evidence-based mental health tools, assessments, and resources. Understand your mind — privately and on your terms." />
                                                    <HeroSection />
                                                    <HowItWorksSection />
                                                    <ProductShowcase />
                                                    {/* UserTestimonials removed per task cd1326b1 */}
                                                    <FeatureSpotlight />
                                                    <ArticleCategorySection categorySlug="emotional-regulation" heading="Understand Your Emotions" subtitle="Learn to recognize, process, and manage your emotions with evidence-based strategies." bg="white" hoverClass="group-hover:text-rose-600 dark:group-hover:text-rose-400" />
                                                    <ArticleCategorySection categorySlug="anxiety-stress" heading="Manage Anxiety & Stress" subtitle="Practical tools and insights for understanding and reducing anxiety in everyday life." bg="light" hoverClass="group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                                                    <ArticleCategorySection categorySlug="self-worth-identity" heading="Build Your Self-Worth" subtitle="Strengthen your sense of identity and cultivate lasting confidence from the inside out." bg="white" hoverClass="group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                                                    <ArticleCategorySection categorySlug="relationships-communication" heading="Navigate Relationships" subtitle="Build healthier connections, set boundaries, and communicate with clarity." bg="light" hoverClass="group-hover:text-pink-600 dark:group-hover:text-pink-400" />
                                                    <ArticleCategorySection categorySlug="work-productivity" heading="Thrive at Work" subtitle="Protect your mental health at work and build sustainable productivity habits." bg="white" hoverClass="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                                    <ArticleCategorySection categorySlug="mens-mental-health" heading="Men's Mental Health" subtitle="Breaking the stigma — evidence-based resources for men's psychological wellbeing." bg="light" hoverClass="group-hover:text-slate-600 dark:group-hover:text-slate-400" />
                                                    <ArticleCategorySection categorySlug="chronic-illness-pain" heading="Chronic Illness & Pain" subtitle="Navigate the psychological impact of chronic conditions with compassion and science." bg="white" hoverClass="group-hover:text-lime-600 dark:group-hover:text-lime-400" />
                                                    <ArticleCategorySection categorySlug="technology-digital-life" heading="Digital Life & Technology" subtitle="Understand how technology shapes your mental health and build healthier digital habits." bg="light" hoverClass="group-hover:text-stone-600 dark:group-hover:text-stone-400" />
                                                    <NewsletterSection />
                                                </PageTransition>
                                            } />

                                            {/* Public Routes */}
                                            <Route path="/learn" element={<PageTransition><LearnPage /></PageTransition>} />
                                            <Route path="/learn/article/:id" element={<PageTransition><ArticleRedirect /></PageTransition>} />
                                            <Route path="/learn/:categorySlug/:articleSlug" element={<PageTransition><ArticlePage /></PageTransition>} />
                                            <Route path="/learn/:categorySlug" element={<PageTransition><ArticleCategoryPage /></PageTransition>} />
                                            <Route path="/watch/:id" element={<PageTransition><VideoDetail /></PageTransition>} />
                                            {/* Provider Directory V2 */}
                                            <Route path="/providers" element={<PageTransition><ProvidersLandingPage /></PageTransition>} />
                                            <Route path="/providers/search" element={<PageTransition><ProviderSearchPage /></PageTransition>} />
                                            <Route path="/providers/:id" element={<PageTransition><ProviderProfilePage /></PageTransition>} />
                                            <Route path="/for-providers" element={<PageTransition><ForProvidersLandingPage /></PageTransition>} />
                                            <Route path="/for-providers/apply" element={<PageTransition><ProviderApplyPage /></PageTransition>} />
                                            <Route path="/for-providers/claim" element={<PageTransition><ProviderClaimPage /></PageTransition>} />

                                            {/* Legacy provider redirects */}
                                            <Route path="/find-care" element={<Navigate to="/providers" replace />} />
                                            <Route path="/find-care/provider/:id" element={<Navigate to="/providers" replace />} />
                                            <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
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
                                            <Route path="/category/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
                                            <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
                                            <Route path="/clarity-score" element={<PageTransition><ClarityScoreTool /></PageTransition>} />
                                            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                                            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                                            <Route path="/legal/privacy" element={<PageTransition><LegalPage type="privacy" /></PageTransition>} />
                                            <Route path="/legal/terms" element={<PageTransition><LegalPage type="terms" /></PageTransition>} />
                                            <Route path="/crisis" element={<PageTransition><CrisisPage /></PageTransition>} />
                                            {/* Redirect legacy /navigator routes to /tools/symptom-navigator */}
                                            <Route path="/navigator" element={<Navigate to="/tools/symptom-navigator" replace />} />
                                            <Route path="/navigator/crisis" element={<Navigate to="/tools/symptom-navigator/crisis" replace />} />
                                            <Route path="/providers/register" element={<Navigate to="/for-providers/apply" replace />} />

                                            {/* Auth Routes */}
                                            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                                            <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
                                            <Route path="/reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
                                            <Route path="/update-password" element={<PageTransition><UpdatePasswordPage /></PageTransition>} />
                                            <Route path="/auth/callback" element={<AuthCallback />} />

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

                                            {/* Protected Routes: Provider Dashboard */}
                                            <Route path="/provider" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['provider', 'admin']}>
                                                        <PageTransition><ProviderDashboard /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/provider/profile" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['provider', 'admin']}>
                                                        <PageTransition><ProviderProfileEditor /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/provider/analytics" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['provider', 'admin']}>
                                                        <PageTransition><ProviderAnalytics /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />
                                            <Route path="/provider/patients" element={
                                                <ProtectedRoute>
                                                    <RoleGuard allowedRoles={['provider', 'admin']}>
                                                        <PageTransition><ProviderPatients /></PageTransition>
                                                    </RoleGuard>
                                                </ProtectedRoute>
                                            } />

                                            <Route path="*" element={
                                                <PageTransition>
                                                    <NotFoundPage />
                                                </PageTransition>
                                            } />
                                        </Routes>
                                    </Suspense>
                                </ErrorBoundary>
                            </main>

                            {location.pathname !== '/tools/mindmate' && <Footer />}

                            {location.pathname !== '/tools/mindmate' && <MindMate />}
                            <CookieConsent />

                            {/* Persistent Mobile CTA (Homepage Only) */}
                            {location.pathname === '/' && (
                                <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-border z-[60] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
                                    <button
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
                    )}
                </ProviderLookupsProvider>
            </BookmarkProvider>
        </MotionConfig>
    );
};

export default App;
