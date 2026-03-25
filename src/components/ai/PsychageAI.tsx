/**
 * PsychageAI - Main Chat Interface
 *
 * Psychage's AI assistant with:
 * - Intelligent conversational AI
 * - Evidence-based responses
 * - Citation cards for transparency
 * - Crisis detection and support
 * - Safety disclaimers
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import CitationCard from './CitationCard';
import SafetyBanner from './SafetyBanner';
import AIDisclosure from './AIDisclosure';
import type { Citation } from '@/lib/ai/types';

// ============================================================================
// Types
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  safetyLevel?: 'SAFE' | 'SENSITIVE' | 'CRISIS' | 'HARMFUL_REQUEST';
  isCrisis?: boolean;
  timestamp: number;
}

interface ChatResponse {
  message: string;
  citations: Citation[];
  sessionId: string;
  safetyLevel: string;
  isCrisis: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEYS = {
  MESSAGES: 'psychage_ai_messages',
  SESSION_ID: 'psychage_ai_session_id',
  DISCLOSURE_ACCEPTED: 'psychage_ai_disclosure_accepted',
};

// ============================================================================
// Helper Functions
// ============================================================================

function generateSessionId(): string {
  return crypto.randomUUID();
}

function getSessionId(): string {
  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
}

function saveMessages(messages: Message[]): void {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
}

function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// ============================================================================
// Main Component
// ============================================================================

const PsychageAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [sessionId] = useState(getSessionId);
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Save messages to localStorage
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // ========================================================================
  // Send Message
  // ========================================================================

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        citations: data.citations || [],
        safetyLevel: data.safetyLevel as any,
        isCrisis: data.isCrisis,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show crisis banner if detected
      if (data.isCrisis) {
        setShowCrisis(true);
      }

    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // ========================================================================
  // Feedback
  // ========================================================================

  const handleFeedback = async (messageId: string, feedback: 'positive' | 'negative') => {
    if (feedbackGiven.has(messageId)) return;

    try {
      await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, messageId, feedback }),
      });

      setFeedbackGiven(prev => new Set(prev).add(messageId));
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  // ========================================================================
  // Clear Chat
  // ========================================================================

  const handleClear = () => {
    if (confirm('Clear conversation history?')) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEYS.MESSAGES);
      setFeedbackGiven(new Set());
      setShowCrisis(false);
    }
  };

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* AI Disclosure Banner */}
      <AIDisclosure />

      {/* Crisis Banner */}
      <AnimatePresence>
        {showCrisis && <SafetyBanner onDismiss={() => setShowCrisis(false)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="relative border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {/* Enhanced AI Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl blur-md opacity-40 animate-pulse" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles size={24} className="animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Psychage AI</h2>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Mental Health Education Assistant
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            >
              Clear chat
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12 px-4">
            {/* Enhanced Hero Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center ring-4 ring-teal-50 dark:ring-teal-900/30">
                <Sparkles className="text-teal-600 dark:text-teal-400" size={36} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome to Psychage AI
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              I'm here to help you understand mental health topics, discover evidence-based resources,
              and support your wellness journey. Ask me anything!
            </p>

            {/* Enhanced Suggested Questions */}
            <div className="mt-8 space-y-3 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
                Try asking about...
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { q: 'What are the signs of anxiety?', icon: '💭' },
                  { q: 'How can I improve my sleep quality?', icon: '😴' },
                  { q: 'Tell me about depression and treatment options', icon: '🌱' },
                  { q: 'How do I manage work-related stress?', icon: '🧘' },
                  { q: 'What is cognitive behavioral therapy?', icon: '🧠' },
                  { q: 'How can I support someone with mental health challenges?', icon: '💙' },
                ].map(({ q, icon }) => (
                  <button
                    key={q}
                    onClick={() => setInputText(q)}
                    className="group flex items-center gap-3 px-4 py-3 text-left bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 hover:from-teal-50 hover:to-emerald-50 dark:hover:from-teal-900/20 dark:hover:to-emerald-900/20 border border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 rounded-xl transition-all duration-200 hover:shadow-md"
                  >
                    <span className="text-2xl shrink-0">{icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                      {q}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="relative shrink-0 mt-1">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl blur-sm opacity-20" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 flex items-center justify-center ring-2 ring-teal-50 dark:ring-teal-900/30">
                  <Sparkles size={18} className="text-teal-600 dark:text-teal-400" />
                </div>
              </div>
            )}

            <div className="flex flex-col max-w-[85%]">
              <div
                className={`relative p-4 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white rounded-br-sm shadow-lg shadow-teal-200/50 dark:shadow-teal-900/50'
                    : message.isCrisis
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 text-red-900 dark:text-red-100 border-2 border-red-200 dark:border-red-800 rounded-bl-sm'
                    : 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-sm'
                }`}
              >
                <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === 'user' ? 'font-medium' : ''
                }`}>
                  {message.content}
                </div>
              </div>

              {/* Citations */}
              {message.citations && message.citations.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.citations.map((citation, idx) => (
                    <CitationCard key={citation.document_id || idx} citation={citation} />
                  ))}
                </div>
              )}

              {/* Feedback buttons (assistant messages only) */}
              {message.role === 'assistant' && !message.isCrisis && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleFeedback(message.id, 'positive')}
                    disabled={feedbackGiven.has(message.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      feedbackGiven.has(message.id)
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-teal-600 dark:text-gray-500 dark:hover:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp size={14} />
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, 'negative')}
                    disabled={feedbackGiven.has(message.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      feedbackGiven.has(message.id)
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title="Not helpful"
                  >
                    <ThumbsDown size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Enhanced Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl blur-sm opacity-20 animate-pulse" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50 flex items-center justify-center ring-2 ring-teal-50 dark:ring-teal-900/30">
                <Sparkles size={18} className="text-teal-600 dark:text-teal-400 animate-pulse" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl rounded-bl-sm">
              <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-teal-600 dark:text-teal-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="relative p-4 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask me about mental health, wellness, or any topic..."
              disabled={isLoading}
              className="w-full px-5 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:focus:border-teal-500 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-sm hover:shadow-md"
              aria-label="Chat message input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="relative group px-5 py-3.5 bg-gradient-to-br from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-sm"
            aria-label="Send message"
          >
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            {isLoading ? (
              <Loader2 size={20} className="animate-spin relative z-10" />
            ) : (
              <Send size={20} className="relative z-10" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Psychage AI is an education assistant • Not a therapist or medical professional
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default PsychageAI;
