import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Search, Menu, ChevronDown, User, X, LogOut, LayoutDashboard, Settings, Phone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { navigationConfig } from '../../config/navigation';
import { useNavPermissions } from '../../hooks/useNavPermissions';
import type { NavItem } from '../../types/navigation';

const Navigation: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // Refs for hover management
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { filterNavItems, filterMegaMenu } = useNavPermissions();

    // Filter navigation items based on permissions
    const primaryNavItems = useMemo(() => {
        return navigationConfig.primary
            .map(item => filterMegaMenu(item))
            .filter((item): item is NavItem => item !== null);
    }, [filterMegaMenu]);

    const authItems = useMemo(() =>
        filterNavItems(navigationConfig.auth),
        [filterNavItems]
    );

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
        // AUTH-022: logout owns the post-logout navigation. Pass '/' to
        // preserve the prior homepage redirect (default would be /login).
        setIsUserMenuOpen(false);
        await logout('/');
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
                    ? 'bg-surface/80 backdrop-blur-xl border-b border-border shadow-sm'
                    : 'bg-transparent'
                    }`}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50"
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3" aria-label="Psychage home">
                        <Logo className="h-12 w-auto text-[#1A1A1A] dark:text-white" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                        <LayoutGroup>
                            {primaryNavItems.map((navItem) => (
                                <div key={navItem.id} className="relative">
                                    {navItem.type === 'mega-menu' ? (
                                        <button
                                            onMouseEnter={() => { handleMouseEnter(navItem.label); setHoveredLink(navItem.label); }}
                                            onClick={() => setActiveTab(prev => prev === navItem.label ? null : navItem.label)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    setActiveTab(navItem.label);
                                                }
                                            }}
                                            className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 flex items-center gap-1.5 z-10 ${activeTab === navItem.label || hoveredLink === navItem.label
                                                ? 'text-text-primary'
                                                : 'text-text-secondary'
                                                }`}
                                            aria-expanded={activeTab === navItem.label}
                                            aria-haspopup="menu"
                                            aria-label={`${navItem.label} menu`}
                                        >
                                            {activeTab === navItem.label && (
                                                <motion.div
                                                    layoutId="nav-bg"
                                                    className="absolute inset-0 bg-surface-hover rounded-full -z-10"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            {navItem.label}
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-200 ${activeTab === navItem.label ? 'rotate-180' : ''}`}
                                                aria-hidden="true"
                                            />
                                        </button>
                                    ) : (
                                        <div
                                            onMouseEnter={() => { handleMouseEnter(''); setHoveredLink(navItem.label); }}
                                        >
                                            <button
                                                onClick={() => navigate(navItem.type === 'link' ? navItem.href : '/')}
                                                className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200 z-10 ${hoveredLink === navItem.label ? 'text-text-primary' : 'text-text-secondary'}`}
                                            >
                                                {hoveredLink === navItem.label && (
                                                    <motion.div
                                                        layoutId="nav-bg"
                                                        className="absolute inset-0 bg-surface-hover rounded-full -z-10"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                                {navItem.label}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </LayoutGroup>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <div className="hidden md:flex">
                            <ThemeToggle />
                        </div>

                        {/* Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            onMouseEnter={() => handleMouseEnter('')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isSearchOpen
                                ? 'bg-surface-hover text-text-primary'
                                : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary'
                                }`}
                            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                            aria-expanded={isSearchOpen}
                        >
                            {isSearchOpen ? <X size={20} aria-hidden="true" /> : <Search size={20} aria-hidden="true" />}
                        </button>

                        {/* Crisis Support Button — always visible, compact on mobile */}
                        <button
                            onClick={() => navigate('/crisis')}
                            onMouseEnter={() => handleMouseEnter('')}
                            className="flex items-center justify-center h-10 rounded-full text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-100 dark:border-red-800/50 px-2.5 md:px-4"
                            aria-label="Crisis support - get immediate help"
                        >
                            <Phone size={16} className="md:hidden" aria-hidden="true" />
                            <span className="hidden md:inline">Crisis Support</span>
                        </button>

                        {isAuthenticated ? (
                            <>
                                {/* User Menu */}
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-all ${isUserMenuOpen ? 'bg-surface-hover text-text-primary' : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary'}`}
                                        aria-label="User menu"
                                        aria-expanded={isUserMenuOpen}
                                        aria-haspopup="menu"
                                    >
                                        <User size={20} aria-hidden="true" />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-xl shadow-xl border border-border overflow-hidden py-1 z-[60]"
                                                role="menu"
                                            >
                                                <div className="px-4 py-3 border-b border-border">
                                                    <p className="text-sm font-medium text-text-primary truncate">{user?.display_name || 'User'}</p>
                                                    <p className="text-xs text-text-tertiary truncate">{user?.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => { navigate(getDashboardPath()); setIsUserMenuOpen(false); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover flex items-center gap-2"
                                                    role="menuitem"
                                                >
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={() => { navigate('/dashboard/settings'); setIsUserMenuOpen(false); }}
                                                    className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover flex items-center gap-2"
                                                    role="menuitem"
                                                >
                                                    <Settings size={16} />
                                                    Settings
                                                </button>
                                                <div className="h-px bg-border my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                    role="menuitem"
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
                                {/* Auth buttons from filtered config */}
                                {authItems.map((authItem) => {
                                    if (authItem.type !== 'link') return null;
                                    const isGetStarted = authItem.id === 'signup';

                                    return isGetStarted ? (
                                        <Button
                                            key={authItem.id}
                                            className={`hidden md:flex rounded-full px-6 h-10 ${authItem.className || 'bg-primary hover:bg-primary-hover text-white'} shadow-lg shadow-primary/20 border-none font-bold text-sm ml-2`}
                                            onClick={() => navigate(authItem.href)}
                                            onMouseEnter={() => handleMouseEnter('')}
                                        >
                                            {authItem.label}
                                        </Button>
                                    ) : (
                                        <button
                                            key={authItem.id}
                                            onClick={() => navigate(authItem.href)}
                                            onMouseEnter={() => handleMouseEnter('')}
                                            className="hidden md:flex px-4 py-2 rounded-full text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all"
                                        >
                                            {authItem.label}
                                        </button>
                                    );
                                })}
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-text-primary hover:bg-surface-hover"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open navigation menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <Menu size={24} aria-hidden="true" />
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
                            className="border-t border-border bg-surface overflow-hidden relative z-40"
                        >
                            <div className="max-w-3xl mx-auto px-4 py-6">
                                <form onSubmit={handleSearchSubmit} className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                                    <input
                                        ref={searchInputRef}
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search articles, tools, videos..."
                                        aria-label="Search articles, tools, and videos"
                                        className="w-full pl-12 pr-4 py-4 bg-surface-hover border-none rounded-2xl text-lg font-medium text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-teal-500"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-xs font-bold text-text-tertiary border border-border px-2 py-1 rounded-md">ESC</span>
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
                            className="absolute top-full left-0 right-0 border-t border-border bg-surface shadow-xl z-50"
                            onMouseEnter={handleMenuEnter}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <NavMenu
                                    activeMenuItem={primaryNavItems.find(item => item.label === activeTab) || null}
                                    onMouseLeave={() => { }} // Handled by wrapper
                                    onCategorySelect={(category) => {
                                        navigate(`/category/${category}`);
                                        setActiveTab(null);
                                    }}
                                    onNavigateGeneric={(view) => {
                                        navigate(view.startsWith('/') ? view : `/${view}`);
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
                    else navigate(view.startsWith('/') ? view : `/${view}`);
                    setIsMobileMenuOpen(false);
                }}
            />
        </>
    );
};
export default Navigation;
