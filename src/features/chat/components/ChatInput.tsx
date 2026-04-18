import { useState, useRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ArrowUp, Square } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isStreaming: boolean;
  onCrisisClick?: () => void;
}

export default function ChatInput({ onSend, onStop, isStreaming, onCrisisClick }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming) return;
    onSend(trimmed);
    setValue('');
    // Refocus textarea after send
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [value, isStreaming, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent = value.trim().length > 0;
  const charCount = value.length;
  const showCounter = charCount > 1600;
  const isOverLimit = charCount > 2000;

  return (
    <div className="border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <div className="max-w-3xl mx-auto px-4 pt-3 pb-2">
        {/* Input container */}
        <div className="relative">
          <TextareaAutosize
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              if (e.target.value.length <= 2000) {
                setValue(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about mental health..."
            minRows={1}
            maxRows={8}
            className="w-full resize-none pl-4 pr-14 py-3 border border-slate-300 dark:border-neutral-600 rounded-2xl focus:border-teal-400 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/30 outline-none text-base text-slate-900 dark:text-neutral-100 placeholder-slate-400 bg-white dark:bg-neutral-800 transition-all"
            aria-label="Message input"
          />

          {/* Send / Stop button */}
          <div className="absolute right-1.5 bottom-1.5">
            {isStreaming ? (
              <button
                onClick={onStop}
                className="w-10 h-10 rounded-full bg-slate-800 dark:bg-neutral-200 text-white dark:text-neutral-800 flex items-center justify-center hover:bg-slate-700 dark:hover:bg-neutral-300 transition-colors"
                aria-label="Stop generating"
              >
                <Square size={14} fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!hasContent || isOverLimit}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  hasContent && !isOverLimit
                    ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                    : 'bg-slate-200 dark:bg-neutral-700 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <ArrowUp size={16} />
              </button>
            )}
          </div>

          {/* Character counter */}
          {showCounter && (
            <span
              className={`absolute right-14 bottom-3.5 text-xs ${
                isOverLimit
                  ? 'text-red-500'
                  : charCount > 1800
                    ? 'text-amber-500'
                    : 'text-slate-400 dark:text-neutral-500'
              }`}
            >
              {charCount}/2000
            </span>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-slate-400 dark:text-neutral-500 mt-2 mb-1">
          Psyche AI provides educational information only — not a diagnosis or substitute for professional care.{' '}
          {onCrisisClick && (
            <button
              onClick={onCrisisClick}
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              Crisis resources
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
