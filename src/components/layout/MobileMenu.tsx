import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronRight, LogOut, User, ChevronDown, HeartHandshake } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { navigationConfig } from '../../config/navigation';
import { useNavigation } from '../../hooks/useNavigation';
import { useNavPermissions } from '../../hooks/useNavPermissions';
import type { NavItem } from '../../types/navigation';
// import LanguageSwitcher from '../ui/LanguageSwitcher'; // Hidden for English-only launch

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
    await logout();
    onClose();
    navigate('/');
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
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[110] md:hidden"
          />

          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[120] md:hidden flex flex-col border-l border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Logo className="h-10 w-auto text-[#1A1A1A] dark:text-white" />
                {isAuthenticated && (
                  <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-600 capitalize">
                    {user?.role}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
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
                  <div key={navItem.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 mb-2">
                    <button
                      onClick={() => toggleSection(navItem.id)}
                      className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-800 dark:text-gray-200"
                      aria-expanded={expandedSection === navItem.id}
                      aria-controls={`mobile-section-${navItem.id}`}
                    >
                      <span>{navItem.label}</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${expandedSection === navItem.id ? 'rotate-180 text-teal-600' : 'text-gray-400'}`}
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
                                    className="block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 py-1"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {navItem.quickActions && (
                              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                                {navItem.quickActions.map(action => (
                                  <Link
                                    key={action.href}
                                    to={action.href}
                                    onClick={() => handleNav(action.href)}
                                    className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400"
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
                    className="py-3 text-lg font-bold text-gray-800 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 mb-2 block"
                  >
                    {navItem.label}
                  </Link>
                );
              })}

            </nav>

            {/* Footer / CTA */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-3">
              {/* Language switcher hidden for English-only launch — uncomment when i18n re-enabled */}
              {/* <div className="flex justify-center mb-3">
                <LanguageSwitcher direction="up" />
              </div> */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNav(dashboardConfig?.path || '/dashboard')}
                    className="w-full py-3.5 px-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                  >
                    Dashboard <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all flex justify-center items-center gap-2"
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
                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 active:scale-[0.98]'
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