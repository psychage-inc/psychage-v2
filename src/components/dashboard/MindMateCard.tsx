import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const QUICK_PROMPTS = [
    { label: 'How am I doing?', prompt: 'How am I doing based on my recent wellness data?' },
    { label: 'Explain my score', prompt: 'Can you explain what my Clarity Score means?' },
    { label: 'What should I read?', prompt: 'What articles would you recommend for me right now?' },
];

const MindMateCard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const reduced = useReducedMotion();
    const [lastChat, setLastChat] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.id) return;
        // Fetch most recent conversation snippet
        (async () => {
            try {
                const { data } = await (await import('@/lib/supabaseClient')).supabase
                    .from('ai_conversations')
                    .select('id, created_at')
                    .eq('user_id', user.id)
                    .order('last_message_at', { ascending: false })
                    .limit(1);

                if (data && data.length > 0) {
                    const { data: messages } = await (await import('@/lib/supabaseClient')).supabase
                        .from('ai_messages')
                        .select('content')
                        .eq('conversation_id', data[0].id)
                        .eq('role', 'user')
                        .order('created_at', { ascending: false })
                        .limit(1);

                    if (messages && messages.length > 0) {
                        const text = messages[0].content;
                        setLastChat(text.length > 60 ? text.slice(0, 60) + '...' : text);
                    }
                }
            } catch {
                // Silent fail — just don't show last chat
            }
        })();
    }, [user?.id]);

    const handlePromptClick = (prompt: string) => {
        navigate(`/tools/mindmate?prompt=${encodeURIComponent(prompt)}`);
    };

    return (
        <div className="h-full rounded-2xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-white to-teal-50/30 dark:from-neutral-900/50 dark:to-teal-950/10 shadow-sm p-5 flex flex-col">
            <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-teal-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">MindMate</h3>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400">Your AI wellness companion</p>
                </div>
            </div>

            {/* Decorative input */}
            <button
                onClick={() => navigate('/tools/mindmate')}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-gray-100/80 dark:bg-neutral-800/50 border border-gray-200/60 dark:border-neutral-700/50 text-sm text-gray-400 dark:text-neutral-500 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors mb-4"
            >
                Ask me anything...
            </button>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 mb-4">
                {QUICK_PROMPTS.map((p) => (
                    <motion.button
                        key={p.label}
                        whileTap={reduced ? undefined : { scale: 0.95 }}
                        onClick={() => handlePromptClick(p.prompt)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/40 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    >
                        {p.label}
                    </motion.button>
                ))}
            </div>

            {/* Last chat or start CTA */}
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-neutral-800/60">
                {lastChat ? (
                    <Link
                        to="/tools/mindmate"
                        className="flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                    >
                        <MessageCircle size={12} />
                        <span className="truncate flex-grow">Last: "{lastChat}"</span>
                        <ArrowRight size={12} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                ) : (
                    <Link
                        to="/tools/mindmate"
                        className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors font-medium"
                    >
                        Start your first conversation
                        <ArrowRight size={12} />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MindMateCard;
