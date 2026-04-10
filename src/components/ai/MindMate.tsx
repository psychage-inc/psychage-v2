import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, AlertTriangle, Phone, Trash2, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { chatPersistenceService } from '@/services/chatPersistenceService';
import { consentService } from '@/services/consentService';
import { resolveCountry, getPrimaryCrisisLine } from '@/lib/crisis';
import { parseSSEStream } from '@/lib/ai/streaming';
import StreamingCursor from '@/features/chat/components/StreamingCursor';
import AuthModal from '@/components/auth/AuthModal';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    type?: 'text' | 'crisis' | 'suggestion';
    isStreaming?: boolean;
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
            // eslint-disable-next-line no-empty
            try { return JSON.parse(saved); } catch { }
        }
        return [INIT_MESSAGE];
    });

    const [isTyping, setIsTyping] = useState(false);
    const [lastFailedInput, setLastFailedInput] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

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

    // Persist chat to localStorage (strip transient streaming state)
    useEffect(() => {
        if (messages.length > 0) {
            const toSave = messages.map(({ isStreaming: _, ...rest }) => rest);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        }
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

    const handleRetry = () => {
        if (lastFailedInput) {
            setInputText(lastFailedInput);
            setLastFailedInput(null);
            // Remove the error message
            setMessages(prev => prev.filter(m => m.id !== 'error-msg'));
        }
    };

    const handleSend = async () => {
        if (!inputText.trim() || isTyping) return;

        // Abort any active stream
        abortControllerRef.current?.abort();

        const currentInput = inputText.trim();
        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: currentInput };
        const assistantMsgId = (Date.now() + 1).toString();

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);
        setLastFailedInput(null);

        // Dual-write user message to Supabase
        persistMessage('user', currentInput);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            // Build message history for the server-side API
            const chatHistory = messages
                .filter(m => m.id !== 'init')
                .map(m => ({
                    role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
                    content: m.text,
                }));
            chatHistory.push({ role: 'user', content: currentInput });

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: chatHistory,
                    sessionId: getOrCreateSessionId(),
                    stream: true,
                }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Chat API error: ${res.status}`);
            }

            const contentType = res.headers.get('Content-Type') ?? '';

            // ── JSON response (crisis / harmful / fallback) ──
            if (contentType.includes('application/json')) {
                const data = await res.json();
                const aiMsg: Message = {
                    id: assistantMsgId,
                    sender: 'ai',
                    text: data.message || "I'm here for you, but I didn't catch that.",
                    type: data.isCrisis || data.safetyLevel === 'CRISIS' ? 'crisis' : 'text',
                };
                setMessages(prev => [...prev, aiMsg]);
                persistMessage('assistant', aiMsg.text);
                return;
            }

            // ── SSE stream ──
            if (!res.body) throw new Error('No response body');

            // Add streaming placeholder
            setMessages(prev => [...prev, {
                id: assistantMsgId,
                sender: 'ai',
                text: '',
                type: 'text',
                isStreaming: true,
            }]);

            let fullText = '';

            for await (const event of parseSSEStream(res.body)) {
                switch (event.type) {
                    case 'token':
                        fullText += event.content;
                        setMessages(prev =>
                            prev.map(m =>
                                m.id === assistantMsgId ? { ...m, text: fullText } : m
                            ),
                        );
                        break;

                    case 'error':
                        if (event.code === 'SAFETY_VIOLATION') {
                            fullText = event.message;
                            setMessages(prev =>
                                prev.map(m =>
                                    m.id === assistantMsgId ? { ...m, text: fullText } : m
                                ),
                            );
                        }
                        break;

                    case 'done':
                        // Finalize the message
                        setMessages(prev =>
                            prev.map(m =>
                                m.id === assistantMsgId ? { ...m, isStreaming: false } : m
                            ),
                        );
                        break;
                }
            }

            // Ensure streaming flag is cleared even if no done event
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantMsgId ? { ...m, isStreaming: false } : m
                ),
            );

            // Dual-write AI response to Supabase
            if (fullText) persistMessage('assistant', fullText);
        } catch (error) {
            // Abort is not an error
            if (error instanceof DOMException && error.name === 'AbortError') return;

            console.error("AI Error:", error);
            setLastFailedInput(currentInput);
            // Remove streaming placeholder if it exists
            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== assistantMsgId);
                return [...filtered, {
                    id: 'error-msg',
                    sender: 'ai' as const,
                    text: "I'm having trouble connecting. Please try again in a moment.",
                    type: 'text' as const,
                }];
            });
        } finally {
            setIsTyping(false);
            abortControllerRef.current = null;
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
                        <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-2xl shadow-black/10 border border-border p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles size={16} className="text-primary" />
                                    </div>
                                    <span className="font-display font-semibold text-sm text-text-primary">Psychage AI</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors text-text-tertiary" aria-label="Close chat panel">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <LogIn size={20} className="text-primary" />
                                </div>
                                <h3 className="font-display font-semibold text-base text-text-primary mb-2">
                                    Sign in to chat
                                </h3>
                                <p className="text-sm text-text-tertiary mb-5 leading-relaxed">
                                    Create a free account to use Psychage AI and get personalized mental health guidance.
                                </p>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-teal-600/20"
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
                        <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl shadow-black/10 border border-border" />

                        {/* Header — minimal */}
                        <div className="relative z-10 px-5 py-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Sparkles size={16} className="text-primary" />
                                </div>
                                <span className="font-display font-semibold text-sm text-text-primary">Psychage AI</span>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={clearChat} className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors text-text-tertiary" aria-label="Clear chat history">
                                    <Trash2 size={16} />
                                </button>
                                <button onClick={() => { abortControllerRef.current?.abort(); setIsOpen(false); }} className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors text-text-tertiary" aria-label="Close chat panel">
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
                                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Sparkles size={12} className="text-primary" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-surface-active text-text-primary px-4 py-3 rounded-2xl rounded-br-md'
                                            : msg.type === 'crisis'
                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 px-4 py-3 rounded-2xl'
                                                : 'text-text-secondary pt-0.5'
                                        }`}>
                                        {msg.type === 'crisis' && (
                                            <div className="flex items-center gap-2 font-bold mb-2 text-red-600 dark:text-red-400">
                                                <AlertTriangle size={16} /> Crisis Support
                                            </div>
                                        )}
                                        {msg.text}
                                        {msg.isStreaming && <StreamingCursor />}

                                        {msg.type === 'crisis' && (
                                            <a href={`tel:${crisisLine.phone.replace(/[^0-9+]/g, '')}`} className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors w-full justify-center">
                                                <Phone size={14} /> Call {crisisLine.label} ({crisisLine.phone})
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && !messages.some(m => m.isStreaming && m.text) && (
                                <div className="flex gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Sparkles size={12} className="text-primary" />
                                    </div>
                                    <div className="flex gap-1.5 items-center pt-1 text-xs text-text-tertiary">
                                        <span className="inline-flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Retry bar */}
                        {lastFailedInput && !isTyping && (
                            <div className="relative z-10 px-4 pt-2">
                                <button
                                    onClick={handleRetry}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                                >
                                    <AlertTriangle size={12} />
                                    Tap to retry your last message
                                </button>
                            </div>
                        )}

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
                                    className="w-full pl-4 pr-12 py-3 bg-surface-hover border border-border rounded-2xl focus:ring-2 focus:ring-primary/30 focus:border-teal-400 outline-none text-sm transition-all dark:text-white placeholder:text-text-tertiary"
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
