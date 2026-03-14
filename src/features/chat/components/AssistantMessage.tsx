import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { ChatMessage } from '../types/chat.types';
import MarkdownRenderer from './MarkdownRenderer';
import StreamingCursor from './StreamingCursor';
import ThinkingBlock from './ThinkingBlock';
import SourceCitations from './SourceCitations';
import SuggestedFollowUps from './SuggestedFollowUps';
import MessageActions from './MessageActions';

interface AssistantMessageProps {
  message: ChatMessage;
  isLastAssistant: boolean;
  onRetry?: () => void;
  onFollowUp?: (text: string) => void;
}

export default function AssistantMessage({
  message,
  isLastAssistant,
  onRetry,
  onFollowUp,
}: AssistantMessageProps) {
  const showExtras = !message.isStreaming;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="mb-6"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className={`shrink-0 w-7 h-7 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center mt-1 ${
            message.isStreaming ? 'animate-pulse' : ''
          }`}
        >
          <Sparkles size={14} className="text-white" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Thinking block */}
          {message.thinkingContent && (
            <ThinkingBlock content={message.thinkingContent} />
          )}

          {/* Message content */}
          <div className="text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">
            <MarkdownRenderer content={message.content} />
            {message.isStreaming && <StreamingCursor />}
          </div>

          {/* Post-stream extras */}
          {showExtras && (
            <>
              {message.sources && message.sources.length > 0 && (
                <SourceCitations sources={message.sources} />
              )}

              {message.suggestedFollowUps &&
                message.suggestedFollowUps.length > 0 &&
                isLastAssistant &&
                onFollowUp && (
                  <SuggestedFollowUps
                    suggestions={message.suggestedFollowUps}
                    onSelect={onFollowUp}
                  />
                )}

              <MessageActions
                content={message.content}
                isLastAssistant={isLastAssistant}
                onRetry={onRetry}
              />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
