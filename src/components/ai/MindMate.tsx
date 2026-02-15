import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, AlertTriangle, Phone, Trash2, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    type?: 'text' | 'crisis' | 'suggestion';
    suggestions?: { label: string; action: string }[];
}

const STORAGE_KEY = 'psychage_mindmate_history';

const MindMate: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const location = useLocation();

    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try { return JSON.parse(saved); } catch { }
        }
        return [{
            id: 'init',
            sender: 'ai',
            text: "Hi! I'm MindMate, your personal mental health companion. How are you feeling today?",
            type: 'text'
        }];
    });

    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Persist chat
    useEffect(() => {
        if (messages.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages, isOpen, isTyping]);

    const clearChat = () => {
        setMessages([{
            id: Date.now().toString(),
            sender: 'ai',
            text: "Memory cleared. I'm ready for a fresh start.",
            type: 'text'
        }]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const handleSend = async () => {
        if (!inputText.trim()) return;

        // Check for API Key
        if (!apiKey) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'ai',
                text: "I'm currently offline (API Key missing). Please check configuration.",
                type: 'text'
            }]);
            return;
        }

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const { GoogleGenAI } = await import('@google/genai');
            const genAI = new GoogleGenAI({ apiKey });

            // Context-aware System Instruction
            const systemContext = `You are MindMate, a compassionate and professional mental health AI assistant on the PsychAge platform. 
            The user is currently visiting: ${location.pathname}.
            If the user mentions self-harm or suicide, IMMEDIATELY provide the 988 crisis helpline and encourage them to seek professional help.
            Keep your responses concise, empathetic, and supportive. Use Markdown for formatting.`;

            // Prepare history
            const history = messages
                .filter(m => m.id !== 'init')
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            const chat = genAI.chats.create({
                model: "gemini-1.5-flash",
                history: history,
                config: { maxOutputTokens: 500 },
            });

            // Send message with context (prepending context to the user message invisibly or just as part of the prompt)
            // Since we can't easily set systemInstruction in all SDK versions, we'll prepend it to the prompt if history is empty, 
            // or just rely on the model's persona. 
            // Better: Prepend context to the *current* message logic.

            const prompt = `[System Context: ${systemContext}] \n\n User Query: ${userMsg.text}`;

            const result = await chat.sendMessage({ message: prompt });
            const responseText = result.text;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: responseText || "I'm here for you, but I didn't catch that.",
                type: 'text'
            };

            // Check for crisis keywords in response (simple heuristic)
            if (responseText?.toLowerCase().includes("988") || responseText?.toLowerCase().includes("suicide")) {
                aiMsg.type = 'crisis';
            }

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'ai',
                text: "I'm having trouble connecting. Please check your internet connection.",
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
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[100] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col font-sans"
                    >
                        {/* Glassmorphic Container */}
                        <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/5" />

                        {/* Header */}
                        <div className="relative z-10 p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100">MindMate AI</h3>
                                    <div className="flex items-center gap-1.5 opacity-60">
                                        <MapPin size={10} />
                                        <span className="text-[10px] uppercase tracking-wider">{location.pathname === '/' ? 'Home' : location.pathname.replace('/', '')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={clearChat} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-400">
                                    <Trash2 size={18} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="relative z-10 flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0 mt-1">
                                            <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
                                        </div>
                                    )}
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-teal-600 text-white rounded-br-sm'
                                            : msg.type === 'crisis'
                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-sm'
                                        }`}>
                                        {msg.type === 'crisis' && (
                                            <div className="flex items-center gap-2 font-bold mb-2 text-red-600 dark:text-red-400">
                                                <AlertTriangle size={16} /> Crisis Support
                                            </div>
                                        )}
                                        {msg.text}

                                        {msg.type === 'crisis' && (
                                            <a href="tel:988" className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors w-full justify-center">
                                                <Phone size={14} /> Call 988 Now
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                                        <Sparkles size={14} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="relative z-10 p-4 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-slate-900/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="w-full pl-4 pr-12 py-3.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm shadow-sm transition-all dark:text-white"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MindMate;
