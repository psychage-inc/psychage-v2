import { useState } from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import type { ConversationListItem } from '../types/chat.types';

interface ConversationItemProps {
  conversation: ConversationListItem;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-teal-50 dark:bg-teal-900/20 border-l-2 border-teal-500'
          : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-l-2 border-transparent'
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      <p
        className={`flex-1 text-sm truncate ${
          isActive
            ? 'text-teal-900 dark:text-teal-100 font-medium'
            : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {conversation.title}
      </p>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 rounded-md opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <MoreHorizontal size={14} />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-1 z-20 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conversation.id);
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
