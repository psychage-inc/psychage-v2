import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, ChevronDown, User, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navigation: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Refs for hover management
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            if (window.scrollY > 20 && activeTab) {
                setActiveTab(null);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeTab]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActiveTab(null);
                setIsUserMenuOpen(false);
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    const navLinks = [
        { name: 'Learn', hasMenu: true },
        { name: 'Tools', hasMenu: true },
        { name: 'Find Providers', hasMenu: false, href: '/find-care' }
    ];

    const getDashboardPath = () => {
        if (!user) return '/login';
        switch (user.role) {
            case 'admin': return '/admin';
            case 'provider': return '/provider';
            case 'patient': return '/dashboard';
            default: return '/dashboard';
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setIsUserMenuOpen(false);
    };

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    // Robust Hover Handlers
    const handleMouseEnter = (tab: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setActiveTab(tab);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        // 150ms grace period before closing
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveTab(null);
        }, 150);
    };

    const handleMenuEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    const handleMenuLeave = () => {
        handleMouseLeave();
    };


    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || activeTab || isSearchOpen
                    ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm'
                    : 'bg-transparent'
                    }`}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50"
                    onMouseEnter={handleMenuEnter}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <img
                            src="/images/logo.png"
                            alt="Psychage Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.hasMenu ? (
                                    <button
                                        onMouseEnter={() => handleMouseEnter(link.name)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${activeTab === link.name
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.name}
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-200 ${activeTab === link.name ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <div
                                        onMouseEnter={() => handleMouseEnter('')}
                                    >
                                        <button
                                            onClick={() => navigate(link.href!)}
                                            className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                        >
                                            {link.name}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            onMouseEnter={() => handleMouseEnter('')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isSearchOpen
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        {/* Crisis Support Button */}
                        <button
                            onClick={() => navigate('/crisis')}
                            onMouseEnter={() => handleMouseEnter('')}
                            className="hidden md:flex items-center justify-center px-4 h-10 rounded-full text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
                        >
                            Crisis Support
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* Dashboard Button */}
                                <Button
                                    className="hidden md:flex rounded-full px-6 h-10 bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-900/20 border-none font-bold text-sm ml-2"
                                    onClick={() => navigate(getDashboardPath())}
                                    onMouseEnter={() => handleMouseEnter('')}
                                >
                                    Dashboard
                                </Button>

                                {/* User Menu */}
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-all ml-2 ${isUserMenuOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                                    >
                                        <User size={20} />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-[60]"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{user?.display_name || 'User'}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => { navigate(getDashboardPath()); setIsUserMenuOpen(false); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={() => { navigate('/dashboard/settings'); setIsUserMenuOpen(false); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                    <Settings size={16} />
                                                    Settings
                                                </button>
                                                <div className="h-px bg-gray-100 my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <LogOut size={16} />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <button
                                    onClick={() => navigate('/login')}
                                    onMouseEnter={() => handleMouseEnter('')}
                                    className="hidden md:flex px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                >
                                    Sign In
                                </button>

                                {/* Get Started Button */}
                                <Button
                                    className="hidden md:flex rounded-full px-6 h-10 bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-900/20 border-none font-bold text-sm ml-2"
                                    onClick={() => navigate('/signup')}
                                    onMouseEnter={() => handleMouseEnter('')}
                                >
                                    Get Started
                                </Button>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100"
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
                            className="border-t border-gray-100 bg-white overflow-hidden relative z-40"
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
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-lg font-medium text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded-md">ESC</span>
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
                            key="mega-menu"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 border-t border-gray-100 bg-white/95 backdrop-blur-xl shadow-xl z-50"
                            onMouseEnter={handleMenuEnter}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <NavMenu
                                    activeTab={activeTab}
                                    onMouseLeave={() => { }} // Handled by wrapper
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
