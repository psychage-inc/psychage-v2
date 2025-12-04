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

    // --- MOCK AI LOGIC ---
    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simple keyword matching for demo purposes
        const lowerInput = userMsg.text.toLowerCase();

        setTimeout(() => {
            let aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: "I'm not sure about that yet, but I can help you find a therapist or articles on anxiety.",
                type: 'text'
            };

            if (lowerInput.includes('suicide') || lowerInput.includes('kill') || lowerInput.includes('hurt') || lowerInput.includes('die')) {
                aiResponse = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: "I'm concerned about what you're sharing. If you are in immediate danger, please reach out for help right now.",
                    type: 'crisis'
                };
            } else if (lowerInput.includes('anxiety') || lowerInput.includes('nervous')) {
                aiResponse = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: "Anxiety is a common response to stress. We have several resources that might help.",
                    suggestions: [
                        { label: "Read Anxiety Guide", action: "/article/1" },
                        { label: "Breathing Tool", action: "/tool/breath" }
                    ]
                };
            } else if (lowerInput.includes('therapist') || lowerInput.includes('doctor')) {
                aiResponse = {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: "Finding a professional is a great step. You can search our directory for verified providers.",
                    suggestions: [
                        { label: "Open Directory", action: "/providers" }
                    ]
                };
            } else if (lowerInput.includes('clear')) {
                clearChat();
                setIsTyping(false);
                return;
            }

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
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