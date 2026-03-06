import React, { Suspense, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ProviderDirectorySection from './components/home/ProviderDirectorySection';
import SymptomCheckerSection from './components/home/SymptomCheckerSection';
import NewsletterSection from './components/home/NewsletterSection';
import VideoShowcaseSection from './components/home/VideoShowcaseSection';
import TopicHubSection from './components/home/TopicHubSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import QuickTopics from './components/home/QuickTopics';
import ToolsSection from './components/home/ToolsSection';
import MindMate from './components/ai/MindMate';
import NotFoundPage from './components/pages/NotFoundPage';
import { GlobalLoading } from './components/ui/Skeletons';
import { BookmarkProvider } from './context/BookmarkContext';
import { ProviderLookupsProvider } from './context/ProviderLookupsContext';
import SEO from './components/SEO';
import SkipLink from './components/ui/SkipLink';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import Preloader from './components/Preloader';
import PageTransition from './components/ui/PageTransition';
import { ScrollManager } from './components/ui/ScrollManager';
import { CustomCursor } from './components/ui/CustomCursor';

// --- LAZY LOADED ROUTES (Code Splitting) ---
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const ArticleCategoryPage = React.lazy(() => import('./pages/ArticleCategoryPage'));
const ArticleDetail = React.lazy(() => import('./components/pages/ArticleDetail'));
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
const CrisisPage = React.lazy(() => import('./components/pages/PsychageCrisisV2'));
const NavigatorPage = React.lazy(() => import('./components/pages/NavigatorPage'));
const ThoughtReframer = React.lazy(() => import('./components/tools/ThoughtReframer'));
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
const CrisisResourcesScreen = React.lazy(() => import('./components/screens/CrisisResourcesScreen'));

// Auth Pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const UpdatePasswordPage = React.lazy(() => import('./pages/auth/UpdatePasswordPage'));
const AuthCallback = React.lazy(() => import('./pages/auth/AuthCallback'));

// User Dashboard
const UserDashboard = React.lazy(() => import('./pages/dashboard/UserDashboard'));
const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));
const BookmarksPage = React.lazy(() => import('./pages/dashboard/BookmarksPage'));
const AssessmentHistory = React.lazy(() => import('./pages/dashboard/AssessmentHistory'));

// Admin Dashboard
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const ProviderManagement = React.lazy(() => import('./pages/admin/ProviderManagement'));
const AuditLogPage = React.lazy(() => import('./pages/admin/AuditLogPage'));
const ReportsPage = React.lazy(() => import('./pages/admin/ReportsPage'));

// Provider Dashboard
const ProviderDashboard = React.lazy(() => import('./pages/provider/ProviderDashboard'));
const ProviderProfileEditor = React.lazy(() => import('./pages/provider/ProviderProfileEditor'));
const ProviderAnalytics = React.lazy(() => import('./pages/provider/ProviderAnalytics'));
const ProviderPatients = React.lazy(() => import('./pages/provider/ProviderPatients'));

// Provider Registration (legacy — kept for admin reference only)

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <MotionConfig reducedMotion="user">
            <BookmarkProvider>
              <ProviderLookupsProvider>
                <SkipLink />
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

                <ScrollManager />
                <CustomCursor />

                {!isLoading && (
                    <div className="min-h-screen bg-background font-sans text-gray-900 overflow-x-hidden flex flex-col transition-colors duration-300">
                        <Navigation />

                        <main id="main-content" className="flex-grow w-full outline-none pb-24" tabIndex={-1}>
                            <Suspense fallback={<GlobalLoading />}>
                                <AnimatePresence mode="wait">
                                    <Routes location={location} key={location.pathname}>
                                        <Route path="/" element={
                                            <PageTransition>
                                                <SEO title="Psychage | Mental Health Education & Tools" description="The first adaptive operating system for mental health. Measure, analyze, and optimize your cognitive state in real-time." />
                                                <HeroSection />

                                                <HowItWorksSection />

                                                {/* Quick Access Topics */}
                                                <QuickTopics />

                                                {/* Interactive Tools */}
                                                <ToolsSection />

                                                {/* Content Hubs */}
                                                <TopicHubSection
                                                    categoryId="anxiety"
                                                    title="Mastering Anxiety"
                                                    description="Evidence-based strategies to calm your mind and body."
                                                    className="bg-white"
                                                />

                                                <VideoShowcaseSection />

                                                {/* Core Services */}
                                                <SymptomCheckerSection />
                                                <ProviderDirectorySection />

                                                <TopicHubSection
                                                    categoryId="wellness"
                                                    title="Holistic Wellness"
                                                    description="Nutrition, movement, and lifestyle habits for optimal mental health."
                                                    invert={true}
                                                />

                                                <TopicHubSection
                                                    categoryId="mindfulness"
                                                    title="Mindfulness & Meditation"
                                                    description="Practices to stay present and reduce stress in a busy world."
                                                    className="bg-white"
                                                    showVideos={false}
                                                />

                                                <TopicHubSection
                                                    categoryId="workplace"
                                                    title="Workplace Mental Health"
                                                    description="Navigating burnout, boundaries, and professional growth."
                                                    showVideos={false}
                                                    invert={true}
                                                />

                                                <NewsletterSection />
                                            </PageTransition>
                                        } />

                                        {/* Public Routes */}
                                        <Route path="/learn" element={<PageTransition><LearnPage /></PageTransition>} />
                                        <Route path="/learn/:categorySlug" element={<PageTransition><ArticleCategoryPage /></PageTransition>} />
                                        <Route path="/learn/article/:id" element={<PageTransition><ArticleDetail /></PageTransition>} />
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
                                        <Route path="/tools/mindmate" element={<PageTransition><PsychageAIPage /></PageTransition>} />
                                        <Route path="/tools/symptom-navigator" element={<PageTransition><NavigatorPage /></PageTransition>} />
                                        <Route path="/tools/symptom-navigator/crisis" element={<PageTransition><CrisisResourcesScreen /></PageTransition>} />
                                        <Route path="/tools/thought-reframer" element={<PageTransition><ThoughtReframer /></PageTransition>} />
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
                                        <Route path="/category/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
                                        <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
                                        <Route path="/clarity-score" element={<PageTransition><ClarityScoreTool /></PageTransition>} />
                                        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                                        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                                        <Route path="/legal/privacy" element={<PageTransition><LegalPage type="privacy" /></PageTransition>} />
                                        <Route path="/legal/terms" element={<PageTransition><LegalPage type="terms" /></PageTransition>} />
                                        <Route path="/crisis" element={<PageTransition><CrisisPage /></PageTransition>} />
                                        <Route path="/navigator" element={<PageTransition><NavigatorPage /></PageTransition>} />
                                        <Route path="/navigator/crisis" element={<PageTransition><CrisisResourcesScreen /></PageTransition>} />
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
                                        <Route path="/dashboard/assessments" element={<Navigate to="/dashboard/history" replace />} />
                                        <Route path="/dashboard/history" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['patient', 'admin']}>
                                                    <PageTransition><AssessmentHistory /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />

                                        {/* Protected Routes: Admin Dashboard */}
                                        <Route path="/admin" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['admin']}>
                                                    <PageTransition><AdminDashboard /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/providers" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['admin']}>
                                                    <PageTransition><ProviderManagement /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/audit" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['admin']}>
                                                    <PageTransition><AuditLogPage /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/admin/reports" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['admin']}>
                                                    <PageTransition><ReportsPage /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />

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
                                </AnimatePresence>
                            </Suspense>
                        </main>

                        <Footer />

                        <MindMate />
                    </div>
                )}
              </ProviderLookupsProvider>
            </BookmarkProvider>
        </MotionConfig>
    );
};

export default App;
