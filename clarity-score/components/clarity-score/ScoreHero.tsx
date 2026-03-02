'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScoreHero({ score }: { score: number }) {
    const animatedScore = useSpring(0, { stiffness: 50, damping: 20 });
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        animatedScore.set(score);
        const unsub = animatedScore.on("change", (latest) => {
            setDisplayScore(Math.round(latest));
        });
        return unsub;
    }, [score, animatedScore]);

    let label = "Excellence";
    let color = "text-teal";

    if (score < 40) {
        label = "Significant Distress";
        color = "text-red-400";
    } else if (score < 60) {
        label = "Moderate Strain";
        color = "text-amber-400";
    } else if (score < 80) {
        label = "Good Balance";
        color = "text-emerald-400";
    }

    return (
        <div className="flex flex-col items-center py-12 text-center">
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-text-muted">Your Clarity Score</h2>

            <div className="relative mb-6">
                <div className="absolute inset-0 animate-pulse rounded-full bg-teal opacity-20 blur-3xl"></div>
                <motion.div className={`font-heading text-7xl font-bold drop-shadow-lg md:text-[5rem] lg:text-[6rem] ${color}`}>
                    {displayScore}
                </motion.div>
            </div>

            <div className={`mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium ${color}`}>
                {label}
            </div>

            <p className="max-w-sm text-text-secondary">
                This score represents a holistic snapshot of your emotional, cognitive, and social wellbeing.
            </p>
        </div>
    );
}
