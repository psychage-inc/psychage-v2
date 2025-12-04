
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  BrainCircuit, 
  Users, 
  Play, 
  Sparkles, 
  Search,
  ArrowRight,
  Heart,
  Zap,
  Phone,
  LayoutGrid
} from 'lucide-react';
import { NoiseTexture } from '../home/hero/HeroAssets';

interface NavHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavHub: React.FC<NavHubProps> = ({ isOpen, onClose }) => {
  
  // Section Data with Pastel Themes
  const sections = [
    {
      title: "Tools & Assessment",
      theme: "teal",
      color: "bg-teal-50",
      textColor: "text-teal-900",
      icon: BrainCircuit,
      items: [
        { label: "Clarity Score™", desc: "Mental focus test", href: "#" },
        { label: "Mood Journal", desc: "Track patterns", href: "#" },
        { label: "Sleep Architect", desc: "Optimize rest", href: "#" },
      ]
    },
    {
      title: "Learn & Grow",
      theme: "indigo",
      color: "bg-indigo-50",
      textColor: "text-indigo-900",
      icon: BookOpen,
      items: [
        { label: "Articles Library", desc: "Expert insights", href: "#" },
        { label: "Video Courses", desc: "Visual learning", href: "#" },
        { label: "Research", desc: "Clinical studies", href: "#" },
      ]
    },
    {
      title: "Support & Care",
      theme: "rose",
      color: "bg-rose-50",
      textColor: "text-rose-900",
      icon: Heart,
      items: [
        { label: "Find a Provider", desc: "Therapist match", href: "#" },
        { label: "Community", desc: "Peer support", href: "#" },
        { label: "Crisis Resources", desc: "Immediate help", href: "#" },
      ]
    },
    {
      title: "Practice",
      theme: "amber",
      color: "bg-amber-50",
      textColor: "text-amber-900",
      icon: Sparkles,
      items: [
        { label: "Meditation", desc: "Guided audio", href: "#" },
        { label: "Breathwork", desc: "Somatic exercises", href: "#" },
        { label: "Daily Habits", desc: "Routine builder", href: "#" },
      ]
    }
  ];

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
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[90]"
          />

          {/* Hub Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed top-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] max-w-6xl md:top-28 bottom-auto max-h-[80vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-white/50 z-[100] overflow-hidden"
          >
             {/* Grain Texture */}
             <NoiseTexture opacity={0.05} />

             {/* Header */}
             <div className="relative z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                        <LayoutGrid size={20} />
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-lg text-gray-900 leading-none">PsychHub Directory</h2>
                        <p className="text-xs text-gray-500 font-medium mt-1">Everything you need in one place</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                    <X size={24} />
                </button>
             </div>

             {/* Content Grid */}
             <div className="relative z-10 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`rounded-2xl p-6 ${section.color} border border-transparent hover:border-black/5 transition-all group`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <section.icon className={section.textColor} size={24} />
                            <h3 className={`font-display font-bold text-lg ${section.textColor}`}>
                                {section.title}
                            </h3>
                        </div>
                        
                        <ul className="space-y-4">
                            {section.items.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="group/item flex items-start justify-between cursor-pointer">
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover/item:text-teal-600 transition-colors">
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">
                                                {item.desc}
                                            </div>
                                        </div>
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-teal-500 mt-1" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
             </div>

             {/* Footer / Quick Actions */}
             <div className="relative z-10 p-6 bg-gray-50/80 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-teal-600 px-4 py-2 rounded-lg hover:bg-white transition-colors">
                        <Play size={16} className="fill-current" />
                        Start Demo
                    </a>
                    <a href="#" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-teal-600 px-4 py-2 rounded-lg hover:bg-white transition-colors">
                        <Users size={16} />
                        About Psychage
                    </a>
                 </div>
                 
                 <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-100 px-4 py-2 rounded-full">
                    <Phone size={14} />
                    <span>Crisis Line: 988</span>
                 </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavHub;
