import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Moon, BrainCircuit, Compass, BookOpen, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import type { MoodEntry } from '@/services/moodService';
import type { SleepEntry } from '@/services/sleepService';

interface SmartAction {
    id: string;
    icon: React.ReactNode;
    label: string;
    linkTo: string;
    color: string;
    priority: number;
}

interface SmartActionsHubProps {
    todayMood: MoodEntry | null;
    todaySleep: SleepEntry | null;
    lastClarityDate: string | null;
    navigatorCount: number;
    bookmarkCount: number;
    maxActions?: number;
}

function generateActions(props: SmartActionsHubProps, period: string): SmartAction[] {
    const actions: SmartAction[] = [];

    // Time-of-day priorities
    const isMorning = period === 'morning';
    const isEvening = period === 'evening';

    if (!props.todaySleep && (isMorning || isEvening)) {
        actions.push({
            id: 'log-sleep',
            icon: <Moon size={14} />,
            label: isMorning ? 'Log how you slept last night' : 'Track tonight\'s sleep',
            linkTo: '/tools/sleep-architect',
            color: 'text-indigo-500 bg-indigo-500/10',
            priority: isMorning ? 1 : 3,
        });
    }

    if (!props.todayMood) {
        actions.push({
            id: 'log-mood',
            icon: <Smile size={14} />,
            label: 'Check in with how you feel',
            linkTo: '#mood-checkin',
            color: 'text-amber-500 bg-amber-500/10',
            priority: isMorning ? 2 : 1,
        });
    }

    const daysSinceClarity = props.lastClarityDate
        ? Math.floor((Date.now() - new Date(props.lastClarityDate).getTime()) / 86400000)
        : Infinity;

    if (daysSinceClarity >= 3) {
        actions.push({
            id: 'clarity-checkin',
            icon: <BrainCircuit size={14} />,
            label: daysSinceClarity === Infinity ? 'Take your first clarity check-in' : 'Weekly clarity check-in is due',
            linkTo: '/clarity-score',
            color: 'text-teal-500 bg-teal-500/10',
            priority: 4,
        });
    }

    if (props.navigatorCount === 0) {
        actions.push({
            id: 'explore-navigator',
            icon: <Compass size={14} />,
            label: 'Explore the Symptom Navigator',
            linkTo: '/tools/symptom-navigator',
            color: 'text-purple-500 bg-purple-500/10',
            priority: 5,
        });
    }

    // Fallback: suggest reading
    if (actions.length < 2) {
        actions.push({
            id: 'read-article',
            icon: <BookOpen size={14} />,
            label: isEvening ? 'Wind down with a short read' : 'Explore new articles',
            linkTo: '/learn',
            color: 'text-sky-500 bg-sky-500/10',
            priority: 6,
        });
    }

    return actions.sort((a, b) => a.priority - b.priority).slice(0, props.maxActions || 3);
}

const SmartActionsHub: React.FC<SmartActionsHubProps> = (props) => {
    const reduced = useReducedMotion();
    const { period } = useTimeOfDay();
    const actions = generateActions(props, period);

    if (actions.length === 0) return null;

    const handleClick = (linkTo: string) => {
        if (linkTo.startsWith('#')) {
            const el = document.getElementById(linkTo.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={14} className="text-amber-500" />
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Suggested</span>
            </div>
            <div className="flex flex-col gap-2">
                {actions.map((action, idx) => {
                    const inner = (
                        <motion.div
                            initial={reduced ? {} : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 + idx * 0.04 }}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
                        >
                            <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', action.color)}>
                                {action.icon}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                                {action.label}
                            </p>
                        </motion.div>
                    );

                    if (action.linkTo.startsWith('#')) {
                        return (
                            <button key={action.id} onClick={() => handleClick(action.linkTo)} className="text-left">
                                {inner}
                            </button>
                        );
                    }
                    return <Link key={action.id} to={action.linkTo}>{inner}</Link>;
                })}
            </div>
        </div>
    );
};

export default SmartActionsHub;
