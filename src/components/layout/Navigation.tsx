import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ChevronDown, Sun, Moon, User, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';
import AuthModal from '../auth/AuthModal';

const Navigation: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (window.scrollY > 20) {
                // setActiveTab(null); // Optional: close menu on scroll
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActiveTab(null);
                setIsAuthOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

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
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || activeTab || isSearchOpen
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm'
                        : 'bg-transparent'
                    }`}
                onMouseLeave={() => setActiveTab(null)}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-black/10">
                            P
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                            Psychage OS
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <button
                                    onMouseEnter={() => setActiveTab(link.name)}
                                    onClick={() => setActiveTab(activeTab === link.name ? null : link.name)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-1.5
                                        ${activeTab === link.name
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                                    `}
                                >
                                    {link.name}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform duration-200 ${activeTab === link.name ? 'rotate-180' : ''}`}
                                    />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => navigate('/find-care')}
                            className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                        >
                            Find Care
                        </button>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                                ${isSearchOpen
                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
                            `}
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Auth Button */}
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
                        >
                            <User size={20} />
                        </button>

                        {/* CTA Button */}
                        <Button
                            className="hidden md:flex rounded-full px-6 h-10 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 border-none font-bold text-sm ml-2"
                            onClick={() => navigate('/clarity-score')}
                        >
                            Start
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Search Bar Overlay */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
                        >
                            <div className="max-w-3xl mx-auto px-4 py-6">
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search articles, tools, videos..."
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-lg font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md">ESC</span>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeTab && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl"
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <NavMenu
                                    activeTab={activeTab}
                                    onMouseLeave={() => { }} // Handled by header onMouseLeave
                                    onCategorySelect={(category) => {
                                        navigate(`/category/${category}`);
                                        setActiveTab(null);
                                    }}
                                    onNavigateGeneric={(view) => {
                                        navigate(`/${view}`);
                                        setActiveTab(null);
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

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
