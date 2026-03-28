import React from 'react';
import { motion } from 'framer-motion';
import InteractiveCard from '../ui/InteractiveCard';

// ─── Animated SVG Icons ────────────────────────────────────────────

/** Compass with needle that rotates on hover */
const CompassIcon = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial="idle"
    whileHover="hover"
  >
    <circle cx="12" cy="12" r="10" />
    <motion.g
      variants={{
        idle: { rotate: 0 },
        hover: { rotate: 25 },
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      style={{ originX: '50%', originY: '50%' }}
    >
      <polygon
        points="12,4 14.5,12 12,13.5 9.5,12"
        fill="currentColor"
        opacity={0.8}
        stroke="none"
      />
      <polygon
        points="12,20 9.5,12 12,10.5 14.5,12"
        fill="currentColor"
        opacity={0.25}
        stroke="none"
      />
    </motion.g>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </motion.svg>
);

/** Lightbulb with rays that pulse on hover */
const InsightIcon = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial="idle"
    whileHover="hover"
  >
    {/* Bulb body */}
    <path d="M9 21h6" />
    <path d="M10 17h4" />
    <path d="M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z" />
    {/* Rays */}
    <motion.g
      variants={{
        idle: { opacity: 0.3 },
        hover: { opacity: [0.3, 1, 0.3] },
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <line x1="12" y1="1" x2="12" y2="0" />
      <line x1="4.22" y1="4.22" x2="3.51" y2="3.51" />
      <line x1="1" y1="12" x2="0" y2="12" />
      <line x1="19.78" y1="4.22" x2="20.49" y2="3.51" />
      <line x1="23" y1="12" x2="24" y2="12" />
    </motion.g>
  </motion.svg>
);

/** Rocket that lifts on hover with animated flame */
const LaunchIcon = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial="idle"
    whileHover="hover"
  >
    <motion.g
      variants={{
        idle: { y: 0 },
        hover: { y: -2 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </motion.g>
    {/* Flame */}
    <motion.ellipse
      cx="5.5"
      cy="20"
      rx="1.5"
      ry="2"
      fill="currentColor"
      opacity={0.2}
      stroke="none"
      variants={{
        idle: { opacity: 0.15, scaleY: 0.8 },
        hover: { opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.4, 1] },
      }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
  </motion.svg>
);

// ─── Steps Config ──────────────────────────────────────────────────

const steps = [
    {
        icon: CompassIcon,
        title: 'Choose your starting point',
        description: 'Pick an assessment, explore a self-care tool, or browse a topic that matters to you.',
        color: 'from-teal-400 to-emerald-500',
    },
    {
        icon: InsightIcon,
        title: 'Get personalized insights',
        description: 'AI-powered analysis processed on your device gives you a clearer picture of where you stand.',
        color: 'from-indigo-400 to-purple-500',
    },
    {
        icon: LaunchIcon,
        title: 'Take your next step',
        description: 'Actionable recommendations, matched providers, and learning paths tailored to your results.',
        color: 'from-amber-400 to-orange-500',
    },
];

// ─── Component ─────────────────────────────────────────────────────

const HowItWorksSection: React.FC = () => {
    return (
        <section id="how-it-works" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Three steps to clarity.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        No sign-up required. Start exploring your mental wellbeing in minutes — with everything processed privately on your device.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative z-10"
                            >
                                <InteractiveCard className="h-full bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md">
                                    <div className="p-8 flex flex-col items-center text-center h-full group">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-3 text-white shadow-lg mb-6 flex items-center justify-center`}>
                                            <StepIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </InteractiveCard>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default HowItWorksSection;
