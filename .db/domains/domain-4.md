# Domain 4: Interactive Tools Persistence

## Tool Storage Patterns

### localStorage-Only Tools (5 verified)
All 5 tools confirmed: NO Supabase imports, NO `.from()` or `.rpc()` calls.

| Tool | localStorage Key | Version Migration | Notes |
|---|---|---|---|
| ClarityJournal | `psychage_clarity_journal_v2` | V1→V2 | Full CRUD: check-ins, screenings, safety plans |
| SleepArchitect | `psychage_sleep_architect_v1` | No | Simple save/load/clear |
| MoodWizard | `psychage_mood_wizard_v1` | No | Max 100 entries |
| MedicationTracker | `psychage_medication_tracker_v1` | No | Medications + dose logs + side effects |
| RelationshipHealthCheck | `psychage_relationship_health_v2` | V1→V2 | History save/load/delete |

### Hybrid Tool: Clarity Score
- **Service**: `src/services/clarityScoreService.ts`
- **Supabase table**: `clarity_score_history`
- **localStorage key**: `psychage_clarity_history`
- **Pattern**: Supabase INSERT (awaited) + localStorage mirror → merge on read (60s dedup)

### Legacy Supabase Services (also present)
- `sleepService.ts` → `sleep_entries` table (V1)
- `sleepDiaryService.ts` → `sleep_diary_entries` table (V2)
- `moodService.ts` → `mood_entries` table

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| TOOL-001 | info | clarityScoreService uses dangerous type cast: `as unknown as ClarityHistoryItem['domainScores']` | clarityScoreService.ts | ~105 | Info — works if DB schema matches |
| TOOL-002 | info | moodService writes both `mood_rating` and `value` for compatibility | moodService.ts | ~88-89 | Info — dual-column compat pattern |
| TOOL-003 | info | sleepService doesn't validate quality range on INSERT | sleepService.ts | - | Minor — DB constraint likely exists |

## Edge Cases Verified
- ✅ localStorage-only tools have no Supabase dependency — confirmed
- ✅ Clarity Score: saves to Supabase + localStorage on completion
- ✅ Clarity Score: falls back to localStorage if user not logged in
- ✅ Clarity Score: merge deduplicates within 60s window
- ✅ Sleep diary V2: correct column mapping, user_id via auth
- ✅ Mood entries: full CRUD with user isolation (auth.uid() = user_id)
- ✅ No data loss on login/logout: localStorage persists, Supabase syncs on login
