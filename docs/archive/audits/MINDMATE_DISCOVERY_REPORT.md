# MindMate Discovery Report

Generated: 2026-04-22T00:00:00Z
Repo state: `main` @ `44a0926` (**dirty** — 117 modified files, none in MindMate stack; audit targets are at HEAD)

Last 10 commits:
- `44a0926` — feat: /bridge annotation batch + cornerstone homepage hero
- `b32887e` — merge: Phase 4 — polish + hardening
- `2a04e96` — a11y: [12a of 12] #060 remainder — Tailwind class contrast sweep
- `40573df` — feat: [12 of 12] FTC sort disclosure + Sentry infrastructure
- `9acc841` — feat(integration): [11 of 12] #031 Navigator → provider handoff with specialty filtering
- `72cb00a` — fix(security): [10 of 12] #068 + #069 migrate DB 'editor' to 'clinical_admin'
- `ae2a9b1` — fix(security): [9 of 12] #051 restrict verification INSERT to pending status
- `39b7cb3` — a11y: [8 of 12] WCAG AA contrast fix for text-tertiary
- `4af1eb0` — a11y: [7 of 12] search announcements + filter focus trap + error alerts + skeleton
- `3e70438` — feat(i18n): [6 of 12] enable language switcher in navigation

---

## TL;DR

**Root cause of the 500 (best evidence from code; logs inaccessible):** The literal `"Chat API error: 500"` surfaced to the user is a **generic fallback** in both [src/components/ai/MindMate.tsx:205](src/components/ai/MindMate.tsx#L205) and [src/features/chat/services/chatService.ts:90](src/features/chat/services/chatService.ts#L90) that only triggers when the server response body is NOT parseable JSON or has no `.error` field. The handler's own explicit 500s ([api/ai/chat.ts:105-107](api/ai/chat.ts#L105-L107), [api/ai/chat.ts:390-392](api/ai/chat.ts#L390-L392)) always return `{ error: "..." }` JSON — which would be surfaced as the actual error text, not the `"Chat API error: 500"` literal. The fact that users see the literal string strongly suggests a **platform-level failure** (Vercel function crash at cold start, hard timeout before first SSE byte, or proxy-level 500) rather than the handler's own error path. The most plausible concrete code-level candidates are: **(a)** one of `ANTHROPIC_API_KEY` / `VITE_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` missing in Vercel env (would hit the preflight JSON 500 at [api/ai/chat.ts:105](api/ai/chat.ts#L105) — but note: this DOES return structured JSON, so the user-visible literal would be the env-var message, not `"Chat API error: 500"`); **(b)** uncaught throw from `retrieveRelevantContent()` at [api/ai/chat.ts:226-235](api/ai/chat.ts#L226-L235), which is NOT wrapped in try/catch and bubbles to the outer catch — this too returns structured JSON, so same conclusion; **(c)** Vercel platform issue (cold start init throw, timeout, or function import failure). Confidence on each is LOW without runtime logs.

**Streaming refactor status:** **Merged** — SSE path is present and wired end-to-end. [api/ai/chat.ts:278-354](api/ai/chat.ts#L278-L354) writes SSE, [src/lib/ai/streaming.ts](src/lib/ai/streaming.ts) defines encoder/parser, both clients consume it ([MindMate.tsx:239](src/components/ai/MindMate.tsx#L239), [chatService.ts:123](src/features/chat/services/chatService.ts#L123)).

**Highest-risk additional issues spotted:**
1. `retrieveRelevantContent()` has no try/catch at the callsite ([api/ai/chat.ts:226-235](api/ai/chat.ts#L226-L235)); OpenAI embedding failure → uncaught throw → 500.
2. `streamCompletion()` doesn't forward `AbortSignal` to Anthropic ([src/lib/ai/llm.ts:156](src/lib/ai/llm.ts#L156)); client disconnect sets a flag but the upstream HTTP connection stays open until Anthropic finishes — wastes tokens, risks timeout.
3. `extractCitations()` parses the response *text* for `[SOURCE:...]` markers ([api/ai/chat.ts:61-76](api/ai/chat.ts#L61-L76)) instead of using the RAG `searchResults` chunks — Bug 8 is **NOT fixed** in the streaming path. The cleaner chunk-based alternative `extractCitationsFromResponse()` exists at [src/lib/ai/llm.ts:589](src/lib/ai/llm.ts#L589) but is unused by the chat route.
4. Mid-stream output-validation desync: tokens are streamed to the client first ([api/ai/chat.ts:307](api/ai/chat.ts#L307)), then diagnostic-pattern validation runs AFTER the full response accumulates ([api/ai/chat.ts:311-316](api/ai/chat.ts#L311-L316)). The `SAFETY_VIOLATION` error event replaces client text, but the user briefly sees the unvalidated text.
5. No server-side persistence to `ai_conversations`/`ai_messages` exists in the streaming route — all persistence is client-side fire-and-forget from [MindMate.tsx:177,290](src/components/ai/MindMate.tsx#L177).

**Confidence in root-cause diagnosis: LOW.** Vercel CLI is not authenticated on this machine (`vercel whoami` → "No existing credentials found"), so no log-based root cause attribution was possible. Code-only analysis identifies several plausible 500-origin paths but cannot distinguish between them without runtime evidence.

---

## 1. File Inventory

### API layer
1. [api/ai/chat.ts](api/ai/chat.ts) — 394 LOC — streaming/non-streaming chat endpoint; **500 origin**
2. [api/ai/health.ts](api/ai/health.ts) — env-var preflight endpoint
3. [api/ai/feedback.ts](api/ai/feedback.ts) — user feedback recorder
4. [api/ai/embed.ts](api/ai/embed.ts) — embedding endpoint (not used by chat flow; peer)

### Frontend entry points
5. [src/components/ai/MindMate.tsx](src/components/ai/MindMate.tsx) — 538 LOC — floating widget; calls `/api/ai/chat` directly at [L192](src/components/ai/MindMate.tsx#L192)
6. [src/pages/tools/MindMate.tsx](src/pages/tools/MindMate.tsx) — 17 LOC — dedicated-page shell, renders `ChatLayout`
7. [src/components/dashboard/MindMateCard.tsx](src/components/dashboard/MindMateCard.tsx) — 115 LOC — dashboard card; links only, no API call
8. [src/features/chat/ChatLayout.tsx](src/features/chat/ChatLayout.tsx) — 89 LOC
9. [src/features/chat/ChatMain.tsx](src/features/chat/ChatMain.tsx) — 84 LOC
10. [src/features/chat/ChatSidebar.tsx](src/features/chat/ChatSidebar.tsx)

### Client chat layer
11. [src/features/chat/services/chatService.ts](src/features/chat/services/chatService.ts) — 178 LOC — SSE consumer; **error at [L89-L91](src/features/chat/services/chatService.ts#L89-L91)**
12. [src/features/chat/hooks/useChat.ts](src/features/chat/hooks/useChat.ts) — 205 LOC — React hook; error surfaced at [L124-L140](src/features/chat/hooks/useChat.ts#L124-L140)

### AI core library (shared between API and frontend)
13. [src/lib/ai/llm.ts](src/lib/ai/llm.ts) — 717 LOC — `AnthropicProvider`, `OpenAIProvider`, `SYSTEM_PROMPT`
14. [src/lib/ai/streaming.ts](src/lib/ai/streaming.ts) — 132 LOC — SSE encoder + parser
15. [src/lib/ai/safety.ts](src/lib/ai/safety.ts) — 473 LOC — 3-layer safety (keyword, LLM classifier, output validator) + crisis response
16. [src/lib/ai/retrieval.ts](src/lib/ai/retrieval.ts) — 308 LOC — pgvector + FTS hybrid RAG
17. [src/lib/ai/intent.ts](src/lib/ai/intent.ts) — 318 LOC — intent classification (regex → LLM fallback)
18. [src/lib/ai/providers.ts](src/lib/ai/providers.ts) — 334 LOC — provider directory search
19. [src/lib/ai/config.ts](src/lib/ai/config.ts) — 96 LOC — env var helpers, model selection
20. [src/lib/ai/types.ts](src/lib/ai/types.ts) — 573 LOC — shared type definitions

### Persistence
21. [src/services/chatPersistenceService.ts](src/services/chatPersistenceService.ts) — 202 LOC — Supabase CRUD for `ai_conversations` / `ai_messages`

### Config
22. [vercel.json](vercel.json) — 31 LOC — sets `maxDuration: 60` on `api/ai/chat.ts`

Verified filesystem presence of all 22 files via `ls`. No stub or missing file found.

---

## 2. Architecture (As Currently Coded)

Text call graph:

```
User types in UI
  ├─ Floating widget                            Dedicated page
  │  MindMate.tsx (handleSend)                   ChatLayout.tsx → ChatMain.tsx
  │    │                                           │
  │    └──── fetch('/api/ai/chat')                 └── useChat.sendMessage()
  │          (inline SSE consumption)                   └── chatService.sendMessage()
  │                                                           (shared SSE consumer)
  │                                                                   │
  └─────────────── both POST /api/ai/chat with { messages, sessionId, stream: true }
                                     │
                                     ▼
                   api/ai/chat.ts — Vercel classic handler (req, res)
                   │
                   ├─ preflight env check (ANTHROPIC_API_KEY, VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
                   ├─ parse body → Message[]
                   ├─ rate limit (in-memory Map, per IP, 20/min)
                   ├─ createClient(supabase) + new AnthropicProvider()
                   │
                   ├─ LAYER 1: classifyInputSafety()     ──→ safety.ts (keyword pre-check + LLM classifier)
                   │     │                                       │
                   │     │                                       └─ llmProvider.generateCompletion()
                   │     │
                   │     ├─ if CRISIS → return JSON 200 (generateCrisisResponse) — never streams
                   │     └─ if HARMFUL_REQUEST → return JSON 200 — never streams
                   │
                   ├─ classifyIntent()                    ──→ intent.ts (regex → LLM fallback)
                   │     │
                   │     └─ if provider_search → searchAIProviders() ──→ providers.ts (Supabase query)
                   │
                   ├─ if OPENAI_API_KEY present:
                   │     retrieveRelevantContent()        ──→ retrieval.ts
                   │                                            │
                   │                                            ├─ embeddingProvider.generateEmbedding() (OpenAI)
                   │                                            ├─ supabase.rpc('match_content_chunks')
                   │                                            └─ supabase.rpc('search_content_documents')
                   │
                   ├─ assemble augmentedPrompt (SYSTEM_PROMPT.replace)
                   │
                   └─ if stream: true (the hot path)
                         ├─ res.writeHead(200, text/event-stream)
                         ├─ SSE: metadata + safety events
                         ├─ for await chunk of llmProvider.streamCompletion()
                         │     └─ fetch https://api.anthropic.com/v1/messages (stream=true)
                         │           └─ parses content_block_delta / message_delta / message_stop
                         │              also a defensive '[DONE]' branch
                         ├─ diagnostic-pattern scan AFTER loop
                         ├─ extractCitations(fullText, ...) — regex over text
                         ├─ append provider suggestions if any
                         ├─ SSE: done event
                         └─ res.end()
                       else (non-streaming path, line 361+):
                         └─ generateCompletion → JSON response
```

Client consumer logic at [chatService.ts:94](src/features/chat/services/chatService.ts#L94) branches on `Content-Type`: `application/json` → crisis/harmful path; `text/event-stream` → SSE path.

---

## 3. Current Request Flow

**Success path (streaming, SAFE input):**

1. User submits message → [MindMate.tsx:161 handleSend](src/components/ai/MindMate.tsx#L161) or [useChat.ts:28 sendMessage](src/features/chat/hooks/useChat.ts#L28)
2. `POST /api/ai/chat` with `{ messages, sessionId, stream: true }` ([MindMate.tsx:192](src/components/ai/MindMate.tsx#L192), [chatService.ts:80](src/features/chat/services/chatService.ts#L80))
3. Handler preflight: env vars checked ([chat.ts:98-108](api/ai/chat.ts#L98-L108)); body validated ([chat.ts:117-124](api/ai/chat.ts#L117-L124)); rate limit ([chat.ts:129-139](api/ai/chat.ts#L129-L139))
4. `new AnthropicProvider()` created per-request ([chat.ts:149](api/ai/chat.ts#L149)) — no shared singleton
5. `classifyInputSafety()` runs; SAFE → continue ([chat.ts:156-161](api/ai/chat.ts#L156-L161))
6. `classifyIntent()` runs ([chat.ts:197-202](api/ai/chat.ts#L197-L202))
7. If intent = `provider_search`, `searchAIProviders()` runs, errors swallowed to `console.warn` ([chat.ts:206-214](api/ai/chat.ts#L206-L214))
8. If OpenAI key present, `retrieveRelevantContent()` — **NOT wrapped in try/catch** ([chat.ts:224-235](api/ai/chat.ts#L224-L235))
9. Augmented prompt built from SYSTEM_PROMPT + retrieved chunks ([chat.ts:245-248](api/ai/chat.ts#L245-L248))
10. `res.writeHead(200, 'text/event-stream', ...)` ([chat.ts:280-285](api/ai/chat.ts#L280-L285))
11. SSE `metadata` + `safety` events sent ([chat.ts:292-293](api/ai/chat.ts#L292-L293))
12. For-await loop over `llmProvider.streamCompletion()` emits `token` events ([chat.ts:299-308](api/ai/chat.ts#L299-L308))
13. POST-loop: diagnostic pattern scan ([chat.ts:311-316](api/ai/chat.ts#L311-L316)); if violated, sends `error` event with code `SAFETY_VIOLATION`
14. `extractCitations()` regex-scans `fullContent` ([chat.ts:319](api/ai/chat.ts#L319)); `citations` event emitted if matches
15. Provider suggestion appended as text + `providers` event ([chat.ts:325-334](api/ai/chat.ts#L325-L334))
16. `done` event emitted ([chat.ts:338-343](api/ai/chat.ts#L338-L343)); `res.end()` ([chat.ts:353](api/ai/chat.ts#L353))
17. Client finalizes message; fire-and-forget persist to Supabase ([MindMate.tsx:290](src/components/ai/MindMate.tsx#L290))

**500 / error path (observed):**

Three distinct server origins each route differently:

- **Handler preflight 500** ([chat.ts:105-107](api/ai/chat.ts#L105-L107)): returns `{ error: "Server configuration error: missing X, Y, Z..." }`. Client parses at [chatService.ts:88](src/features/chat/services/chatService.ts#L88) / [MindMate.tsx:204](src/components/ai/MindMate.tsx#L204) and surfaces `errorData.error` — the user would see the env-var list, not the `"Chat API error: 500"` literal.
- **Outer catch 500** ([chat.ts:387-393](api/ai/chat.ts#L387-L393)): returns `{ error: errorMessage }`. Same as above — user sees the error message text, not the literal.
- **Platform 500 (Vercel returns a generic error page or empty body):** `res.json().catch(() => ({}))` at [chatService.ts:88](src/features/chat/services/chatService.ts#L88) / [MindMate.tsx:204](src/components/ai/MindMate.tsx#L204) swallows the parse failure and yields `{}`; `errorData.error` is `undefined`, so the fallback `` `Chat API error: ${res.status}` `` fires. **This is the only path that produces the exact string the user reports.**

Then the chain: thrown Error → `useChat.ts:124-140` or `MindMate.tsx:291-307` catch block → message content set to `Something went wrong: Chat API error: 500\n\nPlease try again. If this keeps happening, check the browser console for details.`

---

## 4. Vercel Logs — The Actual 500

**Status: INACCESSIBLE.**

```
$ vercel logs --prod
Vercel CLI 48.10.2
Error: No existing credentials found. Please run `vercel login` or pass "--token"
Learn More: https://err.sh/vercel/no-credentials-found
```

The Vercel CLI is installed (`/opt/homebrew/bin/vercel`, v48.10.2) but unauthenticated on this workstation. `vercel whoami` confirms: "No existing credentials found."

**Impact on this audit:** Unable to capture actual stack traces, error classes, timestamps, or failure frequency from production. The 500-origin attribution in the TL;DR is code-only analysis; runtime attribution is not possible without either:
1. `vercel login` (interactive OAuth) on this machine, or
2. Passing `--token <VERCEL_TOKEN>` from the Vercel dashboard, or
3. Viewing logs directly in the Vercel dashboard → Project → Deployments → Logs.

This step intentionally did not initiate interactive auth per the plan constraints.

---

## 5. Streaming Refactor — Bug-by-Bug Status

| # | Bug | Status | Evidence | Notes |
|---|---|---|---|---|
| 1 | Using OpenAI's `[DONE]` for Anthropic instead of `message_stop` | **Fixed (in practice)** | [llm.ts:189-192](src/lib/ai/llm.ts#L189) still has a defensive `[DONE]` branch AND [llm.ts:211-214](src/lib/ai/llm.ts#L211) correctly handles `message_stop` | Anthropic SSE never emits `[DONE]`, so that branch is harmless dead code. `message_stop` is wired and terminates the generator. Not a 500 cause. |
| 2 | Vercel handler signature mismatch (classic vs modern) | **N/A / Fixed** | [chat.ts:82-85](api/ai/chat.ts#L82-L85) uses `(req: VercelRequest, res: VercelResponse)` with `res.writeHead()` + `res.write()` | Classic `@vercel/node` handlers CAN stream via `res.write()`. Requires Node runtime, which vercel.json doesn't override. Works per Vercel docs. |
| 3 | Race condition from usage stats stored as instance state on shared singleton | **Fixed** | [chat.ts:149](api/ai/chat.ts#L149) constructs `new AnthropicProvider(...)` on every request — instance is not shared | `_lastStreamUsage` is instance state ([llm.ts:69](src/lib/ai/llm.ts#L69)) but scope is per-request, so no concurrency race. |
| 4 | Anthropic usage event ordering overwriting `promptTokens` | **Fixed** | [llm.ts:199-210](src/lib/ai/llm.ts#L199-L210): `message_start` sets `prompt=input_tokens, completion=0`; `message_delta` preserves existing prompt via `this._lastStreamUsage?.prompt ?? 0` and updates completion | Ordering preserved; no overwrite. |
| 5 | Mid-stream output validation desync | **Not Fixed (but mitigated)** | [chat.ts:310-316](api/ai/chat.ts#L310-L316) runs diagnostic scan AFTER accumulating `fullContent`, then sends a `SAFETY_VIOLATION` error event | Tokens are streamed live to the UI ([chat.ts:307](api/ai/chat.ts#L307)) before validation runs. User briefly sees pre-validation text, then a replacement swap at [MindMate.tsx:251-258](src/components/ai/MindMate.tsx#L251-L258) / [chatService.ts:144-147](src/features/chat/services/chatService.ts#L144-L147). Flicker, not correctness, but a UX desync. |
| 6 | React stale closure in `useCallback` | **Fixed** | [useChat.ts:142](src/features/chat/hooks/useChat.ts#L142) — `sendMessage` useCallback depends on `[isStreaming, activeConversationId, messages]`, so closure regenerates each render | `MindMate.tsx` `handleSend` is not wrapped in `useCallback` at all — reads latest `messages` from closure on each render. No stale issue. |
| 7 | Undefined function references / missing imports | **Fixed** | All imports in [chat.ts:8-17](api/ai/chat.ts#L8-L17) resolve to exported symbols in `@/lib/ai/*` | No placeholders or TODO references observed. |
| 8 | Citation extraction parsing text instead of using RAG chunks | **NOT FIXED** | [chat.ts:61-76](api/ai/chat.ts#L61-L76) `extractCitations()` regex-scans response TEXT for `[SOURCE: title \| url]` markers; `_searchResults` parameter is underscore-prefixed (unused) | [llm.ts:589-626 extractCitationsFromResponse](src/lib/ai/llm.ts#L589-L626) exists and correctly cross-references chunks, but is NOT called by `api/ai/chat.ts`. Citations only appear if the LLM literally types the `[SOURCE:...]` marker. Hallucination risk. |
| 9 | Fire-and-forget persistence after `controller.close()` | **N/A (architectural mismatch)** | No `controller.close()` pattern exists — handler uses classic `res.write()` + `res.end()`. API-side persistence is **absent entirely**; only client-side persistence at [MindMate.tsx:177,290](src/components/ai/MindMate.tsx#L177) is fire-and-forget via `.catch(console.error)` | Client persistence runs AFTER the SSE loop exits ([MindMate.tsx:290](src/components/ai/MindMate.tsx#L290)), which is reachable. Server-side persistence to `ai_conversations`/`ai_messages` is missing from the streaming route — this is a separate gap not in the original bug list. |
| 10 | Missing AbortSignal propagation to Anthropic | **NOT FIXED** | [llm.ts:156-164](src/lib/ai/llm.ts#L156-L164) `fetch(...)` call has no `signal` parameter | Client disconnect sets `clientDisconnected = true` at [chat.ts:289](api/ai/chat.ts#L289), which breaks the inner loop at [chat.ts:300](api/ai/chat.ts#L300), but the upstream HTTP connection to Anthropic is NOT aborted — tokens continue to be generated and discarded until Anthropic closes naturally. Wastes tokens; not a direct 500 cause. |
| 11 | Anthropic SSE event-format awareness gaps | **Partial** | [llm.ts:186-219](src/lib/ai/llm.ts#L186-L219) handles `content_block_delta`, `message_start`, `message_delta`, `message_stop`. Does NOT handle `content_block_start`, `content_block_stop`, `ping`, or `error` event types | Unhandled types fall through the try/parse harmlessly — except `error`, where an Anthropic-side error mid-stream would be silently swallowed. |
| 12 | Missing Gemini fallback stub matching the updated streaming interface | **N/A** | Gemini is not imported, instantiated, or referenced in [llm.ts](src/lib/ai/llm.ts) or [chat.ts](api/ai/chat.ts) | Only `anthropic` and `openai` are valid `LLM_PROVIDER` values ([config.ts:12](src/lib/ai/config.ts#L12)). [chat.ts:149](api/ai/chat.ts#L149) hardcodes `AnthropicProvider`. CLAUDE.md references Gemini for MindMate, but that is stale — the code path uses Anthropic. |
| 13 | Layer 1 crisis mid-stream sending generic `error` instead of crisis event | **N/A (architectural)** | Crisis is detected pre-stream at [chat.ts:167-177](api/ai/chat.ts#L167-L177) and returns a **JSON** response (not SSE) with `isCrisis: true`. No mid-stream crisis detection path exists | Input safety is classified ONCE before streaming begins; there is no mechanism to trigger crisis detection after the stream starts. The original bug presumes a capability the code does not implement. |

---

## 6. Environment Variables

Names only — values never read.

| Variable | Read at | Required | Fallback | Notes |
|---|---|---|---|---|
| `ANTHROPIC_API_KEY` | [api/ai/chat.ts:99](api/ai/chat.ts#L99), [api/ai/chat.ts:149](api/ai/chat.ts#L149), [api/ai/health.ts](api/ai/health.ts) | **Yes** | None — explicit 500 JSON if missing | Missing → preflight path returns 500 with the var name in the message |
| `VITE_SUPABASE_URL` | [api/ai/chat.ts:100](api/ai/chat.ts#L100), [api/ai/chat.ts:144](api/ai/chat.ts#L144), [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts) | **Yes** | None — explicit 500 JSON if missing | Same pattern |
| `SUPABASE_SERVICE_ROLE_KEY` | [api/ai/chat.ts:101](api/ai/chat.ts#L101), [api/ai/chat.ts:145](api/ai/chat.ts#L145) | **Yes** | None — explicit 500 JSON if missing | Server-only; not exposed to client |
| `OPENAI_API_KEY` | [api/ai/chat.ts:221](api/ai/chat.ts#L221) | No | `''` via [config.ts:90-95 getOptionalEnv](src/lib/ai/config.ts#L90-L95) | If empty, RAG is skipped ([chat.ts:224](api/ai/chat.ts#L224)); chat proceeds without retrieved context |
| `LLM_PROVIDER` | [config.ts:12](src/lib/ai/config.ts#L12) | No | `'anthropic'` | Only affects model name strings; chat.ts hardcodes `AnthropicProvider` regardless |
| `VITE_SUPABASE_ANON_KEY` | [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts) | **Yes** (client) | None — client throws | Not used by the chat API route (server uses service role) |

The `getEnv()` helper at [config.ts:68-84](src/lib/ai/config.ts#L68-L84) tries `process.env[key]` then `import.meta.env[VITE_key]` / `import.meta.env[key]` — on the server path (Vercel function), only `process.env` is populated.

---

## 7. Vercel Configuration

[vercel.json](vercel.json) — full contents:

```json
{
  "functions": {
    "api/ai/chat.ts": {
      "maxDuration": 60
    }
  },
  "redirects": [
    {
      "source": "/admin/:path*",
      "destination": "https://admin.psychage.com/:path*",
      "permanent": false,
      "has": [{ "type": "host", "value": "psychage.com" }]
    },
    {
      "source": "/admin",
      "destination": "https://admin.psychage.com/",
      "permanent": false,
      "has": [{ "type": "host", "value": "psychage.com" }]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/admin.html",
      "has": [{ "type": "host", "value": "admin.psychage.com" }]
    },
    { "source": "/admin/:path*", "destination": "/admin.html" },
    { "source": "/admin", "destination": "/admin.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Observations:
- `maxDuration: 60` on the chat route. Hobby plan tier caps at 10s — if the deployment is on Hobby, any cold start + safety classifier + intent classifier + RAG embed + first Anthropic token taking >10s will be killed. 60s requires **Pro** tier.
- No `runtime` override, no `memory` override, no `regions` override — defaults apply (Node.js, 1024 MB, `iad1`).
- No `.vercelignore` file.
- No per-route `api/vercel.json`.
- Plan-tier cannot be inferred from repo alone; must be verified in the Vercel dashboard.

---

## 8. Other Risks Spotted

- **Uncaught throw from `retrieveRelevantContent()`**: [chat.ts:226-235](api/ai/chat.ts#L226-L235) is NOT wrapped in try/catch. If `embeddingProvider.generateEmbedding()` at [retrieval.ts:35](src/lib/ai/retrieval.ts#L35) throws (e.g. OpenAI 401 / 429 / network), the outer handler catch at [chat.ts:387-393](api/ai/chat.ts#L387-L393) returns a structured 500 JSON. This is the clearest concrete 500 path in the code.
- **Token streaming desync**: the full response is streamed BEFORE output safety validation runs ([chat.ts:299-316](api/ai/chat.ts#L299-L316)). Users may briefly see diagnostic language before it is replaced by the fallback text.
- **In-memory rate limiter on serverless**: [chat.ts:23-47](api/ai/chat.ts#L23-L47) uses a module-level `Map` that does not persist across Vercel function invocations. Multi-instance deploys have no cross-instance coordination; limits are effectively per-warm-instance. Comment at [chat.ts:20](api/ai/chat.ts#L20) acknowledges this.
- **Type coupling between client and API**: client POSTs `{ role, content }` shapes ([chatService.ts:13-16](src/features/chat/services/chatService.ts#L13-L16), [MindMate.tsx:186-189](src/components/ai/MindMate.tsx#L186-L189)) but handler types them as `Message[]` from [src/lib/ai/types.ts](src/lib/ai/types.ts) which has additional fields (`conversation_id`, `safety_flag`, etc.). Downstream uses only `role` + `content`, so no runtime failure — but a type-safety gap.
- **`providers` SSE event uses `as any` cast** at [chat.ts:333](api/ai/chat.ts#L333) and [MindMate.tsx:265](src/components/ai/MindMate.tsx#L265) — `ProvidersEvent` at [streaming.ts:40-44](src/lib/ai/streaming.ts#L40-L44) is typed with `ProviderResult[]` and `totalMatches: number`; the cast bypasses type checking at both ends.
- **No timeouts on preflight LLM calls**: `classifyInputSafety()` and `classifyIntent()` call Anthropic `generateCompletion` without timeout/abort — a slow Anthropic response during classification stalls the function until Vercel's `maxDuration` (60s) kills it. This could produce a platform-level 500 with no structured body, matching the observed user symptom.
- **No server-side conversation persistence**: The streaming route never writes to `ai_conversations` or `ai_messages`. Only the floating widget persists client-side ([MindMate.tsx:177,290](src/components/ai/MindMate.tsx#L177)); the dedicated page's `useChat` hook has no persistence hook wired ([useChat.ts](src/features/chat/hooks/useChat.ts) has no `chatPersistenceService` import).
- **Session ID mismatch between widget and page**: widget uses `sessionStorage` at [MindMate.tsx:27-34](src/components/ai/MindMate.tsx#L27-L34); `useChat` passes `activeConversationId` as `sessionId` at [useChat.ts:69](src/features/chat/hooks/useChat.ts#L69) — initial value is `null`, so dedicated-page requests omit `sessionId` entirely and rely on server generation ([chat.ts:127](api/ai/chat.ts#L127)).
- **`message_start` event check lacks a guard for consecutive starts**: [llm.ts:199-204](src/lib/ai/llm.ts#L199-L204) overwrites `_lastStreamUsage` unconditionally on `message_start` — fine in practice (one per stream) but brittle if Anthropic ever emits multiple.
- **`extractCitations()` generates fresh UUIDs for `document_id`** at [chat.ts:69](api/ai/chat.ts#L69): every citation emission is non-idempotent; the same source cited twice gets two different IDs. Downstream grouping would break.

---

## 9. Open Questions

1. **What plan tier is this Vercel project on?** The 60s `maxDuration` requires Pro; if the project was downgraded to Hobby, every streaming call taking >10s would fail at the platform layer.
2. **Is any of `ANTHROPIC_API_KEY`, `VITE_SUPABASE_URL`, or `SUPABASE_SERVICE_ROLE_KEY` missing or stale in Vercel production env?** The `/api/ai/health` endpoint exists to check this; hitting it against the prod URL would answer definitively.
3. **What does `vercel logs --prod` for the chat endpoint show?** Log access is blocked (auth needed) — without this, the platform-vs-handler 500 distinction is unresolved.
4. **Has the `ANTHROPIC_API_KEY` been rotated or throttled recently?** A 401/429 from Anthropic during safety classification or intent classification would be caught by each classifier's fallback, but during the main `streamCompletion()` call the error is caught at [chat.ts:344-351](api/ai/chat.ts#L344-L351) and sent as an `error` SSE event — so this would NOT produce a `Chat API error: 500`, it would produce an inline error event. Unless the stream connection itself fails before the first event is written.
5. **Is the function's cold-start bundle succeeding?** If a module-level import or top-level statement in any imported file throws at cold start, Vercel returns a generic 500 with no structured body — matching the observed user symptom exactly.
6. **Are there any Supabase RLS policies on `content_chunks` or the search RPCs that would reject the service-role client?** Service-role bypasses RLS normally, but a custom RPC can still `SECURITY INVOKER` and fail.
7. **Where is persistence supposed to happen?** [MindMate.tsx](src/components/ai/MindMate.tsx) persists client-side; [useChat.ts](src/features/chat/hooks/useChat.ts) does not. Is one of them the intended owner, or is API-side persistence planned?
8. **What's the intended behavior of `extractCitations()`?** The current text-regex approach will rarely match (requires the LLM to literally type the `[SOURCE:...]` marker). Is the chunk-based [extractCitationsFromResponse](src/lib/ai/llm.ts#L589) meant to replace it?

---

## 10. Files Read

Flat alphabetized list of every file opened during this audit:

- api/ai/chat.ts
- src/App.tsx (partial, route scan)
- src/components/ai/MindMate.tsx
- src/features/chat/hooks/useChat.ts
- src/features/chat/services/chatService.ts
- src/lib/ai/config.ts
- src/lib/ai/intent.ts
- src/lib/ai/llm.ts
- src/lib/ai/retrieval.ts
- src/lib/ai/safety.ts
- src/lib/ai/streaming.ts
- src/lib/ai/types.ts (partial — interfaces relevant to stream events and providers)
- src/pages/tools/MindMate.tsx
- vercel.json

Directory listings verified:
- `api/ai/` → `chat.ts`, `embed.ts`, `feedback.ts`, `health.ts`
- `src/features/chat/` → `ChatLayout.tsx`, `ChatMain.tsx`, `ChatSidebar.tsx`, `components/`, `hooks/`, `services/`, `types/`
- `src/pages/tools/` → `MindMate.tsx`, `ToolsLandingPage.tsx`, `clarity-score/`

Log pull attempted but blocked: `vercel logs --prod` → `No existing credentials found`.
