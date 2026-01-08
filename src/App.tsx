import React, { Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import ProviderDirectorySection from './components/home/ProviderDirectorySection';
import SymptomCheckerSection from './components/home/SymptomCheckerSection';
import NewsletterSection from './components/home/NewsletterSection';
import VideoShowcaseSection from './components/home/VideoShowcaseSection';
import TopicHubSection from './components/home/TopicHubSection';
import QuickTopics from './components/home/QuickTopics';
import ToolsSection from './components/home/ToolsSection';
import AIChatWidget from './components/chat/AIChatWidget';
import NotFoundPage from './components/pages/NotFoundPage';
import { GlobalLoading } from './components/ui/Skeletons';
import { BookmarkProvider } from './context/BookmarkContext';
import { AuthProvider } from './context/AuthContext';
import SEO from './components/SEO';
import SkipLink from './components/ui/SkipLink';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleGuard from './components/auth/RoleGuard';
import LoadingScreen from './components/ui/LoadingScreen';
import PageTransition from './components/ui/PageTransition';

// --- LAZY LOADED ROUTES (Code Splitting) ---
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const ArticleCategoryPage = React.lazy(() => import('./pages/ArticleCategoryPage'));
const ArticleDetail = React.lazy(() => import('./components/pages/ArticleDetail'));
const VideoDetail = React.lazy(() => import('./components/pages/VideoDetail'));
const ProviderDirectory = React.lazy(() => import('./components/pages/ProviderDirectory'));
const ProviderProfile = React.lazy(() => import('./components/pages/ProviderProfile'));
const ToolsPage = React.lazy(() => import('./components/pages/ToolsPage'));
const MoodJournal = React.lazy(() => import('./components/tools/MoodJournal'));
const SleepArchitect = React.lazy(() => import('./components/tools/SleepArchitect'));
const CategoryPage = React.lazy(() => import('./components/pages/CategoryPage'));
const SearchResults = React.lazy(() => import('./components/pages/SearchResults'));
const ClarityScoreTool = React.lazy(() => import('./components/pages/ClarityScoreTool'));
const AboutPage = React.lazy(() => import('./components/pages/AboutPage'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
const LegalPage = React.lazy(() => import('./components/pages/LegalPages'));

// Auth Pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const UpdatePasswordPage = React.lazy(() => import('./pages/auth/UpdatePasswordPage'));

// User Dashboard
const UserDashboard = React.lazy(() => import('./pages/dashboard/UserDashboard'));
const ProfileSettings = React.lazy(() => import('./pages/dashboard/ProfileSettings'));
const BookmarksPage = React.lazy(() => import('./pages/dashboard/BookmarksPage'));
const UserAssessmentHistory = React.lazy(() => import('./pages/dashboard/UserAssessmentHistory'));

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

// Provider Registration
const ProviderRegistrationPage = React.lazy(() => import('./pages/connect/ProviderRegistrationPage'));

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AuthProvider>
            <BookmarkProvider>
                <SkipLink />
                <AnimatePresence mode="wait">
                    {isLoading && <LoadingScreen key="loading-screen" onComplete={() => setIsLoading(false)} />}
                </AnimatePresence>

                {!isLoading && (
                    <div className="min-h-screen bg-[#fafaf9] font-sans text-gray-900 overflow-x-hidden flex flex-col transition-colors duration-300">
                        <Navigation />

                        <main id="main-content" className="flex-grow w-full outline-none pb-24" tabIndex={-1}>
                            <Suspense fallback={<GlobalLoading />}>
                                <AnimatePresence mode="wait">
                                    <Routes location={location} key={location.pathname}>
                                        <Route path="/" element={
                                            <PageTransition>
                                                <SEO title="Psychage | Mental Health Education & Tools" description="The first adaptive operating system for mental health. Measure, analyze, and optimize your cognitive state in real-time." />
                                                <HeroSection />

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
                                        <Route path="/find-care" element={<PageTransition><ProviderDirectory /></PageTransition>} />
                                        <Route path="/find-care/provider/:id" element={<PageTransition><ProviderProfile /></PageTransition>} />
                                        <Route path="/tools" element={<PageTransition><ToolsPage /></PageTransition>} />
                                        <Route path="/tools/mood-journal" element={<PageTransition><MoodJournal /></PageTransition>} />
                                        <Route path="/tools/sleep-architect" element={<PageTransition><SleepArchitect /></PageTransition>} />
                                        <Route path="/category/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
                                        <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
                                        <Route path="/clarity-score" element={<PageTransition><ClarityScoreTool /></PageTransition>} />
                                        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                                        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                                        <Route path="/legal/privacy" element={<PageTransition><LegalPage type="privacy" /></PageTransition>} />
                                        <Route path="/legal/terms" element={<PageTransition><LegalPage type="terms" /></PageTransition>} />
                                        <Route path="/providers/register" element={<PageTransition><ProviderRegistrationPage /></PageTransition>} />

                                        {/* Auth Routes */}
                                        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                                        <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
                                        <Route path="/reset-password" element={<PageTransition><ResetPasswordPage /></PageTransition>} />
                                        <Route path="/update-password" element={<PageTransition><UpdatePasswordPage /></PageTransition>} />

                                        {/* Protected Routes: User Dashboard */}
                                        <Route path="/dashboard" element={
                                            <ProtectedRoute>
                                                <RoleGuard allowedRoles={['patient', 'admin']}>
                                                    <PageTransition><UserDashboard /></PageTransition>
                                                </RoleGuard>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/dashboard/profile" element={
                                            <ProtectedRoute>
                                                <PageTransition><ProfileSettings /></PageTransition>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/dashboard/bookmarks" element={
                                            <ProtectedRoute>
                                                <PageTransition><BookmarksPage /></PageTransition>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/dashboard/assessments" element={
                                            <ProtectedRoute>
                                                <PageTransition><UserAssessmentHistory /></PageTransition>
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

                        <AIChatWidget />
                    </div>
                )}
            </BookmarkProvider>
        </AuthProvider>
    );
};

export default App;
