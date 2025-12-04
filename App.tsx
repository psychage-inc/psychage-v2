
import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import CategorySection from './components/home/CategorySection';
import ArticleSection from './components/home/ArticleSection';
import VideoSection from './components/home/VideoSection';
import ToolsSection from './components/home/ToolsSection';
import NewsletterSection from './components/home/NewsletterSection';
import AIChatWidget from './components/chat/AIChatWidget';
import NotFoundPage from './components/pages/NotFoundPage';
import { GlobalLoading } from './components/ui/Skeletons';
import { BookmarkProvider } from './context/BookmarkContext';
import SEO from './components/SEO';

// --- LAZY LOADED ROUTES (Code Splitting) ---
const ArticleDetail = React.lazy(() => import('./components/pages/ArticleDetail'));
const VideoDetail = React.lazy(() => import('./components/pages/VideoDetail'));
const ProviderDirectory = React.lazy(() => import('./components/pages/ProviderDirectory'));
const ProviderProfile = React.lazy(() => import('./components/pages/ProviderProfile'));
const CategoryPage = React.lazy(() => import('./components/pages/CategoryPage'));
const SearchResults = React.lazy(() => import('./components/pages/SearchResults'));
const ClarityScoreTool = React.lazy(() => import('./components/pages/ClarityScoreTool'));
const AboutPage = React.lazy(() => import('./components/pages/AboutPage'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
const LegalPage = React.lazy(() => import('./components/pages/LegalPages'));

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Page Transition Variants
    const pageVariants = {
        initial: { opacity: 0, y: 10, scale: 0.99 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.99 }
    };

    return (
        <BookmarkProvider>
            <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden flex flex-col transition-colors duration-300">

                <Navigation />

                <main id="main-content" className="flex-grow w-full outline-none pb-24" tabIndex={-1}>
                    <Suspense fallback={<GlobalLoading />}>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <SEO title="Psychage | Mental Health Education & Tools" description="The first adaptive operating system for mental health. Measure, analyze, and optimize your cognitive state in real-time." />
                                        <HeroSection />
                                        <CategorySection />
                                        <VideoSection />
                                        <ToolsSection />
                                        <ArticleSection />
                                        <NewsletterSection />
                                    </motion.div>
                                } />

                                <Route path="/learn/article/:id" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <ArticleDetail />
                                    </motion.div>
                                } />

                                <Route path="/watch/:id" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <VideoDetail />
                                    </motion.div>
                                } />

                                <Route path="/providers" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <ProviderDirectory />
                                    </motion.div>
                                } />

                                <Route path="/providers/:id" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <ProviderProfile />
                                    </motion.div>
                                } />

                                <Route path="/category/:category" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <CategoryPage />
                                    </motion.div>
                                } />

                                <Route path="/search" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <SearchResults />
                                    </motion.div>
                                } />

                                <Route path="/clarity-score" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                                        <ClarityScoreTool />
                                    </motion.div>
                                } />

                                <Route path="/about" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <AboutPage />
                                    </motion.div>
                                } />

                                <Route path="/contact" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <ContactPage />
                                    </motion.div>
                                } />

                                <Route path="/legal/privacy" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <LegalPage type="privacy" />
                                    </motion.div>
                                } />

                                <Route path="/legal/terms" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <LegalPage type="terms" />
                                    </motion.div>
                                } />

                                <Route path="*" element={
                                    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                                        <NotFoundPage />
                                    </motion.div>
                                } />
                            </Routes>
                        </AnimatePresence>
                    </Suspense>
                </main>

                <Footer />

                <AIChatWidget />
            </div>
        </BookmarkProvider>
    );
};

export default App;
