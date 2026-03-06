import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Moon, BrainCircuit, Compass, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MoodEntry } from '@/services/moodService';
import type { SleepEntry } from '@/services/sleepService';

interface SmartAction {
    id: string;
    icon: React.ReactNode;
    label: string;
    description: string;
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

function generateActions(props: SmartActionsHubProps): SmartAction[] {
    const actions: SmartAction[] = [];

    if (!props.todayMood) {
        actions.push({
            id: 'log-mood',
            icon: <Smile size={18} />,
            label: "Log today's mood",
            description: 'How are you feeling right now?',
            linkTo: '#mood-checkin',
            color: 'bg-amber-500/10 text-amber-400',
            priority: 1,
        });
    }

    if (!props.todaySleep) {
        actions.push({
            id: 'log-sleep',
            icon: <Moon size={18} />,
            label: 'How did you sleep?',
            description: "Log last night's sleep",
            linkTo: '/tools/sleep-architect',
            color: 'bg-indigo-500/10 text-indigo-400',
            priority: 2,
        });
    }

    const daysSinceClarity = props.lastClarityDate
        ? Math.floor((Date.now() - new Date(props.lastClarityDate).getTime()) / 86400000)
        : Infinity;

    if (daysSinceClarity >= 7) {
        actions.push({
            id: 'clarity-checkin',
            icon: <BrainCircuit size={18} />,
            label: daysSinceClarity === Infinity ? 'Take your first check-in' : 'Weekly check-in',
            description: daysSinceClarity === Infinity
                ? 'Measure your cognitive wellness'
                : `Last taken ${daysSinceClarity} days ago`,
            linkTo: '/clarity-score',
            color: 'bg-teal-500/10 text-teal-400',
            priority: 3,
        });
    }

    if (props.navigatorCount === 0) {
        actions.push({
            id: 'explore-navigator',
            icon: <Compass size={18} />,
            label: 'Explore Symptom Navigator',
            description: 'Learn about patterns in your experiences',
            linkTo: '/tools/symptom-navigator',
            color: 'bg-purple-500/10 text-purple-400',
            priority: 4,
        });
    }

    if (props.bookmarkCount > 0) {
        actions.push({
            id: 'check-bookmarks',
            icon: <Bookmark size={18} />,
            label: 'Check saved articles',
            description: `${props.bookmarkCount} saved item${props.bookmarkCount !== 1 ? 's' : ''}`,
            linkTo: '/dashboard/bookmarks',
            color: 'bg-rose-500/10 text-rose-400',
            priority: 5,
        });
    }

    return actions.sort((a, b) => a.priority - b.priority).slice(0, props.maxActions || 3);
}

const SmartActionsHub: React.FC<SmartActionsHubProps> = (props) => {
    const actions = generateActions(props);

    if (actions.length === 0) return null;

    const handleClick = (linkTo: string) => {
        if (linkTo.startsWith('#')) {
            const el = document.getElementById(linkTo.slice(1));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
        >
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {actions.map((action, idx) => {
                    const content = (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + idx * 0.05 }}
                            className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
                                       hover:bg-white/10 transition-all group cursor-pointer h-full"
                        >
                            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', action.color)}>
                                {action.icon}
                            </div>
                            <p className="font-medium text-text-primary text-sm group-hover:text-primary transition-colors">
                                {action.label}
                            </p>
                            <p className="text-xs text-text-tertiary mt-1">{action.description}</p>
                        </motion.div>
                    );

                    if (action.linkTo.startsWith('#')) {
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleClick(action.linkTo)}
                                className="flex-shrink-0 flex-1 min-w-[180px] text-left"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link key={action.id} to={action.linkTo} className="flex-shrink-0 flex-1 min-w-[180px]">
                            {content}
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default SmartActionsHub;
