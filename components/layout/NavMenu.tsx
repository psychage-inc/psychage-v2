
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Zap, ExternalLink } from 'lucide-react';
import { 
  NavClarityGlyph, 
  NavMoodGlyph, 
  NavSleepGlyph,
  NavArticleGlyph,
  NavCourseGlyph,
  NavNetworkGlyph,
  NavCrisisGlyph
} from './NavAssets';
import { NoiseTexture } from '../home/hero/HeroAssets';

interface NavMenuProps {
  activeTab: string | null;
  onMouseLeave: () => void;
  onCategorySelect?: (category: string) => void;
  onNavigateGeneric?: (view: string) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ activeTab, onMouseLeave, onCategorySelect, onNavigateGeneric }) => {
  if (!activeTab) return null;

  const handleItemClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    
    // Direct view mapping
    const viewMap: Record<string, string> = {
        'clarity': 'clarity-score',
        'about': 'about',
        'crisis': 'contact'
    };

    // Category mapping
    const categoryMap: Record<string, string> = {
        'articles': 'Anxiety', // Default to Anxiety for library
        'courses': 'Wellness'
    };

    if (viewMap[item.id] && onNavigateGeneric) {
        onNavigateGeneric(viewMap[item.id]);
    } else if (categoryMap[item.id] && onCategorySelect) {
        onCategorySelect(categoryMap[item.id]);
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
          statColor: "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 border-green-100 dark:border-green-800"
        },
        { 
          id: 'mood',
          title: "Mood Journal", 
          desc: "Pattern recognition engine", 
          glyph: NavMoodGlyph,
          stat: "3 entries pending",
          statColor: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800"
        },
        { 
          id: 'sleep',
          title: "Sleep Architect", 
          desc: "Circadian optimization", 
          glyph: NavSleepGlyph,
          stat: "7.2h avg",
          statColor: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800"
        },
      ],
      quickActions: [
        { label: "Start Daily Check-in", href: "#", icon: Zap },
        { label: "Log Symptoms", href: "#", icon: ChevronRight },
        { label: "View Reports", href: "#", icon: ExternalLink },
      ]
    },
    Resources: {
      items: [
        { 
          id: 'articles',
          title: "Intelligence Library", 
          desc: "Clinical research & guides", 
          glyph: NavArticleGlyph,
          stat: "204 articles",
          statColor: "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
        },
        { 
          id: 'courses',
          title: "Video Series", 
          desc: "Visual learning paths", 
          glyph: NavCourseGlyph,
          stat: "12 new",
          statColor: "text-teal-600 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-400 border-teal-100 dark:border-teal-800"
        },
      ],
      quickActions: [
        { label: "Latest Research", href: "#", icon: Zap },
        { label: "Meditation Audio", href: "#", icon: ChevronRight },
        { label: "Download App", href: "#", icon: ExternalLink },
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
          statColor: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border-red-100 dark:border-red-800"
        },
      ],
      quickActions: [
        { label: "Contact Support", href: "#", icon: ChevronRight },
        { label: "Press Kit", href: "#", icon: ExternalLink },
        { label: "Careers", href: "#", icon: ChevronRight },
      ]
    }
  };

  const currentSection = menuConfig[activeTab as keyof typeof menuConfig];
  if (!currentSection) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        onMouseLeave={onMouseLeave}
        className="relative mx-auto w-full max-w-[1200px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl shadow-teal-900/10 dark:shadow-black/50 border border-gray-200/80 dark:border-gray-800 overflow-hidden z-40"
      >
        <NoiseTexture opacity={0.02} />
        
        <div className="relative z-10 flex flex-col md:flex-row min-h-[320px]">
          
          {/* LEFT PANEL: MAIN GRID */}
          <div className="flex-grow p-8 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"/>
                    {activeTab} Module
                </span>
                <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-500 dark:text-gray-400 font-bold">V2.4.0</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSection.items.map((item) => (
                    <a 
                        key={item.id} 
                        href="#" 
                        onClick={(e) => handleItemClick(e, item)}
                        className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:bg-white dark:hover:bg-gray-800 hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-all duration-300"
                    >
                        <div className="w-14 h-14 shrink-0 rounded-xl bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 p-2 group-hover:scale-105 transition-transform duration-300">
                            <item.glyph />
                        </div>
                        
                        <div className="flex flex-col justify-between h-full w-full">
                            <div>
                                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                                    {item.desc}
                                </p>
                            </div>
                            
                            {item.stat && (
                                <div className={`self-start mt-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${item.statColor}`}>
                                    {item.stat}
                                </div>
                            )}
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute top-5 right-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight size={16} className="text-teal-500" />
                        </div>
                    </a>
                ))}
            </div>
          </div>

          {/* RIGHT PANEL: SIDEBAR & UTILITIES */}
          <div className="w-full md:w-72 bg-gray-50/80 dark:bg-gray-800/50 border-l border-gray-100 dark:border-gray-800 p-8 flex flex-col justify-between backdrop-blur-sm">
            
            {/* Quick Actions List */}
            <div>
                <h4 className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 opacity-40">
                    Quick Actions
                </h4>
                <ul className="space-y-2">
                    {currentSection.quickActions.map((action, idx) => (
                        <li key={idx}>
                            <a href={action.href} className="flex items-center justify-between py-2.5 px-4 -mx-4 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                                <div className="flex items-center gap-3">
                                    <action.icon size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-teal-500 transition-colors" />
                                    {action.label}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dynamic Footer Card */}
            <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50">
                    <div className="p-1.5 rounded bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200">
                        <Zap size={14} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-teal-900 dark:text-teal-200">Pro Tip</p>
                        <p className="text-[11px] text-teal-700 dark:text-teal-400 leading-snug mt-1 opacity-80">
                            Connect your wearable device to unlock deeper insights.
                        </p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavMenu;
