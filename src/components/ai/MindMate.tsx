import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, AlertTriangle, Phone, Trash2, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { chatPersistenceService } from '@/services/chatPersistenceService';
import { consentService } from '@/services/consentService';
import { resolveCountry, getPrimaryCrisisLine } from '@/lib/crisis';
import AuthModal from '@/components/auth/AuthModal';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    type?: 'text' | 'crisis' | 'suggestion';
    suggestions?: { label: string; action: string }[];
}

const STORAGE_KEY = 'psychage_ai_chat_history';
const SESSION_KEY = 'psychage_ai_session_id';

function getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
}

const INIT_MESSAGE: Message = {
    id: 'init',
    sender: 'ai',
    text: "Hi! I'm Psychage AI, your mental health education companion. How can I help you today?",
    type: 'text'
};

const MindMate: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, isAuthenticated } = useAuth();

    // Resolve region-appropriate crisis line
    const crisisLine = useMemo(() => {
        const country = resolveCountry();
        const resource = getPrimaryCrisisLine(country);
        return {
            phone: resource?.phone ?? '112',
            label: resource?.name ?? 'Emergency Services',
        };
    }, []);

    // Supabase conversation tracking
    const conversationIdRef = useRef<string | null>(null);
    const chatConsentRef = useRef<boolean>(false);
    const hasHydrated = useRef(false);

    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try { return JSON.parse(saved); } catch { }
        }
        return [INIT_MESSAGE];
    });

    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Check consent and hydrate from Supabase when authenticated
    useEffect(() => {
        if (!isAuthenticated || !user || hasHydrated.current) return;
        hasHydrated.current = true;

        const hydrate = async () => {
            const hasConsent = await consentService.checkConsent('ai_chat_history');
            chatConsentRef.current = hasConsent;

            if (!hasConsent) return;

            const sessionId = getOrCreateSessionId();
            const conversation = await chatPersistenceService.getOrCreateConversation(sessionId, user.id);
            if (!conversation) return;

            conversationIdRef.current = conversation.id;

            // Load existing messages from Supabase
            const dbMessages = await chatPersistenceService.loadConversation(conversation.id);
            if (dbMessages.length > 0) {
                const hydrated: Message[] = dbMessages.map(m => ({
                    id: m.id,
                    sender: m.role === 'user' ? 'user' : 'ai',
                    text: m.content,
                    type: 'text',
                }));
                setMessages([INIT_MESSAGE, ...hydrated]);
            }
        };

        hydrate().catch(console.error);
    }, [isAuthenticated, user]);

    // Persist chat to localStorage
    useEffect(() => {
        if (messages.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // Save a message to Supabase (fire-and-forget)
    const persistMessage = useCallback((role: 'user' | 'assistant', content: string) => {
        if (!chatConsentRef.current || !conversationIdRef.current) return;
        chatPersistenceService.saveMessage(conversationIdRef.current, role, content).catch(console.error);
    }, []);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages, isOpen, isTyping]);

    const clearChat = async () => {
        setMessages([{
            id: Date.now().toString(),
            sender: 'ai',
            text: "Memory cleared. I'm ready for a fresh start.",
            type: 'text'
        }]);
        localStorage.removeItem(STORAGE_KEY);

        // Also deactivate the Supabase conversation
        if (conversationIdRef.current && chatConsentRef.current) {
            await chatPersistenceService.deleteConversation(conversationIdRef.current).catch(console.error);
            conversationIdRef.current = null;

            // Create a new session for subsequent messages
            if (user) {
                const newSessionId = crypto.randomUUID();
                sessionStorage.setItem(SESSION_KEY, newSessionId);
                const conv = await chatPersistenceService.getOrCreateConversation(newSessionId, user.id);
                if (conv) conversationIdRef.current = conv.id;
            }
        }
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Dual-write user message to Supabase
        persistMessage('user', inputText);

        try {
            // Build message history for the server-side API
            const chatHistory = messages
                .filter(m => m.id !== 'init')
                .map(m => ({
                    role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
                    content: m.text,
                }));
            chatHistory.push({ role: 'user', content: inputText });

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: chatHistory,
                    sessionId: getOrCreateSessionId(),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Chat API error: ${res.status}`);
            }

            const data = await res.json();
            const responseText: string = data.message || '';

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: responseText || "I'm here for you, but I didn't catch that.",
                type: data.isCrisis || data.safetyLevel === 'CRISIS' ? 'crisis' : 'text',
            };

            setMessages(prev => [...prev, aiMsg]);

            // Dual-write AI response to Supabase
            persistMessage('assistant', aiMsg.text);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'ai',
                text: "I'm having trouble connecting. Please try again in a moment.",
                type: 'text'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[100] group"
                        aria-label="Open Psychage AI chat"
                    >
                        <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                        <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full shadow-xl shadow-teal-500/30 flex items-center justify-center text-white border border-white/20 overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                            <Sparkles size={24} fill="currentColor" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && !isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[22.5rem] md:w-[22.5rem] font-sans"
                    >
                        <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                        <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <span className="font-display font-semibold text-sm text-gray-900 dark:text-gray-100">Psychage AI</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400" aria-label="Close chat panel">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                                    <LogIn size={20} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-gray-900 dark:text-gray-100 mb-2">
                                    Sign in to chat
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                                    Create a free account to use Psychage AI and get personalized mental health guidance.
                                </p>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-teal-600/20"
                                >
                                    <LogIn size={16} />
                                    Sign In to Continue
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[25rem] md:w-[25rem] h-[600px] max-h-[80vh] flex flex-col font-sans"
                    >
                        {/* Clean Container */}
                        <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl shadow-black/10 border border-gray-200 dark:border-gray-800" />

                        {/* Header — minimal */}
                        <div className="relative z-10 px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                                    <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <span className="font-display font-semibold text-sm text-gray-900 dark:text-gray-100">Psychage AI</span>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={clearChat} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400" aria-label="Clear chat history">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400" aria-label="Close chat panel">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages — Claude-style centered */}
                        <div className="relative z-10 flex-grow overflow-y-auto px-5 py-5 space-y-5 scroll-smooth" role="log" aria-live="polite" aria-label="Chat messages">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-2xl rounded-br-md'
                                            : msg.type === 'crisis'
                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 px-4 py-3 rounded-2xl'
                                                : 'text-gray-700 dark:text-gray-300 pt-0.5'
                                        }`}>
                                        {msg.type === 'crisis' && (
                                            <div className="flex items-center gap-2 font-bold mb-2 text-red-600 dark:text-red-400">
                                                <AlertTriangle size={16} /> Crisis Support
                                            </div>
                                        )}
                                        {msg.text}

                                        {msg.type === 'crisis' && (
                                            <a href={`tel:${crisisLine.phone.replace(/[^0-9+]/g, '')}`} className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors w-full justify-center">
                                                <Phone size={14} /> Call {crisisLine.label} ({crisisLine.phone})
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                        <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div className="flex gap-1 items-center pt-1">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:100ms]" />
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:200ms]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input — clean border style */}
                        <div className="relative z-10 px-4 pb-4 pt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Message Psychage AI..."
                                    aria-label="Type a message to Psychage AI"
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 outline-none text-sm transition-all dark:text-white placeholder-gray-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    aria-label="Send message"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
};

export default MindMate;
