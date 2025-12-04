
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ChevronUp, Sun, Moon } from 'lucide-react';
import { NoiseTexture } from '../home/hero/HeroAssets';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    // Close menu when scrolling
    useEffect(() => {
        const handleScroll = () => setActiveTab(null);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard Shortcuts (Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActiveTab(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-focus search input
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    // Main navigation items
    const navLinks = [
        { name: 'Platform', hasMenu: true },
        { name: 'Resources', hasMenu: true },
        { name: 'Company', hasMenu: true }
    ];

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Top Brand Indicator (Static) */}
            <div className="fixed top-6 left-6 z-40 hidden md:flex items-center gap-3 mix-blend-difference text-white pointer-events-none">
                <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold">P</div>
                <span className="font-display font-bold tracking-tight">Psychage OS</span>
            </div>

            <header className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
                {/* Floating Command Dock - TOP ALIGNED */}
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className={`
                pointer-events-auto
                relative
                bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/40 dark:border-white/10
                shadow-2xl shadow-black/10 dark:shadow-black/40
                transition-all duration-300 ease-out
                flex items-center gap-2 p-2 rounded-[24px]
            `}
                    onMouseLeave={() => setActiveTab(null)}
                >
                    {/* Grain Texture Overlay */}
                    <div className="absolute inset-0 overflow-hidden rounded-[24px] z-0 pointer-events-none">
                        <NoiseTexture opacity={0.04} />
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden w-12 h-12 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 relative z-10"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* --- NAVIGATION LINKS --- */}
                    <nav className="hidden md:flex relative z-10 items-center gap-1">
                        <button
                            onClick={() => navigate('/')}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </button>

                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

                        {navLinks.map((link) => (
                            <div key={link.name} className="relative">
                                <button
                                    onMouseEnter={() => setActiveTab(link.name)}
                                    onClick={() => setActiveTab(activeTab === link.name ? null : link.name)}
                                    className={`
                                px-6 h-12 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2
                                ${activeTab === link.name
                                            ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}
                            `}
                                >
                                    {link.name}
                                    <ChevronUp
                                        size={12}
                                        strokeWidth={3}
                                        className={`transition-transform duration-300 opacity-50 ${activeTab === link.name ? 'rotate-0' : 'rotate-180'}`}
                                    />
                                </button>

                                {/* Tab Indicator */}
                                {activeTab === link.name && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"
                                    />
                                )}

                                {/* Dropdown Menu */}
                                {link.hasMenu && (
                                    <AnimatePresence>
                                        {activeTab === link.name && (
                                            <NavMenu
                                                activeTab={activeTab}
                                                onMouseLeave={() => setActiveTab(null)}
                                                onCategorySelect={(category) => {
                                                    navigate(`/category/${category}`);
                                                    setActiveTab(null);
                                                }}
                                                onNavigateGeneric={(view) => {
                                                    navigate(`/${view}`);
                                                    setActiveTab(null);
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}

                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

                        <div className="relative group">
                            <button
                                onClick={() => navigate('/providers')}
                                className="px-6 h-12 rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                            >
                                Find Care
                            </button>
                        </div>
                    </nav>

                    {/* --- RIGHT ACTIONS --- */}
                    <div className="hidden md:flex relative z-10 items-center gap-2 pl-2">

                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200
                            ${isSearchOpen
                                        ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}
                        `}
                            >
                                <Search size={20} />
                            </button>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <Button
                            className="rounded-2xl px-6 h-12 bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-black text-white shadow-lg shadow-gray-900/20 border-none font-bold text-sm ml-2"
                            onClick={() => navigate('/clarity-score')}
                        >
                            Start
                        </Button>
                    </div>

                    {/* --- SEARCH BAR EXPANSION --- */}
                    <AnimatePresence>
                        {isSearchOpen && (
                            <motion.div
                                initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
                                animate={{ width: 320, opacity: 1, paddingLeft: 12 }}
                                exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
                                className="overflow-hidden flex items-center"
                            >
                                <form onSubmit={handleSearchSubmit} className="relative w-full">
                                    <input
                                        ref={searchInputRef}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search Psychage OS..."
                                        className="w-full h-14 pl-4 pr-12 bg-transparent rounded-2xl border-none outline-none font-medium text-lg text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />

                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="hidden md:flex items-center justify-center h-6 px-2 rounded-lg bg-gray-100 dark:bg-white/10 text-[10px] font-bold text-gray-400 border border-black/5">ESC</span>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </header>

            {/* Mobile Menu Overlay */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                onNavigateGeneric={(view) => {
                    if (view === 'home') navigate('/');
                    else navigate(`/${view}`);
                    setIsMobileMenuOpen(false);
                }}
            />
        </>
    );
};

export default Navigation;
