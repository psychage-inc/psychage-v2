import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, ChatResponseMeta, StreamingState } from '../types/chat.types';
import * as chatService from '../services/chatService';
import { SafetyReplacementError } from '../services/chatService';

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
  const abortRef = useRef<AbortController | null>(null);

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

      // Create a new AbortController for this request
      const controller = new AbortController();
      abortRef.current = controller;

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
          controller.signal,
        );

        for await (const token of stream) {
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
        // AbortError is expected when user clicks stop — not a real error
        if (err instanceof DOMException && err.name === 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, isStreaming: false } : m,
            ),
          );
          setStreamingState('idle');
          return;
        }

        // Safety filter replaced the response — swap in the replacement text
        if (err instanceof SafetyReplacementError) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: err.replacementText, isStreaming: false }
                : m,
            ),
          );
          setStreamingState('idle');
          return;
        }

        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('Chat error:', errorMsg, err);
        setError(errorMsg);
        setStreamingState('error');

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: `Something went wrong: ${errorMsg}\n\nPlease try again. If this keeps happening, check the browser console for details.`,
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
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setActiveConversationId(null);
    setStreamingState('idle');
    setError(null);
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
    abortRef.current?.abort();
    abortRef.current = null;
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
