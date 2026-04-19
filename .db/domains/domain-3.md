# Domain 3: MindMate Chat Persistence

## Code Path Trace

### Dual Persistence
1. **localStorage**: `psychage_ai_chat_history` — immediate write for instant UI
2. **sessionStorage**: `psychage_ai_session_id` — session UUID
3. **Supabase** (if authenticated): chatPersistenceService → ai_conversations + ai_messages

### Service: chatPersistenceService.ts
- `getOrCreateConversation(sessionId, userId)` → SELECT/INSERT on ai_conversations
- `saveMessage(conversationId, role, content)` → INSERT on ai_messages → UPDATE conversation timestamp → RPC increment (fails silently)
- `loadConversation(conversationId)` → SELECT from ai_messages
- `listConversations(userId, limit)` → SELECT from ai_conversations
- `deleteConversation(conversationId)` → UPDATE is_active = false

### RAG/Vector Search: src/lib/ai/retrieval.ts
- `match_content_chunks` RPC: pgvector cosine similarity (threshold 0.72, top 15)
- `search_content_documents` RPC: full-text search (top 10)
- Hybrid: vector 70% + text 30% → merge, deduplicate by documentId → top 5

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| CHAT-001 | major | `increment_conversation_count` RPC does NOT exist in any migration — every call silently fails | chatPersistenceService.ts | 111 | Replace with direct UPDATE |
| CHAT-002 | minor | No transaction between message INSERT, conversation UPDATE, and count increment — partial failure possible | chatPersistenceService.ts | 85-114 | Info only — Supabase JS doesn't support transactions |
| CHAT-003 | minor | ai_messages INSERT policy is `WITH CHECK (true)` — no validation that conversation belongs to user | migration | - | Info — conversation_id FK provides some protection |
| CHAT-004 | info | ai_providers table unsynced from providers (Finding #053) — MindMate could recommend suspended providers | - | - | Document for future fix |

## Edge Cases Verified
- ✅ localStorage write succeeds immediately (synchronous)
- ✅ Supabase write is fire-and-forget for count (doesn't block UI)
- ✅ If Supabase write fails, UI still works (localStorage has data)
- ✅ Rate limit: in-memory per sessionId (implemented in MindMate.tsx)
- ✅ RLS: users can only read their OWN conversations (auth.uid() = user_id)
- ✅ Crisis detection: safety_flag stored in conversation metadata
- ⚠️ message_count never increments (CHAT-001)
