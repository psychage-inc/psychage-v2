import { Plus, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import { useConversations } from './hooks/useConversations';
import ConversationItem from './components/ConversationItem';

interface ChatSidebarProps {
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function ChatSidebar({
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onClose,
  isMobile,
}: ChatSidebarProps) {
  const { user } = useAuth();
  const { grouped, searchQuery, setSearchQuery, deleteConversation } = useConversations();

  const handleSelect = (id: string) => {
    onSelectConversation(id);
    if (isMobile && onClose) onClose();
  };

  const handleNewChat = () => {
    onNewChat();
    if (isMobile && onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-neutral-800">
        <span className="text-sm font-semibold text-slate-700 dark:text-neutral-300">MindMate</span>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* New Chat */}
      <div className="px-3 py-3">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 w-full px-3 py-2.5 border border-slate-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Plus size={16} />
          New chat
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100 dark:focus:ring-teal-900/30 text-slate-700 dark:text-neutral-300 placeholder-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {grouped.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-neutral-500 text-center py-8">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </p>
        ) : (
          grouped.map((group) => (
            <div key={group.key} className="mb-3">
              <p className="text-xs text-slate-400 dark:text-neutral-500 font-medium uppercase tracking-wider px-3 py-1.5">
                {group.label}
              </p>
              {group.items.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isActive={conv.id === activeConversationId}
                  onSelect={handleSelect}
                  onDelete={deleteConversation}
                />
              ))}
            </div>
          ))
        )}
      </div>

      {/* User info */}
      {user && (
        <div className="border-t border-slate-200 dark:border-neutral-800 px-4 py-3">
          <div className="flex items-center gap-2">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-teal-700 dark:text-teal-300">
                {(user.display_name || user.email || '?')[0].toUpperCase()}
              </div>
            )}
            <span className="text-sm text-slate-700 dark:text-neutral-300 truncate">
              {user.display_name || user.email}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
