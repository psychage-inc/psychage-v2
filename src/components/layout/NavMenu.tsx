import React from 'react';
import { ArrowRight, ChevronRight, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  NavClarityGlyph,
  NavMoodGlyph,
  NavSleepGlyph,
  NavArticleGlyph,
  NavCourseGlyph,
  NavNetworkGlyph,
  NavCrisisGlyph
} from './NavAssets';

interface NavMenuProps {
  activeTab: string | null;
  onMouseLeave: () => void;
  onCategorySelect?: (category: string) => void;
  onNavigateGeneric?: (view: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ activeTab, onMouseLeave, onCategorySelect, onNavigateGeneric }) => {
  if (!activeTab) return null;

  const handleItemClick = (e: React.MouseEvent, item: { id: string }) => {
    e.preventDefault();

    // Direct view mapping
    const viewMap: Record<string, string> = {
      'clarity': 'clarity-score',
      'mood': 'tools/mood-journal',
      'sleep': 'tools/sleep-architect',
      'about': 'about',
      'crisis': 'contact',
      'articles': 'learn'
    };

    // Category mapping
    const categoryMap: Record<string, string> = {
      'conditions': 'condition',
      'wellness': 'wellness',
      'life': 'life',
      'identity': 'identity',
      'therapy': 'therapy'
    };

    if (viewMap[item.id] && onNavigateGeneric) {
      onNavigateGeneric(viewMap[item.id]);
    } else if (categoryMap[item.id]) {
      // Direct navigation to learn page with filter
      window.location.href = `/learn?filter=${categoryMap[item.id]}`;
    } else if (onNavigateGeneric) {
      // Fallback
      onNavigateGeneric('404');
    }
  };

  // Configuration for the complex menu
  const menuConfig = {
    Platform: {
      items: [
        {
          id: 'clarity',
          title: "Clarity Score™",
          desc: "Live cognitive assessment",
          glyph: NavClarityGlyph,
          stat: "+12% this week",
          statColor: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800"
        },
        {
          id: 'mood',
          title: "Mood Journal",
          desc: "Pattern recognition engine",
          glyph: NavMoodGlyph,
          stat: "3 entries pending",
          statColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800"
        },
        {
          id: 'sleep',
          title: "Sleep Architect",
          desc: "Circadian optimization",
          glyph: NavSleepGlyph,
          stat: "7.2h avg",
          statColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800"
        },
      ],
      quickActions: [
        { label: "Start Daily Check-in", href: "/clarity-score", icon: Zap },
        { label: "Mood Journal", href: "/tools/mood-journal", icon: ChevronRight },
        { label: "All Tools", href: "/tools", icon: ExternalLink },
      ]
    },
    Resources: {
      items: [
        {
          id: 'conditions',
          title: "Mental Health Conditions",
          desc: "Symptoms, causes & treatments",
          glyph: NavCrisisGlyph,
          stat: "A-Z Guide",
          statColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border-rose-100 dark:border-rose-800"
        },
        {
          id: 'wellness',
          title: "Holistic Wellness",
          desc: "Mindfulness, sleep & nutrition",
          glyph: NavMoodGlyph,
          stat: "Popular",
          statColor: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-800"
        },
        {
          id: 'life',
          title: "Life & Relationships",
          desc: "Work, family & connection",
          glyph: NavNetworkGlyph,
          stat: "Guides",
          statColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800"
        },
        {
          id: 'identity',
          title: "Identity & Self",
          desc: "Personal growth & discovery",
          glyph: NavClarityGlyph,
          stat: "New",
          statColor: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800"
        },
        {
          id: 'therapy',
          title: "Therapy & Treatment",
          desc: "Types of therapy explained",
          glyph: NavArticleGlyph,
          stat: "Clinical",
          statColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800"
        },
      ],
      quickActions: [
        { label: "Browse All Topics", href: "/learn", icon: Zap },
        { label: "Sleep Architect", href: "/tools/sleep-architect", icon: ChevronRight },
        { label: "Crisis Resources", href: "/contact", icon: ExternalLink },
      ]
    },
    Company: {
      items: [
        {
          id: 'about',
          title: "Mission & Board",
          desc: "Who is behind Psychage",
          glyph: NavNetworkGlyph,
          stat: "Est. 2024",
          statColor: "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
        },
        {
          id: 'crisis',
          title: "Crisis Support",
          desc: "Emergency protocols",
          glyph: NavCrisisGlyph,
          stat: "24/7 Live",
          statColor: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800"
        },
      ],
      quickActions: [
        { label: "Contact Support", href: "/contact", icon: ChevronRight },
        { label: "Find a Provider", href: "/find-care", icon: ExternalLink },
        { label: "Provider Registration", href: "/providers/register", icon: ChevronRight },
      ]
    }
  };

  const currentSection = menuConfig[activeTab as keyof typeof menuConfig];
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
            <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500 dark:text-gray-400 font-bold">V2.4.0</span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {currentSection.items.map((item) => (
              <motion.a
                variants={itemAnim}
                key={item.id}
                href="#"
                onClick={(e) => handleItemClick(e, item)}
                className="group relative flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-2 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <item.glyph />
                </div>

                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  {item.stat && (
                    <div className={`self-start mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${item.statColor}`}>
                      {item.stat}
                    </div>
                  )}
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight size={16} className="text-teal-500" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT PANEL: SIDEBAR & UTILITIES */}
        <div className="w-full md:w-72 border-l border-gray-100 dark:border-gray-800 pl-8 flex flex-col justify-between">

          {/* Quick Actions List */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4 opacity-40">
              Quick Actions
            </h4>
            <ul className="space-y-1">
              {currentSection.quickActions.map((action, idx) => (
                <li key={idx}>
                  <a href={action.href} className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                    <div className="flex items-center gap-3">
                      <action.icon size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors" />
                      {action.label}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dynamic Footer Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50">
              <div className="p-1.5 rounded bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200">
                <Zap size={14} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal-900 dark:text-teal-100">Pro Tip</p>
                <p className="text-[11px] text-teal-700 dark:text-teal-300 leading-snug mt-1 opacity-80">
                  Connect your wearable device to unlock deeper insights.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default NavMenu;
