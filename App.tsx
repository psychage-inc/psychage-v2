
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { articles } from './data/richArticles';
import { videos } from './data/videos';
import { providers } from './data/providers';
import { BookmarkProvider } from './context/BookmarkContext';

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

type ViewState = 
  | 'home' 
  | 'article' 
  | 'video' 
  | 'providers' 
  | 'provider-profile' 
  | 'category' 
  | 'search' 
  | 'clarity-score'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | '404';

// --- CUSTOM HOOKS ---
const useDynamicSEO = (
  view: ViewState, 
  data: { 
    article?: typeof articles[0] | null, 
    video?: typeof videos[0] | null, 
    provider?: typeof providers[0] | null, 
    category?: string | null, 
    query?: string 
  }
) => {
  useEffect(() => {
    let title = 'Psychage | Mental Health Intelligence';
    let description = 'The first adaptive operating system for mental health. Measure, analyze, and optimize your cognitive state in real-time.';
    
    switch(view) {
      case 'home': 
          title = 'Psychage | Mental Health Education & Tools'; 
          break;
      case 'article': 
          if(data.article) {
              title = `${data.article.title} | Psychage`; 
              description = data.article.description;
          }
          break;
      case 'video': 
          if(data.video) {
              title = `${data.video.title} | Psychage`; 
              description = `Watch ${data.video.title} on Psychage. Learn from expert masterclasses.`;
          }
          break;
      case 'category': 
          if(data.category) {
              title = `${data.category} Resources | Psychage`;
              description = `Explore comprehensive guides, articles, and tools regarding ${data.category}.`;
          }
          break;
      case 'providers': 
          title = 'Find a Therapist | Psychage Directory'; 
          description = 'Connect with verified therapists and psychiatrists who match your specific needs, insurance, and location.';
          break;
      case 'provider-profile': 
          if(data.provider) {
              title = `${data.provider.name} | Psychage`; 
              description = `${data.provider.role} specializing in ${data.provider.specialties.join(', ')} located in ${data.provider.location}.`;
          }
          break;
      case 'clarity-score': 
          title = 'Clarity Score™ Assessment | Psychage'; 
          description = 'Understand your mental well-being in under 5 minutes. Clinical-grade screening for anxiety, mood, and stress.';
          break;
      case 'search': 
          title = `Search Results for "${data.query}" | Psychage`; 
          break;
      case 'about': 
          title = 'About Us | Psychage'; 
          description = 'Democratizing access to mental clarity. Learn about our mission and clinical integrity.';
          break;
      case 'contact': 
          title = 'Contact Us | Psychage'; 
          break;
      case '404': 
          title = 'Page Not Found | Psychage'; 
          break;
    }

    document.title = title;
  }, [view, data.article, data.video, data.category, data.provider, data.query]);
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isViewLoading, setIsViewLoading] = useState(false);

  const parseUrlToState = useCallback(() => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    if (path.startsWith('/learn/article/')) {
      const id = parseInt(path.split('/').pop() || '0');
      if (id && !isNaN(id)) { setCurrentView('article'); setSelectedId(id); return; }
    }
    if (path.startsWith('/watch/')) {
      const id = parseInt(path.split('/').pop() || '0');
      if (id && !isNaN(id)) { setCurrentView('video'); setSelectedId(id); return; }
    }
    if (path.startsWith('/learn/category/')) {
      const cat = decodeURIComponent(path.split('/').pop() || '');
      if (cat) { setCurrentView('category'); setSelectedCategory(cat); return; }
    }
    if (path.startsWith('/providers/') && path.split('/').length > 2) {
      const id = parseInt(path.split('/').pop() || '0');
      if (id && !isNaN(id)) { setCurrentView('provider-profile'); setSelectedId(id); return; }
    }
    if (path === '/providers') { setCurrentView('providers'); return; }
    if (path === '/tools/clarity-score') { setCurrentView('clarity-score'); return; }
    if (path === '/search') {
      const q = searchParams.get('q');
      setCurrentView('search');
      setSearchQuery(q || '');
      return;
    }
    if (path === '/about') { setCurrentView('about'); return; }
    if (path === '/contact') { setCurrentView('contact'); return; }
    if (path === '/privacy') { setCurrentView('privacy'); return; }
    if (path === '/terms') { setCurrentView('terms'); return; }
    if (path === '/404') { setCurrentView('404'); return; }

    setCurrentView('home');
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', parseUrlToState);
    parseUrlToState();
    return () => window.removeEventListener('popstate', parseUrlToState);
  }, [parseUrlToState]);

  const changeView = (view: ViewState, id: number | null = null, category: string | null = null, query: string = '') => {
      if (view === currentView && id === selectedId) return;

      setIsViewLoading(true);
      window.scrollTo(0,0);

      let url = '/';
      switch(view) {
        case 'home': url = '/'; break;
        case 'article': url = `/learn/article/${id}`; break;
        case 'video': url = `/watch/${id}`; break;
        case 'category': url = `/learn/category/${encodeURIComponent(category || '')}`; break;
        case 'providers': url = '/providers'; break;
        case 'provider-profile': url = `/providers/${id}`; break;
        case 'clarity-score': url = '/tools/clarity-score'; break;
        case 'search': url = `/search?q=${encodeURIComponent(query)}`; break;
        case 'about': url = '/about'; break;
        case 'contact': url = '/contact'; break;
        case 'privacy': url = '/privacy'; break;
        case 'terms': url = '/terms'; break;
        case '404': url = '/404'; break;
      }

      window.history.pushState({}, '', url);

      setTimeout(() => {
          setCurrentView(view);
          setSelectedId(id);
          setSelectedCategory(category);
          setSearchQuery(query);
          setIsViewLoading(false);
      }, 50); 
  };

  const selectedArticle = currentView === 'article' && selectedId ? articles.find(a => a.id === selectedId) : null;
  const selectedVideo = currentView === 'video' && selectedId ? videos.find(v => v.id === selectedId) : null;
  const selectedProvider = currentView === 'provider-profile' && selectedId ? providers.find(p => p.id === selectedId) : null;

  useDynamicSEO(currentView, { 
    article: selectedArticle, 
    video: selectedVideo, 
    provider: selectedProvider, 
    category: selectedCategory, 
    query: searchQuery 
  });

  const navigateToHome = () => changeView('home');
  const navigateToArticle = (id: number) => changeView('article', id);
  const navigateToVideo = (id: number) => changeView('video', id);
  const navigateToProviders = () => changeView('providers');
  const navigateToProviderProfile = (id: number) => changeView('provider-profile', id);
  const navigateToCategory = (category: string) => changeView('category', null, category);
  const handleSearch = (query: string) => changeView('search', null, null, query);
  const navigateToGeneric = (view: string) => {
      if (['about', 'contact', 'privacy', 'terms', 'home', 'providers', 'clarity-score'].includes(view)) {
          changeView(view as ViewState);
      } else {
          changeView('404');
      }
  };

  // 404 Guard
  if (!isViewLoading && currentView === 'article' && !selectedArticle && selectedId !== null) {
      return (
        <BookmarkProvider>
          <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden">
             <Navigation onNavigateHome={navigateToHome} onNavigateProviders={navigateToProviders} onNavigateCategory={navigateToCategory} onSearch={handleSearch} onNavigateGeneric={navigateToGeneric} />
             <NotFoundPage onGoHome={navigateToHome} onSearch={() => changeView('search')} />
             <Footer onNavigate={navigateToGeneric} />
          </div>
        </BookmarkProvider>
      );
  }

  // Page Transition Variants
  const pageVariants = {
      initial: { opacity: 0, y: 10, scale: 0.99 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -10, scale: 0.99 }
  };

  return (
    <BookmarkProvider>
      <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] font-sans text-gray-900 dark:text-white overflow-x-hidden flex flex-col transition-colors duration-300">
        
        <Navigation 
          onNavigateHome={navigateToHome}
          onNavigateProviders={navigateToProviders}
          onNavigateCategory={navigateToCategory}
          onSearch={handleSearch}
          onNavigateGeneric={navigateToGeneric}
        />
        
        <main id="main-content" className="flex-grow w-full outline-none pb-24" tabIndex={-1}>
          <Suspense fallback={<GlobalLoading />}>
              <AnimatePresence mode="wait">
                  {currentView === 'home' && (
                      <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <HeroSection />
                          <CategorySection />
                          <VideoSection />
                          <ToolsSection />
                          <ArticleSection onViewArticle={navigateToArticle} />
                          <NewsletterSection />
                      </motion.div>
                  )}

                  {currentView === 'article' && selectedArticle && (
                       <motion.div key={`article-${selectedId}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <ArticleDetail 
                              article={selectedArticle} 
                              onBack={navigateToHome} 
                              isLoading={isViewLoading}
                          />
                       </motion.div>
                  )}

                  {currentView === 'video' && selectedVideo && (
                      <motion.div key={`video-${selectedId}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <VideoDetail
                              video={selectedVideo}
                              onBack={navigateToHome}
                              onNavigateToVideo={navigateToVideo}
                              isLoading={isViewLoading}
                          />
                      </motion.div>
                  )}

                  {currentView === 'providers' && (
                      <motion.div key="providers" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <ProviderDirectory />
                      </motion.div>
                  )}

                  {currentView === 'provider-profile' && selectedProvider && (
                      <motion.div key={`prov-${selectedId}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <ProviderProfile 
                              provider={selectedProvider}
                              onBack={navigateToProviders}
                              isLoading={isViewLoading}
                          />
                      </motion.div>
                  )}

                  {currentView === 'category' && selectedCategory && (
                       <motion.div key={`cat-${selectedCategory}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <CategoryPage 
                              category={selectedCategory}
                              onBack={navigateToHome}
                              onNavigateToArticle={navigateToArticle}
                              onNavigateToVideo={navigateToVideo}
                          />
                       </motion.div>
                  )}

                  {currentView === 'search' && (
                      <motion.div key="search" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <SearchResults 
                              query={searchQuery}
                              onNavigateToArticle={navigateToArticle}
                              onNavigateToVideo={navigateToVideo}
                          />
                      </motion.div>
                  )}

                  {currentView === 'clarity-score' && (
                      <motion.div key="clarity" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                          <ClarityScoreTool 
                              onBack={navigateToHome}
                              onFinish={navigateToHome}
                          />
                      </motion.div>
                  )}
                  
                  {currentView === 'about' && <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit"><AboutPage /></motion.div>}
                  {currentView === 'contact' && <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit"><ContactPage /></motion.div>}
                  {currentView === 'privacy' && <motion.div key="privacy" variants={pageVariants} initial="initial" animate="animate" exit="exit"><LegalPage type="privacy" /></motion.div>}
                  {currentView === 'terms' && <motion.div key="terms" variants={pageVariants} initial="initial" animate="animate" exit="exit"><LegalPage type="terms" /></motion.div>}
                  
                  {currentView === '404' && (
                      <motion.div key="404" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                          <NotFoundPage 
                              onGoHome={navigateToHome} 
                              onSearch={() => changeView('search')}
                          />
                      </motion.div>
                  )}
              </AnimatePresence>
          </Suspense>
        </main>

        <Footer onNavigate={(view) => {
            if (view === 'category' && selectedCategory) return;
            navigateToGeneric(view);
        }} />
        
        <AIChatWidget />
      </div>
    </BookmarkProvider>
  );
};

export default App;
