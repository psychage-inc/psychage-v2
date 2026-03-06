import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smile, Moon, BrainCircuit, Compass, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hoverLift } from '@/lib/animations';
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
            icon: <Smile size={16} />,
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
            icon: <Moon size={16} />,
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
            icon: <BrainCircuit size={16} />,
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
            icon: <Compass size={16} />,
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
            icon: <Bookmark size={16} />,
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.35 }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {actions.map((action, idx) => {
                    const content = (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.08 + idx * 0.04 }}
                            {...hoverLift}
                            className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]
                                       hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-200 group cursor-pointer h-full"
                        >
                            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2.5', action.color)}>
                                {action.icon}
                            </div>
                            <p className="font-medium text-text-primary text-sm leading-snug group-hover:text-primary transition-colors">
                                {action.label}
                            </p>
                            <p className="text-xs text-text-tertiary/70 mt-1 leading-relaxed">{action.description}</p>
                        </motion.div>
                    );

                    if (action.linkTo.startsWith('#')) {
                        return (
                            <button
                                key={action.id}
                                onClick={() => handleClick(action.linkTo)}
                                className="text-left"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link key={action.id} to={action.linkTo}>
                            {content}
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default SmartActionsHub;
