import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, ChatResponseMeta, StreamingState } from '../types/chat.types';
import * as chatService from '../services/chatService';

interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingState: StreamingState;
  activeConversationId: string | null;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
  startNewChat: () => void;
  loadConversation: (id: string) => Promise<void>;
  stopStreaming: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingState, setStreamingState] = useState<StreamingState>('idle');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const isStreaming = streamingState === 'streaming';

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      setError(null);

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      const assistantId = crypto.randomUUID();
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setStreamingState('streaming');
      abortRef.current = false;

      try {
        // Build full conversation history for the API
        const chatHistory = messages
          .filter((m) => m.content.trim())
          .map((m) => ({ role: m.role, content: m.content }));
        chatHistory.push({ role: 'user' as const, content: content.trim() });

        // Capture metadata from the API response
        let responseMeta: ChatResponseMeta | null = null;

        const stream = chatService.sendMessage(
          chatHistory,
          activeConversationId ?? undefined,
          (meta) => {
            responseMeta = meta;
          },
        );

        for await (const token of stream) {
          if (abortRef.current) break;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + token } : m,
            ),
          );
        }

        // Mark streaming complete with real metadata from the API
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  isStreaming: false,
                  sources: responseMeta?.citations ?? [],
                  safetyLevel: responseMeta?.safetyLevel,
                }
              : m,
          ),
        );

        setStreamingState('idle');
      } catch (err) {
        console.error('Chat error:', err);
        setError('Something went wrong. Please try again.');
        setStreamingState('error');

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: "I'm having trouble connecting right now. Please try again in a moment.",
                  isStreaming: false,
                }
              : m,
          ),
        );
      }
    },
    [isStreaming, activeConversationId, messages],
  );

  const retryLastMessage = useCallback(async () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMessage) return;

    // Remove last assistant message
    setMessages((prev) => {
      let lastAssistantIdx = -1;
      for (let i = prev.length - 1; i >= 0; i--) {
        if (prev[i].role === 'assistant') {
          lastAssistantIdx = i;
          break;
        }
      }
      if (lastAssistantIdx === -1) return prev;
      return prev.filter((_, i) => i !== lastAssistantIdx);
    });

    await sendMessage(lastUserMessage.content);
  }, [messages, sendMessage]);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setActiveConversationId(null);
    setStreamingState('idle');
    setError(null);
    abortRef.current = false;
  }, []);

  const loadConversation = useCallback(async (id: string) => {
    const conversation = await chatService.getConversation(id);
    if (conversation) {
      setMessages(conversation.messages);
      setActiveConversationId(id);
      setStreamingState('idle');
      setError(null);
    }
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current = true;
    setStreamingState('idle');
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)),
    );
  }, []);

  return {
    messages,
    isStreaming,
    streamingState,
    activeConversationId,
    error,
    sendMessage,
    retryLastMessage,
    startNewChat,
    loadConversation,
    stopStreaming,
  };
}
