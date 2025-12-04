
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Moon, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Timer,
  BarChart3,
  Waves
} from 'lucide-react';
import Button from '../ui/Button';
import { NeuralMesh, PulseWave } from './hero/HeroAssets';

// --- DATA ---
const modules = [
  {
    id: "cognitive",
    title: "Cognitive Architecture",
    version: "v2.4",
    tagline: "Executive Function & Flow",
    description: "Reclaim your ability to focus. Our adaptive algorithms analyze your attention span to generate personalized deep-work protocols.",
    icon: Brain,
    color: "teal",
    features: [
      "Attention Span Analysis",
      "Flow State Induction",
      "Distraction Filtering"
    ],
    visual: "neural"
  },
  {
    id: "emotional",
    title: "Emotional Regulation",
    version: "v1.8",
    tagline: "Autonomic Balance",
    description: "Stabilize your nervous system. Real-time somatic exercises designed to down-regulate anxiety and process complex emotions.",
    icon: Zap,
    color: "amber",
    features: [
      "Vagus Nerve Stimulation",
      "Real-time Biofeedback",
      "Somatic Release"
    ],
    visual: "pulse"
  },
  {
    id: "restorative",
    title: "Deep Sleep Optimization",
    version: "v3.1",
    tagline: "Circadian Health",
    description: "Architect your rest. Align your biological clock with light-exposure windows and audio landscapes for REM maximization.",
    icon: Moon,
    color: "indigo",
    features: [
      "Circadian Entrainment",
      "Sleep Architecture Tracking",
      "Non-Sleep Deep Rest (NSDR)"
    ],
    visual: "wave"
  },
  {
    id: "relational",
    title: "Social Dynamics",
    version: "v1.2",
    tagline: "Interpersonal Intelligence",
    description: "Navigate complexity. Frameworks for boundary fortification and attachment repair to build resilient relationships.",
    icon: Heart,
    color: "rose",
    features: [
      "Attachment Style Mapping",
      "Boundary Fortification",
      "Communication Scripts"
    ],
    visual: "network"
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#0a0a0a] py-32 relative overflow-hidden transition-colors duration-300">
      {/* Background Tech Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        
        {/* Header - Technical Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">System Modules</span>
                </div>
                <h2 className="font-display font-bold text-5xl md:text-6xl text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                    Core Operating Systems.
                </h2>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-gray-400 text-sm font-mono mb-1">SYSTEM_STATUS: ONLINE</p>
                <p className="text-gray-400 text-sm font-mono">MODULES_ACTIVE: 4/4</p>
            </div>
        </div>

        {/* Defined Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
            ))}
        </div>

        <div className="mt-20 flex justify-center">
             <Button variant="outline" className="rounded-full px-8 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                View Full Specifications
             </Button>
        </div>

      </div>
    </section>
  );
};

// --- MODULE CARD COMPONENT ---
interface ModuleCardProps {
    module: typeof modules[0];
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic Color Classes
    const colors = {
        teal: { 
            bg: 'bg-teal-50 dark:bg-teal-900/10', 
            text: 'text-teal-700 dark:text-teal-400', 
            border: 'group-hover:border-teal-300 dark:group-hover:border-teal-700', 
            iconBg: 'bg-teal-100 dark:bg-teal-900/30 dark:text-teal-300' 
        },
        amber: { 
            bg: 'bg-amber-50 dark:bg-amber-900/10', 
            text: 'text-amber-700 dark:text-amber-400', 
            border: 'group-hover:border-amber-300 dark:group-hover:border-amber-700', 
            iconBg: 'bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300' 
        },
        indigo: { 
            bg: 'bg-indigo-50 dark:bg-indigo-900/10', 
            text: 'text-indigo-700 dark:text-indigo-400', 
            border: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-700', 
            iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300' 
        },
        rose: { 
            bg: 'bg-rose-50 dark:bg-rose-900/10', 
            text: 'text-rose-700 dark:text-rose-400', 
            border: 'group-hover:border-rose-300 dark:group-hover:border-rose-700', 
            iconBg: 'bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300' 
        },
    };
    const theme = colors[module.color as keyof typeof colors];

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`
                group relative bg-white dark:bg-[#111] rounded-[2rem] border border-gray-200 dark:border-gray-800 p-2 
                transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50
                ${theme.border}
            `}
        >
            <div className="relative h-full flex flex-col rounded-[1.5rem] overflow-hidden bg-white dark:bg-[#111]">
                
                {/* 1. Header Section */}
                <div className="p-8 pb-0 flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center text-gray-900 shadow-inner`}>
                            <module.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">{module.title}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                    {module.version}
                                </span>
                            </div>
                            <p className={`text-sm font-bold uppercase tracking-wider ${theme.text}`}>
                                {module.tagline}
                            </p>
                        </div>
                    </div>
                    
                    {/* Active Indicator */}
                    <div className="flex gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-green-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'} transition-colors duration-300`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-green-500 delay-75 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'} transition-colors duration-300`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-green-500 delay-150 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'} transition-colors duration-300`} />
                    </div>
                </div>

                {/* 2. Visualization Window (The "Defined" Part) */}
                <div className="mt-8 mx-8 h-40 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-colors">
                     {/* Grid lines */}
                     <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                     <div className="absolute inset-0 opacity-[0.1] hidden dark:block" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                     
                     {/* Dynamic Visual Content based on type */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-700">
                        {module.visual === 'neural' && (
                            <NeuralMesh className={`w-full h-full ${isHovered ? 'text-teal-600 dark:text-teal-400' : 'text-gray-300 dark:text-gray-700'} transition-colors duration-500`} />
                        )}
                        {module.visual === 'pulse' && (
                             <PulseWave className={`w-full h-full p-4 ${isHovered ? 'text-amber-500' : 'text-gray-300 dark:text-gray-700'} transition-colors duration-500`} />
                        )}
                        {module.visual === 'wave' && (
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div 
                                        key={i}
                                        animate={isHovered ? { height: [20, 60, 20] } : { height: 20 }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                        className={`w-4 bg-indigo-500/50 rounded-full`}
                                        style={{ height: 20 }}
                                    />
                                ))}
                            </div>
                        )}
                        {module.visual === 'network' && (
                            <div className="relative w-32 h-32">
                                <motion.div animate={isHovered ? { scale: 1.1, rotate: 90 } : { scale: 1, rotate: 0 }} className="absolute inset-0 border-2 border-dashed border-rose-300 dark:border-rose-700 rounded-full" />
                                <motion.div animate={isHovered ? { scale: 0.8, rotate: -90 } : { scale: 1, rotate: 0 }} className="absolute inset-4 border-2 border-rose-400 dark:border-rose-600 rounded-full" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-rose-500 rounded-full shadow-lg shadow-rose-500/50" />
                                </div>
                            </div>
                        )}
                     </div>

                     {/* Overlay Stats */}
                     <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm">
                        EFFICIENCY: {isHovered ? '98%' : 'IDLE'}
                     </div>
                </div>

                {/* 3. Specs & Content */}
                <div className="p-8">
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 h-20">
                        {module.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
                            Capabilities
                        </div>
                        {module.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                <CheckCircle2 size={16} className={`${isHovered ? theme.text : 'text-gray-300 dark:text-gray-700'} transition-colors duration-300`} />
                                {feature}
                            </div>
                        ))}
                    </div>

                    <Button 
                        className={`w-full justify-between rounded-xl ${theme.bg} ${theme.text} hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black border-transparent transition-all duration-300`}
                        rightIcon={<ArrowRight size={18} />}
                    >
                        Initialize Module
                    </Button>
                </div>

            </div>
        </motion.div>
    );
};

export default CategorySection;
