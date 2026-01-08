import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Check, Brain, TrendingUp } from 'lucide-react';

const HeroInsightCard: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-sm mx-auto perspective-1000"
        >
            {/* Glass Card */}
            <div
                className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-indigo-500/10 p-6"
                style={{ transform: "translateZ(20px)" }}
            >
                {/* Dynamic Glare/Shininess */}
                <motion.div
                    style={{
                        opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.4]),
                        background: useTransform(
                            mouseXSpring,
                            [-0.5, 0.5],
                            [
                                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 100%)",
                                "linear-gradient(to left, transparent 0%, rgba(255,255,255,0.4) 100%)"
                            ]
                        )
                    }}
                    className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay"
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-2xl shadow-inner">
                            <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Psychological Profile</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Analysis complete</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full border border-green-200/50 dark:border-green-800/30">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-[10px] font-medium text-green-600 dark:text-green-400">Verified</span>
                    </div>
                </div>

                {/* Main Metric */}
                <div className="mb-6 text-center py-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/10 shadow-sm">
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1 uppercase tracking-wider">Dominant Trait</p>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">High Empathy</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-indigo-600/80 dark:text-indigo-300">
                        <TrendingUp className="w-3 h-3" />
                        <span>Top 5% of population</span>
                    </div>
                </div>

                {/* Sub-metrics / Traits */}
                <div className="space-y-4">
                    {[
                        { label: "Deep Listening", val: 92, color: "bg-teal-500", track: "bg-teal-100" },
                        { label: "Emotional Resilience", val: 88, color: "bg-purple-500", track: "bg-purple-100" }
                    ].map((trait, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                                <span>{trait.label}</span>
                                <span>{trait.val}%</span>
                            </div>
                            <div className={`h-2.5 w-full ${trait.track} dark:bg-slate-700/50 rounded-full overflow-hidden shadow-inner`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trait.val}%` }}
                                    transition={{ duration: 1.5, delay: 0.6 + (i * 0.2), ease: "easeOut" }}
                                    className={`h-full ${trait.color} rounded-full relative`}
                                >
                                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Glossy Edge Highlight */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 pointer-events-none" />
            </div>

            {/* Floating Abstract Elements behind card (Parallax depth) */}
            <motion.div
                style={{ x: useTransform(x, [-1, 1], [-20, 20]), y: useTransform(y, [-1, 1], [-20, 20]) }}
                className="absolute -z-10 top-1/2 -right-12 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl"
            />
            <motion.div
                style={{ x: useTransform(x, [-1, 1], [20, -20]), y: useTransform(y, [-1, 1], [20, -20]) }}
                className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-teal-400/30 rounded-full blur-2xl"
            />

        </motion.div>
    );
};

export default HeroInsightCard;
