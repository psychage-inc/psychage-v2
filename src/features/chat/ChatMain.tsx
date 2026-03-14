import { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import type { ChatMessage } from './types/chat.types';
import WelcomeState from './components/WelcomeState';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import CrisisOverlay from './components/CrisisOverlay';

interface ChatMainProps {
  messages: ChatMessage[];
  isStreaming: boolean;
  onSend: (message: string) => void;
  onRetry: () => void;
  onStop: () => void;
  onNewChat: () => void;
  onToggleSidebar: () => void;
  showMobileMenu: boolean;
}

export default function ChatMain({
  messages,
  isStreaming,
  onSend,
  onRetry,
  onStop,
  onNewChat,
  onToggleSidebar,
  showMobileMenu,
}: ChatMainProps) {
  const [showCrisis, setShowCrisis] = useState(false);
  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950">
      {/* Mobile top bar */}
      {showMobileMenu && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Psyche AI
          </span>
          <button
            onClick={onNewChat}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="New chat"
          >
            <Plus size={20} />
          </button>
        </div>
      )}

      {/* Content area */}
      {hasMessages ? (
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          onRetry={onRetry}
          onFollowUp={onSend}
        />
      ) : (
        <WelcomeState onSuggestionClick={onSend} />
      )}

      {/* Input bar */}
      <ChatInput
        onSend={onSend}
        onStop={onStop}
        isStreaming={isStreaming}
        onCrisisClick={() => setShowCrisis(true)}
      />

      {/* Crisis overlay */}
      {showCrisis && (
        <CrisisOverlay onClose={() => setShowCrisis(false)} />
      )}
    </div>
  );
}
