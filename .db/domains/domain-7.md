# Domain 7: Navigator Analytics & Saved Results

## Code Path Trace

### Analytics: src/lib/navigator/analytics.ts
- Class: `NavigatorAnalytics`
- Sends events to `navigator_analytics` table via fire-and-forget INSERT
- Events: step_view, step_duration, complete, abandoned

### Saved Results: src/lib/navigator/storage.ts
- localStorage-only for symptom selection data (privacy-by-design)
- No symptom IDs sent to server — only counts

### navigator_saved_results
- For authenticated users: encrypted results stored with user_id

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| NAV-001 | critical | COMPLETE SCHEMA MISMATCH — every analytics INSERT silently fails | analytics.ts | 90-101 | Rewrite event types and columns to match DB schema |

### NAV-001 Detail: Schema Mismatch

**TypeScript sends:**
- event_type: `'navigator_step_view' | 'navigator_step_duration' | 'navigator_complete' | 'navigator_abandoned'`
- columns: `step_id`, `step_name`, `session_id`, `flow_id`, `timestamp`, `duration_seconds`, `symptom_count`, `condition_results_count`

**DB expects (navigator_analytics table):**
- event_type CHECK: `'started' | 'completed' | 'crisis_triggered' | 'result_clicked' | 'provider_clicked'`
- columns: `session_hash`, `domains_selected`, `symptoms_selected`, `time_to_complete_seconds`, `results_shown`, `safety_flag_level`, `feedback_helpful`

**ZERO OVERLAP** in event types or column names. Every INSERT fails the CHECK constraint on event_type.

### PII Verification
- ✅ DB schema comment: "NO symptom IDs, NO condition IDs, NO user identifiers. Counts and booleans only."
- ✅ TypeScript analytics only sends counts (`symptom_count`, `condition_results_count`) — no raw symptom data
- ✅ After fix: will send `domains_selected` (integer count), `symptoms_selected` (integer count) — still no PII

## Proposed Fix (analytics.ts)
Rewrite to match DB schema:
- Map `navigator_complete` → `completed`
- Map constructor init → `started`
- Use `session_hash` instead of `session_id`
- Use `time_to_complete_seconds` instead of `duration_seconds`
- Use `symptoms_selected`/`domains_selected` instead of `symptom_count`
- Drop per-step tracking (DB has no step-level columns)

## Edge Cases Verified
- ✅ Analytics is fire-and-forget (doesn't block results display)
- ✅ No PII in analytics payload — counts only
- ✅ navigator_saved_results: RLS user-scoped (auth.uid() = user_id)
- ✅ navigator_analytics: anon INSERT allowed (append-only)
- ⚠️ ALL analytics data is lost (NAV-001) — no events recorded since analytics.ts was written
