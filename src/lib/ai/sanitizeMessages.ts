import type { Message } from './types';

/** Minimal shape a client message must have to be forwarded to the model. */
type ClientMessage = Pick<Message, 'role' | 'content'>;

/**
 * Role allow-list for client-supplied conversation turns.
 *
 * Drops any message whose role is not `user` or `assistant`. The server-built
 * system prompt is the ONLY `system` message that may ever reach the model —
 * `AnthropicProvider` concatenates every `role:'system'` message into the API
 * `system` field, so an un-filtered client `system` turn would be injected onto
 * the real prompt of a mental-health chatbot (audit B3-1).
 *
 * Generic over the element type so callers keep their original message type.
 */
export function sanitizeClientMessages<T extends ClientMessage>(messages: T[]): T[] {
  const allowed = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
  const dropped = messages.length - allowed.length;
  if (dropped > 0) {
    console.warn(`[mindmate] dropped ${dropped} client message(s) with a disallowed role`);
  }
  return allowed;
}
