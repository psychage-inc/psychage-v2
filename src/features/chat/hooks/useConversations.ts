import { useState, useEffect, useCallback } from 'react';
import type { ConversationListItem, GroupedConversations, TimeGroup } from '../types/chat.types';
import * as chatService from '../services/chatService';

function getTimeGroup(date: Date): TimeGroup {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  if (days < 1 && date.getDate() === now.getDate()) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 7) return 'last7days';
  if (days < 30) return 'last30days';
  return 'older';
}

const GROUP_LABELS: Record<TimeGroup, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7days: 'Previous 7 Days',
  last30days: 'Previous 30 Days',
  older: 'Older',
};

const GROUP_ORDER: TimeGroup[] = ['today', 'yesterday', 'last7days', 'last30days', 'older'];

export function groupConversations(conversations: ConversationListItem[]): GroupedConversations[] {
  const groups: Record<TimeGroup, ConversationListItem[]> = {
    today: [],
    yesterday: [],
    last7days: [],
    last30days: [],
    older: [],
  };

  for (const conv of conversations) {
    const group = getTimeGroup(conv.updatedAt);
    groups[group].push(conv);
  }

  return GROUP_ORDER.filter((key) => groups[key].length > 0).map((key) => ({
    label: GROUP_LABELS[key],
    key,
    items: groups[key],
  }));
}

export function useConversations() {
  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await chatService.getConversations();
      setConversations(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const deleteConversation = useCallback(
    async (id: string) => {
      await chatService.deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
    },
    [],
  );

  const filteredConversations = searchQuery
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : conversations;

  const grouped = groupConversations(filteredConversations);

  return {
    conversations: filteredConversations,
    grouped,
    isLoading,
    searchQuery,
    setSearchQuery,
    deleteConversation,
    refresh: loadConversations,
  };
}
