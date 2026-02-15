import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, AlertTriangle, Phone, Trash2 } from 'lucide-react';

// Simple types for chat
interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    type?: 'text' | 'crisis' | 'suggestion';
    suggestions?: { label: string; action: string }[];
}

const STORAGE_KEY = 'psychage_chat_history';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                console.error("Failed to parse chat history");
            }
        }
        return [{
            id: 'init',
            sender: 'ai',
            text: "Hi! I'm your Psychage assistant. I can help you find resources, explain mental health concepts, or guide you to our tools. How can I help today?",
            type: 'text'
        }];
    });
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Save to Storage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const clearChat = () => {
        const resetMsg: Message = {
            id: Date.now().toString(),
            sender: 'ai',
            text: "Chat cleared. How else can I help you?",
            type: 'text'
        };
        setMessages([resetMsg]);
        localStorage.removeItem(STORAGE_KEY);
    };

    // --- REAL AI LOGIC ---
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // We'll use a ref to keep the chat session instance if we wanted single-session persistence
    // But since we store messages in localStorage, we might want to reconstruct chat history each time or just send full context.
    // For simplicity and robustness with localStorage, we'll use generateContent with history as context or startChat with history.

    // However, to properly use startChat with restored history, we need to map our Message format to Gemini's Content format.
    // Gemini format: { role: 'user' | 'model', parts: [{ text: string }] }

    const handleSend = async () => {
        if (!inputText.trim()) return;

        if (!apiKey) {
            const errorMsg: Message = {
                id: Date.now().toString(),
                sender: 'ai',
                text: "I'm temporarily unavailable. Please try again later or contact support if the issue persists.",
                type: 'text'
            };
            setMessages(prev => [...prev, errorMsg]);
            console.error('AIChatWidget: Missing VITE_GEMINI_API_KEY environment variable');
            return;
        }

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            // Dynamic import to avoid SSR issues if any, though likely fine in SPA
            const { GoogleGenAI } = await import('@google/genai');
            const genAI = new GoogleGenAI({ apiKey }); // GoogleGenAI often takes an object or just string. Let's check docs or safe bet.
            // Wait, looking at other usage, often it is `new GoogleGenAI(apiKey)` or `new GoogleGenAI({ apiKey })`.
            // The search result [1] said `import { GoogleGenAI } ...`.
            // Let's assume `new GoogleGenAI({ apiKey })` is safer if it's the new SDK, as it matches the `ApiClient` options pattern seen in d.ts (opts: ApiClientInitOptions).
            // ApiClientInitOptions has `apiKey?: string`.

            // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // OLD SDK

            // Prepare history for the chat model
            // Filter out system messages or error messages if any, and map to Gemini format
            const history = messages
                .filter(m => m.id !== 'init' && m.type !== 'crisis') // Skip init if desired, or keep it. Let's keep previous conversation.
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            // NEW SDK Usage
            const chat = genAI.chats.create({
                model: "gemini-1.5-flash",
                history: history,
                config: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage({ message: userMsg.text });
            const response = result; // Response is directly returned or wrapped? 
            // In 0.2.0, sendMessage returns Promise<GenerateContentResponse>.
            // GenerateContentResponse has .text getter.

            const text = response.text; // Getter

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: text || "I'm not sure what to say.",
                type: 'text'
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("AI Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: "I'm having trouble connecting right now. Please try again later.",
                type: 'text'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center text-white"
                    >
                        <Sparkles size={24} fill="currentColor" />
                        {/* Notification Badge */}
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-[100] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                    <Sparkles size={16} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Psychage Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <span className="text-[10px] font-medium text-gray-500">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                    title="Clear Chat"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                            <Bot size={16} className="text-teal-600" />
                                        </div>
                                    )}

                                    <div className={`max-w-[80%] space-y-2`}>
                                        <div
                                            className={`
                                        p-3.5 rounded-2xl text-sm leading-relaxed
                                        ${msg.sender === 'user'
                                                    ? 'bg-teal-600 text-white rounded-br-sm'
                                                    : msg.type === 'crisis'
                                                        ? 'bg-red-50 text-red-800 border border-red-100 rounded-bl-sm'
                                                        : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-sm'
                                                }
                                    `}
                                        >
                                            {msg.type === 'crisis' && (
                                                <div className="flex items-center gap-2 font-bold mb-2 text-red-600">
                                                    <AlertTriangle size={16} /> Crisis Support
                                                </div>
                                            )}
                                            {msg.text}
                                        </div>

                                        {/* Suggestion Chips */}
                                        {msg.suggestions && (
                                            <div className="flex flex-wrap gap-2">
                                                {msg.suggestions.map(sugg => (
                                                    <button
                                                        key={sugg.label}
                                                        className="px-3 py-1.5 bg-white border border-teal-200 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-50 transition-colors shadow-sm"
                                                    >
                                                        {sugg.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Crisis Actions */}
                                        {msg.type === 'crisis' && (
                                            <div className="flex gap-2 mt-2">
                                                <a href="tel:988" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
                                                    <Phone size={14} /> Call 988
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                        <Bot size={16} className="text-teal-600" />
                                    </div>
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm font-medium transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400 font-medium">AI can make mistakes. For medical emergencies, call 911.</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatWidget;