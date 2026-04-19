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
      className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-teal-50 dark:bg-teal-900/20 border-l-2 border-teal-500 shadow-sm'
          : 'hover:bg-teal-50/50 dark:hover:bg-teal-900/10 border-l-2 border-transparent hover:border-teal-300 dark:hover:border-teal-700'
      }`}
      onClick={() => onSelect(conversation.id)}
    >
      <p
        className={`flex-1 text-sm truncate transition-colors duration-200 ${
          isActive
            ? 'text-teal-900 dark:text-teal-100 font-medium'
            : 'text-slate-600 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
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
          className="p-1 rounded-md opacity-0 group-hover:opacity-100 text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-all"
        >
          <MoreHorizontal size={14} />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full mt-1 z-20 w-36 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg shadow-lg py-1">
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
