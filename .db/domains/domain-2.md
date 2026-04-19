# Domain 2: Provider Directory & Search

## Code Path Trace

### Search Cascade
1. `src/lib/providers/queries.ts:searchViaRPC()` (line 202-266)
   - Calls `supabase.rpc('search_providers_v2', {...14 params})`
   - Returns ProviderCardData[] with JSONB aggregated tags
2. `src/lib/providers/queries.ts:searchViaDirectQuery()` (line 273-314)
   - Falls back to `.from('providers').select(PROVIDER_SELECT)` with .or() filters
   - Loads up to 1000 rows, applies client-side filtering
3. Mock data fallback (50 providers)

### Claim Flow (line 563-608)
1. Fetch provider: `.from('providers').select('id, npi_number, status').eq('status', 'seeded')`
2. Verify NPI match client-side
3. Update: `.from('providers').update({ user_id, status: 'claimed', source: 'claim' }).eq('id', providerId)`
4. Record verification (fire-and-forget): `.from('provider_verifications').insert({...})`

### Provider Profile
- Single provider by ID with JSONB aggregate tags (specialties, languages, insurance)

## Issues Found

| id | severity | issue | file | line | proposed_fix |
|---|---|---|---|---|---|
| PROV-001 | critical | Claim flow broken — RLS `auth.uid() = user_id` blocks UPDATE on seeded providers where user_id IS NULL | queries.ts | 585-592 | New migration: add claim policy |
| PROV-002 | critical | No admin UPDATE policy on providers table — admin edits silently fail | migration | - | New migration: add admin UPDATE policy |
| PROV-003 | critical | provider_cultural_competencies missing owner-manage RLS policy | migration | - | New migration: add FOR ALL owner policy |
| PROV-004 | major | provider_analytics_events unrestricted anon INSERT — event flooding | migration | - | New migration: require auth for INSERT |
| PROV-005 | major | provider_verifications owner can self-insert with arbitrary status | migration | - | New migration: restrict to service_role |
| PROV-006 | minor | Verification INSERT is fire-and-forget (not awaited) — may create orphaned state | queries.ts | 599-605 | Info only — acceptable for non-critical data |
| PROV-007 | info | Direct query fallback loads 1000 rows — expensive but functional | queries.ts | 279 | Performance optimization, not a bug |

## Edge Cases Verified
- ✅ Search with no filters: returns providers with estimated count via pg_class.reltuples
- ✅ Search with zero results: returns empty array, not error
- ✅ Empty specialties/languages: JSONB aggregation returns empty array (not null)
- ✅ Provider profile by non-existent ID: returns null/empty, component shows 404
- ✅ provider_favorites CRUD: RLS verified (auth.uid() = user_id for own data)
- ✅ RLS: unauthenticated users can READ active/seeded providers but NOT modify
- ⚠️ Claim flow: RLS blocks legitimate claims (see PROV-001)
