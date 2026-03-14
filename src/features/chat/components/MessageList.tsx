import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import type { ChatMessage } from '../types/chat.types';
import { useAutoScroll } from '../hooks/useAutoScroll';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';

interface MessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onRetry: () => void;
  onFollowUp: (text: string) => void;
}

export default function MessageList({
  messages,
  isStreaming,
  onRetry,
  onFollowUp,
}: MessageListProps) {
  const lastContent = messages.length > 0 ? messages[messages.length - 1].content : '';
  const { scrollRef, isAtBottom, scrollToBottom } = useAutoScroll([
    messages.length,
    lastContent,
    isStreaming,
  ]);

  const lastAssistantId = [...messages]
    .reverse()
    .find((m) => m.role === 'assistant')?.id;

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage key={message.id} content={message.content} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                isLastAssistant={message.id === lastAssistantId}
                onRetry={message.id === lastAssistantId ? onRetry : undefined}
                onFollowUp={
                  message.id === lastAssistantId && !isStreaming
                    ? onFollowUp
                    : undefined
                }
              />
            ),
          )}
        </div>
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {!isAtBottom && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={() => scrollToBottom('smooth')}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            aria-label="Scroll to bottom"
          >
            <ArrowDown size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
