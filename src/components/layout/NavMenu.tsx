import React from 'react';
import { ArrowRight, ChevronRight, ExternalLink, Zap, Brain, Leaf, Briefcase, Heart, BarChart3, Edit, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navigationConfig } from '../../config/navigation';

interface NavMenuProps {
  activeTab: string | null;
  onMouseLeave: () => void;
  onCategorySelect?: (category: string) => void;
  onNavigateGeneric?: (view: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  leaf: Leaf,
  briefcase: Briefcase,
  heart: Heart,
  chart: BarChart3,
  edit: Edit,
  moon: Moon,
  default: Zap
};

const NavMenu: React.FC<NavMenuProps> = ({ activeTab, onMouseLeave, onNavigateGeneric }) => {
  if (!activeTab) return null;

  const sectionKey = activeTab.toLowerCase();
  const currentSection = navigationConfig[sectionKey as keyof typeof navigationConfig];

  if (!currentSection) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full" onMouseLeave={onMouseLeave}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT PANEL: MAIN GRID */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              {activeTab} Module
            </span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentSection.sections?.map((section, idx) => (
              <motion.div
                key={idx}
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
              >
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</h3>
                <div className="grid gap-4">
                  {section.items.map((item) => {
                    const Icon = iconMap[item.icon] || iconMap.default;
                    return (
                      <motion.div key={item.id} variants={itemAnim}>
                        <Link
                          to={item.href}
                          onClick={() => onNavigateGeneric?.(item.href)}
                          className="group relative flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                        >
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-2 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center text-teal-600">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight group-hover:text-teal-600 transition-colors">
                              {item.label}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT PANEL: SIDEBAR & UTILITIES */}
        <div className="w-full md:w-72 border-l border-gray-100 dark:border-gray-800 pl-8 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4 opacity-40">
              Quick Actions
            </h4>
            <ul className="space-y-1">
              {currentSection.quickActions?.map((action, idx) => (
                <li key={idx}>
                  <Link
                    to={action.href}
                    onClick={() => onNavigateGeneric?.(action.href)}
                    className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                  >
                    <span>{action.label}</span>
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-teal-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
