import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronRight, LogOut, User, ChevronDown, HeartHandshake } from 'lucide-react';
import { Logo } from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { navigationConfig } from '../../config/navigation';
import { useNavigation } from '../../hooks/useNavigation';
import { useNavPermissions } from '../../hooks/useNavPermissions';
import type { NavItem } from '../../types/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateGeneric?: (view: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { getDashboardConfig } = useNavigation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { filterNavItems, filterMegaMenu } = useNavPermissions();

  const dashboardConfig = getDashboardConfig();

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

  const handleNav = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = async () => {
    // AUTH-022: logout owns post-logout navigation. Pass '/' to preserve
    // the prior homepage redirect (default would be /login).
    onClose();
    await logout('/');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
          />

          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-surface shadow-2xl z-[120] md:hidden flex flex-col border-l border-border"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <Logo className="h-10 w-auto text-[#1A1A1A] dark:text-white" />
                {isAuthenticated && (
                  <div className="ml-2 px-2 py-0.5 bg-surface-active rounded-md text-xs font-semibold text-text-secondary capitalize">
                    {user?.role}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover rounded-full transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">

              {/* Crisis Support - Prominent at top */}
              <Link
                to="/crisis"
                onClick={() => handleNav('/crisis')}
                className="py-4 px-4 text-base font-bold text-white bg-red-600 dark:bg-red-700 rounded-xl flex items-center justify-center gap-2 mb-4 shadow-lg shadow-red-500/20 hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                aria-label="Get crisis support - available 24/7"
              >
                <HeartHandshake size={20} aria-hidden="true" />
                Crisis Support - Available 24/7
              </Link>

              {/* Accordion Sections */}
              {primaryNavItems.map((navItem) => {
                // Only render mega menus in accordion, regular links go at the bottom
                if (navItem.type !== 'mega-menu') return null;

                return (
                  <div key={navItem.id} className="border-b border-border last:border-0 pb-2 mb-2">
                    <button
                      onClick={() => toggleSection(navItem.id)}
                      className="w-full flex items-center justify-between py-3 text-lg font-bold text-text-primary"
                      aria-expanded={expandedSection === navItem.id}
                      aria-controls={`mobile-section-${navItem.id}`}
                    >
                      <span>{navItem.label}</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${expandedSection === navItem.id ? 'rotate-180 text-primary' : 'text-text-tertiary'}`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSection === navItem.id && (
                        <motion.div
                          id={`mobile-section-${navItem.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-4 space-y-3">
                            {navItem.sections.map((subSection, idx) => (
                              <div key={idx} className="space-y-2">
                                {subSection.items.map(item => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => handleNav(item.href)}
                                    className="block text-sm font-medium text-text-secondary hover:text-primary active:text-primary py-3 px-2 -mx-2 rounded-lg active:bg-surface-hover"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {navItem.quickActions && (
                              <div className="pt-2 border-t border-border space-y-2">
                                {navItem.quickActions.map(action => (
                                  <Link
                                    key={action.href}
                                    to={action.href}
                                    onClick={() => handleNav(action.href)}
                                    className="flex items-center text-sm font-semibold text-primary"
                                  >
                                    {action.label} <ChevronRight size={14} />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Regular link items (non-mega-menu) */}
              {primaryNavItems.map((navItem) => {
                if (navItem.type !== 'link') return null;

                return (
                  <Link
                    key={navItem.id}
                    to={navItem.href}
                    onClick={() => handleNav(navItem.href)}
                    className="py-3 text-lg font-bold text-text-primary border-b border-border mb-2 block"
                  >
                    {navItem.label}
                  </Link>
                );
              })}

            </nav>

            {/* Footer / CTA */}
            <div className="p-6 border-t border-border bg-surface-hover space-y-3">
              <div className="flex justify-center mb-3">
                <LanguageSwitcher direction="up" />
              </div>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNav(dashboardConfig?.path || '/dashboard')}
                    className="w-full py-3.5 px-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                  >
                    Dashboard <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl font-bold transition-all flex justify-center items-center gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  {/* Auth buttons from filtered config */}
                  {authItems.map((authItem) => {
                    if (authItem.type !== 'link') return null;
                    const isSignup = authItem.id === 'signup';

                    return (
                      <button
                        key={authItem.id}
                        onClick={() => handleNav(authItem.href)}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${
                          isSignup
                            ? 'bg-text-primary text-background shadow-lg shadow-black/20 active:scale-[0.98]'
                            : 'bg-surface border border-border text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        {!isSignup && <User size={18} />}
                        {authItem.label}
                        {isSignup && <ArrowRight size={18} />}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;